import { motion } from "framer-motion";
import { useCountdown } from "@/hooks/use-countdown";

export default function PresaleSection() {
  const { days, hours, minutes, seconds } = useCountdown();

  return (
    <section id="presale" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-orbitron font-bold text-3xl md:text-5xl mb-4 gradient-text">PRESALE DETAILS</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-joker-purple to-joker-pink mx-auto"></div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Play Games Section */}
          <motion.div 
            className="glass-card rounded-xl p-8 text-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-orbitron font-bold text-2xl mb-6 gradient-text">ARENA GAMES</h3>
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow shadow-lg shadow-red-500/50">
                <i className="fas fa-dice text-4xl text-white"></i>
              </div>
              <p className="text-gray-300 mb-6">
                Enter the arena and experience premium gaming with real rewards on the Solana blockchain.
              </p>
            </div>
            <motion.a 
              href="/casino"
              className="w-full bg-gradient-to-r from-red-600 to-red-500 py-4 rounded-xl font-bold text-lg hover:from-red-500 hover:to-red-400 transition-all duration-300 shadow-lg shadow-red-500/25 inline-block text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-gamepad mr-2"></i>
              Play Games
            </motion.a>
          </motion.div>
          
          {/* Presale Details */}
          <motion.div 
            className="glass-card rounded-xl p-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="font-orbitron font-bold text-2xl mb-6 gradient-text">TOKEN DETAILS</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="text-gray-300">Total Supply</span>
                <span className="font-semibold">1,000,000,000 $JOKER</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="text-gray-300">Price</span>
                <span className="font-semibold">1 SOL = 4,000,000 $JOKER</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="text-gray-300">Max per wallet</span>
                <span className="font-semibold">2.5 SOL</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="text-gray-300">Hard Cap</span>
                <span className="font-semibold">50 SOL</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Contract Addresses */}
        <motion.div 
          className="max-w-4xl mx-auto mt-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card rounded-xl p-6">
              <h4 className="font-orbitron font-bold text-lg mb-3 gradient-text">Presale Wallet</h4>
              <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm break-all">
                jkrtQ5V9FpZw2wxzAVJx6SaNzfz6h9aZkv3HUdaS3B4
              </div>
            </div>
            <div className="glass-card rounded-xl p-6">
              <h4 className="font-orbitron font-bold text-lg mb-3 gradient-text">Contract Address</h4>
              <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm break-all">
                jKRBhCZMmphh3GZb8ELS7VuPvwM5bzgigNjurXrsuTi
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
