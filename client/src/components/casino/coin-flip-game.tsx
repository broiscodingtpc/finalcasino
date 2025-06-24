import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import headsImage from "@assets/head_1749609383430.png";
import tailsImage from "@assets/tails_1749609383430.png";
import { RippleButton, ConfettiExplosion, FloatingText, useScreenShake, ScreenShake, CoinTrail } from "./visual-effects";
import { jokerTokenService } from "@/lib/joker-token";

// Particle component for visual effects
const Particle = ({ delay = 0, x = 0, y = 0 }) => (
  <motion.div
    className="absolute w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
    initial={{ 
      x, y,
      opacity: 0,
      scale: 0
    }}
    animate={{ 
      x: x + (Math.random() - 0.5) * 400, 
      y: y + (Math.random() - 0.5) * 400,
      opacity: [0, 1, 0],
      scale: [0, 1.5, 0]
    }}
    transition={{ 
      duration: 1.5, 
      delay: delay,
      ease: "easeOut"
    }}
  />
);

// Sparkle effect component
const SparkleEffect = ({ show, trigger }: { show: boolean; trigger: number }) => (
  <AnimatePresence>
    {show && (
      <motion.div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {[...Array(15)].map((_, i) => (
          <Particle 
            key={`${trigger}-${i}`} 
            delay={i * 0.05} 
            x={(Math.random() - 0.5) * 100}
            y={(Math.random() - 0.5) * 100}
          />
        ))}
      </motion.div>
    )}
  </AnimatePresence>
);

// Floating coins background effect
const FloatingCoins = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-8 h-8 opacity-10"
        initial={{ 
          x: Math.random() * window.innerWidth, 
          y: window.innerHeight + 50,
          rotate: 0
        }}
        animate={{ 
          y: -50,
          rotate: 360
        }}
        transition={{ 
          duration: Math.random() * 10 + 15,
          repeat: Infinity,
          delay: Math.random() * 5,
          ease: "linear"
        }}
      >
        <img src={Math.random() > 0.5 ? headsImage : tailsImage} alt="floating coin" className="w-full h-full" />
      </motion.div>
    ))}
  </div>
);

interface CoinFlipGameProps {
  balance: number;
  onUpdateBalance: (newBalance: number) => void;
  onBack: () => void;
  walletAddress?: string;
}

