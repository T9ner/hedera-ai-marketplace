import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useWallet, WalletType } from '@/hooks/useWallet';
import { HederaCredentialsModal } from './HederaCredentialsModal';
import { Wallet, ExternalLink, Copy, LogOut, AlertCircle, CheckCircle, Key } from 'lucide-react';
import { toast } from 'sonner';

interface WalletModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const WalletModal = ({ open, onOpenChange }: WalletModalProps) => {
  const { 
    wallet, 
    isConnecting, 
    availableWallets, 
    connectWallet, 
    disconnectWallet, 
    getWalletDisplayInfo,
    setWalletInfo,
    connectHederaWithCredentials,
    isConnected 
  } = useWallet();
  
  const [selectedWallet, setSelectedWallet] = useState<WalletType | null>(null);
  const [showHederaCredentials, setShowHederaCredentials] = useState(false);

  const handleWalletConnect = async (walletType: WalletType) => {
    if (walletType === 'hedera') {
      // Check if HashPack is available first
      if ((window as any).hashpack) {
        setSelectedWallet(walletType);
        await connectWallet(walletType);
        if (wallet) {
          onOpenChange(false);
        }
      } else {
        // Show credentials modal for direct SDK connection
        setShowHederaCredentials(true);
      }
    } else {
      setSelectedWallet(walletType);
      await connectWallet(walletType);
      if (wallet) {
        onOpenChange(false);
      }
    }
  };

  const handleHederaSDKConnect = (walletInfo: any) => {
    // Update the wallet state directly using the new function
    if (walletInfo && setWalletInfo) {
      setWalletInfo(walletInfo);
      toast.success('Hedera wallet connected successfully!');
    }
    setShowHederaCredentials(false);
    onOpenChange(false);
  };

  const handleDisconnect = async () => {
    await disconnectWallet();
    onOpenChange(false);
  };

  const copyAddress = () => {
    if (wallet?.address) {
      navigator.clipboard.writeText(wallet.address);
      toast.success('Address copied to clipboard');
    }
  };

  const walletTypes: WalletType[] = ['hedera', 'metamask', 'walletconnect', 'coinbase', 'phantom'];

  if (isConnected && wallet) {
    // Connected wallet view
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="glass border-primary/50 max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Wallet Connected
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Wallet Info */}
            <div className="glass rounded-xl p-4 border border-primary/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-2xl">
                  {getWalletDisplayInfo(wallet.type).icon}
                </div>
                <div>
                  <h3 className="font-semibold">{getWalletDisplayInfo(wallet.type).name}</h3>
                  <p className="text-sm text-muted-foreground">{wallet.network}</p>
                </div>
                <Badge variant="secondary" className="ml-auto bg-green-500/20 text-green-400 border-green-500/50">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Connected
                </Badge>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Address</label>
                <div className="flex items-center gap-2 p-2 bg-background/50 rounded-lg">
                  <code className="text-sm flex-1 truncate">{wallet.address}</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyAddress}
                    className="h-6 w-6 p-0"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {/* Balance */}
              {wallet.balance && (
                <div className="space-y-2 mt-3">
                  <label className="text-sm font-medium text-muted-foreground">Balance</label>
                  <div className="text-lg font-semibold text-primary">
                    {wallet.balance}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => window.open(`https://hashscan.io/testnet/account/${wallet.address}`, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View on Explorer
              </Button>

              <Separator />

              <Button
                variant="destructive"
                className="w-full justify-start"
                onClick={handleDisconnect}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Disconnect Wallet
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Wallet selection view
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-primary/50 max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Wallet className="w-6 h-6" />
            Connect Wallet
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <p className="text-muted-foreground text-center">
            Choose your preferred wallet to connect to HEX and start invoking AI agents.
          </p>

          <div className="grid gap-3">
            {walletTypes.map((walletType) => {
              const walletInfo = getWalletDisplayInfo(walletType);
              const isAvailable = availableWallets[walletType];
              const isCurrentlyConnecting = isConnecting && selectedWallet === walletType;

              return (
                <div key={walletType} className="space-y-2">
                  <Button
                    variant="outline"
                    className={`w-full h-auto p-5 justify-start hover:border-primary/50 transition-all duration-300 ${
                      !isAvailable && walletType !== 'hedera' && walletType !== 'walletconnect' ? 'opacity-60' : ''
                    } ${isCurrentlyConnecting ? 'border-primary/50 bg-primary/5' : ''}`}
                    onClick={() => handleWalletConnect(walletType)}
                    disabled={(!isAvailable && walletType !== 'hedera' && walletType !== 'walletconnect') || isConnecting}
                  >
                    <div className="flex items-center gap-4 w-full">
                      <div className="text-3xl flex-shrink-0">{walletInfo.icon}</div>
                      <div className="flex-1 text-left min-w-0">
                        <div className="font-semibold text-base">{walletInfo.name}</div>
                        <div className="text-sm text-muted-foreground truncate">
                          {walletInfo.description}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {!isAvailable && walletType !== 'hedera' && walletType !== 'walletconnect' && (
                          <Badge variant="secondary" className="text-xs whitespace-nowrap">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Not Installed
                          </Badge>
                        )}
                        {isCurrentlyConnecting && (
                          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        )}
                      </div>
                    </div>
                  </Button>
                  
                  {/* Hedera SDK Option */}
                  {walletType === 'hedera' && !isAvailable && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-muted-foreground border-dashed ml-4"
                      onClick={() => setShowHederaCredentials(true)}
                    >
                      <Key className="w-4 h-4 mr-2" />
                      Connect with Account Credentials
                    </Button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Help text */}
          <div className="glass rounded-lg p-4 border border-primary/20">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-primary mb-2">New to crypto wallets?</p>
                <p className="text-muted-foreground">
                  We recommend starting with <strong>Hedera Wallet</strong> for native HBAR support or <strong>MetaMask</strong> for Ethereum compatibility.
                </p>
              </div>
            </div>
          </div>

          {/* Install links for missing wallets */}
          <div className="grid grid-cols-2 gap-2">
            {!availableWallets.metamask && (
              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-muted-foreground"
                onClick={() => window.open('https://metamask.io/download/', '_blank')}
              >
                <ExternalLink className="w-3 h-3 mr-2" />
                Install MetaMask
              </Button>
            )}
            {!availableWallets.phantom && (
              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-muted-foreground"
                onClick={() => window.open('https://phantom.app/', '_blank')}
              >
                <ExternalLink className="w-3 h-3 mr-2" />
                Install Phantom
              </Button>
            )}
          </div>
        </div>

        {/* Hedera Credentials Modal */}
        <HederaCredentialsModal
          open={showHederaCredentials}
          onOpenChange={setShowHederaCredentials}
          onConnect={handleHederaSDKConnect}
          connectHederaWithCredentials={connectHederaWithCredentials}
        />
      </DialogContent>
    </Dialog>
  );
};