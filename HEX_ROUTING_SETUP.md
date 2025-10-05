
# 🔷 HEX Routing Setup

## Current Structure

### Marketing Website (hex-agent-website/)
- **URL**: http://localhost:5173
- **Purpose**: Marketing, landing, showcase
- **Tech**: React + TypeScript + Vite + Tailwind
- **Features**: Hero, features, agent gallery, animations

### Marketplace (current directory)
- **URL**: http://localhost:1234
- **Purpose**: Functional marketplace, agent invocation
- **Tech**: React + JavaScript + Parcel
- **Features**: Agent registration, invocation, wallet connection

## Integration Options

### Option 1: Dual Setup (Recommended)
```
Website (Marketing)     →    Marketplace (Functional)
localhost:5173         →    localhost:1234/marketplace
- Hero section         →    - Agent cards
- Features             →    - Invocation modals  
- Agent gallery        →    - Registration forms
- "Enter HEX" button   →    - Live agent responses
```

### Option 2: Single App with Routing
```
/                      →    Landing page (from website)
/marketplace           →    Agent marketplace
/agent/:id             →    Agent details
/register              →    Agent registration
```

## Quick Start

1. **Start both projects**:
   ```bash
   # Terminal 1: Marketplace
   npm start
   
   # Terminal 2: Website  
   cd hex-agent-website
   npm run dev
   ```

2. **Compare designs** and choose integration approach

3. **Update routing** to connect both experiences

## Design System Applied ✅

Both projects now use the HEX design system:
- 🎨 Cosmic color palette (midnight blue, neon teal, violet)
- ✨ Glass morphism effects
- 🌟 Neon glow animations
- 📱 Responsive design
- 🔷 Consistent HEX branding
