import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

interface HederaBrandingProps {
  variant?: 'full' | 'compact' | 'footer';
  className?: string;
}

export const HederaBranding: React.FC<HederaBrandingProps> = ({ 
  variant = 'full', 
  className = '' 
}) => {
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <img 
          src="/hedera-logo.svg" 
          alt="Hedera" 
          className="w-5 h-5"
          onError={(e) => {
            // Fallback to emoji if SVG fails to load
            (e.target as HTMLImageElement).style.display = 'none';
            (e.target as HTMLImageElement).nextElementSibling!.textContent = '🔷';
          }}
        />
        <span className="hidden">🔷</span>
        <span className="text-sm font-medium">Powered by Hedera</span>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`text-center ${className}`}>
        <div className="flex items-center justify-center gap-3 mb-2">
          <img 
            src="/hedera-logo.svg" 
            alt="Hedera" 
            className="w-8 h-8"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).nextElementSibling!.textContent = '🔷';
            }}
          />
          <span className="hidden text-2xl">🔷</span>
          <div>
            <h3 className="font-bold text-lg">Built on Hedera</h3>
            <p className="text-sm text-muted-foreground">
              The enterprise-grade public network
            </p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground max-w-md mx-auto">
          HEX leverages Hedera's Hashgraph Consensus Service (HCS) for secure, 
          fast, and cost-effective AI agent communications.
        </p>
        <a
          href="https://hedera.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
        >
          Learn more about Hedera <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    );
  }

  // Full variant
  return (
    <Card className={`glass border-primary/30 p-6 ${className}`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <img 
            src="/hedera-logo.svg" 
            alt="Hedera" 
            className="w-12 h-12"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).nextElementSibling!.textContent = '🔷';
            }}
          />
          <span className="hidden text-3xl">🔷</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-xl">Powered by Hedera</h3>
            <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/50">
              Enterprise Grade
            </Badge>
          </div>
          <p className="text-muted-foreground mb-3">
            HEX is built on Hedera's revolutionary Hashgraph technology, providing:
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground mb-4">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
              <strong>Fast & Fair:</strong> 10,000+ TPS with aBFT consensus
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
              <strong>Low Cost:</strong> Predictable fees as low as $0.0001
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
              <strong>Secure:</strong> Bank-grade security with no forks
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
              <strong>Sustainable:</strong> Carbon-negative network
            </li>
          </ul>
          <div className="flex gap-3">
            <a
              href="https://hedera.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              Learn about Hedera <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://docs.hedera.com/hedera/sdks-and-apis/consensus-service"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary hover:underline"
            >
              HCS Documentation <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
};