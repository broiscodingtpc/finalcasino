import { motion } from "framer-motion";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";

export default function Legal() {
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
              📜 Terms & Conditions
            </motion.h1>
            
            <div className="space-y-8 text-gray-300">
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-2xl font-orbitron font-bold mb-4 text-white">Overview</h2>
                <p className="leading-relaxed">
                  Welcome to Joker's Arena, an entertainment platform operated by OVISSTYLE LTD. By using our services, you agree to these terms and conditions.
                </p>
              </motion.section>
              
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h2 className="text-2xl font-orbitron font-bold mb-4 text-white">No Fiat Payouts</h2>
                <p className="leading-relaxed">
                  Joker's Arena does not provide any fiat currency payouts or withdrawals. All games are played using our proprietary $JOKERS token, which has no guaranteed monetary value and cannot be redeemed for fiat currency through this platform.
                </p>
              </motion.section>
              
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <h2 className="text-2xl font-orbitron font-bold mb-4 text-white">Token Utility Only</h2>
                <p className="leading-relaxed">
                  The $JOKERS token is designed for use within our entertainment platform only. It serves as a utility token for accessing games and features within Joker's Arena. The token is not intended as an investment vehicle or financial instrument.
                </p>
              </motion.section>
              
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <h2 className="text-2xl font-orbitron font-bold mb-4 text-white">External Markets Are Independent</h2>
                <p className="leading-relaxed">
                  Any trading of the $JOKERS token on external cryptocurrency exchanges or markets is completely independent of Joker's Arena. We have no control over, and are not responsible for, the value, trading, or availability of the token on external platforms.
                </p>
              </motion.section>
              
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <h2 className="text-2xl font-orbitron font-bold mb-4 text-white">Company Legal Details</h2>
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                  <p className="mb-2"><strong className="text-white">Company Name:</strong> OVISSTYLE LTD</p>
                  <p className="mb-2"><strong className="text-white">Company Number:</strong> 16503659</p>
                  <p className="mb-2"><strong className="text-white">Registered Address:</strong> 130 Ashburton Avenue, Ilford, England, IG3 9EW</p>
                  <p className="mb-2"><strong className="text-white">Company Type:</strong> Private Limited Company</p>
                  <p className="mb-2"><strong className="text-white">Incorporation Date:</strong> 9 June 2025</p>
                  <p><strong className="text-white">SIC Code:</strong> 93290 – Other amusement and recreation activities not elsewhere classified</p>
                </div>
              </motion.section>
              
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <h2 className="text-2xl font-orbitron font-bold mb-4 text-white">Legal Disclaimer</h2>
                <div className="bg-red-900/20 p-6 rounded-lg border border-red-700">
                  <p className="leading-relaxed text-red-200">
                    <strong>Important:</strong> Joker's Arena operates as an entertainment platform only. We do not provide gambling services, financial advice, or investment opportunities. The $JOKERS token has no guaranteed value and is not redeemable for fiat currency through this site. Any external trading of the token is community-driven and independent of our platform.
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