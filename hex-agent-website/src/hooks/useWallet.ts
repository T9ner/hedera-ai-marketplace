import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'sonner';

// Wallet types
export type WalletType = 'hedera' | 'metamask' | 'walletconnect' | 'coinbase' | 'phantom';

export interface WalletInfo {
  type: WalletType;
  address: string;
  balance?: string;
  network?: string;
  isConnected: boolean;
}

// Wallet providers detection
const detectWalletProviders = () => {
  const providers: { [key in WalletType]?: boolean } = {};
  
  // Check for MetaMask
  providers.metamask = !!(window as any).ethereum?.isMetaMask;
  
  // Check for Coinbase Wallet
  providers.coinbase = !!(window as any).ethereum?.isCoinbaseWallet;
  
  // Check for Phantom (Solana)
  providers.phantom = !!(window as any).solana?.isPhantom;
  
  // Hedera and WalletConnect are always available (can be installed)
  providers.hedera = true;
  providers.walletconnect = true;
  
  return providers;
};

import { connectHederaWallet as connectHedera } from '@/services/hederaWallet';
import { connectHederaSDKWallet } from '@/services/hederaSDK';

// Use real Hedera wallet integration
const connectHederaWallet = async (): Promise<WalletInfo> => {
  // First try HashPack or other browser wallets
  if ((window as any).hashpack) {
    return await connectHedera();
  }
  
  // Fallback to SDK connection with stored credentials
  const accountId = sessionStorage.getItem('hedera-account-id');
  const privateKey = sessionStorage.getItem('hedera-private-key');
  
  if (accountId && privateKey) {
    return await connectHederaSDKWallet();
  }
  
  throw new Error('No Hedera wallet found. Please install HashPack or provide account credentials.');
};

// MetaMask wallet functions
const connectMetaMaskWallet = async (): Promise<WalletInfo> => {
  if (!(window as any).ethereum?.isMetaMask) {
    throw new Error('MetaMask not installed');
  }

  try {
    const accounts = await (window as any).ethereum.request({
      method: 'eth_requestAccounts'
    });

    const chainId = await (window as any).ethereum.request({
      method: 'eth_chainId'
    });

    const balance = await (window as any).ethereum.request({
      method: 'eth_getBalance',
      params: [accounts[0], 'latest']
    });

    // Convert balance from wei to ETH
    const balanceInEth = parseInt(balance, 16) / Math.pow(10, 18);

    return {
      type: 'metamask',
      address: accounts[0],
      balance: `${balanceInEth.toFixed(4)} ETH`,
      network: chainId === '0x1' ? 'Ethereum Mainnet' : 'Ethereum Testnet',
      isConnected: true
    };
  } catch (error: any) {
    throw new Error(`MetaMask connection failed: ${error.message}`);
  }
};

// WalletConnect functions (mock implementation)
const connectWalletConnect = async (): Promise<WalletInfo> => {
  // Simulate WalletConnect connection
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    type: 'walletconnect',
    address: '0x742d35Cc6634C0532925a3b8D0C9e3e0C8b0e4c2',
    balance: '2.5 ETH',
    network: 'Ethereum Mainnet',
    isConnected: true
  };
};

// Coinbase Wallet functions
const connectCoinbaseWallet = async (): Promise<WalletInfo> => {
  if (!(window as any).ethereum?.isCoinbaseWallet) {
    throw new Error('Coinbase Wallet not installed');
  }

  try {
    const accounts = await (window as any).ethereum.request({
      method: 'eth_requestAccounts'
    });

    return {
      type: 'coinbase',
      address: accounts[0],
      balance: '1.2 ETH',
      network: 'Ethereum Mainnet',
      isConnected: true
    };
  } catch (error: any) {
    throw new Error(`Coinbase Wallet connection failed: ${error.message}`);
  }
};

