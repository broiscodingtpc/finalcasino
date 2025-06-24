import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import CasinoLogin from "@/components/casino/casino-login";
import CasinoRegister from "@/components/casino/casino-register";
import CasinoDashboard from "@/components/casino/casino-dashboard";
import CoinFlipGame from "@/components/casino/coin-flip-game";
import NumberRollGame from "@/components/casino/number-roll-game";
import WalletIntegration from "@/components/wallet-integration";
import { jokerTokenService } from "@/lib/joker-token";
import casinoPattern from "@assets/20250610_0334_Casino Theme Pattern_simple_compose_01jxbm3n8pedr9tcw6yhhgnepf_1749609400764.png";

type GameType = 'coinflip' | 'numberroll';
type ViewType = 'wallet' | 'login' | 'register' | 'dashboard' | GameType;

interface User {
  email: string;
  walletAddress: string;
  username?: string;
  loginTime?: Date;
  registrationTime?: Date;
  jokerBalance?: number;
}

export default function Casino() {
  const [currentView, setCurrentView] = useState<ViewType>('wallet');
  const [user, setUser] = useState<User | null>(null);
  const [userBalance, setUserBalance] = useState(0);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');

  // Handle wallet connection with automatic demo balance
  const handleWalletConnect = async (publicKey: string) => {
    setWalletAddress(publicKey);
    setWalletConnected(true);
    
    // Generate demo balance automatically (15,000 - 50,000 JOKER)
    const demoBalance = 15000 + Math.floor(Math.random() * 35000);
    setUserBalance(demoBalance);
    
    // Create user object with wallet data and demo balance
    const walletUser: User = {
      email: '',
      walletAddress: publicKey,
      username: `Player ${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`,
      loginTime: new Date(),
      jokerBalance: demoBalance
    };
    
    setUser(walletUser);
    setCurrentView('dashboard');
    
    // Store the demo balance in the JOKER token service
    jokerTokenService.updateBalance(publicKey, demoBalance);
  };

  const handleWalletDisconnect = () => {
    setWalletConnected(false);
    setWalletAddress('');
    setUser(null);
    setUserBalance(0);
    setCurrentView('login');
  };

  // Handle login for non-wallet users with automatic demo balance
  const handleLogin = (userData: User) => {
    // Generate demo balance automatically (15,000 - 50,000 JOKER)
    const demoBalance = 15000 + Math.floor(Math.random() * 35000);
    
    const userWithBalance = {
      ...userData,
      jokerBalance: demoBalance
    };
    
    setUser(userWithBalance);
    setUserBalance(demoBalance);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setUserBalance(0);
    setCurrentView('login');
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Casino Background Pattern */}
      <div 
        className="fixed inset-0 opacity-15"
        style={{
          backgroundImage: `url(${casinoPattern})`,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat'
        }}
      />
      {/* Casino Background Effects */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-pink-900/30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      </div>

      {/* Demo Announcement Banner */}
      <div className="fixed top-0 w-full z-50 bg-gradient-to-r from-[#FFD700] to-[#FFF300] text-black py-2 text-center font-bold text-sm">
        🎮 DEMO VERSION - All games are for demonstration purposes. Full casino launches in a few days!
      </div>

      {/* Navigation Header */}
      <nav className="fixed top-8 w-full z-40 glass-card border-b border-red-500/20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-500 rounded-lg flex items-center justify-center shadow-lg shadow-red-500/50">
              <i className="fas fa-mask text-white"></i>
            </div>
            <span className="font-orbitron font-bold text-xl gradient-text">JOKER'S ARENA</span>
          </Link>
          
          {user && (
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-400">Demo Balance</p>
                <p className="font-bold" style={{ color: '#FFD700', textShadow: '0 0 10px #FFD700' }}>
                  {userBalance.toLocaleString()} JOKER
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-28 relative z-10">
        <AnimatePresence mode="wait">
          {!walletConnected && currentView === 'wallet' && (
            <motion.div
              key="wallet-connect"
              className="min-h-screen flex items-center justify-center relative overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Animated Background Elements */}
              <div className="absolute inset-0">
                <motion.div
                  className="absolute top-20 left-20 w-32 h-32 bg-[#39FF14]/20 rounded-full blur-2xl"
                  animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute bottom-20 right-20 w-40 h-40 bg-[#9A00FF]/20 rounded-full blur-2xl"
                  animate={{
                    x: [0, -80, 0],
                    y: [0, 60, 0],
                    scale: [1, 0.8, 1],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
                <motion.div
                  className="absolute top-1/2 left-1/2 w-20 h-20 bg-[#FFD700]/30 rounded-full blur-xl"
                  animate={{
                    x: [0, 60, -60, 0],
                    y: [0, -40, 40, 0],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
              </div>

              <div className="max-w-lg mx-auto px-6 relative z-10">
                <motion.div
                  className="glass-card rounded-3xl p-10 text-center relative overflow-hidden"
                  initial={{ scale: 0.8, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
                  style={{
                    background: 'rgba(13, 13, 13, 0.95)',
                    border: '1px solid rgba(154, 0, 255, 0.3)',
                    boxShadow: '0 25px 50px rgba(154, 0, 255, 0.2)'
                  }}
                >
                  {/* Animated Border Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      background: 'linear-gradient(45deg, #39FF14, #FFD700, #9A00FF, #FF0033)',
                      backgroundSize: '400% 400%',
                    }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div 
                    className="absolute inset-[2px] rounded-3xl"
                    style={{ background: 'rgba(13, 13, 13, 0.98)' }}
                  />

                  <div className="relative z-10">
                    {/* Animated Wallet Icon */}
                    <motion.div
                      className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center relative"
                      style={{
                        background: 'linear-gradient(45deg, #39FF14, #FFD700)',
                        boxShadow: '0 15px 35px rgba(57, 255, 20, 0.4)'
                      }}
                      animate={{
                        boxShadow: [
                          '0 15px 35px rgba(57, 255, 20, 0.4)',
                          '0 15px 35px rgba(255, 215, 0, 0.6)',
                          '0 15px 35px rgba(57, 255, 20, 0.4)'
                        ],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <motion.i 
                        className="fas fa-wallet text-4xl text-black"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </motion.div>

                    <motion.h1 
                      className="font-orbitron font-bold text-4xl mb-6 gradient-text"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    >
                      Enter the Arena
                    </motion.h1>

                    <motion.p 
                      className="text-gray-300 mb-6 text-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                    >
                      Connect your wallet to access the demo casino
                    </motion.p>

                    <motion.div 
                      className="bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-xl p-4 mb-8"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 1 }}
                    >
                      <p className="text-[#FFD700] text-sm">
                        🎮 Demo Version - Simulated JOKER tokens for testing
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.2 }}
                    >
                      <WalletIntegration 
                        onWalletConnect={handleWalletConnect}
                        onWalletDisconnect={handleWalletDisconnect}
                      />
                    </motion.div>

                    <motion.div 
                      className="mt-8 pt-6 border-t border-gray-700/50"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 1.4 }}
                    >
                      <p className="text-sm text-gray-500 mb-4">
                        Alternative access methods
                      </p>
                      <div className="flex justify-center space-x-6">
                        <motion.button 
                          onClick={() => setCurrentView('register')}
                          className="text-[#39FF14] hover:text-[#2ee611] transition-colors text-sm font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Create Account
                        </motion.button>
                        <motion.button 
                          onClick={() => setCurrentView('login')}
                          className="text-[#9A00FF] hover:text-[#b533ff] transition-colors text-sm font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Email Login
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {currentView === 'login' && (
            <CasinoLogin
              key="login"
              onLogin={handleLogin}
              onSwitchToRegister={() => setCurrentView('register')}
            />
          )}
          
          {currentView === 'register' && (
            <CasinoRegister
              key="register"
              onRegister={handleLogin}
              onSwitchToLogin={() => setCurrentView('login')}
            />
          )}
          
          {currentView === 'dashboard' && (
            <CasinoDashboard
              key="dashboard"
              user={user}
              balance={userBalance}
              onSelectGame={(game: string) => setCurrentView(game as GameType)}
            />
          )}
          
          {currentView === 'coinflip' && (
            <CoinFlipGame
              key="coinflip"
              balance={userBalance}
              onUpdateBalance={setUserBalance}
              onBack={() => setCurrentView('dashboard')}
              walletAddress={walletAddress || user?.walletAddress}
            />
          )}
          
          {currentView === 'numberroll' && (
            <NumberRollGame
              key="numberroll"
              balance={userBalance}
              onUpdateBalance={setUserBalance}
              onBack={() => setCurrentView('dashboard')}
              walletAddress={walletAddress || user?.walletAddress}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}