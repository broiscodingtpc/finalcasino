import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { jokerTokenService } from "@/lib/joker-token";

// Enhanced particle effect for wins
const WinParticle = ({ delay = 0, x = 0, y = 0 }) => (
  <motion.div
    className="absolute w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
    initial={{ 
      x, y,
      opacity: 0,
      scale: 0
    }}
    animate={{ 
      x: x + (Math.random() - 0.5) * 600, 
      y: y + (Math.random() - 0.5) * 600,
      opacity: [0, 1, 0],
      scale: [0, 2, 0]
    }}
    transition={{ 
      duration: 2, 
      delay: delay,
      ease: "easeOut"
    }}
  />
);

// Number explosion effect
const NumberExplosion = ({ show, trigger }: { show: boolean; trigger: number }) => (
  <AnimatePresence>
    {show && (
      <motion.div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {[...Array(20)].map((_, i) => (
          <WinParticle 
            key={`${trigger}-${i}`} 
            delay={i * 0.03} 
            x={(Math.random() - 0.5) * 150}
            y={(Math.random() - 0.5) * 150}
          />
        ))}
      </motion.div>
    )}
  </AnimatePresence>
);

// Floating dice background
const FloatingDice = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-12 h-12 opacity-5 text-white text-4xl flex items-center justify-center"
        initial={{ 
          x: Math.random() * window.innerWidth, 
          y: window.innerHeight + 50,
          rotate: 0
        }}
        animate={{ 
          y: -50,
          rotate: 720
        }}
        transition={{ 
          duration: Math.random() * 8 + 12,
          repeat: Infinity,
          delay: Math.random() * 4,
          ease: "linear"
        }}
      >
        {"⚀⚁⚂⚃⚄⚅"[Math.floor(Math.random() * 6)]}
      </motion.div>
    ))}
  </div>
);

interface NumberRollGameProps {
  balance: number;
  onUpdateBalance: (newBalance: number) => void;
  onBack: () => void;
  walletAddress?: string;
}

