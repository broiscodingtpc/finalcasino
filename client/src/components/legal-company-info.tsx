import { motion } from "framer-motion";

export default function LegalCompanyInfo() {
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          className="glass-card p-8 rounded-xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl font-orbitron font-bold mb-6 gradient-text text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            📜 Legal & Company Info
          </motion.h2>
          
          <motion.div 
            className="space-y-4 text-gray-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-lg leading-relaxed">
              Joker's Arena is developed and operated by <strong className="text-white">OVISSTYLE LTD</strong>, a legally registered company in the United Kingdom.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="space-y-2">
                <p><strong className="text-white">Company number:</strong> 16503659</p>
                <p><strong className="text-white">Company type:</strong> Private Limited Company</p>
                <p><strong className="text-white">Incorporation date:</strong> 9 June 2025</p>
              </div>
              <div className="space-y-2">
                <p><strong className="text-white">SIC code:</strong> 93290 – Other amusement and recreation activities not elsewhere classified</p>
                <p><strong className="text-white">Registered address:</strong> 130 Ashburton Avenue, Ilford, England, IG3 9EW</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <p className="text-sm text-gray-400 leading-relaxed">
                Joker's Arena offers entertainment-only games using its own SPL token ($JOKERS) on Solana. We do not provide fiat payouts, financial services, or gambling operations as defined by UK law. Any external trading of the $JOKERS token is community-driven and independent of this platform.
              </p>
            </div>
            
            <div className="mt-6 text-center">
              <a 
                href="https://find-and-update.company-information.service.gov.uk/company/16503659" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 text-white font-semibold"
              >
                <i className="fas fa-external-link-alt"></i>
                <span>Verify our company registration</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 