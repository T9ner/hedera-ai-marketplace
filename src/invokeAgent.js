/**
 * Client-side agent invocation utility
 * Sends HCS-10 compliant invocation messages and listens for responses
 */

const {
    Client,
    TopicMessageSubmitTransaction,
    TopicMessageQuery,
    PrivateKey
} = require('@hashgraph/sdk');

class AgentInvoker {
    constructor(accountId, privateKey) {
        this.accountId = accountId;
        this.privateKey = PrivateKey.fromStringECDSA(privateKey);
        
        this.client = Client.forTestnet();
        this.client.setOperator(this.accountId, this.privateKey);
    }

    /**
     * Create HCS-10 compliant invocation message
     */
    createInvocationMessage(agentId, capability, data) {
        return {
            hcs10: '1.0.0',
            type: 'invocation',
            agentId: agentId,
            capability: capability,
            timestamp: new Date().toISOString(),
            data: data,
            requestId: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        };
    }

    /**
     * Submit invocation to agent's inbound topic
     */
    async invokeAgent(inboundTopicId, agentId, capability, inputData) {
        try {
            const message = this.createInvocationMessage(agentId, capability, inputData);
            const messageJson = JSON.stringify(message);

            console.log(`📤 Submitting invocation to topic ${inboundTopicId}...`);
            
            const submitTx = await new TopicMessageSubmitTransaction()
                .setTopicId(inboundTopicId)
                .setMessage(messageJson)
                .execute(this.client);

            const receipt = await submitTx.getReceipt(this.client);
            
            console.log(`✅ Invocation submitted! Status: ${receipt.status.toString()}`);
            console.log(`📝 Request ID: ${message.requestId}`);

            return {
                success: true,
                requestId: message.requestId,
                sequenceNumber: receipt.topicSequenceNumber
            };
        } catch (error) {
            console.error('❌ Invocation failed:', error);
            throw error;
        }
    }

    /**
     * Listen for agent response on outbound topic
     */
    async listenForResponse(outboundTopicId, requestId, timeoutMs = 30000) {
        return new Promise((resolve, reject) => {
            let responseReceived = false;
            
            const timeout = setTimeout(() => {
                if (!responseReceived) {
                    reject(new Error('Response timeout - agent did not respond'));
                }
            }, timeoutMs);

            console.log(`👂 Listening for response on topic ${outboundTopicId}...`);

            new TopicMessageQuery()
                .setTopicId(outboundTopicId)
                .setStartTime(0)
                .subscribe(
                    this.client,
                    (message) => {
                        try {
                            const messageStr = Buffer.from(message.contents).toString();
                            const response = JSON.parse(messageStr);

                            // Check if this response matches our request
                            if (response.requestId === requestId || 
                                response.type === 'response') {
                                
                                responseReceived = true;
                                clearTimeout(timeout);
                                
                                console.log('✅ Response received!');
                                resolve(response);
                            }
                        } catch (err) {
                            // Ignore parsing errors for non-JSON messages
                        }
                    },
                    (error) => {
                        clearTimeout(timeout);
                        reject(error);
                    }
                );
        });
    }

    /**
     * Invoke agent and wait for response
     */
    async invokeAndWaitForResponse(inboundTopicId, outboundTopicId, agentId, capability, inputData, timeoutMs = 30000) {
        // Start listening before sending invocation
        const responsePromise = this.listenForResponse(outboundTopicId, null, timeoutMs);
        
        // Submit invocation
        const invocationResult = await this.invokeAgent(inboundTopicId, agentId, capability, inputData);
        
        // Wait for response
        const response = await responsePromise;
        
        return {
            invocation: invocationResult,
            response: response
        };
    }

    close() {
        this.client.close();
    }
}

module.exports = AgentInvoker;
