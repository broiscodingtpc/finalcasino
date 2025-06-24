// JOKER Token Configuration
export const JOKER_TOKEN_CONFIG = {
  mintAddress: 'JoKeR1234567890123456789012345678901234567890', // Replace with real mint address
  decimals: 6,
  symbol: 'JOKER',
  name: 'Joker Token'
};

export class JokerTokenService {
  // Demo wallet balances for testing - in production this would query actual blockchain
  private demoBalances: Map<string, number> = new Map();

  async getJokerBalance(walletAddress: string): Promise<number> {
    // For demo purposes, generate a balance based on wallet address
    if (!this.demoBalances.has(walletAddress)) {
      // Generate demo balance between 5000-50000 JOKER based on wallet address
      const hash = this.simpleHash(walletAddress);
      const balance = 5000 + (hash % 45000);
      this.demoBalances.set(walletAddress, balance);
    }
    
    return this.demoBalances.get(walletAddress) || 10000;
  }

  updateBalance(walletAddress: string, newBalance: number): void {
    this.demoBalances.set(walletAddress, Math.max(0, newBalance));
  }

  formatJokerAmount(amount: number): string {
    return `${amount.toLocaleString()} JOKER`;
  }

  validateJokerAmount(amount: number, balance: number): boolean {
    return amount > 0 && amount <= balance;
  }

  calculateWinnings(betAmount: number, multiplier: number): number {
    return betAmount * multiplier;
  }

  // Game transaction simulation
  simulateTokenOperation(
    walletAddress: string,
    currentBalance: number,
    betAmount: number,
    isWin: boolean,
    multiplier: number = 2
  ): number {
    if (!this.validateJokerAmount(betAmount, currentBalance)) {
      return currentBalance;
    }

    let newBalance: number;
    if (isWin) {
      const winnings = this.calculateWinnings(betAmount, multiplier);
      newBalance = currentBalance + winnings - betAmount; // Subtract bet, add winnings
    } else {
      newBalance = currentBalance - betAmount; // Lose the bet
    }

    // Update stored balance
    this.updateBalance(walletAddress, newBalance);
    
    return newBalance;
  }

  // Simple hash function for generating consistent demo balances
  private simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }
}

export const jokerTokenService = new JokerTokenService();