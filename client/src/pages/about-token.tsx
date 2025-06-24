import { motion } from "framer-motion";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";

export default function AboutToken() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead />
      <Navigation />
      
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            className="glass-card p-8 rounded-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl font-orbitron font-bold mb-8 gradient-text text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              🃏 About $JOKERS Token
            </motion.h1>
            
            <div className="space-y-8 text-gray-300">
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-2xl font-orbitron font-bold mb-4 text-white">SPL Token Address</h2>
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                  <p className="mb-2"><strong className="text-white">Contract Address:</strong></p>
                  <p className="font-mono text-sm break-all text-green-400">4YMfYoHmo4LExNRJ7t15a3TXRUteEUoKvrvVr3CfLALx</p>
                  <p className="text-xs text-gray-500 mt-2">Network: Solana</p>
                </div>
              </motion.section>
              
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h2 className="text-2xl font-orbitron font-bold mb-4 text-white">Use Inside Games Only</h2>
                <p className="leading-relaxed">
                  The $JOKERS token is specifically designed for use within the Joker's Arena entertainment platform. It serves as the primary utility token for accessing games, features, and experiences within our ecosystem. The token is not intended for external trading or investment purposes.
                </p>
              </motion.section>
              
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <h2 className="text-2xl font-orbitron font-bold mb-4 text-white">Not a Financial Instrument</h2>
                <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-700">
                  <p className="leading-relaxed text-yellow-200">
                    <strong>Important:</strong> The $JOKERS token is not a financial instrument, security, or investment vehicle. It does not represent ownership in any company, asset, or revenue stream. The token is purely a utility token for entertainment purposes within our platform.
                  </p>
                </div>
              </motion.section>
              
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <h2 className="text-2xl font-orbitron font-bold mb-4 text-white">Not Sold by Platform</h2>
                <p className="leading-relaxed">
                  Joker's Arena does not sell, offer, or distribute the $JOKERS token for fiat currency or other cryptocurrencies. The token is earned through gameplay and platform activities only. Any external trading of the token is community-driven and independent of our platform.
                </p>
              </motion.section>
              
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <h2 className="text-2xl font-orbitron font-bold mb-4 text-white">Token Utility</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <h3 className="font-bold text-white mb-2">🎮 Game Access</h3>
                    <p className="text-sm">Access to premium games and features</p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <h3 className="font-bold text-white mb-2">🏆 Rewards</h3>
                    <p className="text-sm">Earn tokens through gameplay achievements</p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <h3 className="font-bold text-white mb-2">🎨 Customization</h3>
                    <p className="text-sm">Unlock special avatars and themes</p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <h3 className="font-bold text-white mb-2">🌟 Premium Features</h3>
                    <p className="text-sm">Access to exclusive platform features</p>
                  </div>
                </div>
              </motion.section>
              
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <h2 className="text-2xl font-orbitron font-bold mb-4 text-white">External Trading Disclaimer</h2>
                <div className="bg-red-900/20 p-6 rounded-lg border border-red-700">
                  <p className="leading-relaxed text-red-200">
                    <strong>Disclaimer:</strong> Any trading of the $JOKERS token on external cryptocurrency exchanges or markets is completely independent of Joker's Arena. We have no control over, and are not responsible for, the value, trading, or availability of the token on external platforms. Trading on external markets involves significant risk and should be approached with caution.
                  </p>
                </div>
              </motion.section>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
} 