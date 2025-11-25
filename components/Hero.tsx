import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Server, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Simulating random node connections
  const nodes = Array.from({ length: 8 }).map((_, i) => ({
    top: `${Math.random() * 80 + 10}%`,
    left: `${Math.random() * 80 + 10}%`,
    delay: i * 0.5,
  }));

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20">
      {/* Background - Stylized Datacenter */}
      <div className="absolute inset-0 z-0 bg-brand-dark">
        {/* Grid Overlay */}
        <div 
            className="absolute inset-0 opacity-10"
            style={{
                backgroundImage: `linear-gradient(to right, #38BDF8 1px, transparent 1px), linear-gradient(to bottom, #38BDF8 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
            }}
        ></div>
        
        {/* Deep Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-transparent to-brand-dark opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-navy/30 to-brand-dark"></div>

        {/* Animated Nodes */}
        {mounted && nodes.map((node, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-brand-glow shadow-[0_0_10px_#38BDF8]"
            style={{ top: node.top, left: node.left }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: 4, repeat: Infinity, delay: node.delay, ease: "easeInOut" }}
          >
            {/* Connecting Lines could be SVG, but simple pulses work well for abstract feel */}
            <div className="absolute inset-0 -z-10 bg-brand-glow rounded-full animate-ping opacity-30"></div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-glow text-xs font-semibold uppercase tracking-wider mb-6">
                    <span className="w-2 h-2 rounded-full bg-brand-glow animate-pulse"></span>
                    Next-Gen Infrastructure
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white mb-6">
                    Powering the <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-brand-glow">
                        Future of Energy
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed">
                    BlueFlare Energy delivers next-generation energy solutions—from infrastructure development to smart optimization—for a resilient, decentralized, and sustainable future.
                </p>
            </motion.div>

            <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <a
                    href="#projects"
                    className="group px-8 py-4 bg-brand-blue text-white font-semibold rounded-lg shadow-lg shadow-brand-blue/30 hover:shadow-brand-blue/50 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                    View Projects
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                    href="#solutions"
                    className="px-8 py-4 bg-transparent border border-white/10 text-white font-semibold rounded-lg hover:bg-white/5 hover:border-white/30 transition-all flex items-center justify-center"
                >
                    Explore Solutions
                </a>
            </motion.div>
        </div>

        {/* Visual / Metrics Dashboard */}
        <motion.div
            className="hidden md:block relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
        >
            <div className="relative aspect-square max-w-md mx-auto">
                {/* Central "Flare" Core */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-blue to-brand-navy blur-xl opacity-50 animate-pulse-slow"></div>
                    <div className="relative w-24 h-24 rounded-full bg-brand-navy border border-brand-blue/50 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.4)] z-10">
                        <Zap className="w-10 h-10 text-brand-glow" fill="currentColor" />
                    </div>
                </div>

                {/* Orbiting Metric Cards */}
                <MetricCard 
                    label="Grid Uptime" 
                    value="99.99%" 
                    icon={Server} 
                    className="absolute top-10 left-0" 
                    delay={1.2} 
                />
                 <MetricCard 
                    label="Emissions" 
                    value="-22%" 
                    icon={Zap} 
                    isPositive={false}
                    className="absolute top-10 right-0" 
                    delay={1.4} 
                />
                 <MetricCard 
                    label="Efficiency" 
                    value="+18%" 
                    icon={Activity} 
                    className="absolute bottom-10 left-10" 
                    delay={1.6} 
                />
            </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-slate-500 flex justify-center p-1">
            <div className="w-1 h-2 bg-brand-glow rounded-full"></div>
        </div>
      </motion.div>
    </div>
  );
};

const MetricCard: React.FC<{ label: string; value: string; icon: any; className?: string; delay: number; isPositive?: boolean }> = ({ label, value, icon: Icon, className, delay, isPositive = true }) => (
    <motion.div
        className={`bg-slate-900/80 backdrop-blur border border-slate-700 p-4 rounded-xl shadow-2xl flex items-center gap-3 w-40 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
    >
        <div className={`p-2 rounded-lg ${isPositive ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-brand-glow'}`}>
            <Icon size={18} />
        </div>
        <div>
            <div className="text-white font-bold text-lg">{value}</div>
            <div className="text-xs text-slate-400 uppercase tracking-wide">{label}</div>
        </div>
    </motion.div>
);

export default Hero;