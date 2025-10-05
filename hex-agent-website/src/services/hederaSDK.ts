import { Client, AccountId, PrivateKey, TopicMessageSubmitTransaction, AccountBalanceQuery } from '@hashgraph/sdk';
import { WalletInfo } from '@/hooks/useWallet';

// Hedera SDK Integration for Direct Account Access
export class HederaSDKWallet {
  private client: Client;
  private accountId: AccountId;
  private privateKey: PrivateKey;

  constructor(accountIdString: string, privateKeyString: string, network: 'testnet' | 'mainnet' = 'testnet') {
    this.accountId = AccountId.fromString(accountIdString);
    this.privateKey = PrivateKey.fromStringECDSA(privateKeyString);
    
    // Configure client for testnet or mainnet
    if (network === 'testnet') {
      this.client = Client.forTestnet();
    } else {
      this.client = Client.forMainnet();
    }
    
    this.client.setOperator(this.accountId, this.privateKey);
  }

  async connect(): Promise<WalletInfo> {
    try {
      // Test connection by querying account balance
      const balance = await this.getBalance();
      
      return {
        type: 'hedera',
        address: this.accountId.toString(),
        balance: `${balance} HBAR`,
        network: 'Hedera Testnet (SDK)',
        isConnected: true
      };
    } catch (error: any) {
      throw new Error(`Hedera SDK connection failed: ${error.message}`);
    }
  }

  async getBalance(): Promise<string> {
    try {
      const balance = await new AccountBalanceQuery()
        .setAccountId(this.accountId)
        .execute(this.client);
      
      return balance.hbars.toString();
    } catch (error: any) {
      throw new Error(`Failed to get balance: ${error.message}`);
    }
  }

  async submitHCSMessage(topicId: string, message: string): Promise<string> {
    try {
      const transaction = new TopicMessageSubmitTransaction()
        .setTopicId(topicId)
        .setMessage(message);

      const txResponse = await transaction.execute(this.client);
      const receipt = await txResponse.getReceipt(this.client);
      
      return txResponse.transactionId.toString();
    } catch (error: any) {
      throw new Error(`HCS message submission failed: ${error.message}`);
    }
  }

  async disconnect(): Promise<void> {
    this.client.close();
  }

  getAccountId(): string {
    return this.accountId.toString();
  }

  getNetwork(): string {
    return 'Hedera Testnet (SDK)';
  }
}

// Factory function to create Hedera SDK wallet
export const createHederaSDKWallet = (accountId: string, privateKey: string): HederaSDKWallet => {
  return new HederaSDKWallet(accountId, privateKey, 'testnet');
};

// Integration function for useWallet hook
export const connectHederaSDKWallet = async (): Promise<WalletInfo> => {
  // Get credentials from session storage first, then environment variables as fallback
  const accountId = sessionStorage.getItem('hedera-account-id') || 
                   process.env.REACT_APP_HEDERA_ACCOUNT_ID || 
                   '0.0.6931304';
  const privateKey = sessionStorage.getItem('hedera-private-key') || 
                    process.env.REACT_APP_HEDERA_PRIVATE_KEY || 
                    '';

  if (!accountId || !privateKey) {
    throw new Error('Hedera credentials not found. Please provide account credentials or set environment variables.');
  }

  const wallet = createHederaSDKWallet(accountId, privateKey);
  return await wallet.connect();
};