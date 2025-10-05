const AgentProcessor = require('../agentProcessor');

/**
 * Sentiment Analysis Agent
 * Analyzes text sentiment using Groq AI
 */
class SentimentAgent extends AgentProcessor {
    constructor(config) {
        super({
            ...config,
            name: 'Sentiment Analysis Agent',
            capability: 'sentiment-analysis',
            model: 'llama-3.3-70b-versatile',
            temperature: 0.3,
            maxTokens: 512
        });
    }

    getSystemPrompt() {
        return `You are a sentiment analysis expert. Analyze the sentiment of the given text and respond in this exact JSON format:
{
  "sentiment": "POSITIVE" | "NEGATIVE" | "NEUTRAL",
  "confidence": 0.0-1.0,
  "explanation": "brief explanation",
  "emotions": ["emotion1", "emotion2"]
}`;
    }

    async callGroqAPI(userInput) {
        const chatCompletion = await this.groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: this.getSystemPrompt()
                },
                {
                    role: 'user',
                    content: `Analyze the sentiment of this text: "${userInput}"`
                }
            ],
            model: this.agentConfig.model,
            temperature: this.agentConfig.temperature,
            max_tokens: this.agentConfig.maxTokens,
        });

        const response = chatCompletion.choices[0]?.message?.content || '{}';
        
        // Try to parse JSON response
        try {
            const parsed = JSON.parse(response);
            return JSON.stringify(parsed, null, 2);
        } catch {
            return response;
        }
    }
}

module.exports = SentimentAgent;
