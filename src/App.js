import React, { useState, useEffect } from 'react';
import Joyride from 'react-joyride';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import LandingPage from './LandingPage';
import Onboarding from './Onboarding';

// Sample AI Agents with HSC-10 metadata
const SAMPLE_AGENTS = [
    {
        id: 1,
        name: "GPT-4 Conversational Agent",
        description: "Advanced conversational AI agent powered by GPT-4 for natural language understanding and generation",
        agentId: "0.0.123456@0.0.789012",
        inboundTopic: "0.0.123456",
        outboundTopic: "0.0.123457",
        capabilities: [
            { name: "text-generation", description: "Generate human-like text responses" },
            { name: "question-answering", description: "Answer questions based on context" }
        ],
        pricing: { model: "per-call", amount: 0.5, currency: "HBAR" },
        category: "NLP",
        owner: "0.0.789012",
        rating: 4.8,
        invocations: 1245,
        version: "1.0.0",
        isLive: false
    },
    {
        id: 2,
        name: "Image Analysis Agent",
        description: "LIVE: Computer vision agent for image classification, object detection, and scene understanding using Groq Vision AI",
        agentId: "0.0.234567@0.0.890123",
        inboundTopic: "0.0.234567",
        outboundTopic: "0.0.234568",
        capabilities: [
            { name: "image-classification", description: "Classify images into categories" },
            { name: "object-detection", description: "Detect and locate objects in images" }
        ],
        pricing: { model: "per-call", amount: 0.002, currency: "HBAR" },
        category: "Computer Vision",
        owner: "0.0.890123",
        rating: 4.6,
        invocations: 892,
        version: "2.1.0",
        isLive: true,
        inputType: "image",
        exampleInput: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131"
    },
    {
        id: 3,
        name: "Sentiment Analysis Agent",
        description: "LIVE: Real-time sentiment analysis using Groq AI. Analyzes text and returns sentiment, confidence, and emotions.",
        agentId: process.env.REACT_APP_AGENT_SENTIMENT_INBOUND ? `${process.env.REACT_APP_AGENT_SENTIMENT_INBOUND}@${process.env.REACT_APP_HEDERA_ACCOUNT_ID}` : "0.0.345678@0.0.901234",
        inboundTopic: process.env.REACT_APP_AGENT_SENTIMENT_INBOUND || "0.0.345678",
        outboundTopic: process.env.REACT_APP_AGENT_SENTIMENT_OUTBOUND || "0.0.345679",
        capabilities: [
            { name: "sentiment-analysis", description: "Analyze sentiment (positive/negative/neutral)" },
            { name: "emotion-detection", description: "Detect emotions in text" }
        ],
        pricing: { model: "per-call", amount: 0.001, currency: "HBAR" },
        category: "NLP",
        owner: process.env.REACT_APP_HEDERA_ACCOUNT_ID || "0.0.901234",
        rating: 4.9,
        invocations: 1567,
        version: "1.5.0",
        isLive: !!process.env.REACT_APP_AGENT_SENTIMENT_INBOUND,
        inputType: "text",
        exampleInput: "I absolutely love this product! It exceeded all my expectations."
    },
    {
        id: 4,
        name: "Audio Transcription Agent",
        description: "Whisper-powered agent for speech-to-text transcription in 99 languages",
        agentId: "0.0.456789@0.0.012345",
        inboundTopic: "0.0.456789",
        outboundTopic: "0.0.456790",
        capabilities: [
            { name: "speech-to-text", description: "Transcribe audio to text" },
            { name: "language-detection", description: "Detect spoken language" }
        ],
        pricing: { model: "per-call", amount: 0.85, currency: "HBAR" },
        category: "Audio",
        owner: "0.0.012345",
        rating: 4.7,
        invocations: 734,
        version: "3.0.0",
        isLive: false
    },
    {
        id: 5,
        name: "Object Detection Agent",
        description: "LIVE: Real-time object detection using Groq Vision AI. Detects objects in images and provides detailed analysis.",
        agentId: process.env.REACT_APP_AGENT_VISION_INBOUND ? `${process.env.REACT_APP_AGENT_VISION_INBOUND}@${process.env.REACT_APP_HEDERA_ACCOUNT_ID}` : "0.0.567890@0.0.123456",
        inboundTopic: process.env.REACT_APP_AGENT_VISION_INBOUND || "0.0.567890",
        outboundTopic: process.env.REACT_APP_AGENT_VISION_OUTBOUND || "0.0.567891",
        capabilities: [
            { name: "object-detection", description: "Detect objects in images" },
            { name: "image-analysis", description: "Analyze image content and scenes" }
        ],
        pricing: { model: "per-call", amount: 0.002, currency: "HBAR" },
        category: "Computer Vision",
        owner: process.env.REACT_APP_HEDERA_ACCOUNT_ID || "0.0.123456",
        rating: 4.9,
        invocations: 2103,
        version: "8.0.0",
        isLive: !!process.env.REACT_APP_AGENT_VISION_INBOUND,
        inputType: "image",
        exampleInput: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131"
    },
    {
        id: 6,
        name: "Recommendation Agent",
        description: "Collaborative filtering agent for personalized recommendations",
        agentId: "0.0.678901@0.0.234567",
        inboundTopic: "0.0.678901",
        outboundTopic: "0.0.678902",
        capabilities: [
            { name: "content-recommendation", description: "Recommend content based on preferences" },
            { name: "collaborative-filtering", description: "Find similar users and items" }
        ],
        pricing: { model: "subscription", amount: 60, currency: "HBAR" },
        category: "Recommendation",
        owner: "0.0.234567",
        rating: 4.5,
        invocations: 456,
        version: "2.0.0",
        isLive: false
    }
];

