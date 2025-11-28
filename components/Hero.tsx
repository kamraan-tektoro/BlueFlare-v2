import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Server, Zap, Database } from 'lucide-react';
import MetricCard from './hero/metric-card';

type Metric = {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
  icon?: any;
  isPositive?: boolean;
};

const HERO_METRICS: Metric[] = [
  {
    id: "uptime",
    value: 99.99,
    suffix: "%",
    label: "Grid & Site Uptime",
    description: "Across generator and microgrid deployments",
    icon: Server,
  },
  {
    id: "carbonCapture",
    value: 5200,
    suffix: "+",
    label: "Tons CO₂e Captured",
    description: "Through optimized dispatch and fuel utilization",
    icon: Zap,
    isPositive: true,
  },
  {
    id: "efficiency",
    prefix: "+",
    value: 18,
    suffix: "%",
    label: "Efficiency Gain",
    description: "From AI-driven optimization and monitoring",
    icon: Activity,
  },
  {
    id: "capacity",
    value: 75,
    suffix: "+ MW",
    label: "Installed Capacity",
    description: "Combined capacity across BlueFlare projects",
    icon: Database,
  },
];

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
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-28">
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid lg:grid-cols-2 gap-12 items-center">
        
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

        {/* Visual / Metrics Dashboard - Right Column */}
        <div className="flex w-full justify-center items-center">
            <div className="relative flex w-full max-w-xl justify-center mx-auto">
                {/* Metric Grid - Perfect 2x2 */}
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.15
                            }
                        }
                    }}
                >
                    <MetricCard
                        {...HERO_METRICS[0]}
                        className="bg-slate-900/90 border-slate-700/50"
                    />
                    <MetricCard
                        {...HERO_METRICS[1]}
                        className="bg-slate-900/90 border-slate-700/50"
                    />
                    <MetricCard
                        {...HERO_METRICS[2]}
                        className="bg-slate-900/90 border-slate-700/50"
                    />
                    <MetricCard
                        {...HERO_METRICS[3]}
                        className="bg-slate-900/90 border-slate-700/50"
                    />
                </motion.div>

                {/* Centered Logo Orb (desktop only) */}
                <motion.div
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <div className="relative flex items-center justify-center">
                        <div className="absolute w-40 h-40 rounded-full bg-gradient-to-br from-brand-blue to-brand-navy blur-2xl opacity-50 animate-pulse-slow"></div>
                        <div className="relative w-28 h-28 rounded-full bg-brand-navy border border-brand-blue/50 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.4)] z-10">
                            <img 
                                src="/blueflare-logo.webp" 
                                alt="BlueFlare" 
                                className="w-16 h-16 object-contain"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Mobile Logo (non-overlapping, below grid) */}
            <div className="mt-6 flex justify-center lg:hidden">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <div className="relative flex items-center justify-center">
                        <div className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-brand-blue to-brand-navy blur-2xl opacity-40 animate-pulse-slow"></div>
                        <div className="relative w-24 h-24 rounded-full bg-brand-navy border border-brand-blue/50 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.4)] z-10">
                            <img 
                                src="/blueflare-logo.webp" 
                                alt="BlueFlare" 
                                className="w-14 h-14 object-contain"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
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

export default Hero;