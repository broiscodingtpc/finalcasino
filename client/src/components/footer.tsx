import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-500 rounded-lg flex items-center justify-center shadow-lg shadow-red-500/50">
              <i className="fas fa-mask text-white"></i>
            </div>
            <span className="font-orbitron font-bold text-2xl gradient-text">JOKER'S ARENA</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <motion.a 
              href="https://t.me/jokersarenasol" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-red-500 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <i className="fab fa-telegram"></i>
              <span>Telegram</span>
            </motion.a>
            <motion.a 
              href="https://x.com/JOKERS_ON_SOL" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-red-500 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <i className="fab fa-x-twitter"></i>
              <span>X (Twitter)</span>
            </motion.a>
          </div>
          
          <div className="space-y-2 text-sm text-gray-400 max-w-2xl mx-auto">
            <p><strong>Contract Address:</strong> 4YMfYoHmo4LExNRJ7t15a3TXRUteEUoKvrvVr3CfLALx</p>
            <p className="text-xs text-gray-500 mt-2">No fiat. Not gambling. Entertainment only.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm">
            <a href="/legal" className="hover:text-red-500 transition-colors">Terms & Conditions</a>
            <a href="/about-token" className="hover:text-red-500 transition-colors">About Token</a>
            <a href="/is-this-gambling" className="hover:text-red-500 transition-colors">Legal Status</a>
          </div>
        </motion.div>
        
        <div className="text-center text-sm text-gray-500 border-t border-gray-800 pt-8">
          <p>© 2025 Joker's Arena / OVISSTYLE LTD.</p>
          <p className="mt-1">Registered in England & Wales – Company No. 16503659</p>
          <p className="mt-1">This platform is for entertainment only. The $JOKERS token has no guaranteed value and is not redeemable for fiat via this site.</p>
          <p className="mt-2">Built on Solana | Powered by Chaos</p>
        </div>
      </div>
    </footer>
  );
}
