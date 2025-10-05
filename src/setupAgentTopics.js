const { Client, TopicCreateTransaction, PrivateKey } = require('@hashgraph/sdk');
require('dotenv').config();

class TopicSetup {
    constructor() {
        this.client = Client.forTestnet().setOperator(
            process.env.HEDERA_ACCOUNT_ID,
            PrivateKey.fromStringECDSA(process.env.HEDERA_PRIVATE_KEY)
        );
    }

    async createRegistryTopic() {
        console.log('Creating registry topic...');
        const transaction = new TopicCreateTransaction()
            .setTopicMemo('HSC-10 AI Agent Registry')
            .setAdminKey(this.client.operatorPublicKey)
            .setSubmitKey(this.client.operatorPublicKey);

        const txResponse = await transaction.execute(this.client);
        const receipt = await txResponse.getReceipt(this.client);
        const topicId = receipt.topicId.toString();
        
        console.log(`Registry topic created: ${topicId}`);
        return topicId;
    }

    async createAgentTopics(agentName) {
        console.log(`Creating topics for agent: ${agentName}`);
        
        // Create inbound topic (for receiving requests)
        const inboundTx = new TopicCreateTransaction()
            .setTopicMemo(`${agentName} - Inbound`)
            .setAdminKey(this.client.operatorPublicKey)
            .setSubmitKey(this.client.operatorPublicKey);

        const inboundResponse = await inboundTx.execute(this.client);
        const inboundReceipt = await inboundResponse.getReceipt(this.client);
        const inboundTopicId = inboundReceipt.topicId.toString();

        // Create outbound topic (for sending responses)
        const outboundTx = new TopicCreateTransaction()
            .setTopicMemo(`${agentName} - Outbound`)
            .setAdminKey(this.client.operatorPublicKey)
            .setSubmitKey(this.client.operatorPublicKey);

        const outboundResponse = await outboundTx.execute(this.client);
        const outboundReceipt = await outboundResponse.getReceipt(this.client);
        const outboundTopicId = outboundReceipt.topicId.toString();

        console.log(`Inbound topic: ${inboundTopicId}`);
        console.log(`Outbound topic: ${outboundTopicId}`);

        return {
            inboundTopicId,
            outboundTopicId
        };
    }

    async setupAllTopics() {
        try {
            const registryTopicId = await this.createRegistryTopic();
            
            console.log('\n=== Setup Complete ===');
            console.log(`Registry Topic ID: ${registryTopicId}`);
            console.log('\nAdd this to your .env file:');
            console.log(`REGISTRY_TOPIC_ID=${registryTopicId}`);
            
            return { registryTopicId };
        } catch (error) {
            console.error('Error setting up topics:', error);
            throw error;
        } finally {
            this.client.close();
        }
    }
}

// Run if called directly
if (require.main === module) {
    const setup = new TopicSetup();
    setup.setupAllTopics()
        .then(() => process.exit(0))
        .catch(err => {
            console.error(err);
            process.exit(1);
        });
}

module.exports = TopicSetup;
