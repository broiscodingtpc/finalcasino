import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";

interface CasinoRegisterProps {
  onRegister: (userData: any) => void;
  onSwitchToLogin: () => void;
}

export default function CasinoRegister({ onRegister, onSwitchToLogin }: CasinoRegisterProps) {
  const [email, setEmail] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [username, setUsername] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  const handleWalletConnect = async () => {
    setIsConnecting(true);
    setTimeout(() => {
      setWalletAddress("PhantomWallet123...xyz");
      setIsConnecting(false);
    }, 2000);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && walletAddress && username) {
      onRegister({
        email,
        walletAddress,
        username,
        registrationTime: new Date()
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
          <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/50">
            <i className="fas fa-user-plus text-3xl text-white"></i>
          </div>
          
          <h1 className="font-orbitron font-bold text-3xl mb-2 gradient-text">JOIN THE ARENA</h1>
          <p className="text-gray-400 mb-8">Create your account and start playing</p>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="text-left">
              <Label htmlFor="username" className="text-white mb-2 block">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-black/50 border-red-500/30 text-white"
                placeholder="Choose a username"
                required
              />
            </div>

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

            <Button
              type="submit"
              disabled={!email || !walletAddress || !username}
              className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold py-3"
            >
              <i className="fas fa-rocket mr-2"></i>
              Create Account
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-gray-400">
              Already have an account?{" "}
              <button
                onClick={onSwitchToLogin}
                className="text-red-500 hover:text-red-400 font-semibold"
              >
                Sign In
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}