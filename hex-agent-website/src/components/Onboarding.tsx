import { Wallet, Search, Zap, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Wallet,
    title: "Connect Wallet",
    description: "Link your Hedera wallet to get started with secure, decentralized access",
    color: "text-primary",
    glow: "shadow-[0_0_30px_hsl(var(--primary)/0.4)]",
  },
  {
    number: "02",
    icon: Search,
    title: "Browse Agents",
    description: "Explore our curated marketplace of specialized AI agents for any task",
    color: "text-secondary",
    glow: "shadow-[0_0_30px_hsl(var(--secondary)/0.4)]",
  },
  {
    number: "03",
    icon: Zap,
    title: "Invoke AI",
    description: "Execute your chosen agent with a single click and transparent pricing",
    color: "text-primary",
    glow: "shadow-[0_0_30px_hsl(var(--primary)/0.4)]",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "View Results",
    description: "Get instant responses with blockchain-verified execution proof",
    color: "text-secondary",
    glow: "shadow-[0_0_30px_hsl(var(--secondary)/0.4)]",
  },
];

export const Onboarding = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl opacity-30" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get Started in <span className="violet-text">4 Simple Steps</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From connection to execution in minutes, not hours
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          {/* Connecting Line */}
          <div className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary opacity-30" />
          
          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="relative animate-slide-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Step Icon */}
                  <div className={`relative z-10 w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/20 flex items-center justify-center glass ${step.glow} hover:scale-110 transition-transform cursor-pointer`}>
                    <Icon className={`w-10 h-10 ${step.color}`} />
                    <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-current ${step.color} flex items-center justify-center text-xs font-bold`}>
                      {step.number}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile/Tablet Vertical Timeline */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="flex gap-6 animate-fade-in-left"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Step Icon */}
                <div className={`relative flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/20 flex items-center justify-center glass ${step.glow}`}>
                  <Icon className={`w-8 h-8 ${step.color}`} />
                  <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border-2 border-current ${step.color} flex items-center justify-center text-xs font-bold`}>
                    {step.number}
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
