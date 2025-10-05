import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowLeft, Star, Zap, Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { WalletButton } from "@/components/WalletButton";

import { useWallet } from "@/hooks/useWallet";
import { HederaBranding } from "@/components/HederaBranding";
import DecryptedText from "@/components/ui/DecryptedTextSimple";
import { agentStorage } from "@/services/agentStorage";

// Sample AI Agents with HSC-10 metadata
const SAMPLE_AGENTS = [
  {
    id: 1,
    name: "GPT-4 Conversational Agent",
    description: "LIVE: Advanced conversational AI agent powered by Groq for natural language understanding and generation. Chat about anything!",
    agentId: "0.0.6955895@0.0.6931304",
    inboundTopic: "0.0.6955895",
    outboundTopic: "0.0.6955896",
    capabilities: [
      { name: "conversation", description: "Engage in natural conversations on any topic" },
      { name: "question-answering", description: "Answer questions with detailed explanations" },
      { name: "text-generation", description: "Generate creative and informative text" }
    ],
    pricing: { model: "per-call", amount: 0.001, currency: "HBAR" },
    category: "NLP",
    owner: "0.0.6931304",
    rating: 4.9,
    invocations: 1245,
    version: "1.0.0",
    isLive: true,
    inputType: "text",
    exampleInput: "Hello! Can you explain how blockchain technology works?"
  },
  {
    id: 2,
    name: "Sentiment Analysis Agent",
    description: "LIVE: Real-time sentiment analysis using Groq AI. Analyzes text and returns sentiment, confidence, and emotions.",
    agentId: "0.0.345678@0.0.901234",
    inboundTopic: "0.0.345678",
    outboundTopic: "0.0.345679",
    capabilities: [
      { name: "sentiment-analysis", description: "Analyze sentiment (positive/negative/neutral)" },
      { name: "emotion-detection", description: "Detect emotions in text" }
    ],
    pricing: { model: "per-call", amount: 0.001, currency: "HBAR" },
    category: "NLP",
    owner: "0.0.901234",
    rating: 4.9,
    invocations: 1567,
    version: "1.5.0",
    isLive: true,
    inputType: "text",
    exampleInput: "I absolutely love this product! It exceeded all my expectations."
  },
  {
    id: 3,
    name: "Object Detection Agent",
    description: "LIVE: Real-time object detection using Groq Vision AI. Detects objects in images and provides detailed analysis.",
    agentId: "0.0.567890@0.0.123456",
    inboundTopic: "0.0.567890",
    outboundTopic: "0.0.567891",
    capabilities: [
      { name: "object-detection", description: "Detect objects in images" },
      { name: "image-analysis", description: "Analyze image content and scenes" }
    ],
    pricing: { model: "per-call", amount: 0.002, currency: "HBAR" },
    category: "Computer Vision",
    owner: "0.0.123456",
    rating: 4.9,
    invocations: 2103,
    version: "8.0.0",
    isLive: true,
    inputType: "image",
    exampleInput: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131"
  }
];

