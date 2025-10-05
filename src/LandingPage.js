import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onNavigateToMarketplace }) => {
    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <div className="hero-badge">🤖 Powered by Hedera & Groq AI</div>
                    <h1 className="hero-title">
                        Hedera AI Exchange
                        <span className="gradient-text"> (HEX)</span>
                    </h1>
                    <p className="hero-subtitle">
                        The world's first decentralized AI agent exchange.
                        Deploy, discover, and monetize AI agents on Hedera.
                    </p>
                    <div className="hero-buttons">
                        <button className="cta-button primary" onClick={onNavigateToMarketplace}>
                            🚀 Try Now
                        </button>
                        <button className="cta-button secondary" onClick={() => window.open('https://github.com', '_blank')}>
                            📚 Learn More
                        </button>
                    </div>
                    <div className="hero-stats">
                        <div className="stat">
                            <div className="stat-value">6+</div>
                            <div className="stat-label">Live Agents</div>
                        </div>
                        <div className="stat">
                            <div className="stat-value">&lt;$0.002</div>
                            <div className="stat-label">Per Request</div>
                        </div>
                        <div className="stat">
                            <div className="stat-value">3-5s</div>
                            <div className="stat-label">Response Time</div>
                        </div>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="floating-card card-1">
                        <div className="card-icon">🤖</div>
                        <div className="card-text">AI Agents</div>
                    </div>
                    <div className="floating-card card-2">
                        <div className="card-icon">⛓️</div>
                        <div className="card-text">Blockchain</div>
                    </div>
                    <div className="floating-card card-3">
                        <div className="card-icon">⚡</div>
                        <div className="card-text">Fast & Cheap</div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="benefits-section">
                <h2 className="section-title">Why Choose HEX?</h2>
                <div className="benefits-grid">
                    <div className="benefit-card">
                        <div className="benefit-icon">⚡</div>
                        <h3>Lightning Fast</h3>
                        <p>Hedera's 3-5 second finality + Groq's ultra-fast inference = instant AI responses</p>
                    </div>
                    <div className="benefit-card">
                        <div className="benefit-icon">💰</div>
                        <h3>Incredibly Affordable</h3>
                        <p>Less than $0.002 per request. 10,000+ TPS with predictable, low fees</p>
                    </div>
                    <div className="benefit-card">
                        <div className="benefit-icon">🔒</div>
                        <h3>Secure & Transparent</h3>
                        <p>All transactions on Hedera blockchain. Immutable audit trail for every invocation</p>
                    </div>
                    <div className="benefit-card">
                        <div className="benefit-icon">🌍</div>
                        <h3>Decentralized</h3>
                        <p>No central server. HSC-10 OpenConvAI standard. True peer-to-peer AI services</p>
                    </div>
                    <div className="benefit-card">
                        <div className="benefit-icon">🎯</div>
                        <h3>Easy to Use</h3>
                        <p>Simple interface. Connect wallet, invoke agent, get results. No technical knowledge needed</p>
                    </div>
                    <div className="benefit-card">
                        <div className="benefit-icon">📈</div>
                        <h3>Monetize Your AI</h3>
                        <p>Register your AI agents and earn HBAR when others use them. Set your own pricing</p>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="how-it-works-section">
                <h2 className="section-title">How It Works</h2>
                <div className="steps-container">
                    <div className="step">
                        <div className="step-number">1</div>
                        <h3>Connect Wallet</h3>
                        <p>Connect your Hedera wallet to get started</p>
                    </div>
                    <div className="step-arrow">→</div>
                    <div className="step">
                        <div className="step-number">2</div>
                        <h3>Browse Agents</h3>
                        <p>Explore AI agents for different tasks</p>
                    </div>
                    <div className="step-arrow">→</div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <h3>Invoke Agent</h3>
                        <p>Send your request via HCS topics</p>
                    </div>
                    <div className="step-arrow">→</div>
                    <div className="step">
                        <div className="step-number">4</div>
                        <h3>Get Results</h3>
                        <p>Receive AI-powered responses instantly</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <h2>Ready to Experience the Future of AI?</h2>
                <p>Join the decentralized AI revolution today</p>
                <button className="cta-button primary large" onClick={onNavigateToMarketplace}>
                    🔷 Enter HEX
                </button>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <p>HEX - Hedera AI Exchange • Built with ❤️ on Hedera Hashgraph • Powered by Groq AI</p>
            </footer>
        </div>
    );
};

export default LandingPage;
