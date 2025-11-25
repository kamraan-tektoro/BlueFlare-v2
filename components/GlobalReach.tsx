import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from './ui/Section';
import { REGIONS } from '../constants';

const GlobalReach: React.FC = () => {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  return (
    <Section id="global" className="bg-[#0f172a]">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Global Reach. Local Expertise.</h2>
      </div>

      <div className="relative w-full aspect-[16/9] bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        {/* Map Background Grid */}
        <div className="absolute inset-0" 
             style={{ 
               backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', 
               backgroundSize: '20px 20px' 
             }}>
        </div>

        {/* World Silhouette (Simplified CSS representation) */}
        {/* In a real production app, this would be a D3 or SVG map path. Here we use an abstract representation. */}
        <div className="absolute inset-0 opacity-20">
           {/* Abstract shapes to suggest continents */}
           <div className="absolute top-[20%] left-[10%] w-[25%] h-[30%] bg-slate-500 rounded-full blur-3xl"></div> {/* NA */}
           <div className="absolute top-[25%] left-[45%] w-[15%] h-[20%] bg-slate-500 rounded-full blur-3xl"></div> {/* EU */}
           <div className="absolute top-[30%] left-[70%] w-[20%] h-[35%] bg-slate-500 rounded-full blur-3xl"></div> {/* ASIA */}
        </div>
        
        {/* Region Pins */}
        {REGIONS.map((region) => (
            <div 
                key={region.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ left: `${region.x}%`, top: `${region.y}%` }}
                onMouseEnter={() => setActiveRegion(region.id)}
                onMouseLeave={() => setActiveRegion(null)}
            >
                {/* Pin Pulse */}
                <div className="relative">
                    <div className="absolute -inset-4 bg-brand-blue rounded-full opacity-30 animate-ping"></div>
                    <div className="w-4 h-4 bg-brand-glow rounded-full shadow-[0_0_15px_#38BDF8] border-2 border-white relative z-10 transition-transform group-hover:scale-125"></div>
                </div>

                {/* Info Card */}
                <AnimatePresence>
                    {activeRegion === region.id && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 bg-slate-900/95 backdrop-blur-md border border-slate-600 p-4 rounded-xl shadow-xl z-20"
                        >
                            <h4 className="text-white font-bold mb-1">{region.name}</h4>
                            <p className="text-slate-300 text-xs">{region.description}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        ))}

        {/* Connecting Arcs (Decorational) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
            <motion.path 
                d="M 200 200 Q 450 100 600 250" 
                fill="none" 
                stroke="#38BDF8" 
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
            />
             <motion.path 
                d="M 600 250 Q 800 300 900 400" 
                fill="none" 
                stroke="#38BDF8" 
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
            />
        </svg>

      </div>
    </Section>
  );
};

export default GlobalReach;