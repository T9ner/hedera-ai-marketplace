const SentimentAgent = require('./src/agents/sentimentAgent');
const ObjectDetectionAgent = require('./src/agents/objectDetectionAgent');
const ConversationalAgent = require('./src/agents/conversationalAgent');
const AgentProcessor = require('./src/agentProcessor');
require('dotenv').config();

/**
 * Run live agents with specialized capabilities
 */

console.log('🚀 Starting Live AI Agents...\n');

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

// 3. Conversational Agent
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

// 4. General Conversational Agent (fallback)
if (process.env.AGENT_INBOUND_TOPIC && process.env.AGENT_OUTBOUND_TOPIC) {
    const generalAgent = new AgentProcessor({
        name: 'General AI Agent',
        agentId: `${process.env.AGENT_INBOUND_TOPIC}@${process.env.HEDERA_ACCOUNT_ID}`,
        inboundTopic: process.env.AGENT_INBOUND_TOPIC,
        outboundTopic: process.env.AGENT_OUTBOUND_TOPIC,
        capability: 'text-generation',
        model: 'llama-3.3-70b-versatile',
        temperature: 0.7,
        maxTokens: 1024
    });
    
    generalAgent.startListening().catch(console.error);
    agents.push(generalAgent);
    console.log('✅ General AI Agent started');
}

if (agents.length === 0) {
    console.error('❌ No agents configured. Please set topic IDs in .env');
    process.exit(1);
}

console.log(`\n✅ ${agents.length} agent(s) running!`);
console.log('💡 Press Ctrl+C to stop all agents.\n');

// Graceful shutdown
const shutdown = () => {
    console.log('\n\n🛑 Shutting down all agents...');
    agents.forEach(agent => agent.stop());
    process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