export default function NumberRollGame({ balance, onUpdateBalance, onBack, walletAddress }: NumberRollGameProps) {
  const [betAmount, setBetAmount] = useState<number>(100);
  const [targetNumber, setTargetNumber] = useState<number>(50);
  const [isRolling, setIsRolling] = useState(false);
  const [gameResult, setGameResult] = useState<{ rolledNumber: number; won: boolean; payout: number } | null>(null);
  const [rollingNumber, setRollingNumber] = useState<number>(1);
  const [showExplosion, setShowExplosion] = useState(false);
  const [explosionKey, setExplosionKey] = useState(0);

  const calculatePayout = (target: number) => {
    const winChance = target / 100;
    return Math.floor((0.99 / winChance) * 100) / 100; // 99% house edge
  };

  const rollNumber = async () => {
    if (betAmount > balance || betAmount <= 0) return;

    setIsRolling(true);
    setGameResult(null);

    // Animate rolling numbers
    const rollDuration = 2000;
    const interval = setInterval(() => {
      setRollingNumber(Math.floor(Math.random() * 100) + 1);
    }, 50);

    // Generate final result
    const rolledNumber = Math.floor(Math.random() * 100) + 1;
    const won = rolledNumber <= targetNumber;
    const payout = won ? Math.floor(betAmount * calculatePayout(targetNumber)) : 0;

    setTimeout(() => {
      clearInterval(interval);
      setRollingNumber(rolledNumber);
      setGameResult({ rolledNumber, won, payout });
      setIsRolling(false);
      
      // Trigger explosion effect for winning
      if (won) {
        setShowExplosion(true);
        setExplosionKey(prev => prev + 1);
        setTimeout(() => setShowExplosion(false), 2000);
      }
      
      const newBalance = won ? balance + payout - betAmount : balance - betAmount;
      onUpdateBalance(newBalance);
    }, rollDuration);
  };

  const resetGame = () => {
    setGameResult(null);
    setBetAmount(100);
    setTargetNumber(50);
    setRollingNumber(1);
  };

  return (
    <motion.div
      className="min-h-screen p-6 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <FloatingDice />
      <div className="container mx-auto max-w-2xl relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Button
            onClick={onBack}
            className="absolute top-6 left-6 bg-gray-700 hover:bg-gray-600"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back
          </Button>
          
          <h1 className="font-orbitron font-bold text-4xl mb-4 gradient-text">NUMBER ROLL</h1>
          <p className="text-gray-400 mb-4">Pick a number 1-100. Roll under to win!</p>
          <div className="bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-lg p-3 max-w-md mx-auto">
            <p className="text-[#FFD700] text-sm">
              🎮 Demo Game - Using simulated JOKER tokens for testing
            </p>
          </div>
        </motion.div>

        {/* Balance Display */}
        <motion.div
          className="glass-card rounded-2xl p-4 mb-8 text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="font-bold text-2xl" style={{ color: '#FFD700', textShadow: '0 0 10px #FFD700' }}>
            {balance.toLocaleString()} JOKERS
          </p>
        </motion.div>

        {/* Game Area */}
        <motion.div
          className="glass-card rounded-2xl p-8 text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Number Display */}
          <div className="mb-8">
            <motion.div
              className="w-40 h-40 mx-auto mb-6 bg-gradient-to-r from-[#9A00FF] to-[#39FF14] rounded-full flex items-center justify-center shadow-lg border-4"
              style={{ 
                borderColor: '#FFD700',
                boxShadow: '0 0 20px rgba(154, 0, 255, 0.5)'
              }}
              animate={isRolling ? { 
                scale: [1, 1.1, 1], 
                rotate: [0, 360],
                boxShadow: [
                  "0 0 20px rgba(154, 0, 255, 0.5)",
                  "0 0 40px rgba(57, 255, 20, 0.8)",
                  "0 0 20px rgba(154, 0, 255, 0.5)"
                ]
              } : {}}
              transition={{ 
                scale: { duration: 0.5, repeat: isRolling ? Infinity : 0 },
                rotate: { duration: 2, repeat: isRolling ? Infinity : 0, ease: "linear" },
                boxShadow: { duration: 1, repeat: isRolling ? Infinity : 0 }
              }}
            >
              <motion.span 
                className="text-4xl font-bold text-white"
                animate={isRolling ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3, repeat: isRolling ? Infinity : 0 }}
              >
                {isRolling ? rollingNumber : (gameResult?.rolledNumber || "?")}
              </motion.span>
              <NumberExplosion show={showExplosion} trigger={explosionKey} />
            </motion.div>
          </div>

          {/* Target Number Selection */}
          <div className="mb-8">
            <Label htmlFor="targetNumber" className="text-white mb-4 block text-lg">
              Roll Under: {targetNumber}
            </Label>
            <Input
              id="targetNumber"
              type="range"
              min="1"
              max="99"
              value={targetNumber}
              onChange={(e) => setTargetNumber(Number(e.target.value))}
              className="w-full mb-4"
              disabled={isRolling}
            />
            <div className="flex justify-between text-sm text-gray-400">
              <span>1 (Hard)</span>
              <span>Win Chance: {targetNumber}%</span>
              <span>99 (Easy)</span>
            </div>
            <p className="text-lg mt-2">
              Payout: <span className="text-green-400 font-bold">{calculatePayout(targetNumber)}x</span>
            </p>
          </div>

          {/* Bet Amount */}
          <div className="mb-8">
            <Label htmlFor="betAmount" className="text-white mb-4 block text-lg">Bet Amount</Label>
            <div className="flex justify-center space-x-4 mb-4">
              <Input
                id="betAmount"
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(Number(e.target.value))}
                className="w-32 bg-black/50 border-red-500/30 text-white text-center"
                min="1"
                max={balance}
                disabled={isRolling}
              />
              <span className="flex items-center text-gray-400">$JOKERS</span>
            </div>
            <div className="flex justify-center space-x-2">
              {[100, 500, 1000].map((amount) => (
                <Button
                  key={amount}
                  onClick={() => setBetAmount(amount)}
                  size="sm"
                  className="bg-gray-700 hover:bg-gray-600"
                  disabled={isRolling || amount > balance}
                >
                  {amount}
                </Button>
              ))}
              <Button
                onClick={() => setBetAmount(balance)}
                size="sm"
                className="bg-gray-700 hover:bg-gray-600"
                disabled={isRolling || balance <= 0}
              >
                MAX
              </Button>
            </div>
          </div>

          {/* Roll Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={rollNumber}
              disabled={isRolling || betAmount > balance || betAmount <= 0}
              className="w-full bg-gradient-to-r from-[#39FF14] to-[#FFD700] hover:from-[#2ee611] hover:to-[#ffed4e] text-black font-bold py-4 text-xl mb-6 shadow-lg"
              style={{ boxShadow: '0 10px 25px rgba(57, 255, 20, 0.3)' }}
            >
              {isRolling ? (
                <>
                  <motion.i 
                    className="fas fa-dice mr-2"
                    animate={{ rotate: [0, 90, 180, 270, 360] }}
                    transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                  />
                  Rolling...
                </>
              ) : (
                <>
                  <i className="fas fa-dice mr-2"></i>
                  ROLL DICE
                </>
              )}
            </Button>
          </motion.div>

          {/* Result Display */}
          <AnimatePresence>
            {gameResult && (
              <motion.div
                className={`p-6 rounded-xl ${gameResult.won ? 'bg-green-900/50' : 'bg-red-900/50'}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center">
                  <i className={`fas fa-dice text-4xl mb-4 ${gameResult.won ? 'text-green-400' : 'text-red-400'}`}></i>
                  <h3 className="text-2xl font-bold mb-2">
                    Rolled: {gameResult.rolledNumber}
                  </h3>
                  <p className="text-lg mb-2">
                    Target: {targetNumber} or under
                  </p>
                  <p className={`text-xl font-bold ${gameResult.won ? 'text-green-400' : 'text-red-400'}`}>
                    {gameResult.won ? 'YOU WON!' : 'YOU LOST!'}
                  </p>
                  {gameResult.won && (
                    <p className="text-lg mt-2 text-green-400">
                      +{gameResult.payout.toLocaleString()} $JOKERS
                    </p>
                  )}
                  {!gameResult.won && (
                    <p className="text-lg mt-2 text-red-400">
                      -{betAmount.toLocaleString()} $JOKERS
                    </p>
                  )}
                  <Button
                    onClick={resetGame}
                    className="mt-4 bg-blue-600 hover:bg-blue-700"
                  >
                    Play Again
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Game Rules */}
        <motion.div
          className="mt-8 glass-card rounded-2xl p-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="font-orbitron font-bold text-xl mb-4">How to Play</h3>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>• Choose your target number (1-99)</li>
            <li>• Set your bet amount</li>
            <li>• Roll the dice - win if result is under your target</li>
            <li>• Lower targets = higher payouts but lower win chance</li>
            <li>• Higher targets = lower payouts but higher win chance</li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}