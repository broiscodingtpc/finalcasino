import { motion } from "framer-motion";

export default function TokenChart() {
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-orbitron font-bold text-3xl md:text-4xl mb-4 gradient-text">
            📈 $JOKERS Token Chart
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Track the $JOKERS token performance on Solana DEXs in real-time
          </p>
        </motion.div>
        
        <motion.div 
          className="glass-card rounded-xl p-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-500 rounded-lg flex items-center justify-center">
                <i className="fas fa-chart-line text-white text-sm"></i>
              </div>
              <span className="font-orbitron font-bold text-lg text-white">Live Trading Data</span>
            </div>
            <div className="text-sm text-gray-400">
              Powered by DexScreener
            </div>
          </div>
          
          <div 
            className="relative w-full"
            style={{ paddingBottom: '65%' }}
          >
            <iframe 
              src="https://dexscreener.com/solana/FWqsW5DqJ7bfLbSYMkZjvfGh2F2JCWufRLedWMMjyT2F?embed=1&loadChartSettings=0&chartLeftToolbar=0&chartDefaultOnMobile=1&chartTheme=dark&theme=dark&chartStyle=0&chartType=usd&interval=15"
              className="absolute top-0 left-0 w-full h-full rounded-lg border border-gray-700"
              title="JOKER Token Chart"
            />
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Chart shows real-time trading data. External trading is independent of Joker's Arena platform.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 