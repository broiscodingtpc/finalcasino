import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface Ripple {
  x: number;
  y: number;
  size: number;
  id: number;
}

// Screen shake hook for dramatic effects
export const useScreenShake = () => {
  const [isShaking, setIsShaking] = useState(false);

  const triggerShake = (duration = 500) => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), duration);
  };

  return { isShaking, triggerShake };
};

// Enhanced button with ripple effect
export const RippleButton = ({ children, onClick, className, disabled, ...props }: any) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const createRipple = (event: any) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const newRipple = {
      x,
      y,
      size,
      id: Date.now()
    };

    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);

    if (onClick) onClick(event);
  };

  return (
    <motion.button
      className={`relative overflow-hidden ${className}`}
      onClick={createRipple}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {children}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute bg-white/20 rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </motion.button>
  );
};

// Confetti explosion effect
export const ConfettiExplosion = ({ show, trigger }: { show: boolean; trigger: number }) => (
  <AnimatePresence>
    {show && (
      <motion.div className="fixed inset-0 pointer-events-none z-50">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`${trigger}-${i}`}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd'][i % 6],
              left: '50%',
              top: '50%'
            }}
            initial={{ 
              scale: 0,
              x: 0,
              y: 0,
              rotate: 0
            }}
            animate={{ 
              scale: [0, 1, 0],
              x: (Math.random() - 0.5) * 800,
              y: (Math.random() - 0.5) * 600,
              rotate: Math.random() * 720
            }}
            transition={{ 
              duration: 1.5,
              delay: i * 0.01,
              ease: "easeOut"
            }}
          />
        ))}
      </motion.div>
    )}
  </AnimatePresence>
);

// Pulsing glow wrapper
export const PulsingGlow = ({ children, isActive = false, color = "purple" }: { children: any; isActive?: boolean; color?: string }) => {
  const colors: { [key: string]: string } = {
    purple: "147, 51, 234",
    red: "239, 68, 68",
    green: "34, 197, 94",
    blue: "59, 130, 246",
    yellow: "234, 179, 8"
  };

  return (
    <motion.div
      className="relative"
      animate={isActive ? {
        boxShadow: [
          `0 0 10px rgba(${colors[color]}, 0.3)`,
          `0 0 30px rgba(${colors[color]}, 0.6)`,
          `0 0 10px rgba(${colors[color]}, 0.3)`
        ]
      } : {}}
      transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
    >
      {children}
    </motion.div>
  );
};

// Floating text animation for wins/losses
export const FloatingText = ({ text, show, type = "win" }: { text: string; show: boolean; type?: string }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        className={`fixed top-1/2 left-1/2 text-6xl font-bold z-50 pointer-events-none ${
          type === "win" ? "text-green-400" : "text-red-400"
        }`}
        initial={{ 
          scale: 0,
          x: "-50%",
          y: "-50%",
          rotate: -10
        }}
        animate={{ 
          scale: [0, 1.2, 1],
          y: ["-50%", "-60%", "-50%"],
          rotate: ["-10deg", "5deg", "0deg"]
        }}
        exit={{ 
          scale: 0,
          y: "-40%",
          opacity: 0
        }}
        transition={{ 
          duration: 1.2,
          ease: "easeOut"
        }}
      >
        {text}
      </motion.div>
    )}
  </AnimatePresence>
);

// Animated coin trail effect
export const CoinTrail = ({ active }: { active: boolean }) => (
  <AnimatePresence>
    {active && (
      <div className="fixed inset-0 pointer-events-none z-40">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-60"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50,
              rotate: 0,
              scale: 0
            }}
            animate={{ 
              y: -50,
              rotate: 720,
              scale: [0, 1, 0]
            }}
            transition={{ 
              duration: 2,
              delay: i * 0.1,
              ease: "linear"
            }}
          />
        ))}
      </div>
    )}
  </AnimatePresence>
);

// Screen shake wrapper
export const ScreenShake = ({ children, isShaking }: { children: any; isShaking: boolean }) => (
  <motion.div
    animate={isShaking ? {
      x: [0, -5, 5, -5, 5, 0],
      y: [0, -2, 2, -2, 2, 0]
    } : {}}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);