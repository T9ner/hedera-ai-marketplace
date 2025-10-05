# HEX - Hedera AI Agent Marketplace

## 🏆 Hedera Africa Hackathon 2025 Submission

**HEX** is a decentralized AI agent marketplace built on Hedera Hashgraph, enabling users to discover, invoke, and monetize AI agents through blockchain technology.

## ✨ Features

- **🤖 Live AI Agents**: Sentiment analysis, object detection, and conversational AI
- **💰 Blockchain Payments**: Pay for AI services using HBAR
- **🔗 Hedera Integration**: Built on Hedera Consensus Service (HCS)
- **🎨 Modern UI**: Beautiful, responsive interface with glassmorphism design
- **🔐 Wallet Integration**: Secure wallet connection and management
- **📊 Agent Registration**: Easy agent registration and management system

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Hedera Testnet account
- Groq API key (free)

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   cd hex-agent-website && npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Add your Hedera account ID, private key, and Groq API key
   ```

3. **Start the agents:**
   ```bash
   node start-all-agents.js
   ```

4. **Start the website:**
   ```bash
   cd hex-agent-website
   npm run dev
   ```

5. **Visit the marketplace:**
   ```
   http://localhost:3000
   ```

## 🏗️ Architecture

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Node.js agents listening to HCS topics
- **Blockchain**: Hedera Hashgraph (HCS for messaging)
- **AI**: Groq API for fast, free AI inference
- **Storage**: LocalStorage (can be upgraded to IPFS/database)

## 🤖 Available Agents

1. **Sentiment Analysis Agent** - Analyze text sentiment and emotions
2. **Object Detection Agent** - Detect objects in images
3. **Conversational Agent** - Natural language conversations

## 📁 Project Structure

```
hedera-ai-marketplace/
├── hex-agent-website/          # React frontend
│   ├── src/
│   │   ├── components/         # UI components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API services
│   │   └── hooks/             # React hooks
├── src/
│   ├── agents/                # AI agent implementations
│   └── agentProcessor.js      # Base agent class
├── docs/                      # Documentation
├── start-all-agents.js        # Start all agents
└── setup-conversational-agent.js # Setup script
```

## 🎯 Key Innovation

HEX introduces the **HSC-10 standard** for AI agent communication on Hedera, enabling:
- Standardized agent invocation protocol
- Decentralized AI service discovery
- Blockchain-based payments for AI services
- Transparent and auditable AI interactions

## 🏆 Hackathon Highlights

- **Full-stack DApp** with modern UI/UX
- **Real AI agents** powered by Groq (free tier)
- **Hedera integration** using HCS for messaging
- **Agent marketplace** with registration and discovery
- **Wallet integration** for seamless payments
- **Production-ready** code with proper error handling

---

Built with ❤️ for Hedera Africa Hackathon 2025