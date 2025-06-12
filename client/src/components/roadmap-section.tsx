import { motion } from "framer-motion";

const roadmapPhases = [
  {
    phase: "PHASE 1",
    title: "Presale",
    description: "Launch presale and build initial community",
    icon: "fas fa-rocket"
  },
  {
    phase: "PHASE 2",
    title: "LP Launch",
    description: "Revshare.dev integration and trading begins",
    icon: "fas fa-chart-line"
  },
  {
    phase: "PHASE 3",
    title: "Raffle Bot & Games",
    description: "Interactive gaming platform launch",
    icon: "fas fa-dice"
  },
  {
    phase: "PHASE 4",
    title: "Staking + Airdrops",
    description: "Reward system and passive income",
    icon: "fas fa-coins"
  },
  {
    phase: "PHASE 5",
    title: "Chaos Utility Expansion",
    description: "Advanced features and partnerships",
    icon: "fas fa-expand"
  }
];

export default function RoadmapSection() {
  return (
    <section id="roadmap" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-orbitron font-bold text-3xl md:text-5xl mb-4 gradient-text">PROJECT ROADMAP</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-joker-purple to-joker-pink mx-auto"></div>
        </motion.div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-6">
            {roadmapPhases.map((phase, index) => (
              <motion.div 
                key={index}
                className="glass-card rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-500/50">
                  <i className={`${phase.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="font-orbitron font-bold text-lg mb-3 gradient-text">{phase.phase}</h3>
                <h4 className="font-semibold mb-2">{phase.title}</h4>
                <p className="text-sm text-gray-400">{phase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
