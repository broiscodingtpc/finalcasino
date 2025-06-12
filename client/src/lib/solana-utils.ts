import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

// Solana network configuration
export const NETWORKS = {
  devnet: 'https://api.devnet.solana.com',
  mainnet: 'https://api.mainnet-beta.solana.com'
};

export class SolanaService {
  private connection: Connection;

  constructor(network: 'devnet' | 'mainnet' = 'devnet') {
    this.connection = new Connection(NETWORKS[network], 'confirmed');
  }

  async getBalance(publicKey: string): Promise<number> {
    try {
      const pubKey = new PublicKey(publicKey);
      const balance = await this.connection.getBalance(pubKey);
      return balance / LAMPORTS_PER_SOL;
    } catch (error) {
      console.error('Error fetching balance:', error);
      return 0;
    }
  }

  async getTokenBalance(publicKey: string, tokenMint: string): Promise<number> {
    try {
      const pubKey = new PublicKey(publicKey);
      const tokenAccounts = await this.connection.getParsedTokenAccountsByOwner(
        pubKey,
        { mint: new PublicKey(tokenMint) }
      );

      if (tokenAccounts.value.length > 0) {
        const tokenAmount = tokenAccounts.value[0].account.data.parsed.info.tokenAmount;
        return parseFloat(tokenAmount.uiAmount || '0');
      }
      return 0;
    } catch (error) {
      console.error('Error fetching token balance:', error);
      return 0;
    }
  }

  async validateAddress(address: string): Promise<boolean> {
    try {
      new PublicKey(address);
      return true;
    } catch {
      return false;
    }
  }

  async getRecentBlockhash(): Promise<string> {
    try {
      const { blockhash } = await this.connection.getRecentBlockhash();
      return blockhash;
    } catch (error) {
      console.error('Error fetching recent blockhash:', error);
      throw error;
    }
  }
}

export const solanaService = new SolanaService();

// Utility functions for wallet interactions
export const formatSolBalance = (balance: number): string => {
  if (balance < 0.001) return '< 0.001 SOL';
  return `${balance.toFixed(3)} SOL`;
};

export const formatTokenBalance = (balance: number, decimals: number = 6): string => {
  if (balance < Math.pow(10, -decimals)) return `< ${Math.pow(10, -decimals)} JOKER`;
  return `${balance.toLocaleString()} JOKER`;
};

export const shortenAddress = (address: string, chars: number = 4): string => {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};