// Phantom Wallet functions (Solana)
const connectPhantomWallet = async (): Promise<WalletInfo> => {
  if (!(window as any).solana?.isPhantom) {
    throw new Error('Phantom Wallet not installed');
  }

  try {
    const response = await (window as any).solana.connect();
    
    return {
      type: 'phantom',
      address: response.publicKey.toString(),
      balance: '10.5 SOL',
      network: 'Solana Mainnet',
      isConnected: true
    };
  } catch (error: any) {
    throw new Error(`Phantom Wallet connection failed: ${error.message}`);
  }
};

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletInfo | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [availableWallets, setAvailableWallets] = useState<{ [key in WalletType]?: boolean }>({});
  const persistenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Efficient persistence function
  const persistWalletState = useCallback((walletInfo: WalletInfo | null) => {
    // Clear any pending persistence
    if (persistenceTimeoutRef.current) {
      clearTimeout(persistenceTimeoutRef.current);
    }
    
    // Schedule persistence for next tick
    persistenceTimeoutRef.current = setTimeout(() => {
      if (walletInfo) {
        localStorage.setItem('hex-wallet', JSON.stringify(walletInfo));
      } else {
        localStorage.removeItem('hex-wallet');
        sessionStorage.removeItem('hedera-account-id');
        sessionStorage.removeItem('hedera-private-key');
      }
    }, 0);
  }, []);

  // Check for available wallets on mount
  useEffect(() => {
    const providers = detectWalletProviders();
    setAvailableWallets(providers);

    // Check for existing connection in localStorage with a small delay
    // to ensure any pending persistence operations have completed
    const checkSavedWallet = () => {
      const savedWallet = localStorage.getItem('hex-wallet');
      if (savedWallet) {
        try {
          const walletInfo = JSON.parse(savedWallet);
          setWallet(walletInfo);
        } catch (error) {
          localStorage.removeItem('hex-wallet');
        }
      }
    };

    // Check immediately and also after a small delay
    checkSavedWallet();
    const timeoutId = setTimeout(checkSavedWallet, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  // Connect wallet function
  const connectWallet = useCallback(async (walletType: WalletType) => {
    if (isConnecting) return;
    
    setIsConnecting(true);
    toast.info(`Connecting to ${walletType} wallet...`);

    try {
      let walletInfo: WalletInfo;

      switch (walletType) {
        case 'hedera':
          walletInfo = await connectHederaWallet();
          break;
        case 'metamask':
          walletInfo = await connectMetaMaskWallet();
          break;
        case 'walletconnect':
          walletInfo = await connectWalletConnect();
          break;
        case 'coinbase':
          walletInfo = await connectCoinbaseWallet();
          break;
        case 'phantom':
          walletInfo = await connectPhantomWallet();
          break;
        default:
          throw new Error('Unsupported wallet type');
      }

      // Update UI immediately for instant feedback
      setWallet(walletInfo);
      toast.success(`${walletType} wallet connected successfully!`);
      
      // Persist asynchronously
      persistWalletState(walletInfo);
      
    } catch (error: any) {
      toast.error(error.message || 'Failed to connect wallet');
      console.error('Wallet connection error:', error);
    } finally {
      setIsConnecting(false);
    }
  }, [isConnecting]);

  // Disconnect wallet function
  const disconnectWallet = useCallback(async () => {
    if (!wallet) return;

    try {
      // Clear storage immediately AND update state
      localStorage.removeItem('hex-wallet');
      sessionStorage.removeItem('hedera-account-id');
      sessionStorage.removeItem('hedera-private-key');
      
      // Update UI state
      setWallet(null);
      toast.success('Wallet disconnected successfully');
      
      // Perform wallet-specific disconnect logic
      if (wallet.type === 'phantom' && (window as any).solana) {
        await (window as any).solana.disconnect();
      }
      
    } catch (error: any) {
      toast.error('Failed to disconnect wallet');
      console.error('Wallet disconnect error:', error);
    }
  }, [wallet]);

  // Switch network function (for EVM wallets)
  const switchNetwork = useCallback(async (chainId: string) => {
    if (!wallet || !['metamask', 'coinbase'].includes(wallet.type)) {
      toast.error('Network switching not supported for this wallet');
      return;
    }

    try {
      await (window as any).ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      });
      
      toast.success('Network switched successfully');
    } catch (error: any) {
      toast.error('Failed to switch network');
      console.error('Network switch error:', error);
    }
  }, [wallet]);

  // Get wallet display info
  const getWalletDisplayInfo = useCallback((walletType: WalletType) => {
    const walletInfo = {
      hedera: {
        name: 'Hedera Wallet',
        icon: '🔷',
        description: 'Native Hedera wallet for HBAR and HCS',
        color: 'from-purple-500 to-blue-500'
      },
      metamask: {
        name: 'MetaMask',
        icon: '🦊',
        description: 'Popular Ethereum wallet',
        color: 'from-orange-500 to-yellow-500'
      },
      walletconnect: {
        name: 'WalletConnect',
        icon: '🔗',
        description: 'Connect with 300+ wallets',
        color: 'from-blue-500 to-cyan-500'
      },
      coinbase: {
        name: 'Coinbase Wallet',
        icon: '🔵',
        description: 'Coinbase\'s self-custody wallet',
        color: 'from-blue-600 to-blue-400'
      },
      phantom: {
        name: 'Phantom',
        icon: '👻',
        description: 'Solana wallet for SOL and SPL tokens',
        color: 'from-purple-600 to-pink-500'
      }
    };

    return walletInfo[walletType];
  }, []);

  // Function to set wallet info directly (for SDK connections)
  const setWalletInfo = useCallback((walletInfo: WalletInfo) => {
    // Update UI immediately
    setWallet(walletInfo);
    
    // Persist asynchronously
    persistWalletState(walletInfo);
  }, [persistWalletState]);

  // Direct Hedera SDK connection with credentials
  const connectHederaWithCredentials = useCallback(async (accountId: string, privateKey: string) => {
    setIsConnecting(true);
    
    try {
      const { connectHederaSDKWallet } = await import('@/services/hederaSDK');
      
      // Temporarily store credentials for the connection
      sessionStorage.setItem('hedera-account-id', accountId);
      sessionStorage.setItem('hedera-private-key', privateKey);
      
      const walletInfo = await connectHederaSDKWallet();
      
      // Update UI immediately
      setWallet(walletInfo);
      toast.success('Hedera wallet connected successfully!');
      
      // Persist asynchronously
      persistWalletState(walletInfo);
      
      return walletInfo;
    } catch (error: any) {
      throw error;
    } finally {
      setIsConnecting(false);
    }
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (persistenceTimeoutRef.current) {
        clearTimeout(persistenceTimeoutRef.current);
      }
    };
  }, []);

  return {
    wallet,
    isConnecting,
    availableWallets,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    getWalletDisplayInfo,
    setWalletInfo,
    connectHederaWithCredentials,
    isConnected: !!wallet?.isConnected
  };
};