/**
 * Setup script for creating HCS topics for live agents
 */

const { Client, TopicCreateTransaction, PrivateKey } = require('@hashgraph/sdk');
require('dotenv').config();

async function setupLiveAgents() {
    console.log('🚀 Setting up Live Agent Topics...\n');

    const accountId = process.env.HEDERA_ACCOUNT_ID;
    const privateKey = PrivateKey.fromStringECDSA(process.env.HEDERA_PRIVATE_KEY);

    if (!accountId || !privateKey) {
        console.error('❌ Missing HEDERA_ACCOUNT_ID or HEDERA_PRIVATE_KEY in .env');
        process.exit(1);
    }

    const client = Client.forTestnet();
    client.setOperator(accountId, privateKey);

    try {
        // 1. Create Sentiment Analysis Agent Topics
        console.log('📝 Creating Sentiment Analysis Agent topics...');
        
        const sentimentInboundTx = await new TopicCreateTransaction()
            .setTopicMemo('Sentiment Analysis Agent - Inbound')
            .execute(client);
        const sentimentInboundReceipt = await sentimentInboundTx.getReceipt(client);
        const sentimentInboundTopicId = sentimentInboundReceipt.topicId.toString();
        
        const sentimentOutboundTx = await new TopicCreateTransaction()
            .setTopicMemo('Sentiment Analysis Agent - Outbound')
            .execute(client);
        const sentimentOutboundReceipt = await sentimentOutboundTx.getReceipt(client);
        const sentimentOutboundTopicId = sentimentOutboundReceipt.topicId.toString();
        
        console.log(`✅ Sentiment Agent Inbound Topic: ${sentimentInboundTopicId}`);
        console.log(`✅ Sentiment Agent Outbound Topic: ${sentimentOutboundTopicId}\n`);

        // 2. Create Object Detection Agent Topics
        console.log('📝 Creating Object Detection Agent topics...');
        
        const visionInboundTx = await new TopicCreateTransaction()
            .setTopicMemo('Object Detection Agent - Inbound')
            .execute(client);
        const visionInboundReceipt = await visionInboundTx.getReceipt(client);
        const visionInboundTopicId = visionInboundReceipt.topicId.toString();
        
        const visionOutboundTx = await new TopicCreateTransaction()
            .setTopicMemo('Object Detection Agent - Outbound')
            .execute(client);
        const visionOutboundReceipt = await visionOutboundTx.getReceipt(client);
        const visionOutboundTopicId = visionOutboundReceipt.topicId.toString();
        
        console.log(`✅ Vision Agent Inbound Topic: ${visionInboundTopicId}`);
        console.log(`✅ Vision Agent Outbound Topic: ${visionOutboundTopicId}\n`);

        // Print .env configuration
        console.log('📋 Add these to your .env file:\n');
        console.log(`AGENT_SENTIMENT_INBOUND=${sentimentInboundTopicId}`);
        console.log(`AGENT_SENTIMENT_OUTBOUND=${sentimentOutboundTopicId}`);
        console.log(`AGENT_VISION_INBOUND=${visionInboundTopicId}`);
        console.log(`AGENT_VISION_OUTBOUND=${visionOutboundTopicId}\n`);

        console.log('📋 For React frontend, also add (with REACT_APP_ prefix):\n');
        console.log(`REACT_APP_HEDERA_ACCOUNT_ID=${accountId}`);
        console.log(`REACT_APP_AGENT_SENTIMENT_INBOUND=${sentimentInboundTopicId}`);
        console.log(`REACT_APP_AGENT_SENTIMENT_OUTBOUND=${sentimentOutboundTopicId}`);
        console.log(`REACT_APP_AGENT_VISION_INBOUND=${visionInboundTopicId}`);
        console.log(`REACT_APP_AGENT_VISION_OUTBOUND=${visionOutboundTopicId}\n`);

        console.log('✅ Setup complete! Now run: npm run run-live-agents');

    } catch (error) {
        console.error('❌ Error setting up topics:', error);
    } finally {
        client.close();
    }
}

setupLiveAgents();
