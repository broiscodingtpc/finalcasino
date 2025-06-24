import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

// Animated background elements
const FloatingChips = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full opacity-20"
        initial={{ 
          x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200), 
          y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50,
          scale: Math.random() * 0.5 + 0.5
        }}
        animate={{ 
          y: -50,
          x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200)
        }}
        transition={{ 
          duration: Math.random() * 15 + 20,
          repeat: Infinity,
          delay: Math.random() * 10,
          ease: "linear"
        }}
      />
    ))}
  </div>
);

// Animated money symbols
const MoneyRain = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute text-2xl opacity-10 text-green-400"
        initial={{ 
          x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200), 
          y: -50,
          rotate: 0
        }}
        animate={{ 
          y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50,
          rotate: 360
        }}
        transition={{ 
          duration: Math.random() * 12 + 18,
          repeat: Infinity,
          delay: Math.random() * 8,
          ease: "linear"
        }}
      >
        $
      </motion.div>
    ))}
  </div>
);

interface CasinoDashboardProps {
  user: any;
  balance: number;
  onSelectGame: (game: string) => void;
}

const games = [
  {
    id: 'coinflip',
    title: 'Coin Flip',
    description: 'Classic heads or tails - 50/50 chance to double your bet',
    icon: 'fas fa-coins',
    color: 'from-yellow-600 to-yellow-500'
  },
  {
    id: 'numberroll',
    title: 'Number Roll',
    description: 'Pick a number 1-100. Roll under to win big!',
    icon: 'fas fa-dice',
    color: 'from-blue-600 to-blue-500'
  }
];

export default function CasinoDashboard({ user, balance, onSelectGame }: CasinoDashboardProps) {
  const [displayBalance, setDisplayBalance] = useState(0);
  const [showBalanceReveal, setShowBalanceReveal] = useState(true);

  // Animate balance counting up effect
  useEffect(() => {
    if (balance > 0 && showBalanceReveal) {
      let currentBalance = 0;
      const increment = balance / 100;
      const timer = setInterval(() => {
        currentBalance += increment;
        if (currentBalance >= balance) {
          setDisplayBalance(balance);
          setShowBalanceReveal(false);
          clearInterval(timer);
        } else {
          setDisplayBalance(Math.floor(currentBalance));
        }
      }, 20);

      return () => clearInterval(timer);
    } else {
      setDisplayBalance(balance);
    }
  }, [balance, showBalanceReveal]);
  return (
    <motion.div
      className="min-h-screen p-6 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <FloatingChips />
      <MoneyRain />
      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Welcome Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-orbitron font-bold text-4xl mb-4 gradient-text">
            WELCOME TO THE ARENA
          </h1>
          <p className="text-xl text-gray-300 mb-4">
            Hello, <span className="text-red-500 font-semibold">{user?.username || user?.email}</span>
          </p>
          <div className="bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-lg p-3 max-w-md mx-auto">
            <p className="text-[#FFD700] text-sm">
              🎮 Demo Casino - Games launch in a few days with real JOKER tokens
            </p>
          </div>
        </motion.div>

        {/* Balance Card */}
        <motion.div
          className="glass-card rounded-2xl p-8 mb-12 text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50">
              <i className="fas fa-wallet text-2xl text-white"></i>
            </div>
          </div>
          <h2 className="font-orbitron font-bold text-2xl mb-2" style={{ color: '#F5F5F5' }}>Your Demo Balance</h2>
          <motion.p 
            className="text-4xl font-bold mb-4" 
            style={{ color: '#FFD700', textShadow: '0 0 15px #FFD700' }}
            animate={showBalanceReveal ? {
              scale: [1, 1.1, 1],
              textShadow: [
                '0 0 15px #FFD700',
                '0 0 25px #FFD700, 0 0 35px #39FF14',
                '0 0 15px #FFD700'
              ]
            } : {}}
            transition={{ duration: 0.3, repeat: showBalanceReveal ? Infinity : 0 }}
          >
            {displayBalance.toLocaleString()} JOKER
          </motion.p>
          {showBalanceReveal && (
            <motion.div
              className="text-[#39FF14] text-sm font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              🎉 Welcome bonus activated!
            </motion.div>
          )}
          <div className="flex justify-center space-x-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                className="text-black font-bold"
                style={{ 
                  background: 'linear-gradient(45deg, #39FF14, #FFD700)',
                  boxShadow: '0 8px 20px rgba(57, 255, 20, 0.3)'
                }}
              >
                <i className="fas fa-plus mr-2"></i>
                Deposit
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                className="text-white font-bold border"
                style={{ 
                  background: 'linear-gradient(45deg, #9A00FF, #FF0033)',
                  borderColor: '#9A00FF',
                  boxShadow: '0 8px 20px rgba(154, 0, 255, 0.3)'
                }}
              >
                <i className="fas fa-minus mr-2"></i>
                Withdraw
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Games Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              className="glass-card rounded-2xl p-8 hover:scale-105 transition-transform duration-300 cursor-pointer"
              style={{ 
                border: '1px solid #9A00FF',
                background: 'rgba(13, 13, 13, 0.9)'
              }}
              onClick={() => onSelectGame(game.id)}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(154, 0, 255, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 + (index * 0.2) }}
            >
              <motion.div 
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                style={{
                  background: game.id === 'coinflip' 
                    ? 'linear-gradient(45deg, #FFD700, #FFF300)'
                    : 'linear-gradient(45deg, #39FF14, #9A00FF)',
                  boxShadow: game.id === 'coinflip'
                    ? '0 8px 20px rgba(255, 215, 0, 0.4)'
                    : '0 8px 20px rgba(57, 255, 20, 0.4)'
                }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <i className={`${game.icon} text-3xl text-black`}></i>
              </motion.div>
              <h3 className="font-orbitron font-bold text-2xl mb-3 text-center" style={{ color: '#F5F5F5' }}>
                {game.title}
              </h3>
              <p className="text-center mb-6" style={{ color: '#F5F5F5', opacity: 0.8 }}>
                {game.description}
              </p>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  className="w-full text-black font-bold"
                  style={{
                    background: 'linear-gradient(45deg, #39FF14, #FFD700)',
                    boxShadow: '0 8px 20px rgba(57, 255, 20, 0.3)'
                  }}
                >
                  <i className="fas fa-play mr-2"></i>
                  Play Now
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Account Info */}
        <motion.div
          className="mt-12 glass-card rounded-2xl p-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h3 className="font-orbitron font-bold text-xl mb-4">Account Information</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Email:</p>
              <p className="text-white">{user?.email}</p>
            </div>
            <div>
              <p className="text-gray-400">Wallet Address:</p>
              <p className="text-white font-mono text-xs">{user?.walletAddress}</p>
            </div>
          </div>
        </motion.div>

        {/* Deposit Instructions */}
        <motion.div
          className="mt-8 glass-card rounded-2xl p-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <h3 className="font-orbitron font-bold text-xl mb-4 text-center">Deposit Instructions</h3>
          <div className="bg-black/50 rounded-lg p-4 mb-4">
            <p className="text-gray-400 mb-2">Send $JOKERS tokens to:</p>
            <div className="flex items-center justify-between bg-gray-900 rounded p-3">
              <span className="font-mono text-sm">jkrtQ5V9FpZw2wxzAVJx6SaNzfz6h9aZkv3HUdaS3B4</span>
              <Button size="sm" className="bg-gray-700 hover:bg-gray-600">
                <i className="fas fa-copy"></i>
              </Button>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center">
            * 8% tax applies to all transfers. Your balance will be updated automatically.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}