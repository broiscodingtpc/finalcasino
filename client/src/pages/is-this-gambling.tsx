import { motion } from "framer-motion";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";

export default function IsThisGambling() {
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
              🔍 Transparency & Legal Status
            </motion.h1>
            
            <div className="space-y-8 text-gray-300">
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-2xl font-orbitron font-bold mb-4 text-white">Is This Gambling?</h2>
                <div className="bg-green-900/20 p-6 rounded-lg border border-green-700">
                  <p className="leading-relaxed text-green-200 text-lg">
                    <strong>No, this is not gambling.</strong> Joker's Arena operates as an entertainment platform only. We do not provide gambling services as defined by UK law.
                  </p>
                </div>
                <p className="mt-4 leading-relaxed">
                  Our platform offers skill-based games and entertainment experiences using our proprietary $JOKERS token. No real money is involved, and no fiat currency payouts are provided.
                </p>
              </motion.section>
              
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h2 className="text-2xl font-orbitron font-bold mb-4 text-white">Can I Win Money?</h2>
                <div className="bg-red-900/20 p-6 rounded-lg border border-red-700">
                  <p className="leading-relaxed text-red-200 text-lg">
                    <strong>No, you cannot win real money.</strong> All games are played using our $JOKERS token, which has no guaranteed monetary value and cannot be redeemed for fiat currency through this platform.
                  </p>
                </div>
                <p className="mt-4 leading-relaxed">
                  The $JOKERS token is a utility token designed for use within our entertainment ecosystem only. While you can earn tokens through gameplay, these tokens are not redeemable for cash or other currencies through our platform.
                </p>
              </motion.section>
              
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <h2 className="text-2xl font-orbitron font-bold mb-4 text-white">Is the Token Valuable?</h2>
                <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-700">
                  <p className="leading-relaxed text-yellow-200">
                    <strong>Yes, but with important limitations:</strong> The $JOKERS token has utility value within our platform for accessing games and features. However, it is not redeemable for fiat currency through our site, and we do not guarantee any monetary value.
                  </p>
                </div>
                <p className="mt-4 leading-relaxed">
                  The token's value is derived from its utility within our entertainment ecosystem. Any external trading of the token on cryptocurrency exchanges is independent of our platform and involves significant risk.
                </p>
              </motion.section>
              
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <h2 className="text-2xl font-orbitron font-bold mb-4 text-white">Why Is This Legal?</h2>
                <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-700">
                  <p className="leading-relaxed text-blue-200">
                    <strong>Legal Operation Under UK Law:</strong> OVISSTYLE LTD operates under SIC code 93290, which covers "Other amusement and recreation activities not elsewhere classified." This classification allows us to operate entertainment platforms without gambling licenses.
                  </p>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="leading-relaxed"><strong>Key Legal Factors:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>No fiat currency involvement</li>
                    <li>No real money payouts</li>
                    <li>Utility token only (not financial instrument)</li>
                    <li>Entertainment-focused activities</li>
                    <li>Proper company registration and compliance</li>
                  </ul>
                </div>
              </motion.section>
              
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <h2 className="text-2xl font-orbitron font-bold mb-4 text-white">Company Legal Status</h2>
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                  <p className="mb-2"><strong className="text-white">Company Name:</strong> OVISSTYLE LTD</p>
                  <p className="mb-2"><strong className="text-white">Registration Number:</strong> 16503659</p>
                  <p className="mb-2"><strong className="text-white">Legal Status:</strong> Private Limited Company</p>
                  <p className="mb-2"><strong className="text-white">Jurisdiction:</strong> England & Wales</p>
                  <p className="mb-2"><strong className="text-white">SIC Code:</strong> 93290 – Other amusement and recreation activities</p>
                  <p><strong className="text-white">Incorporation Date:</strong> 9 June 2025</p>
                </div>
              </motion.section>
              
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <h2 className="text-2xl font-orbitron font-bold mb-4 text-white">Important Disclaimers</h2>
                <div className="space-y-4">
                  <div className="bg-red-900/20 p-4 rounded-lg border border-red-700">
                    <p className="text-red-200 text-sm">
                      <strong>No Fiat:</strong> We do not accept, process, or pay out fiat currency.
                    </p>
                  </div>
                  <div className="bg-red-900/20 p-4 rounded-lg border border-red-700">
                    <p className="text-red-200 text-sm">
                      <strong>Not Gambling:</strong> Our platform operates as entertainment, not gambling.
                    </p>
                  </div>
                  <div className="bg-red-900/20 p-4 rounded-lg border border-red-700">
                    <p className="text-red-200 text-sm">
                      <strong>Entertainment Only:</strong> All activities are for entertainment purposes only.
                    </p>
                  </div>
                </div>
              </motion.section>
              
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
              >
                <h2 className="text-2xl font-orbitron font-bold mb-4 text-white">Contact & Verification</h2>
                <div className="text-center space-y-4">
                  <a 
                    href="https://find-and-update.company-information.service.gov.uk/company/16503659" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 text-white font-semibold"
                  >
                    <i className="fas fa-external-link-alt"></i>
                    <span>Verify our company registration</span>
                  </a>
                  <p className="text-sm text-gray-400">
                    For legal inquiries: Contact us through our official channels
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