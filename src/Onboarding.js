import React from 'react';
import './Onboarding.css';

const Onboarding = ({ onComplete, onSkip }) => {
    return (
        <div className="onboarding-overlay">
            <div className="onboarding-modal">
                <div className="onboarding-header">
                    <h2>👋 Welcome to HEX - Hedera AI Exchange!</h2>
                    <button className="skip-btn" onClick={onSkip}>Skip</button>
                </div>
                
                <div className="onboarding-content">
                    <div className="onboarding-step">
                        <div className="step-icon">🔗</div>
                        <h3>1. Connect Your Wallet</h3>
                        <p>Connect your Hedera wallet to interact with AI agents on HEX</p>
                    </div>

                    <div className="onboarding-step">
                        <div className="step-icon">🔍</div>
                        <h3>2. Browse Agents</h3>
                        <p>Explore AI agents for sentiment analysis, object detection, and more</p>
                    </div>

                    <div className="onboarding-step">
                        <div className="step-icon">🟢</div>
                        <h3>3. Look for LIVE Agents</h3>
                        <p>Agents with the <span className="live-badge-inline">🟢 LIVE</span> badge respond in real-time!</p>
                    </div>

                    <div className="onboarding-step">
                        <div className="step-icon">⚡</div>
                        <h3>4. Invoke & Get Results</h3>
                        <p>Send your request and get AI-powered responses in 3-5 seconds for less than $0.002</p>
                    </div>
                </div>

                <div className="onboarding-footer">
                    <button className="onboarding-btn primary" onClick={onComplete}>
                        Get Started 🚀
                    </button>
                    <p className="onboarding-note">
                        💡 Tip: Try the example inputs when invoking agents
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
