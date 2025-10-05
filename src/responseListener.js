const { Client, TopicMessageQuery } = require('@hashgraph/sdk');
require('dotenv').config();

/**
 * Listen to agent outbound topics for responses
 * This can be used by the frontend to get real-time responses
 */
class ResponseListener {
    constructor() {
        this.client = Client.forTestnet().setOperator(
            process.env.HEDERA_ACCOUNT_ID,
            process.env.HEDERA_PRIVATE_KEY
        );
        this.subscriptions = new Map();
    }

    /**
     * Subscribe to an agent's outbound topic
     */
    subscribeToAgent(agentId, outboundTopic, callback) {
        console.log(`🎧 Subscribing to agent: ${agentId}`);
        console.log(`   Outbound Topic: ${outboundTopic}`);

        const subscription = new TopicMessageQuery()
            .setTopicId(outboundTopic)
            .setStartTime(0)
            .subscribe(
                this.client,
                null,
                (message) => {
                    try {
                        const messageString = Buffer.from(message.contents).toString();
                        const response = JSON.parse(messageString);

                        if (response.p === 'hcs-10' && response.op === 'response') {
                            console.log(`\n📨 Response from ${agentId}:`);
                            console.log(`   Request ID: ${response.request_id}`);
                            console.log(`   Success: ${response.success}`);
                            
                            if (response.success) {
                                console.log(`   Data: ${response.data.substring(0, 100)}...`);
                            } else {
                                console.log(`   Error: ${response.error}`);
                            }

                            // Call the callback with the response
                            callback(response);
                        }
                    } catch (error) {
                        console.error('❌ Error parsing response:', error.message);
                    }
                }
            );

        this.subscriptions.set(agentId, subscription);
        console.log('✅ Subscribed successfully\n');
    }

    /**
     * Unsubscribe from an agent
     */
    unsubscribe(agentId) {
        const subscription = this.subscriptions.get(agentId);
        if (subscription) {
            subscription.unsubscribe();
            this.subscriptions.delete(agentId);
            console.log(`🛑 Unsubscribed from ${agentId}`);
        }
    }

    /**
     * Unsubscribe from all agents
     */
    unsubscribeAll() {
        this.subscriptions.forEach((subscription, agentId) => {
            subscription.unsubscribe();
            console.log(`🛑 Unsubscribed from ${agentId}`);
        });
        this.subscriptions.clear();
    }

    /**
     * Close the client
     */
    close() {
        this.unsubscribeAll();
        this.client.close();
        console.log('🛑 Response listener closed');
    }
}

module.exports = ResponseListener;