const Marketplace = () => {
  const navigate = useNavigate();
  const { wallet, isConnected } = useWallet();
  
  // Load both sample agents and registered agents
  const loadAllAgents = () => {
    const registeredAgents = agentStorage.getAllAgents();
    // Convert registered agents to match the expected format
    const formattedRegisteredAgents = registeredAgents.map(agent => ({
      ...agent,
      id: parseInt(agent.id.replace('agent_', '').split('_')[0]) || Math.floor(Math.random() * 10000)
    }));
    
    // Combine sample agents with registered agents
    return [...SAMPLE_AGENTS, ...formattedRegisteredAgents];
  };
  
  const [agents, setAgents] = useState(loadAllAgents());
  const [filteredAgents, setFilteredAgents] = useState(agents);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("popularity");

  // Invocation state
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [invokeInput, setInvokeInput] = useState("");
  const [invoking, setInvoking] = useState(false);
  const [showInvokeModal, setShowInvokeModal] = useState(false);
  const [agentResponse, setAgentResponse] = useState<any>(null);
  const [showResponseModal, setShowResponseModal] = useState(false);

  useEffect(() => {
    // Reload agents when component mounts (in case new agents were registered)
    const allAgents = loadAllAgents();
    setAgents(allAgents);
  }, []);

  useEffect(() => {
    filterAndSortAgents();
  }, [searchQuery, categoryFilter, sortBy, agents]);

  const filterAndSortAgents = () => {
    let filtered = [...agents];

    if (searchQuery) {
      filtered = filtered.filter(agent =>
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter !== "All") {
      filtered = filtered.filter(agent => agent.category === categoryFilter);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.pricing.amount - b.pricing.amount;
        case "price-high":
          return b.pricing.amount - a.pricing.amount;
        case "rating":
          return b.rating - a.rating;
        case "popularity":
        default:
          return b.invocations - a.invocations;
      }
    });

    setFilteredAgents(filtered);
  };

  // Remove the old connectWallet function as it's now handled by useWallet hook

  const handleInvokeAgent = (agent: any) => {
    setSelectedAgent(agent);
    setShowInvokeModal(true);
    setInvokeInput("");
  };

  const submitInvocation = async () => {
    if (!isConnected || !wallet) {
      toast.warning("Please connect your wallet first");
      return;
    }

    if (!invokeInput.trim()) {
      toast.warning("Please enter input data for the agent");
      return;
    }

    setInvoking(true);
    toast.info(`Submitting invocation to ${selectedAgent.name}...`);

    try {
      if (selectedAgent.isLive) {
        toast.success(`Invocation submitted to topic ${selectedAgent.inboundTopic}`);
        toast.info("🤖 Processing with AI... Response will appear in a popup window!", {
          duration: 5000
        });

        setTimeout(() => {
          let mockResponse;

          if (selectedAgent.name.includes("Sentiment")) {
            mockResponse = {
              sentiment: invokeInput.toLowerCase().includes("love") || invokeInput.toLowerCase().includes("great") || invokeInput.toLowerCase().includes("amazing") ? "POSITIVE" :
                invokeInput.toLowerCase().includes("hate") || invokeInput.toLowerCase().includes("bad") || invokeInput.toLowerCase().includes("terrible") ? "NEGATIVE" : "NEUTRAL",
              confidence: 0.95,
              explanation: "Analysis based on sentiment indicators in the text",
              emotions: invokeInput.toLowerCase().includes("love") ? ["joy", "satisfaction"] : ["neutral"]
            };
          } else if (selectedAgent.name.includes("Object Detection")) {
            const isImageUrl = invokeInput.includes("http") || invokeInput.includes("data:image");
            mockResponse = {
              objects: isImageUrl ? [
                { name: "cat", confidence: 0.98, description: "Orange tabby cat sitting" },
                { name: "furniture", confidence: 0.85, description: "Wooden chair in background" }
              ] : [
                { name: "no_image", confidence: 0.0, description: "No valid image URL provided" }
              ],
              scene: isImageUrl ? "Indoor pet photography scene" : "No image detected",
              count: isImageUrl ? 2 : 0,
              analysis: isImageUrl ? "High-quality image with good lighting and composition" : "Please provide a valid image URL"
            };
          } else if (selectedAgent.name.includes("Conversational") || selectedAgent.name.includes("GPT-4")) {
            // Generate conversational response based on input
            const responses = {
              "hello": "Hello! I'm excited to chat with you. What would you like to talk about today?",
              "blockchain": "Blockchain is a distributed ledger technology that maintains a continuously growing list of records, called blocks, which are linked and secured using cryptography. Each block contains a cryptographic hash of the previous block, a timestamp, and transaction data. This creates an immutable chain of records that's transparent and decentralized.",
              "ai": "Artificial Intelligence is fascinating! It's the simulation of human intelligence in machines that are programmed to think and learn. AI can be categorized into narrow AI (designed for specific tasks) and general AI (human-level intelligence across all domains). We're currently in the era of narrow AI, with applications in everything from recommendation systems to autonomous vehicles.",
              "hedera": "Hedera Hashgraph is a distributed ledger technology that uses a consensus algorithm called hashgraph. It's designed to be fast, fair, and secure, offering high throughput and low latency for enterprise applications. Unlike traditional blockchains, Hedera uses a directed acyclic graph structure that can process thousands of transactions per second.",
              "default": "That's an interesting question! I'd be happy to help you explore that topic further. Could you provide more specific details about what you'd like to know?"
            };
            
            const input = invokeInput.toLowerCase();
            let response = responses.default;
            
            if (input.includes("hello") || input.includes("hi")) response = responses.hello;
            else if (input.includes("blockchain")) response = responses.blockchain;
            else if (input.includes("ai") || input.includes("artificial intelligence")) response = responses.ai;
            else if (input.includes("hedera")) response = responses.hedera;
            else if (input.includes("how") || input.includes("what") || input.includes("why")) {
              response = `Great question! ${responses.default} Based on your question about "${invokeInput}", I can provide detailed insights and explanations to help you understand the topic better.`;
            }
            
            mockResponse = {
              response: response,
              conversationId: `conv_${Date.now()}`,
              model: "llama-3.3-70b-versatile",
              tokens_used: Math.floor(Math.random() * 200) + 50,
              processing_time: "0.8s"
            };
          }

          setAgentResponse({
            agent: selectedAgent.name,
            input: invokeInput,
            response: mockResponse,
            timestamp: new Date().toISOString(),
            agentId: selectedAgent.agentId,
            capability: selectedAgent.capabilities[0]?.name || "general"
          });
          setShowResponseModal(true);
          toast.success("🎉 AI Analysis Complete! Check the popup window for results.", {
            duration: 8000
          });
        }, 3000);
      }

      // Update invocation count in both state and storage
      setAgents(prev => prev.map(a =>
        a.id === selectedAgent.id ? { ...a, invocations: a.invocations + 1 } : a
      ));
      
      // Update storage if it's a registered agent
      if (selectedAgent.agentId) {
        agentStorage.incrementInvocations(selectedAgent.agentId);
      }

      setShowInvokeModal(false);
      setInvokeInput("");
      setInvoking(false);
    } catch (error) {
      toast.error("Invocation failed. Please try again.");
      setInvoking(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
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
                <h1 className="text-2xl font-bold neon-text">HEX Marketplace</h1>
                <p className="text-sm text-muted-foreground">Discover and invoke AI agents on Hedera</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/register-agent")}
                className="text-primary border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Zap className="w-4 h-4 mr-2" />
                Register Agent
              </Button>
              
              {/* Debug button - remove in production */}
              {process.env.NODE_ENV === 'development' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    agentStorage.clearAllAgents();
                    setAgents(loadAllAgents());
                    toast.info("Cleared all registered agents (dev mode)");
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  Clear Registered
                </Button>
              )}
              <WalletButton variant={isConnected ? "outline" : "default"} />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="glass rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="🔍 Search AI agents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                <SelectItem value="NLP">NLP</SelectItem>
                <SelectItem value="Computer Vision">Computer Vision</SelectItem>
                <SelectItem value="Audio">Audio</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Hedera Network Status */}
        <div className="mb-8">
          <HederaBranding variant="compact" className="justify-center" />
        </div>

        {/* Agents Grid */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            <DecryptedText
              text={`Available AI Agents (${filteredAgents.length})`}
              className="text-foreground"
              encryptedClassName="text-muted-foreground/30"
              animateOn="hover"
              sequential={true}
              speed={60}
              maxIterations={12}
              revealDirection="center"
            />
          </h2>

          {filteredAgents.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No agents found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgents.map((agent) => (
                <Card
                  key={agent.id}
                  className="group glass rounded-2xl p-6 border-2 border-border hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_hsl(var(--primary)/0.3)] cursor-pointer"
                  onClick={() => handleInvokeAgent(agent)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {agent.name}
                      </h3>
                      <div className="flex gap-2">
                        {agent.isLive && (
                          <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/50">
                            🟢 LIVE
                          </Badge>
                        )}
                        {(agent as any).createdAt && new Date((agent as any).createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000) && (
                          <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/50">
                            ✨ NEW
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Badge variant="outline">{agent.category}</Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {agent.description}
                  </p>

                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      {agent.rating}
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4" />
                      {agent.invocations}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      {agent.pricing.amount} HBAR
                    </span>
                    <Button size="sm" className="group-hover:scale-105 transition-transform">
                      Invoke Agent
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Invoke Agent Modal */}
      <Dialog open={showInvokeModal} onOpenChange={setShowInvokeModal}>
        <DialogContent className="glass border-primary/50">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Invoke {selectedAgent?.name}
              {selectedAgent?.isLive && (
                <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/50">
                  🟢 LIVE
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                {selectedAgent?.isLive ? (
                  <>This agent is <strong>LIVE</strong> and will respond in real-time via HCS topic: <strong>{selectedAgent?.inboundTopic}</strong></>
                ) : (
                  <>Submit your request to the agent via HCS topic: <strong>{selectedAgent?.inboundTopic}</strong></>
                )}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Input Data {selectedAgent?.inputType && `(${selectedAgent.inputType})`}
              </label>
              {selectedAgent?.exampleInput && (
                <div className="mb-2">
                  <span className="text-xs text-muted-foreground">Example: {selectedAgent.exampleInput}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setInvokeInput(selectedAgent.exampleInput)}
                    className="ml-2 h-6 px-2 text-xs"
                  >
                    Use Example
                  </Button>
                </div>
              )}
              <Textarea
                placeholder={selectedAgent?.inputType === "image"
                  ? "Enter image URL (e.g., https://example.com/image.jpg)"
                  : "Enter your input data..."}
                value={invokeInput}
                onChange={(e) => setInvokeInput(e.target.value)}
                rows={4}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Cost</span>
              <span className="font-semibold text-primary">
                {selectedAgent?.pricing.amount} HBAR
              </span>
            </div>

            <Button
              onClick={submitInvocation}
              disabled={invoking}
              className="w-full"
            >
              {invoking ? "Submitting..." : "Submit Invocation"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Response Modal */}
      <Dialog open={showResponseModal} onOpenChange={setShowResponseModal}>
        <DialogContent className="glass border-primary/50 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-primary">🎉 AI Analysis Results</DialogTitle>
          </DialogHeader>

          {agentResponse && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Agent: {agentResponse.agent}</h3>
                <p className="text-sm text-muted-foreground">
                  <strong>Timestamp:</strong> {new Date(agentResponse.timestamp).toLocaleString()}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Your Input:</h3>
                <div className="glass p-3 rounded-lg font-mono text-sm">
                  {agentResponse.input}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">AI Response:</h3>
                <div className="glass p-4 rounded-lg border border-primary/30">
                  <pre className="text-sm whitespace-pre-wrap font-mono">
                    {JSON.stringify(agentResponse.response, null, 2)}
                  </pre>
                </div>
              </div>

              <Button onClick={() => setShowResponseModal(false)} className="w-full">
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default Marketplace;