import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { WalletButton } from "./WalletButton";
import DecryptedText from "@/components/ui/DecryptedTextSimple";
import heroBg from "@/assets/hero-bg.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Futuristic AI Network" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />
        
        {/* Floating Particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full particle opacity-60" 
             style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-40 w-3 h-3 bg-secondary rounded-full particle opacity-50" 
             style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-primary rounded-full particle opacity-70" 
             style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-secondary rounded-full particle opacity-60" 
             style={{ animationDelay: '3s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center animate-fade-in">
        {/* Hackathon Badge */}
        <div className="inline-flex items-center gap-3 px-6 py-3 mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold">
          <span className="text-lg">🏆</span>
          <span className="text-sm">Hedera Africa Hackathon 2025</span>
        </div>

        {/* Hedera Badge */}
        <div className="inline-flex items-center gap-3 px-6 py-3 mb-8 rounded-full glass border border-primary/30">
          <img 
            src="/hedera-logo.svg" 
            alt="Hedera" 
            className="w-5 h-5"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).nextElementSibling!.textContent = '🔷';
            }}
          />
          <span className="hidden">🔷</span>
          <span className="text-sm font-semibold">Built on Hedera Hashgraph • Test on Testnet FREE!</span>
        </div>

        {/* Holographic Card */}
        <div className="holographic rounded-3xl p-12 mb-8 shadow-[0_0_60px_hsl(var(--primary)/0.3)] animate-scale-in">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            <span className="neon-text">HEX</span>
          </h1>
          <p className="text-2xl md:text-3xl lg:text-4xl mb-4 text-muted-foreground font-light">
            Hedera Agent Exchange
          </p>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover and Invoke AI Agents on Hedera
          </p>
        </div>

        {/* Primary CTA */}
        <div className="flex justify-center animate-slide-up mb-8">
          <Button variant="hero-filled" size="xl" className="group" asChild>
            <a href="/marketplace">
              🔷 Enter HEX Marketplace
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>

        {/* Secondary Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button variant="hero" size="lg" asChild>
            <a href="/documentation">
              View Documentation
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild className="border-primary/50 hover:border-primary">
            <a href="/register-agent">
              <Zap className="w-4 h-4 mr-2" />
              Register Agent
            </a>
          </Button>
        </div>

        {/* Wallet Connection */}
        <div className="flex justify-center">
          <WalletButton variant="hero" size="lg" />
        </div>

        {/* Stats Bar */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="glass rounded-xl p-4 hover:scale-105 transition-transform">
            <div className="text-3xl font-bold neon-text">
              <DecryptedText
                text="4"
                className="neon-text"
                encryptedClassName="text-primary/50"
                animateOn="view"
                sequential={true}
                speed={150}
                maxIterations={8}
                revealDirection="center"
                useOriginalCharsOnly={false}
                characters="0123456789"
              />
            </div>
            <div className="text-sm text-muted-foreground mt-1">AI Agents</div>
          </div>
          <div className="glass rounded-xl p-4 hover:scale-105 transition-transform">
            <div className="text-3xl font-bold violet-text">
              <DecryptedText
                text="2.1K+"
                className="violet-text"
                encryptedClassName="text-violet-400/50"
                animateOn="view"
                sequential={true}
                speed={120}
                maxIterations={10}
                revealDirection="start"
                useOriginalCharsOnly={false}
                characters="0123456789.K+"
              />
            </div>
            <div className="text-sm text-muted-foreground mt-1">Invocations</div>
          </div>
          <div className="glass rounded-xl p-4 hover:scale-105 transition-transform">
            <div className="text-3xl font-bold neon-text">
              <DecryptedText
                text="99.9%"
                className="neon-text"
                encryptedClassName="text-primary/50"
                animateOn="view"
                sequential={true}
                speed={100}
                maxIterations={12}
                revealDirection="end"
                useOriginalCharsOnly={false}
                characters="0123456789.%"
              />
            </div>
            <div className="text-sm text-muted-foreground mt-1">Uptime</div>
          </div>
        </div>
      </div>

      {/* Gradient Glow Effects */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30 animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl opacity-30 animate-float" 
           style={{ animationDelay: '1s' }} />
    </section>
  );
};
