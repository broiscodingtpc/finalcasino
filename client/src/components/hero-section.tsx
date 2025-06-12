import { motion } from "framer-motion";
import FloatingParticles from "./floating-particles";
import jokerLogo from "@assets/20250610_0314_Cyberpunk Joker Logo_simple_compose_01jxbjyc5fesnt1xxc5s2kryah_1749603627637.png";
import casinoAtmosphere from "@assets/20250610_0314_Cyberpunk Casino Atmosphere_simple_compose_01jxbjywm4e0sbksqm677hgn39_1749603644844.png";

export default function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative hero-bg">
      {/* Casino Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${casinoAtmosphere})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div className="absolute inset-0 casino-atmosphere" />
      <FloatingParticles />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Joker's Arena Logo */}
          <div className="w-64 h-64 mx-auto mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-white rounded-full animate-pulse-slow opacity-40 blur-2xl"></div>
            <div className="relative w-full h-full">
              <img 
                src={jokerLogo} 
                alt="Joker's Arena Logo" 
                className="w-full h-full object-contain animate-float drop-shadow-2xl"
              />
            </div>
          </div>
        </motion.div>
        
        <motion.h1 
          className="font-orbitron font-black text-4xl md:text-7xl mb-6 gradient-text animate-glow"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          JOKER'S ARENA
        </motion.h1>
        
        <motion.h2 
          className="font-orbitron font-bold text-2xl md:text-4xl mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          CHAOS BEGINS HERE
        </motion.h2>
        
        <motion.p 
          className="text-lg md:text-xl mb-8 text-gray-300"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          Premium gaming experience on Solana blockchain
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <motion.a 
            href="https://t.me/JOKERS_ARENA" 
            target="_blank" 
            rel="noopener noreferrer"
            className="cyberpunk-border hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="cyberpunk-border-inner px-8 py-4 flex items-center space-x-3">
              <i className="fab fa-telegram text-red-500"></i>
              <span className="font-semibold text-white">Join Telegram</span>
            </div>
          </motion.a>
          
          <motion.a 
            href="https://x.com/JOKERS_ON_SOL" 
            target="_blank" 
            rel="noopener noreferrer"
            className="cyberpunk-border hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="cyberpunk-border-inner px-8 py-4 flex items-center space-x-3">
              <i className="fab fa-x-twitter text-white"></i>
              <span className="font-semibold text-white">Follow X</span>
            </div>
          </motion.a>
          
          <motion.a 
            href="/casino"
            className="px-8 py-4 rounded-xl font-bold text-black transition-all duration-300 shadow-lg inline-block"
            style={{
              background: 'linear-gradient(45deg, #39FF14, #FFD700)',
              boxShadow: '0 10px 30px rgba(57, 255, 20, 0.4)'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-dice mr-2"></i>
            Enter Casino
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
