const SentimentAgent = require('./src/agents/sentimentAgent');
const ObjectDetectionAgent = require('./src/agents/objectDetectionAgent');
const ConversationalAgent = require('./src/agents/conversationalAgent');
require('dotenv').config();

console.log('🚀 Starting ALL HEX AI Agents...\n');

const agents = [];

// 1. Sentiment Analysis Agent
if (process.env.AGENT_SENTIMENT_INBOUND && process.env.AGENT_SENTIMENT_OUTBOUND) {
    const sentimentAgent = new SentimentAgent({
        agentId: `${process.env.AGENT_SENTIMENT_INBOUND}@${process.env.HEDERA_ACCOUNT_ID}`,
        inboundTopic: process.env.AGENT_SENTIMENT_INBOUND,
        outboundTopic: process.env.AGENT_SENTIMENT_OUTBOUND
    });
    
    sentimentAgent.startListening().catch(console.error);
    agents.push(sentimentAgent);
    console.log('✅ Sentiment Analysis Agent started');
}

// 2. Object Detection Agent
if (process.env.AGENT_VISION_INBOUND && process.env.AGENT_VISION_OUTBOUND) {
    const visionAgent = new ObjectDetectionAgent({
        agentId: `${process.env.AGENT_VISION_INBOUND}@${process.env.HEDERA_ACCOUNT_ID}`,
        inboundTopic: process.env.AGENT_VISION_INBOUND,
        outboundTopic: process.env.AGENT_VISION_OUTBOUND
    });
    
    visionAgent.startListening().catch(console.error);
    agents.push(visionAgent);
    console.log('✅ Object Detection Agent started');
}

// 3. Conversational Agent (NEW!)
if (process.env.AGENT_CONVERSATIONAL_INBOUND && process.env.AGENT_CONVERSATIONAL_OUTBOUND) {
    const conversationalAgent = new ConversationalAgent({
        agentId: `${process.env.AGENT_CONVERSATIONAL_INBOUND}@${process.env.HEDERA_ACCOUNT_ID}`,
        inboundTopic: process.env.AGENT_CONVERSATIONAL_INBOUND,
        outboundTopic: process.env.AGENT_CONVERSATIONAL_OUTBOUND
    });
    
    conversationalAgent.startListening().catch(console.error);
    agents.push(conversationalAgent);
    console.log('✅ Conversational Agent started');
}

console.log(`\n🎉 ${agents.length} agents are now LIVE and ready!`);
console.log('\n📡 Listening Topics:');
if (process.env.AGENT_SENTIMENT_INBOUND) console.log(`   Sentiment: ${process.env.AGENT_SENTIMENT_INBOUND}`);
if (process.env.AGENT_VISION_INBOUND) console.log(`   Vision: ${process.env.AGENT_VISION_INBOUND}`);
if (process.env.AGENT_CONVERSATIONAL_INBOUND) console.log(`   Conversational: ${process.env.AGENT_CONVERSATIONAL_INBOUND}`);

console.log('\n💡 Test the agents:');
console.log('   node test-live-agent.js');
console.log('   node test-conversational-agent.js');
console.log('\n🌐 Visit the marketplace: http://localhost:3000/marketplace');
console.log('\n⏹️  Press Ctrl+C to stop all agents');

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down all agents...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Shutting down all agents...');
    process.exit(0);
});