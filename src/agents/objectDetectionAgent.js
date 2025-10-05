const AgentProcessor = require('../agentProcessor');

/**
 * Object Detection Agent
 * Analyzes images and detects objects using Groq Vision
 */
class ObjectDetectionAgent extends AgentProcessor {
    constructor(config) {
        super({
            ...config,
            name: 'Object Detection Agent',
            capability: 'object-detection',
            model: 'llama-3.2-90b-vision-preview',
            temperature: 0.5,
            maxTokens: 1024
        });
    }

    getSystemPrompt() {
        return `You are an expert computer vision system. Analyze images and detect objects, providing detailed information in JSON format:
{
  "objects": [
    {
      "name": "object name",
      "confidence": 0.0-1.0,
      "description": "brief description"
    }
  ],
  "scene": "overall scene description",
  "count": number of objects
}`;
    }

    async callGroqAPI(userInput) {
        // Check if input contains image data (base64 or URL)
        const hasImage = userInput.includes('data:image') || userInput.includes('http');
        
        if (hasImage) {
            // Handle image input
            const chatCompletion = await this.groq.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: this.getSystemPrompt()
                    },
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'text',
                                text: 'Detect and describe all objects in this image:'
                            },
                            {
                                type: 'image_url',
                                image_url: {
                                    url: userInput
                                }
                            }
                        ]
                    }
                ],
                model: this.agentConfig.model,
                temperature: this.agentConfig.temperature,
                max_tokens: this.agentConfig.maxTokens,
            });

            return chatCompletion.choices[0]?.message?.content || 'No objects detected';
        } else {
            // Text-only fallback
            return JSON.stringify({
                error: 'No image provided',
                message: 'Please provide an image URL or base64 encoded image',
                example: 'Send image URL like: https://example.com/image.jpg'
            }, null, 2);
        }
    }

    extractInput(data) {
        // Handle different input formats for images
        if (typeof data === 'string') {
            return data;
        }
        
        // Check for common image field names
        const imageFields = ['image', 'imageUrl', 'image_url', 'photo', 'picture', 'url'];
        
        for (const field of imageFields) {
            if (data[field]) {
                return data[field];
            }
        }

        // If no image field, stringify the data
        return JSON.stringify(data);
    }
}

module.exports = ObjectDetectionAgent;
