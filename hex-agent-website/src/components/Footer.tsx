import { Github, MessageCircle, ExternalLink } from "lucide-react";
import { Linkedin } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 px-4 border-t border-border/50">
      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-1 h-1 bg-primary rounded-full particle opacity-40" 
             style={{ animationDelay: '0s', animationDuration: '8s' }} />
        <div className="absolute top-40 right-40 w-1 h-1 bg-secondary rounded-full particle opacity-30" 
             style={{ animationDelay: '2s', animationDuration: '10s' }} />
        <div className="absolute bottom-20 left-1/3 w-1 h-1 bg-primary rounded-full particle opacity-50" 
             style={{ animationDelay: '4s', animationDuration: '9s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-3xl font-bold mb-4">
              <span className="neon-text">HEX</span>
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              The decentralized AI agent marketplace built on Hedera. 
              Discover, invoke, and scale intelligent automation.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Running on Hedera Testnet</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="/documentation" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group">
                  Documentation
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="/documentation#developers" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group">
                  API Reference
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="/documentation#reference" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/register-agent" className="text-muted-foreground hover:text-primary transition-colors">
                  Register Agent
                </a>
              </li>
              <li>
                <a href="mailto:support@hex-platform.com" className="text-muted-foreground hover:text-primary transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Community</h4>
            <div className="flex gap-4">
              <a
                href="https://x.com/_onovae"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all hover:scale-110"
                aria-label="X (Twitter)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 30 30" className="fill-current">
                  <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"></path>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/honour-onovae-300b41344/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/T9ner/hedera-ai-marketplace"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} HEX. All rights reserved. Built on Hedera Hashgraph.</p>
          <div className="flex gap-6">
            <a href="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
