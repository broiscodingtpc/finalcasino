import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 15;
        const newProgress = Math.min(prev + increment, 100);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
        }
        
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 rounded-full animate-pulse-slow shadow-lg shadow-red-500/50"></div>
          <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center">
            <i className="fas fa-mask text-4xl gradient-text"></i>
          </div>
        </div>
        <h2 className="font-orbitron text-2xl gradient-text animate-glow">ENTERING THE ARENA</h2>
        <div className="w-64 h-1 bg-gray-800 rounded-full mx-auto mt-4">
          <motion.div 
            className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full shadow-lg shadow-red-500/50"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
