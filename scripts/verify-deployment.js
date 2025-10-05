#!/usr/bin/env node

/**
 * Deployment Verification Script
 * Checks if all components are ready for production deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying HEX deployment readiness...\n');

const checks = [
    {
        name: 'Frontend build configuration',
        check: () => fs.existsSync('hex-agent-website/package.json'),
        fix: 'Ensure hex-agent-website directory exists with package.json'
    },
    {
        name: 'Vercel configuration',
        check: () => fs.existsSync('vercel.json'),
        fix: 'Create vercel.json with build configuration'
    },
    {
        name: 'Environment template',
        check: () => fs.existsSync('.env.example'),
        fix: 'Create .env.example with required variables'
    },
    {
        name: 'Deployment guide',
        check: () => fs.existsSync('DEPLOYMENT_GUIDE.md'),
        fix: 'Create deployment documentation'
    },
    {
        name: 'AI agents',
        check: () => {
            const agents = [
                'src/agents/sentimentAgent.js',
                'src/agents/objectDetectionAgent.js', 
                'src/agents/conversationalAgent.js'
            ];
            return agents.every(agent => fs.existsSync(agent));
        },
        fix: 'Ensure all 3 AI agents are present'
    },
    {
        name: 'Agent runner script',
        check: () => fs.existsSync('start-all-agents.js'),
        fix: 'Create start-all-agents.js script'
    },
    {
        name: 'Documentation',
        check: () => fs.existsSync('README.md') && fs.existsSync('HACKATHON_SUBMISSION.md'),
        fix: 'Create comprehensive documentation'
    },
    {
        name: 'Frontend dependencies',
        check: () => {
            try {
                const pkg = JSON.parse(fs.readFileSync('hex-agent-website/package.json', 'utf8'));
                return pkg.dependencies && pkg.devDependencies;
            } catch {
                return false;
            }
        },
        fix: 'Install frontend dependencies'
    }
];

let allPassed = true;

checks.forEach((check, index) => {
    const passed = check.check();
    const status = passed ? '✅' : '❌';
    console.log(`${index + 1}. ${status} ${check.name}`);
    
    if (!passed) {
        console.log(`   💡 Fix: ${check.fix}`);
        allPassed = false;
    }
});

console.log('\n' + '='.repeat(50));

if (allPassed) {
    console.log('🎉 All checks passed! HEX is ready for deployment!');
    console.log('\n🚀 Next steps:');
    console.log('1. Push to GitHub: git push origin main');
    console.log('2. Deploy to Vercel: Import repository to Vercel');
    console.log('3. Start AI agents: npm run agents');
    console.log('4. Share live demo with judges! 🏆');
} else {
    console.log('⚠️  Some checks failed. Please fix the issues above.');
    process.exit(1);
}

console.log('\n🏆 Ready to win first place! 🥇');