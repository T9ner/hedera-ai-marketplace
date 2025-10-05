import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wallet, ChevronDown } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { WalletModal } from './WalletModal';

interface WalletButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

export const WalletButton = React.memo(({ 
  variant = 'default', 
  size = 'default',
  className = '' 
}: WalletButtonProps) => {
  const { wallet, isConnected, getWalletDisplayInfo } = useWallet();
  const [showModal, setShowModal] = useState(false);



  const handleClick = () => {
    setShowModal(true);
  };

  if (isConnected && wallet) {
    // Connected state - show wallet info
    return (
      <>
        <Button
          variant={variant}
          size={size}
          onClick={handleClick}
          className={`gap-2 ${className}`}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm">
              {getWalletDisplayInfo(wallet.type).icon}
            </span>
            <div className="flex flex-col items-start">
              <span className="text-xs font-medium">
                {getWalletDisplayInfo(wallet.type).name}
              </span>
              <span className="text-xs text-muted-foreground">
                {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
              </span>
            </div>
          </div>
          <ChevronDown className="w-3 h-3" />
        </Button>
        
        <WalletModal open={showModal} onOpenChange={setShowModal} />
      </>
    );
  }

  // Disconnected state - show connect button
  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleClick}
        className={`gap-2 ${className}`}
      >
        <Wallet className="w-4 h-4" />
        Connect Wallet
      </Button>
      
      <WalletModal open={showModal} onOpenChange={setShowModal} />
    </>
  );
});