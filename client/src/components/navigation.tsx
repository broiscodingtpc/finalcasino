import { motion } from "framer-motion";

export default function Navigation() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      className="fixed top-0 w-full z-40 glass-card"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-500 rounded-lg flex items-center justify-center shadow-lg shadow-red-500/50">
            <i className="fas fa-mask text-white"></i>
          </div>
          <span className="font-orbitron font-bold text-xl gradient-text">JOKER'S ARENA</span>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => scrollToSection('presale')}
            className="hover:text-red-500 transition-colors font-medium"
          >
            Token Info
          </button>
          <button 
            onClick={() => scrollToSection('roadmap')}
            className="hover:text-red-500 transition-colors font-medium"
          >
            Roadmap
          </button>
          <button 
            onClick={() => scrollToSection('whitepaper')}
            className="hover:text-red-500 transition-colors font-medium"
          >
            Whitepaper
          </button>
          <a 
            href="https://t.me/JOKERS_ARENA" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-lg text-black"
            style={{
              background: 'linear-gradient(45deg, #39FF14, #FFD700)',
              boxShadow: '0 8px 20px rgba(57, 255, 20, 0.3)'
            }}
          >
            Join Telegram
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
