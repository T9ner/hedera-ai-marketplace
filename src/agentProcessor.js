const Groq = require('groq-sdk');
const { Client, TopicMessageSubmitTransaction, TopicMessageQuery, PrivateKey } = require('@hashgraph/sdk');
require('dotenv').config();

class AgentProcessor {
    constructor(agentConfig) {
        this.agentConfig = agentConfig;
        
        // Initialize Groq client
        this.groq = new Groq({
            apiKey: process.env.GROQ_API_KEY
        });

        // Initialize Hedera client
        this.client = Client.forTestnet().setOperator(
            process.env.HEDERA_ACCOUNT_ID,
            PrivateKey.fromStringECDSA(process.env.HEDERA_PRIVATE_KEY)
        );

        this.isListening = false;
    }

    /**
     * Start listening to the agent's inbound topic for requests
     */
    async startListening() {
        console.log(`🎧 Agent "${this.agentConfig.name}" starting to listen...`);
        console.log(`📥 Inbound Topic: ${this.agentConfig.inboundTopic}`);
        console.log(`📤 Outbound Topic: ${this.agentConfig.outboundTopic}`);

        this.isListening = true;

        // Subscribe to inbound topic
        new TopicMessageQuery()
            .setTopicId(this.agentConfig.inboundTopic)
            .setStartTime(0)
            .subscribe(
                this.client,
                null,
                (message) => this.handleIncomingMessage(message)
            );

        console.log('✅ Listening for invocations...\n');
    }

    /**
     * Handle incoming invocation messages
     */
    async handleIncomingMessage(message) {
        try {
            const messageString = Buffer.from(message.contents).toString();
            const invocation = JSON.parse(messageString);

            // Check if it's an HSC-10 invocation
            if (invocation.p === 'hcs-10' && invocation.op === 'invoke') {
                console.log('📨 Received invocation:');
                console.log(`   From: ${invocation.requester}`);
                console.log(`   Data:`, invocation.data);
                console.log(`   Timestamp: ${new Date(invocation.timestamp).toISOString()}`);

                // Process the request
                await this.processRequest(invocation);
            }
        } catch (error) {
            console.error('❌ Error handling message:', error.message);
        }
    }

    /**
     * Process the request using Groq AI
     */
    async processRequest(invocation) {
        try {
            console.log('🤖 Processing with Groq AI...');

            // Extract the prompt/input from invocation data
            const userInput = this.extractInput(invocation.data);

            // Call Groq API based on agent capability
            const response = await this.callGroqAPI(userInput);

            console.log('✅ AI Response generated');
            console.log(`   Response: ${response.substring(0, 100)}...`);

            // Send response to outbound topic
            await this.sendResponse(invocation, response);

        } catch (error) {
            console.error('❌ Error processing request:', error.message);
            
            // Send error response
            await this.sendResponse(invocation, null, error.message);
        }
    }

    /**
     * Extract input from invocation data
     */
    extractInput(data) {
        // Handle different input formats
        if (typeof data === 'string') {
            return data;
        }
        
        // Common field names
        const inputFields = ['prompt', 'text', 'input', 'question', 'query', 'message'];
        
        for (const field of inputFields) {
            if (data[field]) {
                return data[field];
            }
        }

        // If no known field, stringify the data
        return JSON.stringify(data);
    }

    /**
     * Call Groq API based on agent type
     */
    async callGroqAPI(userInput) {
        const capability = this.agentConfig.capability || 'text-generation';

        // Build system prompt based on agent capability
        const systemPrompt = this.getSystemPrompt(capability);

        // Call Groq API
        const chatCompletion = await this.groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: systemPrompt
                },
                {
                    role: 'user',
                    content: userInput
                }
            ],
            model: this.agentConfig.model || 'llama-3.3-70b-versatile', // Groq's fast model
            temperature: this.agentConfig.temperature || 0.7,
            max_tokens: this.agentConfig.maxTokens || 1024,
        });

        return chatCompletion.choices[0]?.message?.content || 'No response generated';
    }

    /**
     * Get system prompt based on capability
     */
    getSystemPrompt(capability) {
        const prompts = {
            'text-generation': 'You are a helpful AI assistant that generates high-quality text responses.',
            'question-answering': 'You are an expert at answering questions accurately and concisely.',
            'sentiment-analysis': 'You are a sentiment analysis expert. Analyze the sentiment of the given text and respond with: POSITIVE, NEGATIVE, or NEUTRAL, followed by a brief explanation.',
            'summarization': 'You are an expert at summarizing text. Provide clear, concise summaries.',
            'code-generation': 'You are an expert programmer. Generate clean, well-documented code.',
            'translation': 'You are a professional translator. Translate text accurately while preserving meaning and tone.',
        };

        return prompts[capability] || prompts['text-generation'];
    }

    /**
     * Send response to outbound topic
     */
    async sendResponse(invocation, response, error = null) {
        try {
            const responseMessage = {
                p: 'hcs-10',
                op: 'response',
                request_id: invocation.timestamp,
                requester: invocation.requester,
                agent_id: this.agentConfig.agentId,
                success: !error,
                data: error ? null : response,
                error: error || null,
                timestamp: Date.now()
            };

            const submitTx = new TopicMessageSubmitTransaction()
                .setTopicId(this.agentConfig.outboundTopic)
                .setMessage(JSON.stringify(responseMessage));

            const submitResponse = await submitTx.execute(this.client);
            const receipt = await submitResponse.getReceipt(this.client);

            console.log('📤 Response sent to outbound topic');
            console.log(`   Sequence: ${receipt.topicSequenceNumber.toString()}`);
            console.log(`   Topic: ${this.agentConfig.outboundTopic}\n`);

        } catch (error) {
            console.error('❌ Error sending response:', error.message);
        }
    }

    /**
     * Stop listening
     */
    stop() {
        this.isListening = false;
        this.client.close();
        console.log('🛑 Agent stopped listening');
    }
}

module.exports = AgentProcessor;
