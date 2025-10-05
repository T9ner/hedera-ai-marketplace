/**
 * Integration script to connect the new HEX website with the existing marketplace
 */

const fs = require('fs');
const path = require('path');

console.log('🔷 HEX Website Integration Script\n');

// Check if both projects exist
const marketplaceExists = fs.existsSync('./src/App.js');
const websiteExists = fs.existsSync('./hex-agent-website/src/App.tsx');

if (!marketplaceExists) {
    console.error('❌ Marketplace project not found in current directory');
    process.exit(1);
}

if (!websiteExists) {
    console.error('❌ HEX website not found in ./hex-agent-website/');
    process.exit(1);
}

console.log('✅ Found marketplace project');
console.log('✅ Found HEX website project\n');

// Integration options
console.log('🔗 Integration Options:\n');
console.log('1. 📱 Update marketplace with new design (RECOMMENDED)');
console.log('2. 🌐 Setup dual routing (Website + Marketplace)');
console.log('3. 🎨 Copy components from website to marketplace');
console.log('4. 🚀 Deploy website as landing page\n');

console.log('✨ Current Status:');
console.log('   - Marketplace: Updated with HEX futuristic design');
console.log('   - Website: Beautiful Lovable-built marketing site');
console.log('   - Integration: Design system applied to marketplace\n');

console.log('🎯 Next Steps:');
console.log('1. Start marketplace: npm start');
console.log('2. Start website: cd hex-agent-website && npm run dev');
console.log('3. Compare designs and choose integration approach\n');

console.log('💡 Recommended Integration:');
console.log('   - Use website for marketing (/)');
console.log('   - Use marketplace for functionality (/marketplace)');
console.log('   - Both share the same HEX design system\n');

// Create a simple routing setup file
const routingSetup = `
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
\`\`\`
Website (Marketing)     →    Marketplace (Functional)
localhost:5173         →    localhost:1234/marketplace
- Hero section         →    - Agent cards
- Features             →    - Invocation modals  
- Agent gallery        →    - Registration forms
- "Enter HEX" button   →    - Live agent responses
\`\`\`

### Option 2: Single App with Routing
\`\`\`
/                      →    Landing page (from website)
/marketplace           →    Agent marketplace
/agent/:id             →    Agent details
/register              →    Agent registration
\`\`\`

## Quick Start

1. **Start both projects**:
   \`\`\`bash
   # Terminal 1: Marketplace
   npm start
   
   # Terminal 2: Website  
   cd hex-agent-website
   npm run dev
   \`\`\`

2. **Compare designs** and choose integration approach

3. **Update routing** to connect both experiences

## Design System Applied ✅

Both projects now use the HEX design system:
- 🎨 Cosmic color palette (midnight blue, neon teal, violet)
- ✨ Glass morphism effects
- 🌟 Neon glow animations
- 📱 Responsive design
- 🔷 Consistent HEX branding
`;

fs.writeFileSync('HEX_ROUTING_SETUP.md', routingSetup);
console.log('📄 Created HEX_ROUTING_SETUP.md with integration guide');

console.log('\n🎉 Integration preparation complete!');
console.log('🔷 Your HEX ecosystem is ready to launch! 🚀');