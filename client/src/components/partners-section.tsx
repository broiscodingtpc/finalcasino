import { motion } from "framer-motion";

const partners = [
  {
    name: "RevShare",
    url: "https://revshare.dev",
    icon: "fas fa-share-alt"
  },
  {
    name: "Phantom",
    url: "https://phantom.app",
    icon: "fas fa-wallet"
  },
  {
    name: "Solscan",
    url: "https://solscan.io",
    icon: "fas fa-search"
  },
  {
    name: "DexScreener",
    url: "https://dexscreener.com",
    icon: "fas fa-chart-bar"
  }
];

export default function PartnersSection() {
  return (
    <section id="partners" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-orbitron font-bold text-3xl md:text-5xl mb-4 gradient-text">PARTNERS & INTEGRATIONS</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-joker-purple to-joker-pink mx-auto"></div>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <motion.a 
                key={index}
                href={partner.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass-card rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <i className={`${partner.icon} text-3xl gradient-text mb-3`}></i>
                <h3 className="font-semibold">{partner.name}</h3>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