export default function CoinFlipGame({ balance, onUpdateBalance, onBack, walletAddress }: CoinFlipGameProps) {
  const [betAmount, setBetAmount] = useState<number>(100);
  const [selectedSide, setSelectedSide] = useState<'heads' | 'tails'>('heads');
  const [isFlipping, setIsFlipping] = useState(false);
  const [gameResult, setGameResult] = useState<{ result: 'heads' | 'tails'; won: boolean } | null>(null);
  const [coinRotation, setCoinRotation] = useState(0);
  const [flipCount, setFlipCount] = useState(0);
  const [showSparkles, setShowSparkles] = useState(false);
  const [sparkleKey, setSparkleKey] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);
  const [showFloatingText, setShowFloatingText] = useState(false);
  const [floatingTextType, setFloatingTextType] = useState("win");
  const { isShaking, triggerShake } = useScreenShake();

  const flipCoin = async () => {
    if (betAmount > balance || betAmount <= 0) return;

    setIsFlipping(true);
    setGameResult(null);

    // Enhanced coin flip animation
    const flipDuration = 3000;
    const rotations = 15;
    setFlipCount(prev => prev + 1);
    setCoinRotation(rotations * 360);

    // Simulate game logic (replace with real random generation)
    const result: 'heads' | 'tails' = Math.random() < 0.5 ? 'heads' : 'tails';
    const won = result === selectedSide;

    setTimeout(() => {
      setGameResult({ result, won });
      setIsFlipping(false);
      
      // Trigger visual effects for winning/losing
      if (won) {
        setShowSparkles(true);
        setSparkleKey(prev => prev + 1);
        setShowConfetti(true);
        setConfettiKey(prev => prev + 1);
        setFloatingTextType("win");
        setShowFloatingText(true);
        setTimeout(() => {
          setShowSparkles(false);
          setShowConfetti(false);
          setShowFloatingText(false);
        }, 2000);
      } else {
        triggerShake(800);
        setFloatingTextType("lose");
        setShowFloatingText(true);
        setTimeout(() => setShowFloatingText(false), 1500);
      }
      
      const newBalance = won ? balance + betAmount : balance - betAmount;
      onUpdateBalance(newBalance);
      
      // Reset coin rotation
      setCoinRotation(0);
    }, flipDuration);
  };

  const resetGame = () => {
    setGameResult(null);
    setBetAmount(100);
  };

  return (
    <ScreenShake isShaking={isShaking}>
      <motion.div
        className="min-h-screen p-6 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <FloatingCoins />
        <CoinTrail active={isFlipping} />
        <ConfettiExplosion show={showConfetti} trigger={confettiKey} />
        <FloatingText 
          text={floatingTextType === "win" ? "WIN!" : "LOSE!"} 
          show={showFloatingText} 
          type={floatingTextType} 
        />
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
          
          <h1 className="font-orbitron font-bold text-4xl mb-4 gradient-text">COIN FLIP</h1>
          <p className="text-gray-400 mb-4">Choose heads or tails and double your bet!</p>
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
            {balance.toLocaleString()} $JOKERS
          </p>
        </motion.div>

        {/* Game Area */}
        <motion.div
          className="glass-card rounded-2xl p-8 text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Coin Display */}
          <div className="mb-8">
            <motion.div
              className="w-40 h-40 mx-auto mb-6 relative"
              animate={{ 
                rotateY: coinRotation,
                scale: isFlipping ? [1, 1.1, 1] : 1,
                y: isFlipping ? [0, -20, 0] : 0
              }}
              transition={{ 
                rotateY: { duration: 3, ease: "easeInOut" },
                scale: { duration: 0.5, repeat: isFlipping ? Infinity : 0 },
                y: { duration: 1, repeat: isFlipping ? Infinity : 0 }
              }}
            >
              {!isFlipping && gameResult ? (
                <motion.img
                  src={gameResult.result === 'heads' ? headsImage : tailsImage}
                  alt={gameResult.result}
                  className="w-full h-full object-contain drop-shadow-2xl"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                />
              ) : !isFlipping ? (
                <img
                  src={selectedSide === 'heads' ? headsImage : tailsImage}
                  alt={selectedSide}
                  className="w-full h-full object-contain drop-shadow-2xl opacity-50"
                />
              ) : (
                <motion.div
                  className="w-full h-full rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/50"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                >
                  <i className="fas fa-coins text-4xl text-white"></i>
                </motion.div>
              )}
              <SparkleEffect show={showSparkles} trigger={sparkleKey} />
            </motion.div>
          </div>

          {/* Side Selection */}
          <div className="mb-8">
            <Label className="text-white mb-4 block text-lg">Choose Your Side</Label>
            <div className="flex justify-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setSelectedSide('heads')}
                  className={`px-8 py-4 ${selectedSide === 'heads' 
                    ? 'bg-gradient-to-r from-[#9A00FF] to-[#FFD700] text-white' 
                    : 'bg-gray-800 hover:bg-gray-700 border border-[#9A00FF]/30'
                  }`}
                  disabled={isFlipping}
                >
                  <img src={headsImage} alt="heads" className="w-6 h-6 mr-2" />
                  HEADS
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setSelectedSide('tails')}
                  className={`px-8 py-4 ${selectedSide === 'tails' 
                    ? 'bg-gradient-to-r from-[#9A00FF] to-[#FFD700] text-white' 
                    : 'bg-gray-800 hover:bg-gray-700 border border-[#9A00FF]/30'
                  }`}
                  disabled={isFlipping}
                >
                  <img src={tailsImage} alt="tails" className="w-6 h-6 mr-2" />
                  TAILS
                </Button>
              </motion.div>
            </div>
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
                disabled={isFlipping}
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
                  disabled={isFlipping || amount > balance}
                >
                  {amount}
                </Button>
              ))}
              <Button
                onClick={() => setBetAmount(balance)}
                size="sm"
                className="bg-gray-700 hover:bg-gray-600"
                disabled={isFlipping || balance <= 0}
              >
                MAX
              </Button>
            </div>
          </div>

          {/* Flip Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={flipCoin}
              disabled={isFlipping || betAmount > balance || betAmount <= 0}
              className="w-full bg-gradient-to-r from-[#39FF14] to-[#FFD700] hover:from-[#2ee611] hover:to-[#ffed4e] text-black font-bold py-4 text-xl mb-6 shadow-lg"
              style={{ boxShadow: '0 10px 25px rgba(57, 255, 20, 0.3)' }}
            >
              {isFlipping ? (
                <>
                  <motion.i 
                    className="fas fa-coins mr-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                  />
                  Flipping...
                </>
              ) : (
                <>
                  <i className="fas fa-coins mr-2"></i>
                  FLIP COIN
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
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <img 
                      src={gameResult.result === 'heads' ? headsImage : tailsImage}
                      alt={gameResult.result}
                      className="w-20 h-20 mx-auto mb-4"
                    />
                  </motion.div>
                  <motion.h3 
                    className="text-2xl font-bold mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {gameResult.result.toUpperCase()}
                  </motion.h3>
                  <motion.p 
                    className={`text-xl font-bold ${gameResult.won ? 'text-green-400' : 'text-red-400'}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    {gameResult.won ? 'YOU WON!' : 'YOU LOST!'}
                  </motion.p>
                  <motion.p 
                    className="text-lg mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <span className="text-lg font-bold">
                      {gameResult.won ? '+' : '-'}{betAmount.toLocaleString()} $JOKERS
                    </span>
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                  >
                    <Button
                      onClick={resetGame}
                      className="mt-4 bg-purple-600 hover:bg-purple-700"
                    >
                      Play Again
                    </Button>
                  </motion.div>
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
            <li>• Choose Heads or Tails</li>
            <li>• Set your bet amount</li>
            <li>• Click "Flip Coin" to play</li>
            <li>• Win 2x your bet if you guess correctly</li>
            <li>• 50/50 chance - pure luck!</li>
          </ul>
        </motion.div>
        </div>
      </motion.div>
    </ScreenShake>
  );
}