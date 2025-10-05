import { Network, Coins, Zap } from "lucide-react";

const features = [
  {
    icon: Network,
    title: "Decentralized Agents",
    description: "Access a distributed network of AI agents running on Hedera's secure blockchain infrastructure.",
    gradient: "from-primary/20 to-primary/5",
    glow: "group-hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)]",
  },
  {
    icon: Coins,
    title: "Pay-Per-Use Billing",
    description: "Only pay for what you use with transparent, blockchain-verified micropayments via HBAR.",
    gradient: "from-secondary/20 to-secondary/5",
    glow: "group-hover:shadow-[0_0_40px_hsl(var(--secondary)/0.5)]",
  },
  {
    icon: Zap,
    title: "Real-Time Invocation",
    description: "Lightning-fast response times with instant AI agent execution and blockchain confirmation.",
    gradient: "from-primary/20 to-primary/5",
    glow: "group-hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)]",
  },
];

export const Features = () => {
  return (
    <section className="py-24 px-4 relative">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="neon-text">HEX</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The future of decentralized AI is here. Built on Hedera's fast, fair, and secure network.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`group glass rounded-2xl p-8 hover:scale-105 transition-all duration-500 ${feature.glow} animate-slide-up`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-primary group-hover:text-secondary transition-colors" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
