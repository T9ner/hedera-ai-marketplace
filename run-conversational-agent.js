const ConversationalAgent = require('./src/agents/conversationalAgent');
require('dotenv').config();

async function runConversationalAgent() {
    console.log('🤖 Starting Conversational Agent...');
    
    const agent = new ConversationalAgent({
        agentId: `${process.env.AGENT_CONVERSATIONAL_INBOUND}@${process.env.HEDERA_ACCOUNT_ID}`,
        inboundTopic: process.env.AGENT_CONVERSATIONAL_INBOUND,
        outboundTopic: process.env.AGENT_CONVERSATIONAL_OUTBOUND
    });

    console.log(`📡 Listening on topic: ${process.env.AGENT_CONVERSATIONAL_INBOUND}`);
    console.log(`📤 Responding on topic: ${process.env.AGENT_CONVERSATIONAL_OUTBOUND}`);
    console.log('💬 Ready for conversations! Send messages to start chatting.');
    
    await agent.startListening();
}

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down Conversational Agent...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Shutting down Conversational Agent...');
    process.exit(0);
});

runConversationalAgent().catch(console.error);