import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Book, Code, Zap, Shield, Cpu, Network } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Documentation = () => {
    const navigate = useNavigate();

    const sections = [
        {
            id: "getting-started",
            title: "Getting Started",
            icon: <Zap className="w-5 h-5" />,
            description: "Quick start guide to using HEX",
            items: [
                { title: "Platform Overview", description: "Understanding HEX and its capabilities" },
                { title: "Wallet Setup", description: "Connecting your Hedera wallet" },
                { title: "First AI Agent Invocation", description: "Step-by-step tutorial" },
                { title: "Account Management", description: "Managing your HEX account" }
            ]
        },
        {
            id: "ai-agents",
            title: "AI Agents",
            icon: <Cpu className="w-5 h-5" />,
            description: "Working with AI agents on HEX",
            items: [
                { title: "Agent Discovery", description: "Finding the right AI agents" },
                { title: "Agent Invocation", description: "How to invoke AI agents" },
                { title: "Response Handling", description: "Processing AI responses" },
                { title: "Agent Categories", description: "Understanding different agent types" }
            ]
        },
        {
            id: "developers",
            title: "Developer Guide",
            icon: <Code className="w-5 h-5" />,
            description: "Build and deploy AI agents",
            items: [
                { title: "Agent Development", description: "Creating your own AI agents" },
                { title: "HSC-10 Standard", description: "OpenConvAI compliance guide" },
                { title: "API Reference", description: "Complete API documentation" },
                { title: "SDK Integration", description: "Using the Hedera SDK" }
            ]
        },
        {
            id: "hedera",
            title: "Hedera Integration",
            icon: <Network className="w-5 h-5" />,
            description: "Understanding the blockchain layer",
            items: [
                { title: "HCS Topics", description: "Hashgraph Consensus Service" },
                { title: "HBAR Payments", description: "Cryptocurrency transactions" },
                { title: "Smart Contracts", description: "Agent registry contracts" },
                { title: "Network Configuration", description: "Testnet vs Mainnet" }
            ]
        },
        {
            id: "security",
            title: "Security",
            icon: <Shield className="w-5 h-5" />,
            description: "Security best practices",
            items: [
                { title: "Wallet Security", description: "Protecting your private keys" },
                { title: "Transaction Safety", description: "Safe transaction practices" },
                { title: "Agent Verification", description: "Verifying agent authenticity" },
                { title: "Privacy Considerations", description: "Data privacy on blockchain" }
            ]
        },
        {
            id: "reference",
            title: "Reference",
            icon: <Book className="w-5 h-5" />,
            description: "Technical references and guides",
            items: [
                { title: "Error Codes", description: "Common errors and solutions" },
                { title: "Network Status", description: "Hedera network information" },
                { title: "Troubleshooting", description: "Common issues and fixes" },
                { title: "FAQ", description: "Frequently asked questions" }
            ]
        }
    ];

    const quickLinks = [
        { title: "Hedera Documentation", url: "https://docs.hedera.com", external: true },
        { title: "Hedera SDK", url: "https://docs.hedera.com/hedera/sdks-and-apis/sdks", external: true },
        { title: "HCS Guide", url: "https://docs.hedera.com/hedera/sdks-and-apis/consensus-service", external: true },
        { title: "Groq AI", url: "https://groq.com", external: true },
        { title: "HSC-10 Standard", url: "#", external: false },
        { title: "GitHub Repository", url: "#", external: true }
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="glass border-b border-border/50 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate("/")}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Home
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold neon-text">Documentation</h1>
                            <p className="text-sm text-muted-foreground">Complete guide to using HEX</p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">

                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">
                        Welcome to <span className="neon-text">HEX</span> Documentation
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Everything you need to know about using the decentralized AI agent marketplace
                        built on Hedera Hashgraph
                    </p>
                </div>

                {/* Quick Start */}
                <div className="glass rounded-2xl p-8 mb-12">
                    <h3 className="text-2xl font-bold mb-6 text-center">Quick Start</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="glass p-6 text-center hover:border-primary/50 transition-colors">
                            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">1️⃣</span>
                            </div>
                            <h4 className="font-semibold mb-2">Connect Wallet</h4>
                            <p className="text-sm text-muted-foreground">
                                Connect your Hedera wallet to start using HEX
                            </p>
                        </Card>
                        <Card className="glass p-6 text-center hover:border-primary/50 transition-colors">
                            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">2️⃣</span>
                            </div>
                            <h4 className="font-semibold mb-2">Discover Agents</h4>
                            <p className="text-sm text-muted-foreground">
                                Browse and find AI agents that meet your needs
                            </p>
                        </Card>
                        <Card className="glass p-6 text-center hover:border-primary/50 transition-colors">
                            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">3️⃣</span>
                            </div>
                            <h4 className="font-semibold mb-2">Invoke & Pay</h4>
                            <p className="text-sm text-muted-foreground">
                                Invoke agents with HBAR and get AI-powered results
                            </p>
                        </Card>
                    </div>
                </div>

                {/* Documentation Sections */}
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    {sections.map((section) => (
                        <Card key={section.id} className="glass p-6 hover:border-primary/50 transition-colors">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                                    {section.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">{section.title}</h3>
                                    <p className="text-sm text-muted-foreground">{section.description}</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {section.items.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer">
                                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                            <h4 className="font-medium text-sm">{item.title}</h4>
                                            <p className="text-xs text-muted-foreground">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Quick Links */}
                <div className="glass rounded-2xl p-8 mb-12">
                    <h3 className="text-2xl font-bold mb-6 text-center">External Resources</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {quickLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                target={link.external ? "_blank" : "_self"}
                                rel={link.external ? "noopener noreferrer" : ""}
                                className="flex items-center gap-3 p-4 rounded-lg glass hover:border-primary/50 transition-colors group"
                            >
                                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                                    {link.external ? <ExternalLink className="w-4 h-4" /> : <Book className="w-4 h-4" />}
                                </div>
                                <span className="font-medium group-hover:text-primary transition-colors">
                                    {link.title}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Technical Specifications */}
                <div className="glass rounded-2xl p-8">
                    <h3 className="text-2xl font-bold mb-6">Technical Specifications</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Network className="w-5 h-5" />
                                Hedera Network
                            </h4>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Consensus:</span>
                                    <Badge variant="secondary">Hashgraph (aBFT)</Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">TPS:</span>
                                    <Badge variant="secondary">10,000+</Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Finality:</span>
                                    <Badge variant="secondary">3-5 seconds</Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Network:</span>
                                    <Badge variant="secondary">Testnet/Mainnet</Badge>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Code className="w-5 h-5" />
                                HEX Platform
                            </h4>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Standard:</span>
                                    <Badge variant="secondary">HSC-10 OpenConvAI</Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Payment:</span>
                                    <Badge variant="secondary">HBAR</Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Messaging:</span>
                                    <Badge variant="secondary">HCS Topics</Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">AI Engine:</span>
                                    <Badge variant="secondary">Groq AI</Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Documentation;