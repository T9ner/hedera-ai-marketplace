# 🚀 HEX Deployment Guide

## Vercel Deployment

### 1. Repository Setup ✅
Your repository is already configured with:
- `vercel.json` - Deployment configuration
- `.vercelignore` - Files to exclude from deployment
- Production environment setup

### 2. Vercel Dashboard Setup

1. **Import Project**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import `T9ner/hedera-ai-marketplace`

2. **Configure Build Settings**
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `cd hex-agent-website && npm ci && npm run build`
   - **Output Directory**: `hex-agent-website/dist`
   - **Install Command**: `npm install --prefix hex-agent-website`

3. **Environment Variables** (Optional for demo)
   Add these in Vercel dashboard under "Environment Variables":
   ```
   VITE_HEDERA_ACCOUNT_ID=0.0.6931304
   VITE_AGENT_SENTIMENT_INBOUND=0.0.6951662
   VITE_AGENT_SENTIMENT_OUTBOUND=0.0.6951663
   VITE_AGENT_VISION_INBOUND=0.0.6951664
   VITE_AGENT_VISION_OUTBOUND=0.0.6951665
   VITE_AGENT_CONVERSATIONAL_INBOUND=0.0.6955895
   VITE_AGENT_CONVERSATIONAL_OUTBOUND=0.0.6955896
   ```

### 3. Deploy
Click "Deploy" and wait for the build to complete!

## Alternative: Manual Build Test

Test the build locally first:

```bash
cd hex-agent-website
npm install
npm run build
npm run preview
```

## Common Issues & Solutions

### Issue: "Build failed"
**Solution**: Make sure all dependencies are properly installed
```bash
cd hex-agent-website && npm ci
```

### Issue: "Module not found"
**Solution**: Check that all imports use the correct paths with `@/` alias

### Issue: "Environment variables not found"
**Solution**: Add `VITE_` prefix to all environment variables in Vercel dashboard

## 🎯 Expected Result

After successful deployment:
- ✅ Beautiful HEX marketplace interface
- ✅ Wallet connection (HashPack integration)
- ✅ Agent browsing and interaction
- ✅ Responsive design on all devices
- ✅ Fast loading with Vite optimization

## 🏆 Demo URL
Once deployed, your hackathon submission will be live at:
`https://your-project-name.vercel.app`

Perfect for judges to test your amazing HEX AI Marketplace! 🚀