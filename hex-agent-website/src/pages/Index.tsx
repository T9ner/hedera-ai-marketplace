import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { AgentGallery } from "@/components/AgentGallery";
import { LiveDemo } from "@/components/LiveDemo";
import { HederaBranding } from "@/components/HederaBranding";
import { Onboarding } from "@/components/Onboarding";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <AgentGallery />
      <LiveDemo />
      
      {/* Hedera Acknowledgment Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Built on <span className="neon-text">Hedera</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              The enterprise-grade public network that makes HEX possible
            </p>
          </div>
          <HederaBranding variant="full" />
        </div>
      </section>
      
      <Onboarding />
      <Footer />
    </main>
  );
};

export default Index;
