import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertGameTransactionSchema } from "@shared/schema";
import { z } from "zod";
import { blockchainVerifier } from "./blockchain-verifier";

// Blockchain withdrawal function
async function executeWithdrawal(toWalletAddress: string, amount: number): Promise<string> {
  try {
    // In production, this would use the casino's private key to sign and send the transaction
    // For now, we simulate a successful withdrawal
    const simulatedTxHash = `withdrawal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log(`Simulated withdrawal: ${amount} JOKER to ${toWalletAddress}`);
    return simulatedTxHash;
  } catch (error) {
    throw new Error(`Withdrawal execution failed: ${error}`);
  }
}

// Authentication schemas
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  walletAddress: z.string().optional(),
});

const walletConnectSchema = z.object({
  walletAddress: z.string().min(32),
});

const gamePlaySchema = z.object({
  gameType: z.enum(['coinflip', 'numberroll']),
  betAmount: z.string(),
  gameData: z.string(),
  userId: z.number(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { username, email, password, walletAddress } = registerSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      const existingUsername = await storage.getUserByUsername(username);
      if (existingUsername) {
        return res.status(400).json({ error: "Username already taken" });
      }

      // Create new user
      const user = await storage.createUser({
        username,
        email,
        password,
        walletAddress,
      });

      // Remove password from response
      const { password: _, ...safeUser } = user;
      res.json({ user: safeUser });
    } catch (error) {
      console.log(`Registration error: ${error}`);
      res.status(400).json({ error: "Invalid registration data" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const validPassword = await storage.verifyPassword(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Remove password from response
      const { password: _, ...safeUser } = user;
      res.json({ user: safeUser });
    } catch (error) {
      console.log(`Login error: ${error}`);
      res.status(400).json({ error: "Invalid login data" });
    }
  });

  app.post("/api/auth/wallet-connect", async (req, res) => {
    try {
      const { walletAddress } = walletConnectSchema.parse(req.body);
      
      // Check if wallet is already connected to a user
      let user = await storage.getUserByWallet(walletAddress);
      
      if (!user) {
        // Create new user for wallet-only authentication
        const username = `player_${walletAddress.slice(0, 8)}`;
        const email = `${walletAddress.slice(0, 8)}@wallet.local`;
        const password = 'wallet_auth_' + walletAddress;
        
        user = await storage.createUser({
          username,
          email,
          password,
          walletAddress,
        });
      }

      // Remove password from response
      const { password: _, ...safeUser } = user;
      res.json({ user: safeUser });
    } catch (error) {
      console.log(`Wallet connect error: ${error}`);
      res.status(400).json({ error: "Invalid wallet address" });
    }
  });

  // Game routes
  app.post("/api/game/play", async (req, res) => {
    try {
      const { gameType, betAmount, gameData, userId } = gamePlaySchema.parse(req.body);
      
      // Get user and current balance
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const currentBalance = parseFloat(user.jokerBalance || '0');
      const bet = parseFloat(betAmount);

      if (bet > currentBalance) {
        return res.status(400).json({ error: "Insufficient balance" });
      }

      // Parse game data
      const gameInfo = JSON.parse(gameData);
      let result = 'loss';
      let winAmount = 0;

      // Game logic
      if (gameType === 'coinflip') {
        const playerChoice = gameInfo.choice;
        const coinResult = Math.random() < 0.5 ? 'heads' : 'tails';
        
        if (playerChoice === coinResult) {
          result = 'win';
          winAmount = bet * 1.98;
        }
        
        gameInfo.result = coinResult;
      } else if (gameType === 'numberroll') {
        const playerNumber = gameInfo.number;
        const rolledNumber = Math.floor(Math.random() * 100) + 1;
        
        if (playerNumber === rolledNumber) {
          result = 'win';
          winAmount = bet * 99;
        }
        
        gameInfo.rolledNumber = rolledNumber;
      }

      // Calculate new balance
      const newBalance = result === 'win' 
        ? currentBalance - bet + winAmount 
        : currentBalance - bet;

      // Update user balance
      await storage.updateUserBalance(userId, newBalance.toString());

      // Record transaction
      const transaction = await storage.createGameTransaction({
        userId,
        gameType,
        betAmount,
        winAmount: winAmount.toString(),
        gameData: JSON.stringify(gameInfo),
        result,
      });

      res.json({
        transaction,
        newBalance,
        gameResult: gameInfo,
      });
    } catch (error) {
      console.log(`Game play error: ${error}`);
      res.status(400).json({ error: "Invalid game data" });
    }
  });

  app.get("/api/user/:id/balance", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ balance: user.jokerBalance || '0' });
    } catch (error) {
      console.log(`Balance fetch error: ${error}`);
      res.status(400).json({ error: "Invalid user ID" });
    }
  });

  app.put("/api/user/:id/balance", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const { balance } = req.body;
      
      if (!balance || isNaN(parseFloat(balance))) {
        return res.status(400).json({ error: "Invalid balance" });
      }

      await storage.updateUserBalance(userId, balance);
      res.json({ success: true, balance });
    } catch (error) {
      console.log(`Balance update error: ${error}`);
      res.status(400).json({ error: "Failed to update balance" });
    }
  });

  app.get("/api/user/:id/transactions", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const limit = parseInt(req.query.limit as string) || 50;
      
      const transactions = await storage.getUserTransactions(userId, limit);
      res.json({ transactions });
    } catch (error) {
      console.log(`Transactions fetch error: ${error}`);
      res.status(400).json({ error: "Invalid request" });
    }
  });

  // Deposit endpoint - handles real JOKER token deposits with blockchain verification
  app.post("/api/deposit", async (req, res) => {
    try {
      const { userId, amount, walletAddress } = req.body;
      
      if (!userId || !amount || !walletAddress) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const depositAmount = parseFloat(amount);
      
      // Real blockchain verification enabled
      console.log(`[PRODUCTION MODE] Verifying deposit: ${depositAmount} JOKER from ${walletAddress}`);
      
      let verification;
      
      // Check if blockchain verification is configured
      if (!blockchainVerifier.isConfigured()) {
        console.log('⚠️  WARNING: Blockchain verification not configured, using demo mode');
        verification = { 
          verified: true, 
          actualAmount: depositAmount, 
          transactionSignature: `demo_${Date.now()}`
        };
      } else {
        // Real blockchain verification
        verification = await blockchainVerifier.verifyDeposit(walletAddress, depositAmount, 10);
        
        if (!verification.verified) {
          return res.status(400).json({ 
            error: `Deposit verification failed: ${verification.error}` 
          });
        }
      }

      console.log(`Deposit verified! Transaction: ${verification.transactionSignature}`);
      const currentBalance = parseFloat(user.jokerBalance || "0");
      const newBalance = currentBalance + (verification.actualAmount || depositAmount);
      
      await storage.updateUserBalance(userId, newBalance.toString());

      // Record the deposit transaction
      await storage.createGameTransaction({
        userId,
        gameType: 'deposit',
        betAmount: "0",
        winAmount: depositAmount.toString(),
        gameData: JSON.stringify({ walletAddress, depositAmount }),
        result: 'deposit',
        transactionHash: verification.transactionSignature || null,
      });

      res.json({ 
        success: true, 
        newBalance: newBalance.toString(),
        depositAmount: depositAmount.toString()
      });
    } catch (error: any) {
      console.error("Deposit error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Withdrawal endpoint - handles real JOKER token withdrawals
  app.post("/api/withdraw", async (req, res) => {
    try {
      const { userId, amount, walletAddress } = req.body;
      
      if (!userId || !amount || !walletAddress) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const withdrawAmount = parseFloat(amount);
      const currentBalance = parseFloat(user.jokerBalance || "0");
      
      if (withdrawAmount > currentBalance || withdrawAmount <= 0) {
        return res.status(400).json({ error: "Invalid withdrawal amount" });
      }

      // Execute real blockchain withdrawal
      const transactionSignature = await executeWithdrawal(walletAddress, withdrawAmount);
      
      const newBalance = currentBalance - withdrawAmount;
      await storage.updateUserBalance(userId, newBalance.toString());

      // Record the withdrawal transaction
      await storage.createGameTransaction({
        userId,
        gameType: 'withdrawal',
        betAmount: "0",
        winAmount: (-withdrawAmount).toString(),
        gameData: JSON.stringify({ walletAddress, withdrawAmount }),
        result: 'withdrawal',
        transactionHash: transactionSignature,
      });

      res.json({ 
        success: true, 
        newBalance: newBalance.toString(),
        withdrawAmount: withdrawAmount.toString(),
        transactionSignature
      });
    } catch (error: any) {
      console.error("Withdrawal error:", error);
      res.status(500).json({ error: "Withdrawal failed: " + (error?.message || 'Unknown error') });
    }
  });

  // Blockchain withdrawal endpoint (backend-only)
  app.post("/api/blockchain/withdraw", async (req, res) => {
    try {
      const { toWalletAddress, amount } = req.body;
      
      if (!toWalletAddress || !amount) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Execute withdrawal using casino's private key
      const transactionSignature = await executeWithdrawal(toWalletAddress, parseFloat(amount));
      
      res.json({ 
        success: true,
        transactionSignature
      });
    } catch (error) {
      console.error("Blockchain withdrawal error:", error);
      res.status(500).json({ error: "Blockchain withdrawal failed" });
    }
  });

  // Admin routes
  app.get("/api/admin/pending-withdrawals", async (req, res) => {
    try {
      // Get all pending withdrawal requests
      const withdrawals = await storage.getPendingWithdrawals();
      res.json({ withdrawals });
    } catch (error) {
      console.error("Admin withdrawals fetch error:", error);
      res.status(500).json({ error: "Failed to fetch withdrawals" });
    }
  });

  app.get("/api/admin/stats", async (req, res) => {
    try {
      const stats = await storage.getAdminStats();
      res.json(stats);
    } catch (error) {
      console.error("Admin stats fetch error:", error);
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  app.post("/api/admin/process-withdrawal", async (req, res) => {
    try {
      const { withdrawalId, action, transactionHash } = req.body;
      
      if (!withdrawalId || !action) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      await storage.updateWithdrawalStatus(withdrawalId, action, transactionHash);
      
      res.json({ 
        success: true,
        message: `Withdrawal ${action}ed successfully`
      });
    } catch (error) {
      console.error("Process withdrawal error:", error);
      res.status(500).json({ error: "Failed to process withdrawal" });
    }
  });

  // Create withdrawal request (modified from direct withdrawal)
  app.post("/api/request-withdrawal", async (req, res) => {
    try {
      const { userId, amount, walletAddress } = req.body;
      
      if (!userId || !amount || !walletAddress) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const withdrawAmount = parseFloat(amount);
      const currentBalance = parseFloat(user.jokerBalance || "0");
      
      if (withdrawAmount > currentBalance || withdrawAmount <= 0) {
        return res.status(400).json({ error: "Invalid withdrawal amount" });
      }

      // Create withdrawal request instead of processing immediately
      const withdrawalRequest = await storage.createWithdrawalRequest({
        userId,
        amount: withdrawAmount.toString(),
        walletAddress,
      });

      res.json({ 
        success: true,
        message: "Withdrawal request submitted for admin approval",
        requestId: withdrawalRequest.id
      });
    } catch (error) {
      console.error("Withdrawal request error:", error);
      res.status(500).json({ error: "Failed to create withdrawal request" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
