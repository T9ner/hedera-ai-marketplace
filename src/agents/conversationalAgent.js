const AgentProcessor = require('../agentProcessor');

/**
 * Conversational Agent
 * Advanced conversational AI agent powered by Groq for natural language understanding and generation
 */
class ConversationalAgent extends AgentProcessor {
    constructor(config) {
        super({
            ...config,
            name: 'GPT-4 Conversational Agent',
            capability: 'conversation',
            model: 'llama-3.3-70b-versatile', // Using Groq's fastest model
            temperature: 0.7, // More creative for conversations
            maxTokens: 1024 // Longer responses for conversations
        });
    }

    getSystemPrompt() {
        return `You are an advanced conversational AI assistant. You are helpful, knowledgeable, and engaging. 

Key guidelines:
- Provide thoughtful, informative responses
- Be conversational and friendly
- If asked about technical topics, provide accurate information
- If you don't know something, admit it honestly
- Keep responses concise but comprehensive
- You can discuss a wide range of topics including technology, science, arts, and general knowledge

Respond in a natural, conversational manner. Do not use JSON format unless specifically requested.`;
    }

    async callGroqAPI(userInput) {
        try {
            const chatCompletion = await this.groq.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: this.getSystemPrompt()
                    },
                    {
                        role: 'user',
                        content: userInput
                    }
                ],
                model: this.agentConfig.model,
                temperature: this.agentConfig.temperature,
                max_tokens: this.agentConfig.maxTokens,
            });

            const response = chatCompletion.choices[0]?.message?.content || 'I apologize, but I was unable to generate a response. Please try again.';
            
            // Return the response directly for natural conversation
            return response;
        } catch (error) {
            console.error('Groq API error:', error);
            return 'I apologize, but I encountered an error while processing your request. Please try again later.';
        }
    }

    // Override the process method to handle conversation context better
    async processMessage(message) {
        try {
            console.log(`[${this.agentConfig.name}] Processing message:`, message);
            
            // Extract user input from the message
            const userInput = typeof message === 'string' ? message : message.content || message.text || JSON.stringify(message);
            
            if (!userInput || userInput.trim() === '') {
                return 'Hello! I\'m ready to chat. What would you like to talk about?';
            }

            // Call Groq API for conversation
            const response = await this.callGroqAPI(userInput.trim());
            
            console.log(`[${this.agentConfig.name}] Generated response:`, response);
            return response;
            
        } catch (error) {
            console.error(`[${this.agentConfig.name}] Error processing message:`, error);
            return 'I apologize, but I encountered an error. Please try again.';
        }
    }
}

module.exports = ConversationalAgent;