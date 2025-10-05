# 🏆 HEX - Hedera AI Agent Marketplace

> **Hedera Africa Hackathon 2025 Submission**

**HEX** is the world's first decentralized AI agent marketplace built on Hedera Hashgraph. Discover, invoke, and monetize AI agents through blockchain technology.

![HEX Demo](https://via.placeholder.com/800x400/1a1a2e/ffffff?text=HEX+AI+Marketplace)

## ✨ Features

- 🤖 **Live AI Agents** - Sentiment analysis, object detection, conversational AI
- 💰 **Blockchain Payments** - Pay for AI services using HBAR
- 🔗 **Hedera Integration** - Built on Hedera Consensus Service (HCS)
- 🎨 **Modern UI** - Beautiful glassmorphism design
- 🔐 **Wallet Integration** - Secure HashPack wallet connection
- 📊 **Agent Registration** - Easy agent onboarding system

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
cd hex-agent-website && npm install && cd ..
```

### 2. Setup Environment
```bash
# Copy and configure environment variables
cp .env.example .env
# Add your Hedera account ID, private key, and Groq API key
```

### 3. Start AI Agents
```bash
npm run agents
```

### 4. Start Website
```bash
npm run dev
```

### 5. Visit Marketplace
Open [http://localhost:3000](http://localhost:3000)

## 🤖 Available Agents

| Agent | Capability | Status | Price |
|-------|------------|--------|-------|
| **Sentiment Analyzer** | Text sentiment analysis | 🟢 LIVE | 0.001 HBAR |
| **Object Detector** | Image object detection | 🟢 LIVE | 0.002 HBAR |
| **Conversational AI** | Natural conversations | 🟢 LIVE | 0.001 HBAR |

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend │    │  Hedera Network │    │   AI Agents     │
│                 │    │                 │    │                 │
│  • Marketplace  │◄──►│  • HCS Topics   │◄──►│  • Groq API     │
│  • Wallet UI    │    │  • HBAR Payments│    │  • Processing   │
│  • Agent Cards  │    │  • Consensus    │    │  • Responses    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🎯 Innovation: HSC-10 Standard

HEX introduces the **HSC-10 protocol** for standardized AI agent communication:

```json
{
  "p": "hcs-10",
  "op": "invoke",
  "agentId": "0.0.123456@0.0.789012",
  "data": { "input": "Hello AI!" },
  "requester": "0.0.user123"
}
```

## 📁 Project Structure

```
hedera-ai-marketplace/
├── hex-agent-website/          # React frontend
│   ├── src/components/         # UI components
│   ├── src/pages/             # Page components
│   └── src/services/          # Blockchain services
├── src/agents/                # AI agent implementations
├── docs/                      # Documentation
├── start-all-agents.js        # Agent runner
└── setup-conversational-agent.js
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run agents` - Start all AI agents
- `npm run setup` - Setup new agent topics
- `npm run test` - Test agent functionality
- `npm run build` - Build for production

### Adding New Agents

1. Create agent class in `src/agents/`
2. Extend `AgentProcessor` base class
3. Implement `callGroqAPI()` method
4. Add to `start-all-agents.js`

## 🏆 Hackathon Highlights

- ✅ **Full-stack DApp** with production-ready code
- ✅ **Real AI integration** using Groq (free tier)
- ✅ **Hedera blockchain** integration via HCS
- ✅ **Modern UI/UX** with responsive design
- ✅ **Wallet connectivity** with HashPack
- ✅ **Agent marketplace** with discovery & payments
- ✅ **Standardized protocol** (HSC-10) for AI agents

## 🌟 Demo

1. **Visit Marketplace**: Browse available AI agents
2. **Connect Wallet**: Use HashPack wallet integration
3. **Invoke Agent**: Send requests and receive AI responses
4. **Register Agent**: List your own AI agent for others to use

## 🤝 Contributing

This project was built for the Hedera Africa Hackathon 2025. Feel free to explore, learn, and build upon it!

## 📄 License

MIT License - Built with ❤️ for the Hedera community

---

**🏆 Ready for first place!** 🚀
