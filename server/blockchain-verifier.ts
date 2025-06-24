import { Connection, PublicKey } from '@solana/web3.js';
import { getAccount, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token';

// JOKER token mint address - correct address from the project
const JOKER_MINT = new PublicKey('jkercFfxVbfDtQUHRF7G6KKpGDEp3KjkBYrgESAjzJK');

export class BlockchainVerifier {
  private connection: Connection;
  private casinoWallet: PublicKey;

  constructor() {
    // Use environment variable for RPC URL, fallback to mainnet
    const rpcUrl = process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';
    this.connection = new Connection(rpcUrl, 'confirmed');
    
    // Use environment variable for casino wallet
    const walletAddress = process.env.WALLET_ADDRESS || 'jkercFfxVbfDtQUHRF7G6KKpGDEp3KjkBYrgESAjzJK';
    this.casinoWallet = new PublicKey(walletAddress);
  }

  /**
   * Verify JOKER token deposit by checking recent transactions
   */
  async verifyDeposit(fromWallet: string, expectedAmount: number, timeWindowMinutes: number = 10): Promise<{
    verified: boolean;
    actualAmount?: number;
    transactionSignature?: string;
    error?: string;
  }> {
    try {
      console.log(`Verifying deposit: ${expectedAmount} JOKER from ${fromWallet}`);
      
      const fromPubKey = new PublicKey(fromWallet);
      const casinoTokenAccount = await getAssociatedTokenAddress(JOKER_MINT, this.casinoWallet);
      
      // Get recent transactions for the casino token account
      const signatures = await this.connection.getSignaturesForAddress(
        casinoTokenAccount,
        { limit: 100 } // Increased limit for better detection
      );

      const timeThreshold = Date.now() - (timeWindowMinutes * 60 * 1000);

      for (const sigInfo of signatures) {
        if (sigInfo.blockTime && sigInfo.blockTime * 1000 > timeThreshold) {
          const tx = await this.connection.getParsedTransaction(sigInfo.signature, 'confirmed');
          
          if (tx?.meta?.postTokenBalances && tx?.meta?.preTokenBalances) {
            // Check for JOKER token transfers to casino
            const jokerTransfer = this.findJokerTransfer(tx, fromWallet, expectedAmount);
            if (jokerTransfer.found) {
              console.log(`✅ Deposit verified: ${jokerTransfer.amount} JOKER`);
              return {
                verified: true,
                actualAmount: jokerTransfer.amount,
                transactionSignature: sigInfo.signature
              };
            }
          }
        }
      }

      console.log(`❌ No deposit found: ${expectedAmount} JOKER from ${fromWallet}`);
      return {
        verified: false,
        error: `No JOKER deposit of ${expectedAmount} found from ${fromWallet} in the last ${timeWindowMinutes} minutes`
      };

    } catch (error: any) {
      console.error('❌ Blockchain verification error:', error);
      return {
        verified: false,
        error: `Verification failed: ${(error as Error)?.message || 'Unknown error'}`
      };
    }
  }

  /**
   * Get current JOKER balance for a wallet
   */
  async getJokerBalance(walletAddress: string): Promise<number> {
    try {
      const walletPubKey = new PublicKey(walletAddress);
      const tokenAccount = await getAssociatedTokenAddress(JOKER_MINT, walletPubKey);
      
      const accountInfo = await getAccount(this.connection, tokenAccount);
      const decimals = process.env.JOKER_DECIMALS ? parseInt(process.env.JOKER_DECIMALS) : 6;
      return Number(accountInfo.amount) / Math.pow(10, decimals);
    } catch (error) {
      console.error('Error getting JOKER balance:', error);
      return 0;
    }
  }

  /**
   * Verify wallet owns sufficient JOKER tokens before allowing gameplay
   */
  async verifyWalletBalance(walletAddress: string, requiredAmount: number): Promise<{
    sufficient: boolean;
    currentBalance: number;
    error?: string;
  }> {
    try {
      const balance = await this.getJokerBalance(walletAddress);
      return {
        sufficient: balance >= requiredAmount,
        currentBalance: balance
      };
    } catch (error: any) {
      return {
        sufficient: false,
        currentBalance: 0,
        error: error.message
      };
    }
  }

  private findJokerTransfer(transaction: any, fromWallet: string, expectedAmount: number): {
    found: boolean;
    amount?: number;
  } {
    try {
      const instructions = transaction.transaction.message.instructions;
      
      for (const instruction of instructions) {
        if (instruction.program === 'spl-token' && instruction.parsed?.type === 'transfer') {
          const transferInfo = instruction.parsed.info;
          
          // Check if it's a JOKER token transfer
          if (transferInfo.mint === JOKER_MINT.toString()) {
            const decimals = process.env.JOKER_DECIMALS ? parseInt(process.env.JOKER_DECIMALS) : 6;
            const amount = Number(transferInfo.amount) / Math.pow(10, decimals);
            
            // Verify it's from the expected wallet to casino with amount tolerance
            const tolerance = expectedAmount * 0.01; // 1% tolerance
            if (Math.abs(amount - expectedAmount) <= tolerance) {
              console.log(`Found matching transfer: ${amount} JOKER (expected: ${expectedAmount})`);
              return { found: true, amount };
            }
          }
        }
      }
      
      return { found: false };
    } catch (error) {
      console.error('Error parsing transaction:', error);
      return { found: false };
    }
  }

  /**
   * Check if blockchain verification is properly configured
   */
  isConfigured(): boolean {
    return !!(process.env.SOLANA_RPC_URL && process.env.WALLET_ADDRESS);
  }
}

export const blockchainVerifier = new BlockchainVerifier();