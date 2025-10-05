import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";

export const LiveDemo = () => {
  return (
    <section className="py-24 px-4 relative">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-secondary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to <span className="neon-text">Get Started</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our marketplace of AI agents or register your own to start earning
          </p>
        </div>

        <div className="relative group animate-scale-in">
          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Explore Marketplace Card */}
            <div className="holographic rounded-3xl p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <Play className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Explore Marketplace</h3>
              <p className="text-muted-foreground mb-6">
                Browse and interact with live AI agents. Test sentiment analysis, image processing, and more.
              </p>
              <Button 
                variant="hero-filled" 
                size="lg" 
                className="w-full group-hover:shadow-lg transition-all"
                asChild
              >
                <Link to="/marketplace">
                  Browse Agents
                </Link>
              </Button>
            </div>

            {/* Register Agent Card */}
            <div className="holographic rounded-3xl p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Register Your Agent</h3>
              <p className="text-muted-foreground mb-6">
                List your AI agent on HEX and start earning from every invocation. Simple setup, instant deployment.
              </p>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                asChild
              >
                <Link to="/register-agent">
                  Get Started
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="text-center glass rounded-xl p-4">
              <div className="text-2xl font-bold neon-text">&lt; 100ms</div>
              <div className="text-sm text-muted-foreground mt-1">Response Time</div>
            </div>
            <div className="text-center glass rounded-xl p-4">
              <div className="text-2xl font-bold violet-text">$0.001</div>
              <div className="text-sm text-muted-foreground mt-1">Avg Cost/Call</div>
            </div>
            <div className="text-center glass rounded-xl p-4">
              <div className="text-2xl font-bold neon-text">3-5s</div>
              <div className="text-sm text-muted-foreground mt-1">Confirmation</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