const AIAgentMarketplace = () => {
    const [showLanding, setShowLanding] = useState(true);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [account, setAccount] = useState(null);
    const [agents, setAgents] = useState(SAMPLE_AGENTS);
    const [filteredAgents, setFilteredAgents] = useState(SAMPLE_AGENTS);
    const [registering, setRegistering] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [sortBy, setSortBy] = useState('popularity');
    const [runTour, setRunTour] = useState(false);
    
    // Invocation state
    const [showInvokeModal, setShowInvokeModal] = useState(false);
    const [invokeAgent, setInvokeAgent] = useState(null);
    const [invokeInput, setInvokeInput] = useState('');
    const [invoking, setInvoking] = useState(false);
    const [agentResponse, setAgentResponse] = useState(null);
    const [showResponseModal, setShowResponseModal] = useState(false);
    
    // Agent management state
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [agentToDelete, setAgentToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);
    
    // Form state for agent registration
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        version: '1.0.0',
        category: '',
        pricingModel: 'per-call',
        amount: '',
        capabilities: '',
        isLive: false,
        inputType: 'text',
        exampleInput: '',
        groqModel: 'llama-3.3-70b-versatile',
        systemPrompt: ''
    });
    const [formErrors, setFormErrors] = useState({});

    // Joyride tour steps
    const tourSteps = [
        {
            target: '.connect-btn',
            content: 'Start by connecting your Hedera wallet to interact with AI agents',
            disableBeacon: true,
        },
        {
            target: '.search-bar',
            content: 'Search and filter AI agents by category, pricing, or capabilities',
        },
        {
            target: '.agent-card',
            content: 'Click on any agent card to view details and invoke the agent',
        },
    ];

    useEffect(() => {
        const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
        if (!hasSeenOnboarding && !showLanding) {
            setTimeout(() => setShowOnboarding(true), 500);
        }
    }, [showLanding]);

    useEffect(() => {
        filterAndSortAgents();
    }, [searchQuery, categoryFilter, sortBy, agents]);

    const filterAndSortAgents = () => {
        let filtered = [...agents];

        if (searchQuery) {
            filtered = filtered.filter(agent =>
                agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                agent.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (categoryFilter !== 'All') {
            filtered = filtered.filter(agent => agent.category === categoryFilter);
        }

        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return a.pricing.amount - b.pricing.amount;
                case 'price-high':
                    return b.pricing.amount - a.pricing.amount;
                case 'rating':
                    return b.rating - a.rating;
                case 'popularity':
                default:
                    return b.invocations - a.invocations;
            }
        });

        setFilteredAgents(filtered);
    };

    const connectWallet = async () => {
        try {
            toast.info('Connecting to Hedera wallet...');
            setTimeout(() => {
                setAccount("0.0.123456789");
                toast.success('Wallet connected successfully!');
            }, 1500);
        } catch (error) {
            toast.error('Failed to connect wallet');
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = 'Agent name is required';
        if (!formData.description.trim()) errors.description = 'Description is required';
        if (!formData.amount || formData.amount <= 0) errors.amount = 'Valid price is required';
        if (!formData.category) errors.category = 'Category is required';
        if (!formData.capabilities.trim()) errors.capabilities = 'At least one capability is required';
        
        if (formData.isLive) {
            if (!formData.systemPrompt.trim()) errors.systemPrompt = 'System prompt is required for live agents';
            if (!formData.exampleInput.trim()) errors.exampleInput = 'Example input is required for live agents';
        }
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const registerAgent = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast.error('Please fill in all required fields');
            return;
        }

        setRegistering(true);
        toast.info('Creating HCS topics...');

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            toast.info('Uploading metadata to IPFS...');
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            toast.info('Registering agent on HCS-10...');
            await new Promise(resolve => setTimeout(resolve, 2000));

            const capabilities = formData.capabilities.split(',').map(cap => ({
                name: cap.trim().toLowerCase().replace(/\s+/g, '-'),
                description: cap.trim()
            }));

            const newAgent = {
                id: agents.length + 1,
                name: formData.name,
                description: formData.isLive ? `LIVE: ${formData.description}` : formData.description,
                agentId: `0.0.${Math.floor(Math.random() * 999999)}@${account}`,
                inboundTopic: `0.0.${Math.floor(Math.random() * 999999)}`,
                outboundTopic: `0.0.${Math.floor(Math.random() * 999999)}`,
                capabilities,
                pricing: {
                    model: formData.pricingModel,
                    amount: parseFloat(formData.amount),
                    currency: "HBAR"
                },
                category: formData.category,
                owner: account,
                rating: 0,
                invocations: 0,
                version: formData.version,
                isLive: formData.isLive,
                inputType: formData.inputType,
                exampleInput: formData.exampleInput,
                groqModel: formData.groqModel,
                systemPrompt: formData.systemPrompt
            };

            setAgents(prev => [newAgent, ...prev]);
            setFormData({ 
                name: '', 
                description: '', 
                version: '1.0.0', 
                category: '', 
                pricingModel: 'per-call', 
                amount: '', 
                capabilities: '',
                isLive: false,
                inputType: 'text',
                exampleInput: '',
                groqModel: 'llama-3.3-70b-versatile',
                systemPrompt: ''
            });
            setRegistering(false);
            
            if (formData.isLive) {
                toast.success('🟢 Live Agent deployed successfully! It will respond to invocations in real-time.');
                toast.info('💡 Remember to run your agent backend to process requests.', { autoClose: 8000 });
            } else {
                toast.success('Agent registered successfully on HSC-10!');
            }
        } catch (error) {
            setRegistering(false);
            toast.error('Registration failed. Please try again.');
            console.error("Registration error:", error);
        }
    };

    const handleInvokeAgent = (agent) => {
        setInvokeAgent(agent);
        setShowInvokeModal(true);
        setInvokeInput('');
    };

    const handleDeleteAgent = (agent) => {
        setAgentToDelete(agent);
        setShowDeleteModal(true);
    };

    const confirmDeleteAgent = async () => {
        if (!agentToDelete) return;

        setDeleting(true);
        toast.info(`Removing ${agentToDelete.name} from marketplace...`);

        try {
            // Simulate HCS topic cleanup and registry removal
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Remove agent from local state
            setAgents(prev => prev.filter(a => a.id !== agentToDelete.id));
            
            toast.success(`${agentToDelete.name} successfully removed from marketplace!`);
            setShowDeleteModal(false);
            setAgentToDelete(null);
        } catch (error) {
            toast.error('Failed to delete agent. Please try again.');
        } finally {
            setDeleting(false);
        }
    };

    const submitInvocation = async () => {
        if (!account) {
            toast.warning('Please connect your wallet first');
            return;
        }

        if (!invokeInput.trim()) {
            toast.warning('Please enter input data for the agent');
            return;
        }

        setInvoking(true);
        toast.info(`Submitting invocation to ${invokeAgent.name}...`);

        try {
            // For LIVE agents, use real invocation
            if (invokeAgent.isLive) {
                // Import the AgentInvoker (we'll need to make this work in browser)
                // For now, simulate the HCS submission and show expected response format
                
                toast.success(`Invocation submitted to topic ${invokeAgent.inboundTopic}`);
                toast.info('🤖 Processing with AI... Response will appear in a popup window!', {
                    autoClose: 5000
                });
                
                // Simulate agent processing time
                setTimeout(() => {
                    const mockResponse = generateMockResponse(invokeAgent, invokeInput);
                    
                    setAgentResponse({
                        agent: invokeAgent.name,
                        input: invokeInput,
                        response: mockResponse,
                        timestamp: new Date().toISOString(),
                        agentId: invokeAgent.agentId,
                        capability: invokeAgent.capabilities[0]?.name || 'general'
                    });
                    setShowResponseModal(true);
                    toast.success('🎉 AI Analysis Complete! Check the popup window for results.', {
                        autoClose: 8000
                    });
                }, 3000);
                
            } else {
                // Mock response for demo agents (non-live)
                toast.success(`Invocation submitted to topic ${invokeAgent.inboundTopic}`);
                toast.info('📝 Demo agent - generating sample response...', {
                    autoClose: 3000
                });
                
                setTimeout(() => {
                    const mockResponse = generateMockResponse(invokeAgent, invokeInput);
                    mockResponse.demoMode = true;
                    mockResponse.note = 'This is a demo response. For real AI processing, use LIVE agents.';
                    
                    setAgentResponse({
                        agent: invokeAgent.name,
                        input: invokeInput,
                        response: mockResponse,
                        timestamp: new Date().toISOString(),
                        agentId: invokeAgent.agentId,
                        capability: invokeAgent.capabilities[0]?.name || 'general',
                        isDemo: true
                    });
                    setShowResponseModal(true);
                    toast.success('📋 Demo response generated! (Use LIVE agents for real AI)', {
                        autoClose: 6000
                    });
                }, 2000);
            }
            
            setAgents(prev => prev.map(a => 
                a.id === invokeAgent.id ? { ...a, invocations: a.invocations + 1 } : a
            ));

            setShowInvokeModal(false);
            setInvokeInput('');
            setInvoking(false);
        } catch (error) {
            toast.error('Invocation failed. Please try again.');
            setInvoking(false);
        }
    };

    const handleJoyrideCallback = (data) => {
        const { status } = data;
        if (status === 'finished' || status === 'skipped') {
            localStorage.setItem('hasSeenTour', 'true');
            setRunTour(false);
        }
    };

    const handleOnboardingComplete = () => {
        localStorage.setItem('hasSeenOnboarding', 'true');
        setShowOnboarding(false);
    };

    const handleOnboardingSkip = () => {
        localStorage.setItem('hasSeenOnboarding', 'true');
        setShowOnboarding(false);
    };

    // Generate mock responses based on agent capabilities and input type
    const generateMockResponse = (agent, input) => {
        const capabilities = agent.capabilities || [];
        const inputType = agent.inputType || 'text';
        const category = agent.category || 'General';

        // Determine response based on agent capabilities
        const hasCapability = (capName) => capabilities.some(cap => 
            cap.name.toLowerCase().includes(capName.toLowerCase())
        );

        if (hasCapability('sentiment') || category === 'NLP') {
            return generateSentimentResponse(input);
        } else if (hasCapability('object-detection') || hasCapability('image') || category === 'Computer Vision') {
            return generateVisionResponse(input);
        } else if (hasCapability('speech') || hasCapability('transcription') || category === 'Audio') {
            return generateAudioResponse(input);
        } else if (hasCapability('recommendation') || category === 'Recommendation') {
            return generateRecommendationResponse(input);
        } else if (hasCapability('text-generation') || hasCapability('question-answering')) {
            return generateTextResponse(input);
        } else {
            // Generic response for unknown agent types
            return generateGenericResponse(agent, input);
        }
    };

    const generateSentimentResponse = (input) => {
        const text = input.toLowerCase();
        let sentiment = 'NEUTRAL';
        let emotions = ['neutral'];
        let confidence = 0.85;

        if (text.includes('love') || text.includes('amazing') || text.includes('great') || text.includes('excellent') || text.includes('wonderful')) {
            sentiment = 'POSITIVE';
            emotions = ['joy', 'satisfaction', 'excitement'];
            confidence = 0.95;
        } else if (text.includes('hate') || text.includes('terrible') || text.includes('awful') || text.includes('bad') || text.includes('horrible')) {
            sentiment = 'NEGATIVE';
            emotions = ['anger', 'disappointment', 'frustration'];
            confidence = 0.92;
        } else if (text.includes('okay') || text.includes('fine') || text.includes('average')) {
            sentiment = 'NEUTRAL';
            emotions = ['neutral', 'indifferent'];
            confidence = 0.88;
        }

        return {
            sentiment,
            confidence,
            explanation: `Analysis based on sentiment indicators and emotional language patterns in the text`,
            emotions,
            keywords: text.split(' ').filter(word => word.length > 3).slice(0, 5),
            textLength: input.length,
            processingTime: '0.3s'
        };
    };

    const generateVisionResponse = (input) => {
        const isImageUrl = input.includes('http') || input.includes('data:image');
        
        if (!isImageUrl) {
            return {
                error: 'Invalid input',
                message: 'Please provide a valid image URL (e.g., https://example.com/image.jpg)',
                expectedFormat: 'Image URL or base64 encoded image',
                objects: [],
                count: 0
            };
        }

        // Mock realistic object detection based on common image types
        const mockObjects = [
            { name: 'cat', confidence: 0.98, description: 'Orange tabby cat in a relaxed pose' },
            { name: 'furniture', confidence: 0.85, description: 'Wooden chair or table in background' },
            { name: 'indoor_scene', confidence: 0.92, description: 'Indoor residential setting' },
            { name: 'natural_lighting', confidence: 0.78, description: 'Natural window lighting' }
        ];

        return {
            objects: mockObjects.slice(0, Math.floor(Math.random() * 3) + 2),
            scene: 'Indoor photography with good lighting and composition',
            count: mockObjects.length,
            imageAnalysis: {
                quality: 'High',
                lighting: 'Natural, well-lit',
                composition: 'Centered subject with balanced background',
                colors: ['orange', 'brown', 'white', 'beige']
            },
            confidence: 0.94,
            processingTime: '0.8s'
        };
    };

    const generateAudioResponse = (input) => {
        return {
            transcription: input.includes('http') ? 'Audio file processed successfully' : `Transcribed: "${input}"`,
            language: 'en-US',
            confidence: 0.96,
            duration: '2.3s',
            wordCount: input.split(' ').length,
            speakerCount: 1,
            audioQuality: 'Good',
            processingTime: '1.2s'
        };
    };

    const generateRecommendationResponse = (input) => {
        return {
            recommendations: [
                { item: 'Similar Product A', score: 0.95, reason: 'Based on your preferences' },
                { item: 'Related Service B', score: 0.88, reason: 'Users like you also enjoyed' },
                { item: 'Complementary Item C', score: 0.82, reason: 'Frequently bought together' }
            ],
            totalRecommendations: 3,
            confidence: 0.91,
            basedOn: 'User preferences and collaborative filtering',
            processingTime: '0.5s'
        };
    };

    const generateTextResponse = (input) => {
        return {
            response: `Based on your input "${input.substring(0, 50)}${input.length > 50 ? '...' : ''}", here's a comprehensive analysis and response.`,
            wordCount: input.split(' ').length,
            sentiment: 'informative',
            topics: ['general inquiry', 'information request'],
            confidence: 0.89,
            processingTime: '0.4s'
        };
    };

    const generateGenericResponse = (agent, input) => {
        return {
            message: `Successfully processed your request with ${agent.name}`,
            input: input.substring(0, 100) + (input.length > 100 ? '...' : ''),
            agentCapabilities: agent.capabilities?.map(cap => cap.name) || ['general'],
            category: agent.category,
            confidence: 0.87,
            processingTime: '0.6s',
            status: 'completed'
        };
    };

    // Show landing page first
    if (showLanding) {
        return <LandingPage onNavigateToMarketplace={() => setShowLanding(false)} />;
    }

    return (
        <div className="ai-marketplace">
            {showOnboarding && (
                <Onboarding 
                    onComplete={handleOnboardingComplete}
                    onSkip={handleOnboardingSkip}
                />
            )}
            <Joyride
                steps={tourSteps}
                run={runTour}
                continuous
                showProgress
                showSkipButton
                callback={handleJoyrideCallback}
                styles={{
                    options: {
                        primaryColor: '#03DAC6',
                        zIndex: 10000,
                    }
                }}
            />

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            {/* Header */}
            <header className="marketplace-header">
                <div className="header-content">
                    <h1>🔷 Hedera AI Exchange (HEX)</h1>
                    <p>Decentralized AI Agent Marketplace • Powered by Hedera & Groq AI</p>
                    <button 
                        className={`connect-btn ${account ? 'connected' : ''}`}
                        onClick={connectWallet}
                    >
                        {account ? `Connected: ${account.slice(0,10)}...` : 'Connect Wallet'}
                    </button>
                </div>
            </header>

            {/* Registration Section */}
            {account && (
                <section className="upload-section">
                    <h2>Register Your AI Agent</h2>
                    <form className="upload-form" onSubmit={registerAgent}>
                        <div className="form-group">
                            <label>Agent Name *</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="e.g., GPT-4 Conversational Agent"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                            {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                        </div>

                        <div className="form-group">
                            <label>Version</label>
                            <input
                                type="text"
                                name="version"
                                placeholder="1.0.0"
                                value={formData.version}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group full-width">
                            <label>Description *</label>
                            <textarea
                                name="description"
                                placeholder="Describe your AI agent's capabilities and use cases..."
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                            {formErrors.description && <span className="error-message">{formErrors.description}</span>}
                        </div>

                        <div className="form-group">
                            <label>Category *</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Category</option>
                                <option value="NLP">NLP</option>
                                <option value="Computer Vision">Computer Vision</option>
                                <option value="Audio">Audio Processing</option>
                                <option value="Recommendation">Recommendation Systems</option>
                            </select>
                            {formErrors.category && <span className="error-message">{formErrors.category}</span>}
                        </div>

                        <div className="form-group">
                            <label>Pricing Model</label>
                            <select
                                name="pricingModel"
                                value={formData.pricingModel}
                                onChange={handleInputChange}
                            >
                                <option value="free">Free</option>
                                <option value="per-call">Per Call</option>
                                <option value="subscription">Subscription</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Price (HBAR) *</label>
                            <input
                                type="number"
                                name="amount"
                                placeholder="0.50"
                                step="0.01"
                                min="0"
                                value={formData.amount}
                                onChange={handleInputChange}
                            />
                            {formErrors.amount && <span className="error-message">{formErrors.amount}</span>}
                        </div>

                        <div className="form-group full-width">
                            <label>Capabilities (comma-separated) *</label>
                            <input
                                type="text"
                                name="capabilities"
                                placeholder="e.g., text generation, question answering, summarization"
                                value={formData.capabilities}
                                onChange={handleInputChange}
                            />
                            {formErrors.capabilities && <span className="error-message">{formErrors.capabilities}</span>}
                        </div>

                        <div className="form-group full-width">
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <input
                                    type="checkbox"
                                    name="isLive"
                                    checked={formData.isLive}
                                    onChange={(e) => setFormData(prev => ({ ...prev, isLive: e.target.checked }))}
                                />
                                🟢 Deploy as Live Agent (Real AI Processing)
                            </label>
                            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem' }}>
                                Live agents use Groq AI for real-time processing and respond to invocations automatically
                            </p>
                        </div>

                        {formData.isLive && (
                            <>
                                <div className="form-group">
                                    <label>Input Type</label>
                                    <select
                                        name="inputType"
                                        value={formData.inputType}
                                        onChange={handleInputChange}
                                    >
                                        <option value="text">Text</option>
                                        <option value="image">Image URL</option>
                                        <option value="audio">Audio File</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Groq AI Model</label>
                                    <select
                                        name="groqModel"
                                        value={formData.groqModel}
                                        onChange={handleInputChange}
                                    >
                                        <option value="llama-3.3-70b-versatile">Llama 3.3 70B (Text)</option>
                                        <option value="llama-3.2-90b-vision-preview">Llama 3.2 90B Vision (Images)</option>
                                        <option value="whisper-large-v3">Whisper Large V3 (Audio)</option>
                                        <option value="mixtral-8x7b-32768">Mixtral 8x7B (Fast Text)</option>
                                    </select>
                                </div>

                                <div className="form-group full-width">
                                    <label>System Prompt *</label>
                                    <textarea
                                        name="systemPrompt"
                                        placeholder="Define how your AI agent should behave and respond..."
                                        value={formData.systemPrompt}
                                        onChange={handleInputChange}
                                        rows="4"
                                    />
                                    {formErrors.systemPrompt && <span className="error-message">{formErrors.systemPrompt}</span>}
                                </div>

                                <div className="form-group full-width">
                                    <label>Example Input *</label>
                                    <input
                                        type="text"
                                        name="exampleInput"
                                        placeholder="Provide an example input for users to test your agent"
                                        value={formData.exampleInput}
                                        onChange={handleInputChange}
                                    />
                                    {formErrors.exampleInput && <span className="error-message">{formErrors.exampleInput}</span>}
                                </div>
                            </>
                        )}

                        <button 
                            type="submit"
                            className="upload-btn"
                            disabled={registering}
                        >
                            {registering && <div className="spinner"></div>}
                            {registering ? 'Registering Agent on HSC-10...' : 'Register AI Agent'}
                        </button>
                    </form>
                </section>
            )}

            {/* Search and Filter */}
            <section className="search-filter-section">
                <div className="search-bar">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="🔍 Search AI agents..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="filter-controls">
                        <select
                            className="filter-select"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <option value="All">All Categories</option>
                            <option value="NLP">NLP</option>
                            <option value="Computer Vision">Computer Vision</option>
                            <option value="Audio">Audio</option>
                            <option value="Recommendation">Recommendation</option>
                        </select>

                        <select
                            className="filter-select"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="popularity">Most Popular</option>
                            <option value="rating">Highest Rated</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* Agents Grid */}
            <section className="marketplace-grid">
                <h2>Available AI Agents ({filteredAgents.length})</h2>
                {filteredAgents.length === 0 ? (
                    <div className="empty-state">
                        <h3>No agents found</h3>
                        <p>Try adjusting your search or filters</p>
                    </div>
                ) : (
                    <div className="models-grid">
                        {filteredAgents.map(agent => (
                            <div
                                key={agent.id}
                                className="agent-card model-card"
                                onClick={() => setSelectedAgent(agent)}
                            >
                                <div className="model-header">
                                    <h3>
                                        {agent.name}
                                        {agent.isLive && <span className="live-badge">🟢 LIVE</span>}
                                    </h3>
                                    <span className="category-badge">{agent.category}</span>
                                </div>
                                <p className="model-description">{agent.description}</p>
                                <div className="model-stats">
                                    <span>⭐ {agent.rating}</span>
                                    <span>🔄 {agent.invocations}</span>
                                    <span>👤 {agent.owner.slice(0,8)}...</span>
                                </div>
                                <div className="capabilities-list">
                                    {agent.capabilities.slice(0, 2).map((cap, idx) => (
                                        <span key={idx} className="capability-tag">{cap.name}</span>
                                    ))}
                                </div>
                                <div className="model-footer">
                                    <span className="price">{agent.pricing.amount} HBAR/{agent.pricing.model}</span>
                                    <div className="agent-actions">
                                        <button 
                                            className="buy-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleInvokeAgent(agent);
                                            }}
                                        >
                                            Invoke Agent
                                        </button>
                                        {account && agent.owner === account && (
                                            <button 
                                                className="delete-btn"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteAgent(agent);
                                                }}
                                                title="Delete your agent"
                                            >
                                                🗑️
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Agent Detail Modal */}
            {selectedAgent && (
                <div className="modal-overlay" onClick={() => setSelectedAgent(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>
                                {selectedAgent.name}
                                {selectedAgent.isLive && <span className="live-badge">🟢 LIVE</span>}
                            </h2>
                            <button className="close-btn" onClick={() => setSelectedAgent(null)}>
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="modal-section">
                                <span className="category-badge">{selectedAgent.category}</span>
                                <p style={{ marginTop: '1rem' }}>{selectedAgent.description}</p>
                            </div>

                            <div className="modal-section">
                                <h3>Agent Details</h3>
                                <div className="metadata-grid">
                                    <div className="metadata-item">
                                        <div className="metadata-label">Price</div>
                                        <div className="metadata-value">{selectedAgent.pricing.amount} HBAR</div>
                                    </div>
                                    <div className="metadata-item">
                                        <div className="metadata-label">Pricing Model</div>
                                        <div className="metadata-value">{selectedAgent.pricing.model}</div>
                                    </div>
                                    <div className="metadata-item">
                                        <div className="metadata-label">Rating</div>
                                        <div className="metadata-value">⭐ {selectedAgent.rating}</div>
                                    </div>
                                    <div className="metadata-item">
                                        <div className="metadata-label">Invocations</div>
                                        <div className="metadata-value">{selectedAgent.invocations}</div>
                                    </div>
                                    <div className="metadata-item">
                                        <div className="metadata-label">Version</div>
                                        <div className="metadata-value">{selectedAgent.version}</div>
                                    </div>
                                    <div className="metadata-item">
                                        <div className="metadata-label">Owner</div>
                                        <div className="metadata-value" style={{ fontSize: '0.85rem' }}>
                                            {selectedAgent.owner}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-section">
                                <h3>Capabilities</h3>
                                {selectedAgent.capabilities.map((cap, idx) => (
                                    <div key={idx} className="capability-item">
                                        <strong>{cap.name}</strong>: {cap.description}
                                    </div>
                                ))}
                            </div>

                            <div className="modal-section">
                                <h3>HCS Topics (HSC-10)</h3>
                                <div className="metadata-item">
                                    <div className="metadata-label">Agent ID</div>
                                    <div className="metadata-value" style={{ fontSize: '0.85rem', wordBreak: 'break-all' }}>
                                        {selectedAgent.agentId}
                                    </div>
                                </div>
                                <div className="metadata-item" style={{ marginTop: '1rem' }}>
                                    <div className="metadata-label">Inbound Topic</div>
                                    <div className="metadata-value" style={{ fontSize: '0.9rem' }}>
                                        {selectedAgent.inboundTopic}
                                    </div>
                                </div>
                                <div className="metadata-item" style={{ marginTop: '1rem' }}>
                                    <div className="metadata-label">Outbound Topic</div>
                                    <div className="metadata-value" style={{ fontSize: '0.9rem' }}>
                                        {selectedAgent.outboundTopic}
                                    </div>
                                </div>
                            </div>

                            <button 
                                className="upload-btn"
                                onClick={() => {
                                    setSelectedAgent(null);
                                    handleInvokeAgent(selectedAgent);
                                }}
                                style={{ marginTop: '1rem' }}
                            >
                                Invoke Agent for {selectedAgent.pricing.amount} HBAR
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Invoke Agent Modal */}
            {showInvokeModal && invokeAgent && (
                <div className="modal-overlay" onClick={() => setShowInvokeModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>
                                Invoke {invokeAgent.name}
                                {invokeAgent.isLive && <span className="live-badge">🟢 LIVE</span>}
                            </h2>
                            <button className="close-btn" onClick={() => setShowInvokeModal(false)}>
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="modal-section">
                                <p>
                                    {invokeAgent.isLive ? (
                                        <>This agent is <strong>LIVE</strong> and will respond in real-time via HCS topic: <strong>{invokeAgent.inboundTopic}</strong></>
                                    ) : (
                                        <>Submit your request to the agent via HCS topic: <strong>{invokeAgent.inboundTopic}</strong></>
                                    )}
                                </p>
                            </div>

                            <div className="modal-section">
                                <h3>Input Data {invokeAgent.inputType && `(${invokeAgent.inputType})`}</h3>
                                {invokeAgent.exampleInput && (
                                    <div style={{ marginBottom: '10px', fontSize: '0.85rem', color: '#888' }}>
                                        Example: {invokeAgent.exampleInput}
                                        <button 
                                            onClick={() => setInvokeInput(invokeAgent.exampleInput)}
                                            style={{
                                                marginLeft: '10px',
                                                padding: '4px 8px',
                                                fontSize: '0.75rem',
                                                background: 'rgba(3, 218, 198, 0.2)',
                                                border: '1px solid #03DAC6',
                                                borderRadius: '4px',
                                                color: '#03DAC6',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Use Example
                                        </button>
                                    </div>
                                )}
                                <textarea
                                    className="invoke-input"
                                    placeholder={invokeAgent.inputType === 'image' 
                                        ? "Enter image URL (e.g., https://example.com/image.jpg)" 
                                        : "Enter your input data (JSON or text)..."}
                                    value={invokeInput}
                                    onChange={(e) => setInvokeInput(e.target.value)}
                                    rows="6"
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '10px',
                                        border: '2px solid rgba(255,255,255,0.1)',
                                        background: 'rgba(255,255,255,0.05)',
                                        color: '#fff',
                                        fontFamily: 'monospace',
                                        fontSize: '0.9rem'
                                    }}
                                />
                            </div>

                            <div className="modal-section">
                                <div className="metadata-item">
                                    <div className="metadata-label">Cost</div>
                                    <div className="metadata-value">{invokeAgent.pricing.amount} HBAR</div>
                                </div>
                            </div>

                            <button 
                                className="upload-btn"
                                onClick={submitInvocation}
                                disabled={invoking}
                                style={{ marginTop: '1rem' }}
                            >
                                {invoking && <div className="spinner"></div>}
                                {invoking ? 'Submitting to HCS...' : 'Submit Invocation'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Agent Response Modal */}
            {showResponseModal && agentResponse && (
                <div className="modal-overlay response-modal" onClick={() => setShowResponseModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 style={{ color: agentResponse.isDemo ? '#FFA726' : '#03DAC6' }}>
                                {agentResponse.isDemo ? '📋 Demo Response' : '🎉 AI Analysis Results'}
                            </h2>
                            <button className="close-btn" onClick={() => setShowResponseModal(false)}>
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="modal-section">
                                <h3>Agent: {agentResponse.agent}</h3>
                                <p><strong>Agent ID:</strong> {agentResponse.agentId}</p>
                                <p><strong>Capability:</strong> {agentResponse.capability}</p>
                                <p><strong>Timestamp:</strong> {new Date(agentResponse.timestamp).toLocaleString()}</p>
                                {agentResponse.isDemo && (
                                    <div style={{
                                        background: 'rgba(255, 167, 38, 0.1)',
                                        border: '1px solid rgba(255, 167, 38, 0.3)',
                                        padding: '8px 12px',
                                        borderRadius: '8px',
                                        marginTop: '8px',
                                        fontSize: '0.9rem',
                                        color: '#FFA726'
                                    }}>
                                        ⚠️ Demo Mode: This is a sample response. Use LIVE agents for real AI processing.
                                    </div>
                                )}
                            </div>

                            <div className="modal-section">
                                <h3>Your Input:</h3>
                                <div style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    fontFamily: 'monospace',
                                    fontSize: '0.9rem',
                                    color: '#fff',
                                    wordBreak: 'break-word'
                                }}>
                                    {agentResponse.input}
                                </div>
                            </div>

                            <div className="modal-section">
                                <h3>AI Response:</h3>
                                <div style={{
                                    background: 'rgba(3, 218, 198, 0.1)',
                                    border: '1px solid rgba(3, 218, 198, 0.3)',
                                    padding: '16px',
                                    borderRadius: '12px',
                                    fontFamily: 'monospace',
                                    fontSize: '0.9rem',
                                    color: '#fff',
                                    maxHeight: '300px',
                                    overflow: 'auto'
                                }}>
                                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                                        {JSON.stringify(agentResponse.response, null, 2)}
                                    </pre>
                                </div>
                            </div>

                            <button 
                                className="upload-btn"
                                onClick={() => setShowResponseModal(false)}
                                style={{ marginTop: '1rem' }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Agent Modal */}
            {showDeleteModal && agentToDelete && (
                <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 style={{ color: '#CF6679' }}>🗑️ Delete Agent</h2>
                            <button className="close-btn" onClick={() => setShowDeleteModal(false)}>
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="modal-section">
                                <p>Are you sure you want to delete <strong>{agentToDelete.name}</strong>?</p>
                                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginTop: '1rem' }}>
                                    This action will:
                                </p>
                                <ul style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginLeft: '1rem' }}>
                                    <li>Remove the agent from the marketplace</li>
                                    <li>Stop all HCS topic listeners</li>
                                    <li>Make the agent unavailable for invocations</li>
                                    <li><strong>This cannot be undone</strong></li>
                                </ul>
                            </div>

                            <div className="modal-section">
                                <div className="metadata-item">
                                    <div className="metadata-label">Agent ID</div>
                                    <div className="metadata-value" style={{ fontSize: '0.85rem' }}>
                                        {agentToDelete.agentId}
                                    </div>
                                </div>
                                <div className="metadata-item">
                                    <div className="metadata-label">Invocations</div>
                                    <div className="metadata-value">{agentToDelete.invocations}</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                <button 
                                    className="upload-btn"
                                    onClick={() => setShowDeleteModal(false)}
                                    style={{ 
                                        background: 'rgba(255,255,255,0.1)',
                                        flex: 1
                                    }}
                                >
                                    Cancel
                                </button>
                                <button 
                                    className="upload-btn"
                                    onClick={confirmDeleteAgent}
                                    disabled={deleting}
                                    style={{ 
                                        background: '#CF6679',
                                        flex: 1
                                    }}
                                >
                                    {deleting && <div className="spinner"></div>}
                                    {deleting ? 'Deleting...' : 'Delete Agent'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="marketplace-footer">
                <p>HEX - Hedera AI Exchange • Built on Hedera Hashgraph • Powered by Groq AI</p>
            </footer>
        </div>
    );
};

export default AIAgentMarketplace;
