import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";

interface CasinoLoginProps {
  onLogin: (userData: any) => void;
  onSwitchToRegister: () => void;
}

export default function CasinoLogin({ onLogin, onSwitchToRegister }: CasinoLoginProps) {
  const [email, setEmail] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  const handleWalletConnect = async () => {
    setIsConnecting(true);
    // TODO: Implement Solana wallet connection (Phantom, Solflare, Backpack)
    // Placeholder for wallet connection logic
    setTimeout(() => {
      setWalletAddress("PhantomWallet123...xyz"); // Mock wallet address
      setIsConnecting(false);
    }, 2000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && walletAddress) {
      onLogin({
        email,
        walletAddress,
        loginTime: new Date()
      });
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full max-w-md">
        <Link href="/" className="absolute top-6 left-6 z-50">
          <Button className="bg-gray-700 hover:bg-gray-600">
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Site
          </Button>
        </Link>
        
        <motion.div
          className="glass-card rounded-2xl p-8 text-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Logo */}
          <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/50">
            <i className="fas fa-dice text-3xl text-white"></i>
          </div>
          
          <h1 className="font-orbitron font-bold text-3xl mb-2 gradient-text">CASINO LOGIN</h1>
          <p className="text-gray-400 mb-8">Connect your wallet and enter the arena</p>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div className="text-left">
              <Label htmlFor="email" className="text-white mb-2 block">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black/50 border-red-500/30 text-white"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Wallet Connection */}
            <div className="text-left">
              <Label className="text-white mb-2 block">Solana Wallet</Label>
              {!walletAddress ? (
                <Button
                  type="button"
                  onClick={handleWalletConnect}
                  disabled={isConnecting}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white"
                >
                  {isConnecting ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Connecting...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-wallet mr-2"></i>
                      Connect Wallet
                    </>
                  )}
                </Button>
              ) : (
                <div className="bg-black/50 border border-green-500/30 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-green-400 text-sm font-mono">{walletAddress}</span>
                    <i className="fas fa-check-circle text-green-400"></i>
                  </div>
                </div>
              )}
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={!email || !walletAddress}
              className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold py-3"
            >
              <i className="fas fa-sign-in-alt mr-2"></i>
              Enter Casino
            </Button>
          </form>

          {/* Register Link */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-gray-400">
              New to Joker's Arena?{" "}
              <button
                onClick={onSwitchToRegister}
                className="text-red-500 hover:text-red-400 font-semibold"
              >
                Create Account
              </button>
            </p>
          </div>

          {/* Supported Wallets */}
          <div className="mt-6">
            <p className="text-xs text-gray-500 mb-3">Supported Wallets</p>
            <div className="flex justify-center space-x-4">
              <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                <i className="fas fa-wallet text-purple-400 text-xs"></i>
              </div>
              <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                <i className="fas fa-coins text-orange-400 text-xs"></i>
              </div>
              <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                <i className="fas fa-shield-alt text-blue-400 text-xs"></i>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}