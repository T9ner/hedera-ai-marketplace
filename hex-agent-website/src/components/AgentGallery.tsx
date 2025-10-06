import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Bot, Brain, MessageSquare, Image, Code, TrendingUp, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DecryptedText from "@/components/ui/DecryptedTextSimple";

const agents = [
  {
    name: "Sentiment Analysis Agent",
    category: "NLP",
    icon: Brain,
    rating: 4.9,
    price: "0.001 HBAR",
    color: "text-primary",
    bgGradient: "from-primary/20 to-primary/5",
    isLive: true,
    description: "Real-time sentiment analysis using Groq AI"
  },
  {
    name: "Object Detection Agent",
    category: "Computer Vision",
    icon: Image,
    rating: 4.9,
    price: "0.002 HBAR",
    color: "text-secondary",
    bgGradient: "from-secondary/20 to-secondary/5",
    isLive: true,
    description: "Advanced object detection in images"
  },
  {
    name: "GPT-4 Conversational Agent",
    category: "NLP",
    icon: MessageSquare,
    rating: 4.8,
    price: "0.5 HBAR",
    color: "text-primary",
    bgGradient: "from-primary/20 to-primary/5",
    isLive: false,
    description: "Advanced conversational AI powered by GPT-4"
  },
  {
    name: "Code Analysis Agent",
    category: "Development",
    icon: Code,
    rating: null,
    price: "TBA",
    color: "text-muted-foreground",
    bgGradient: "from-muted/20 to-muted/5",
    isLive: false,
    isComingSoon: true,
    description: "AI-powered code review and analysis"
  }
];

export const AgentGallery = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <DecryptedText
              text="Available "
              className=""
              encryptedClassName="text-muted-foreground/30"
              animateOn="view"
              sequential={true}
              speed={70}
              maxIterations={10}
              revealDirection="start"
            />
            <DecryptedText
              text="AI Agents"
              className="violet-text"
              encryptedClassName="text-violet-400/30"
              animateOn="view"
              sequential={true}
              speed={70}
              maxIterations={10}
              revealDirection="start"
            />
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            <DecryptedText
              text="Live AI agents ready to use on Hedera • More coming soon"
              className="text-muted-foreground"
              encryptedClassName="text-muted-foreground/20"
              animateOn="view"
              sequential={true}
              speed={50}
              maxIterations={8}
              revealDirection="start"
            />
          </p>
        </div>

        <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {agents.map((agent, index) => {
            const Icon = agent.icon;
            return (
              <Card
                key={agent.name}
                className="group relative glass rounded-2xl p-8 border-2 border-border hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_hsl(var(--primary)/0.3)] cursor-pointer overflow-hidden animate-scale-in min-h-[280px]"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate('/marketplace')}
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${agent.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  {/* Icon and Status */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${agent.bgGradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-8 h-8 ${agent.color}`} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Badge variant="secondary" className="text-xs">
                        {agent.category}
                      </Badge>
                      {agent.isLive && (
                        <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/50 text-xs">
                          🟢 LIVE
                        </Badge>
                      )}
                      {agent.isComingSoon && (
                        <Badge variant="secondary" className="bg-orange-500/20 text-orange-400 border-orange-500/50 text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          Soon
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Agent Name */}
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {agent.name}
                  </h3>

                  {/* Description */}
                  <p className="text-base text-muted-foreground mb-4 line-clamp-3">
                    {agent.description}
                  </p>

                  {/* Rating */}
                  {agent.rating ? (
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(agent.rating)
                              ? "fill-primary text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-2">
                        {agent.rating}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 mb-4">
                      <span className="text-sm text-muted-foreground">
                        Coming Soon
                      </span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Price per use</span>
                    <span className={`text-lg font-bold ${agent.color}`}>
                      {agent.price}
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
