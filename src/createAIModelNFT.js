const { HederaLangchainToolkit, coreQueriesPlugin } = require('hedera-agent-kit');
const { Client, PrivateKey, TopicMessageSubmitTransaction } = require('@hashgraph/sdk');
const { ChatOpenAI } = require('@langchain/openai');
const IPFSUploader = require('./ipfsUploader');
const { validateAgentMetadata } = require('./hcs10Validator');
require('dotenv').config();

class AIAgentMarketplace {
    constructor() {
        this.client = Client.forTestnet().setOperator(
            process.env.HEDERA_ACCOUNT_ID,
            PrivateKey.fromStringECDSA(process.env.HEDERA_PRIVATE_KEY)
        );

        this.hederaAgentToolkit = new HederaLangchainToolkit({
            client: this.client,
            configuration: {
                plugins: [coreQueriesPlugin]
            }
        });
    }

    async registerAIAgent(agentMetadata) {
        try {
            // Validate HSC-10 schema
            const { valid, errors } = validateAgentMetadata(agentMetadata);
            if (!valid) {
                throw new Error('HSC-10 validation failed: ' + errors.join(', '));
            }

            // Upload metadata to IPFS
            const ipfs = new IPFSUploader();
            const metadataHash = await ipfs.uploadJSON(agentMetadata);
            console.log(`Metadata uploaded to IPFS: ${metadataHash}`);

            // Submit registration via HCS-10
            const registryTopicId = process.env.REGISTRY_TOPIC_ID;
            if (!registryTopicId) {
                throw new Error('REGISTRY_TOPIC_ID not set in .env file');
            }

            const agentId = `${agentMetadata.inboundTopic}@${process.env.HEDERA_ACCOUNT_ID}`;
            
            const registrationMessage = {
                p: 'hcs-10',
                op: 'register',
                agent_id: agentId,
                profile_hash: metadataHash,
                inbound_topic: agentMetadata.inboundTopic,
                outbound_topic: agentMetadata.outboundTopic,
                timestamp: Date.now()
            };

            // Submit to HCS
            const submitTx = new TopicMessageSubmitTransaction()
                .setTopicId(registryTopicId)
                .setMessage(JSON.stringify(registrationMessage));

            const submitResponse = await submitTx.execute(this.client);
            const submitReceipt = await submitResponse.getReceipt(this.client);

            console.log(`Agent registered: ${agentId}`);
            console.log(`Registry message submitted to topic: ${registryTopicId}`);

            return {
                agentId,
                metadataHash,
                registryTopicId,
                sequenceNumber: submitReceipt.topicSequenceNumber.toString()
            };
        } catch (error) {
            console.error('Error registering agent:', error);
            throw error;
        }
    }

    async invokeAgent(agentId, inputData) {
        try {
            const [inboundTopic] = agentId.split('@');

            const invocationMessage = {
                p: 'hcs-10',
                op: 'invoke',
                requester: process.env.HEDERA_ACCOUNT_ID,
                data: inputData,
                timestamp: Date.now()
            };

            // Submit invocation to agent's inbound topic
            const submitTx = new TopicMessageSubmitTransaction()
                .setTopicId(inboundTopic)
                .setMessage(JSON.stringify(invocationMessage));

            const submitResponse = await submitTx.execute(this.client);
            const submitReceipt = await submitResponse.getReceipt(this.client);

            console.log(`Agent invoked: ${agentId}`);
            console.log(`Invocation submitted to topic: ${inboundTopic}`);

            return {
                status: 'submitted',
                topicId: inboundTopic,
                sequenceNumber: submitReceipt.topicSequenceNumber.toString(),
                timestamp: invocationMessage.timestamp
            };
        } catch (error) {
            console.error('Error invoking agent:', error);
            throw error;
        }
    }

    async queryAgentRegistry(registryTopicId) {
        try {
            // Use Hedera Agent Kit to query registry
            const tools = this.hederaAgentToolkit.getTools();
            const queryTool = tools.find(t => t.name.includes('query') || t.name.includes('topic'));

            if (queryTool) {
                const result = await queryTool.func({ topicId: registryTopicId });
                return result;
            }

            return { message: 'Query tool not available, use mirror node API' };
        } catch (error) {
            console.error('Error querying registry:', error);
            throw error;
        }
    }

    close() {
        this.client.close();
    }
}

module.exports = AIAgentMarketplace;
