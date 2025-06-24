import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import SEOHead from "@/components/seo-head";

export default function Whitepaper() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead 
        title="Whitepaper - Joker's Arena"
        description="Technical whitepaper for Joker's Arena - Revolutionary blockchain casino on Solana with JOKER token integration"
      />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-card border-b border-red-500/20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-500 rounded-lg flex items-center justify-center shadow-lg shadow-red-500/50">
              <i className="fas fa-mask text-white"></i>
            </div>
            <span className="font-orbitron font-bold text-xl gradient-text">JOKER'S ARENA</span>
          </Link>
          
          <Link href="/">
            <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
              Back to Home
            </Button>
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold font-orbitron mb-4 gradient-text">
              JOKER'S ARENA
            </h1>
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#F5F5F5' }}>
              Technical Whitepaper
            </h2>
            <p className="text-xl" style={{ color: '#B0B0B0' }}>
              Revolutionizing Blockchain Gaming on Solana
            </p>
            <div className="mt-6 text-sm" style={{ color: '#888' }}>
              Version 1.0 | December 2024
            </div>
          </motion.div>

          {/* Table of Contents */}
          <motion.div
            className="mb-16 p-8 rounded-2xl"
            style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6" style={{ color: '#FFD700' }}>Table of Contents</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div>1. Executive Summary</div>
                <div>2. Introduction</div>
                <div>3. The JOKER Token</div>
                <div>4. Technology Stack</div>
                <div>5. Casino Games</div>
              </div>
              <div className="space-y-2">
                <div>6. Tokenomics</div>
                <div>7. Roadmap</div>
                <div>8. Security & Fairness</div>
                <div>9. Community & Governance</div>
                <div>10. Legal Compliance</div>
              </div>
            </div>
          </motion.div>

          {/* Content Sections */}
          <div className="space-y-16">
            
            {/* Executive Summary */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="text-3xl font-bold mb-6" style={{ color: '#39FF14' }}>1. Executive Summary</h3>
              <div className="space-y-4 text-lg leading-relaxed" style={{ color: '#E0E0E0' }}>
                <p>
                  Joker's Arena represents the future of blockchain gaming, combining cutting-edge technology with 
                  thrilling casino experiences on the Solana blockchain. Built around the JOKER token, our platform 
                  delivers lightning-fast transactions, provably fair gaming, and a revolutionary user experience.
                </p>
                <p>
                  Our mission is to create the most advanced, secure, and entertaining blockchain casino platform, 
                  leveraging Solana's high throughput and low fees to provide seamless gaming experiences for players worldwide.
                </p>
              </div>
            </motion.section>

            {/* Introduction */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-3xl font-bold mb-6" style={{ color: '#39FF14' }}>2. Introduction</h3>
              <div className="space-y-4 text-lg leading-relaxed" style={{ color: '#E0E0E0' }}>
                <p>
                  The traditional online gambling industry faces numerous challenges including lack of transparency, 
                  slow payment processing, high fees, and limited player trust. Blockchain technology offers solutions 
                  to these problems through decentralization, transparency, and programmable smart contracts.
                </p>
                <p>
                  Joker's Arena addresses these challenges by building on Solana, a high-performance blockchain capable 
                  of processing over 65,000 transactions per second with minimal fees. This enables instant gameplay, 
                  immediate payouts, and a seamless user experience previously impossible in traditional online casinos.
                </p>
              </div>
            </motion.section>

            {/* The JOKER Token */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h3 className="text-3xl font-bold mb-6" style={{ color: '#39FF14' }}>3. The JOKER Token</h3>
              <div className="space-y-4 text-lg leading-relaxed" style={{ color: '#E0E0E0' }}>
                <p>
                  The JOKER token serves as the native currency of Joker's Arena, powering all gaming activities 
                  and platform interactions. Built on the Solana blockchain using the SPL token standard, JOKER 
                  offers fast, low-cost transactions essential for gaming applications.
                </p>
                
                <div className="bg-black/30 p-6 rounded-xl border border-purple-500/20">
                  <h4 className="text-xl font-bold mb-4" style={{ color: '#FFD700' }}>Token Utility</h4>
                  <ul className="space-y-2">
                    <li>• Gaming currency for all casino games</li>
                    <li>• Staking rewards and yield farming</li>
                    <li>• Governance voting rights</li>
                    <li>• VIP membership and exclusive benefits</li>
                    <li>• Tournament entry fees and prizes</li>
                    <li>• Platform revenue sharing</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Technology Stack */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className="text-3xl font-bold mb-6" style={{ color: '#39FF14' }}>4. Technology Stack</h3>
              <div className="space-y-4 text-lg leading-relaxed" style={{ color: '#E0E0E0' }}>
                <p>
                  Joker's Arena is built using modern web technologies and blockchain infrastructure to ensure 
                  optimal performance, security, and user experience.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-black/30 p-6 rounded-xl border border-blue-500/20">
                    <h4 className="text-xl font-bold mb-4" style={{ color: '#FFD700' }}>Frontend</h4>
                    <ul className="space-y-2">
                      <li>• React 18 with TypeScript</li>
                      <li>• Tailwind CSS for styling</li>
                      <li>• Framer Motion animations</li>
                      <li>• Responsive design</li>
                      <li>• PWA capabilities</li>
                    </ul>
                  </div>
                  
                  <div className="bg-black/30 p-6 rounded-xl border border-purple-500/20">
                    <h4 className="text-xl font-bold mb-4" style={{ color: '#FFD700' }}>Blockchain</h4>
                    <ul className="space-y-2">
                      <li>• Solana blockchain</li>
                      <li>• Phantom wallet integration</li>
                      <li>• SPL token standard</li>
                      <li>• Smart contract automation</li>
                      <li>• Real-time transaction processing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Casino Games */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <h3 className="text-3xl font-bold mb-6" style={{ color: '#39FF14' }}>5. Casino Games</h3>
              <div className="space-y-4 text-lg leading-relaxed" style={{ color: '#E0E0E0' }}>
                <p>
                  Our gaming suite combines classic casino favorites with innovative blockchain-powered mechanics, 
                  ensuring fair play through cryptographic verification.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-black/30 p-6 rounded-xl border border-red-500/20">
                    <h4 className="text-xl font-bold mb-4" style={{ color: '#FFD700' }}>Coin Flip</h4>
                    <p className="mb-4">
                      A classic heads-or-tails game with modern animations and instant payouts. 
                      Players choose their side and watch the coin flip with realistic physics.
                    </p>
                    <ul className="space-y-1 text-sm">
                      <li>• 50/50 odds</li>
                      <li>• 1.98x payout multiplier</li>
                      <li>• Animated coin physics</li>
                      <li>• Instant results</li>
                    </ul>
                  </div>
                  
                  <div className="bg-black/30 p-6 rounded-xl border border-green-500/20">
                    <h4 className="text-xl font-bold mb-4" style={{ color: '#FFD700' }}>Number Roll</h4>
                    <p className="mb-4">
                      Pick a number between 1-100 and watch the wheel spin. Higher risk choices 
                      offer massive multiplier rewards for successful predictions.
                    </p>
                    <ul className="space-y-1 text-sm">
                      <li>• Numbers 1-100</li>
                      <li>• Up to 99x multiplier</li>
                      <li>• Animated number wheel</li>
                      <li>• Progressive difficulty</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Tokenomics */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h3 className="text-3xl font-bold mb-6" style={{ color: '#39FF14' }}>6. Tokenomics</h3>
              <div className="space-y-4 text-lg leading-relaxed" style={{ color: '#E0E0E0' }}>
                <p>
                  The JOKER token economy is designed to create sustainable value for all stakeholders while 
                  ensuring long-term platform growth and stability.
                </p>
                
                <div className="bg-black/30 p-6 rounded-xl border border-yellow-500/20">
                  <h4 className="text-xl font-bold mb-4" style={{ color: '#FFD700' }}>Token Distribution</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <ul className="space-y-2">
                        <li>• <strong>80%</strong> - Gaming Rewards & Liquidity</li>
                        <li>• <strong>15%</strong> - Marketing & Partnerships</li>
                        <li>• <strong>5%</strong> - Reserve Fund</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-bold mb-2" style={{ color: '#39FF14' }}>Burn Mechanism</h5>
                      <p className="text-sm">
                        A portion of house edge is permanently burned, creating deflationary pressure 
                        and increasing token scarcity over time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Roadmap */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <h3 className="text-3xl font-bold mb-6" style={{ color: '#39FF14' }}>7. Roadmap</h3>
              <div className="space-y-6">
                <div className="grid gap-6">
                  <div className="bg-black/30 p-6 rounded-xl border-l-4 border-green-500">
                    <h4 className="text-xl font-bold mb-2" style={{ color: '#39FF14' }}>Q4 2024 - Foundation</h4>
                    <ul className="space-y-1">
                      <li>✅ Platform development and testing</li>
                      <li>✅ Smart contract deployment</li>
                      <li>✅ Initial game suite (Coin Flip, Number Roll)</li>
                      <li>✅ Phantom wallet integration</li>
                    </ul>
                  </div>
                  
                  <div className="bg-black/30 p-6 rounded-xl border-l-4 border-yellow-500">
                    <h4 className="text-xl font-bold mb-2" style={{ color: '#FFD700' }}>Q1 2025 - Launch</h4>
                    <ul className="space-y-1">
                      <li>🔄 Public beta testing</li>
                      <li>🔄 Casino mainnet launch</li>
                      <li>🔄 Community building initiatives</li>
                    </ul>
                  </div>
                  
                  <div className="bg-black/30 p-6 rounded-xl border-l-4 border-blue-500">
                    <h4 className="text-xl font-bold mb-2" style={{ color: '#9A00FF' }}>Q2 2025 - Expansion</h4>
                    <ul className="space-y-1">
                      <li>🔮 Additional casino games</li>
                      <li>🔮 Staking and yield farming</li>
                      <li>🔮 NFT integration</li>
                      <li>🔮 Mobile app development</li>
                    </ul>
                  </div>
                  
                  <div className="bg-black/30 p-6 rounded-xl border-l-4 border-purple-500">
                    <h4 className="text-xl font-bold mb-2" style={{ color: '#9A00FF' }}>Q3+ 2025 - Innovation</h4>
                    <ul className="space-y-1">
                      <li>🔮 VR/AR gaming experiences</li>
                      <li>🔮 Cross-chain integration</li>
                      <li>🔮 Esports tournaments</li>
                      <li>🔮 Governance DAO launch</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Security & Fairness */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <h3 className="text-3xl font-bold mb-6" style={{ color: '#39FF14' }}>8. Security & Fairness</h3>
              <div className="space-y-4 text-lg leading-relaxed" style={{ color: '#E0E0E0' }}>
                <p>
                  Security and fairness are paramount in our platform design. We implement multiple layers 
                  of protection and verification to ensure player safety and game integrity.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-black/30 p-6 rounded-xl border border-red-500/20">
                    <h4 className="text-xl font-bold mb-4" style={{ color: '#FFD700' }}>Security Measures</h4>
                    <ul className="space-y-2">
                      <li>• Smart contract audits</li>
                      <li>• Multi-signature wallets</li>
                      <li>• SSL encryption</li>
                      <li>• Regular security assessments</li>
                      <li>• Bug bounty programs</li>
                    </ul>
                  </div>
                  
                  <div className="bg-black/30 p-6 rounded-xl border border-green-500/20">
                    <h4 className="text-xl font-bold mb-4" style={{ color: '#FFD700' }}>Provable Fairness</h4>
                    <ul className="space-y-2">
                      <li>• Cryptographic randomness</li>
                      <li>• Transparent algorithms</li>
                      <li>• On-chain verification</li>
                      <li>• Player seed contribution</li>
                      <li>• Public audit trails</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Community & Governance */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <h3 className="text-3xl font-bold mb-6" style={{ color: '#39FF14' }}>9. Community & Governance</h3>
              <div className="space-y-4 text-lg leading-relaxed" style={{ color: '#E0E0E0' }}>
                <p>
                  Joker's Arena believes in community-driven development. JOKER token holders will have 
                  voting rights on key platform decisions, ensuring the ecosystem evolves according 
                  to player needs and preferences.
                </p>
                
                <div className="bg-black/30 p-6 rounded-xl border border-purple-500/20">
                  <h4 className="text-xl font-bold mb-4" style={{ color: '#FFD700' }}>Governance Features</h4>
                  <ul className="space-y-2">
                    <li>• Game addition proposals</li>
                    <li>• Platform fee adjustments</li>
                    <li>• Revenue distribution decisions</li>
                    <li>• Partnership approvals</li>
                    <li>• Technical upgrade voting</li>
                    <li>• Community event planning</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Legal Compliance */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <h3 className="text-3xl font-bold mb-6" style={{ color: '#39FF14' }}>10. Legal Compliance</h3>
              <div className="space-y-4 text-lg leading-relaxed" style={{ color: '#E0E0E0' }}>
                <p>
                  Joker's Arena is committed to operating within legal frameworks while promoting 
                  responsible gaming. We implement age verification, KYC procedures, and responsible 
                  gaming tools to ensure compliance with applicable regulations.
                </p>
                
                <div className="bg-black/30 p-6 rounded-xl border border-blue-500/20">
                  <h4 className="text-xl font-bold mb-4" style={{ color: '#FFD700' }}>Compliance Measures</h4>
                  <ul className="space-y-2">
                    <li>• Age verification systems</li>
                    <li>• KYC/AML procedures</li>
                    <li>• Responsible gaming tools</li>
                    <li>• Jurisdiction compliance</li>
                    <li>• Regular legal reviews</li>
                    <li>• Player protection protocols</li>
                  </ul>
                </div>
              </div>
            </motion.section>

          </div>

          {/* Footer */}
          <motion.div
            className="mt-20 pt-12 border-t border-gray-800 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <div className="space-y-4">
              <div className="text-2xl font-bold font-orbitron gradient-text">
                JOKER'S ARENA
              </div>
              <p style={{ color: '#B0B0B0' }}>
                The Future of Blockchain Gaming
              </p>
              <div className="flex justify-center space-x-6 text-sm" style={{ color: '#888' }}>
                <span>© 2024 Joker's Arena</span>
                <span>•</span>
                <span>Built on Solana</span>
                <span>•</span>
                <span>Version 1.0</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}