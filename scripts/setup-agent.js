const TopicSetup = require('../src/setupAgentTopics');
require('dotenv').config();

async function setupAgent(agentName = 'New Agent') {
    console.log(`🤖 Setting up ${agentName} topics...`);
    
    const setup = new TopicSetup();
    
    try {
        const topics = await setup.createAgentTopics(agentName);
        
        console.log(`\n✅ ${agentName} topics created successfully!`);
        console.log('\n📝 Add these to your .env file:');
        console.log(`AGENT_${agentName.toUpperCase().replace(/\s+/g, '_')}_INBOUND=${topics.inboundTopicId}`);
        console.log(`AGENT_${agentName.toUpperCase().replace(/\s+/g, '_')}_OUTBOUND=${topics.outboundTopicId}`);
        
        return topics;
    } catch (error) {
        console.error(`❌ Error setting up ${agentName}:`, error);
        throw error;
    }
}

// Run the setup
if (require.main === module) {
    const agentName = process.argv[2] || 'Conversational Agent';
    setupAgent(agentName)
        .then(() => {
            console.log('\n🎉 Setup complete!');
            process.exit(0);
        })
        .catch(err => {
            console.error(err);
            process.exit(1);
        });
}

module.exports = setupAgent;