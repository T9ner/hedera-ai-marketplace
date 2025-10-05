/**
 * HEX Platform Startup Script
 * Starts the integrated HEX website with marketplace functionality
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('🔷 Starting HEX - Hedera AI Exchange\n');

// Check if we're in the right directory
const websiteDir = path.join(__dirname, 'hex-agent-website');
const fs = require('fs');

if (!fs.existsSync(websiteDir)) {
    console.error('❌ HEX website directory not found!');
    console.log('Make sure you\'re in the correct directory with hex-agent-website/ folder');
    process.exit(1);
}

console.log('✅ Found HEX website directory');
console.log('🚀 Starting HEX platform...\n');

// Start the HEX website
const hexProcess = spawn('npm', ['run', 'dev'], {
    cwd: websiteDir,
    stdio: 'inherit',
    shell: true
});

hexProcess.on('error', (error) => {
    console.error('❌ Failed to start HEX platform:', error);
});

hexProcess.on('close', (code) => {
    console.log(`\n🔷 HEX platform stopped with code ${code}`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\n🛑 Shutting down HEX platform...');
    hexProcess.kill('SIGINT');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n\n🛑 Shutting down HEX platform...');
    hexProcess.kill('SIGTERM');
    process.exit(0);
});

console.log('💡 HEX Platform Features:');
console.log('   🎨 Beautiful marketing website');
console.log('   🤖 Functional AI agent marketplace');
console.log('   🟢 Live agent invocation');
console.log('   🔗 Seamless user experience');
console.log('\n🌐 Access HEX at: http://localhost:5173');
console.log('📱 Marketplace at: http://localhost:5173/marketplace');
console.log('\n💡 Press Ctrl+C to stop the platform');