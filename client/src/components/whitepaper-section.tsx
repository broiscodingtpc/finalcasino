import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const whitepaperHighlights = [
  {
    title: "Loyalty Airdrop",
    description: "Snapshot at $1M MC",
    icon: "fas fa-gift"
  },
  {
    title: "8% Tax = Real SOL Rewards",
    description: "Via RevShare integration",
    icon: "fas fa-percent"
  },
  {
    title: "No Vesting for Devs",
    description: "Pure chaos mode",
    icon: "fas fa-unlock"
  }
];

export default function WhitepaperSection() {
  return (
    <section id="whitepaper" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="glass-card rounded-xl p-8 md:p-12 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="font-orbitron font-bold text-3xl md:text-5xl mb-6 gradient-text"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              WHITEPAPER
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {whitepaperHighlights.map((highlight, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + (index * 0.1) }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-500/50">
                    <i className={`${highlight.icon} text-2xl text-white`}></i>
                  </div>
                  <h3 className="font-semibold mb-2">{highlight.title}</h3>
                  <p className="text-sm text-gray-400">{highlight.description}</p>
                </motion.div>
              ))}
            </div>
            
            <Link href="/whitepaper">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  className="bg-gradient-to-r from-red-600 to-red-500 px-8 py-4 rounded-xl font-bold text-lg hover:from-red-500 hover:to-red-400 transition-all duration-300 shadow-lg shadow-red-500/25 text-white border-0"
                >
                  View Full Whitepaper
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
