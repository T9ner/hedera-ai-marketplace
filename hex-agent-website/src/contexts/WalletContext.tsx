import React, { createContext, useContext, useEffect, useState } from 'react';
import { WalletInfo, WalletType } from '@/hooks/useWallet';

interface WalletContextType {
  wallet: WalletInfo | null;
  isConnected: boolean;
  isConnecting: boolean;
  connectWallet: (walletType: WalletType) => Promise<void>;
  disconnectWallet: () => Promise<void>;
  switchNetwork: (chainId: string) => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWalletContext must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: React.ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [wallet, setWallet] = useState<WalletInfo | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Auto-reconnect on page load
  useEffect(() => {
    const savedWallet = localStorage.getItem('hex-wallet');
    if (savedWallet) {
      try {
        const walletInfo = JSON.parse(savedWallet);
        setWallet(walletInfo);
      } catch (error) {
        localStorage.removeItem('hex-wallet');
      }
    }
  }, []);

  // Listen for account changes (MetaMask, etc.)
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected
          setWallet(null);
          localStorage.removeItem('hex-wallet');
        } else if (wallet && wallet.type === 'metamask') {
          // Update wallet address
          const updatedWallet = { ...wallet, address: accounts[0] };
          setWallet(updatedWallet);
          localStorage.setItem('hex-wallet', JSON.stringify(updatedWallet));
        }
      };

      const handleChainChanged = (chainId: string) => {
        // Update wallet info instead of reloading the page
        if (wallet) {
          const updatedWallet = { ...wallet, chainId };
          setWallet(updatedWallet);
          localStorage.setItem('hex-wallet', JSON.stringify(updatedWallet));
        }
      };

      (window as any).ethereum.on('accountsChanged', handleAccountsChanged);
      (window as any).ethereum.on('chainChanged', handleChainChanged);

      return () => {
        (window as any).ethereum.removeListener('accountsChanged', handleAccountsChanged);
        (window as any).ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [wallet]);

  const connectWallet = async (walletType: WalletType) => {
    // This will be implemented by the useWallet hook
    throw new Error('connectWallet should be implemented by useWallet hook');
  };

  const disconnectWallet = async () => {
    // This will be implemented by the useWallet hook
    throw new Error('disconnectWallet should be implemented by useWallet hook');
  };

  const switchNetwork = async (chainId: string) => {
    // This will be implemented by the useWallet hook
    throw new Error('switchNetwork should be implemented by useWallet hook');
  };

  const value: WalletContextType = {
    wallet,
    isConnected: !!wallet?.isConnected,
    isConnecting,
    connectWallet,
    disconnectWallet,
    switchNetwork,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};