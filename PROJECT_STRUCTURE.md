# 📁 HEX Project Structure

## Clean, Production-Ready Codebase

```
hedera-ai-marketplace/
├── 📁 hex-agent-website/           # React Frontend Application
│   ├── 📁 src/
│   │   ├── 📁 components/          # Reusable UI components
│   │   │   ├── ui/                 # Base UI components
│   │   │   ├── Hero.tsx            # Landing page hero
│   │   │   ├── AgentGallery.tsx    # Agent showcase
│   │   │   ├── WalletButton.tsx    # Wallet integration
│   │   │   └── ...
│   │   ├── 📁 pages/               # Page components
│   │   │   ├── Index.tsx           # Home page
│   │   │   ├── Marketplace.tsx     # Agent marketplace
│   │   │   ├── RegisterAgent.tsx   # Agent registration
│   │   │   └── ...
│   │   ├── 📁 services/            # API and blockchain services
│   │   │   ├── agentStorage.ts     # Agent data management
│   │   │   ├── hederaWallet.ts     # Wallet integration
│   │   │   └── ...
│   │   ├── 📁 hooks/               # React hooks
│   │   └── 📁 contexts/            # React contexts
│   ├── package.json                # Frontend dependencies
│   └── ...
│
├── 📁 src/                         # Backend AI Agents
│   ├── 📁 agents/                  # AI agent implementations
│   │   ├── sentimentAgent.js       # Sentiment analysis
│   │   ├── objectDetectionAgent.js # Object detection
│   │   ├── conversationalAgent.js  # Conversational AI
│   │   └── ...
│   ├── agentProcessor.js           # Base agent class
│   ├── setupAgentTopics.js         # Topic creation utility
│   └── ...
│
├── 📁 scripts/                     # Utility scripts
│   ├── setup-agent.js              # Agent setup script
│   ├── test-agents.js              # Test all agents
│   └── ...
│
├── 📁 docs/                        # Documentation
│   ├── README.md                   # Detailed documentation
│   └── ...
│
├── 📄 Core Files
├── start-all-agents.js             # Start all AI agents
├── run-conversational-agent.js     # Run single agent
├── test-conversational-agent.js    # Test conversational agent
├── test-live-agent.js              # Test live agents
├── package.json                    # Main dependencies & scripts
├── README.md                       # Project overview
├── .env.example                    # Environment template
├── .gitignore                      # Git ignore rules
└── PROJECT_STRUCTURE.md            # This file
```

## 🎯 Key Features

### ✅ Clean Architecture
- **Separation of concerns**: Frontend, backend, and utilities
- **Modular design**: Reusable components and services
- **Type safety**: TypeScript for frontend reliability

### ✅ Production Ready
- **Error handling**: Comprehensive error management
- **Environment config**: Secure environment variable handling
- **Documentation**: Clear setup and usage instructions

### ✅ Developer Friendly
- **Simple scripts**: Easy npm commands for all operations
- **Test coverage**: Test scripts for all major functionality
- **Setup automation**: Automated agent topic creation

## 🚀 Quick Commands

```bash
# Install everything
npm install && cd hex-agent-website && npm install

# Start development
npm run dev          # Frontend
npm run agents       # AI Agents

# Setup new agent
npm run setup "My Agent"

# Test functionality
npm run test         # Single agent
npm run test-all     # All agents

# Build for production
npm run build
```

## 🏆 Hackathon Ready

This structure demonstrates:
- **Professional code organization**
- **Scalable architecture**
- **Production deployment readiness**
- **Clear documentation**
- **Easy maintenance and extension**

Perfect for winning first place! 🥇