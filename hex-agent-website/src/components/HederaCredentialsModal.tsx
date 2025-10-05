import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { createHederaSDKWallet } from '@/services/hederaSDK';

interface HederaCredentialsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect: (walletInfo: any) => void;
  connectHederaWithCredentials?: (accountId: string, privateKey: string) => Promise<any>;
}

export const HederaCredentialsModal = ({ open, onOpenChange, onConnect, connectHederaWithCredentials }: HederaCredentialsModalProps) => {
  const [accountId, setAccountId] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [errors, setErrors] = useState<{ accountId?: string; privateKey?: string }>({});

  const validateInputs = () => {
    const newErrors: { accountId?: string; privateKey?: string } = {};

    // Validate Account ID format (0.0.xxxxx)
    if (!accountId.trim()) {
      newErrors.accountId = 'Account ID is required';
    } else if (!/^0\.0\.\d+$/.test(accountId.trim())) {
      newErrors.accountId = 'Invalid format. Use format: 0.0.123456';
    }

    // Validate Private Key format
    if (!privateKey.trim()) {
      newErrors.privateKey = 'Private key is required';
    } else if (!/^(0x)?[a-fA-F0-9]{64}$/.test(privateKey.trim())) {
      newErrors.privateKey = 'Invalid private key format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConnect = async () => {
    if (!validateInputs()) {
      return;
    }

    setConnecting(true);
    toast.info('Connecting to Hedera network...');

    try {
      let walletInfo;
      
      // Use the hook function if available, otherwise fallback to direct SDK
      if (connectHederaWithCredentials) {
        walletInfo = await connectHederaWithCredentials(accountId.trim(), privateKey.trim());
      } else {
        const wallet = createHederaSDKWallet(accountId.trim(), privateKey.trim());
        walletInfo = await wallet.connect();
        
        // Store credentials securely (in production, use proper encryption)
        sessionStorage.setItem('hedera-account-id', accountId.trim());
        sessionStorage.setItem('hedera-private-key', privateKey.trim());
      }
      
      // Call the onConnect callback with the wallet info
      onConnect(walletInfo);
      
      // Clear form
      setAccountId('');
      setPrivateKey('');
      setErrors({});
      
    } catch (error: any) {
      toast.error(`Connection failed: ${error.message}`);
    } finally {
      setConnecting(false);
    }
  };

  const fillExampleCredentials = () => {
    setAccountId('0.0.6931304');
    setPrivateKey('0x610cccbbdc361c15cde1581c729148b01d1fa9949107af02616ae2a66a682e59');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-primary/50 max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            🔷 Connect Hedera Account
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Enter your Hedera account credentials to connect directly via SDK. 
              Your private key is stored securely in your browser session only.
            </AlertDescription>
          </Alert>

          {/* Account ID Input */}
          <div className="space-y-2">
            <Label htmlFor="accountId">Account ID</Label>
            <Input
              id="accountId"
              placeholder="0.0.123456"
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              className={errors.accountId ? 'border-red-500' : ''}
            />
            {errors.accountId && (
              <p className="text-sm text-red-500">{errors.accountId}</p>
            )}
          </div>

          {/* Private Key Input */}
          <div className="space-y-2">
            <Label htmlFor="privateKey">Private Key</Label>
            <div className="relative">
              <Input
                id="privateKey"
                type={showPrivateKey ? 'text' : 'password'}
                placeholder="0x..."
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                className={`pr-10 ${errors.privateKey ? 'border-red-500' : ''}`}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPrivateKey(!showPrivateKey)}
              >
                {showPrivateKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {errors.privateKey && (
              <p className="text-sm text-red-500">{errors.privateKey}</p>
            )}
          </div>

          {/* Example Credentials */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Need test credentials?</span>
            <Button
              variant="outline"
              size="sm"
              onClick={fillExampleCredentials}
              className="text-xs"
            >
              Use Example
            </Button>
          </div>

          {/* Security Notice */}
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              <strong>Security:</strong> Your credentials are only stored in your browser session 
              and are never sent to any server. They're used directly with the Hedera SDK.
            </AlertDescription>
          </Alert>

          {/* Connect Button */}
          <Button
            onClick={handleConnect}
            disabled={connecting}
            className="w-full"
          >
            {connecting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Connecting...
              </>
            ) : (
              'Connect to Hedera'
            )}
          </Button>

          {/* Help Links */}
          <div className="space-y-2 pt-2 border-t border-border/50">
            <p className="text-sm font-medium">Don't have a Hedera account?</p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open('https://portal.hedera.com/', '_blank')}
                className="flex-1"
              >
                <ExternalLink className="w-3 h-3 mr-2" />
                Create Account
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open('https://www.hashpack.app/', '_blank')}
                className="flex-1"
              >
                <ExternalLink className="w-3 h-3 mr-2" />
                Get HashPack
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};