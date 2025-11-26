import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from './ui/Section';
import { REGIONS } from '../constants';

const GlobalReach: React.FC = () => {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  // Simplified World Map Path (Robinson-like projection for better aesthetics)
  const worldPath = "M158.4,56.8c-1.8-0.6-3.7-1.4-5.2-2.5c-2-1.5-3.6-3.4-4.7-5.5c-0.6-1.1-1.1-2.3-1.4-3.5c-0.4-1.6-0.3-3.2,0.3-4.8 c1.1-2.8,3.7-5,6.6-5.8c1.6-0.4,3.2-0.5,4.9-0.2c2.8,0.5,5.3,2.3,6.8,4.7c0.8,1.3,1.3,2.8,1.4,4.4c0.1,2.5-0.9,4.9-2.7,6.7 C162.7,52,160.7,56.8,158.4,56.8z M127.2,30.4c-0.7-1.1-1.6-2-2.7-2.7c-2.3-1.4-5.1-1.6-7.6-0.6c-2.5,1-4.4,3.2-5.1,5.8 c-0.4,1.4-0.4,2.9,0.1,4.3c0.9,2.5,3.1,4.4,5.7,4.9c2.6,0.5,5.3-0.4,7.1-2.3C126.9,37.6,128.1,34.1,127.2,30.4z M97.5,19.3 c-2.2-0.6-4.6-0.2-6.6,1.1c-2,1.3-3.3,3.4-3.6,5.8c-0.2,1.6,0.2,3.3,1.2,4.6c1.7,2.3,4.6,3.4,7.4,2.9c1.6-0.3,3.1-1.2,4.2-2.4 C102.1,28.8,102.1,24.1,97.5,19.3z M66.4,25.6c-0.6-0.6-1.3-1.2-2-1.6c-1.3-0.8-2.9-1.2-4.4-1.1c-2.4,0.1-4.6,1.4-5.9,3.4 c-0.7,1.1-1,2.4-0.9,3.7c0.2,2.6,1.8,4.9,4.2,6c2.4,1.1,5.2,0.8,7.3-0.8C66.8,33.5,67.6,29.8,66.4,25.6z M38.6,31.7 c-2.3-1.5-5.2-1.9-7.8-1.1c-2.6,0.8-4.6,3-5.3,5.6c-0.4,1.3-0.3,2.7,0.2,4c0.8,2.1,2.6,3.8,4.8,4.5c2.2,0.7,4.6,0.3,6.5-1.1 C39.5,41.9,40.6,37.3,38.6,31.7z";
  
  // A cleaner, simplified polygon-style map path
  const continentPath = "M 48 30 L 45 35 L 55 45 L 45 55 L 35 60 L 30 50 L 25 35 L 18 20 L 30 15 L 50 15 L 60 25 L 48 30 Z M 70 20 L 80 18 L 90 20 L 95 30 L 85 45 L 80 40 L 75 42 L 70 35 L 68 25 L 70 20 Z M 100 20 L 110 15 L 125 15 L 130 25 L 120 35 L 110 30 L 105 25 L 100 20 Z M 120 40 L 130 38 L 140 45 L 135 55 L 125 50 L 120 40 Z M 145 50 L 155 45 L 165 50 L 160 65 L 150 60 L 145 50 Z M 80 50 L 90 55 L 85 70 L 75 65 L 80 50 Z";
  
  // This path is just for visual texture - we'll rely on the manual region plotting
  
  return (
    <Section id="global" className="bg-[#0f172a] relative overflow-hidden">
      <div className="text-center mb-16 relative z-10">
        <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            Global Reach. Local Expertise.
        </motion.h2>
        <p className="text-slate-400 max-w-xl mx-auto">
            From our headquarters in Alberta to major hubs in Texas and Dubai, we’re building a connected energy future.
        </p>
      </div>

      <div className="relative w-full max-w-6xl mx-auto aspect-[1.9/1] bg-brand-navy/20 rounded-3xl border border-white/5 shadow-2xl backdrop-blur-sm overflow-hidden">
        
        {/* Background Grid & Texture */}
        <div className="absolute inset-0 z-0 opacity-20" 
             style={{ 
               backgroundImage: 'linear-gradient(rgba(56, 189, 248, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.2) 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }}>
        </div>
        
        {/* Map Container */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
            <svg viewBox="0 0 100 50" className="w-full h-full drop-shadow-[0_0_15px_rgba(37,99,235,0.2)]">
                
                <defs>
                    <linearGradient id="mapGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#1e293b" />
                        <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
                        <stop offset="50%" stopColor="#38BDF8" stopOpacity="1" />
                        <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>

                {/* World Map Silhouette - Simplified & Clean */}
                <g fill="#1e293b" stroke="#334155" strokeWidth="0.2">
                    {/* North America */}
                    <path d="M15,10 L25,8 L32,8 L40,15 L35,22 L30,25 L22,35 L18,30 L12,20 Z" />
                    {/* South America */}
                    <path d="M25,36 L32,35 L38,40 L35,48 L30,46 L28,40 Z" />
                    {/* Europe & Asia */}
                    <path d="M42,12 L50,8 L65,8 L80,10 L85,15 L90,20 L85,28 L75,32 L65,30 L60,25 L55,22 L50,20 L45,18 Z" />
                    {/* Africa */}
                    <path d="M48,22 L55,22 L62,25 L65,35 L58,42 L52,35 L48,28 Z" />
                    {/* Australia */}
                    <path d="M78,38 L88,36 L90,42 L85,45 L80,42 Z" />
                </g>

                {/* Connection Arcs */}
                {/* Alberta (16, 26) -> Houston (23, 38) */}
                <motion.path
                    d="M 16 26 Q 16 34 23 38"
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="0.3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.8 }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                />
                
                {/* Houston (23, 38) -> Dubai (64, 42) */}
                <motion.path
                    d="M 23 38 Q 44 55 64 42"
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="0.3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.8 }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 1.5 }}
                />
            </svg>
            
            {/* React Overlay for Pins (using % coordinates) */}
            <div className="absolute inset-0 pointer-events-none">
                 {REGIONS.map((region, idx) => (
                    <div 
                        key={region.id}
                        className="absolute w-0 h-0 pointer-events-auto"
                        style={{ left: `${region.x}%`, top: `${region.y}%` }}
                    >
                         <motion.div 
                            className="relative -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                            onMouseEnter={() => setActiveRegion(region.id)}
                            onMouseLeave={() => setActiveRegion(null)}
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.8 + 0.5, type: "spring" }}
                         >
                            {/* Outer Pulse Ring */}
                            <div className="absolute -inset-6 bg-brand-blue/20 rounded-full animate-ping opacity-50"></div>
                            
                            {/* Glow */}
                            <div className="absolute -inset-2 bg-brand-glow/40 rounded-full blur-sm"></div>

                            {/* Main Dot */}
                            <div className="w-3 h-3 md:w-4 md:h-4 bg-white rounded-full shadow-[0_0_15px_#38BDF8] ring-4 ring-brand-blue/30 transition-transform group-hover:scale-125 relative z-10"></div>
                            
                            {/* Label Tag (Always visible for these main hubs) */}
                            <motion.div 
                                className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
                                initial={{ opacity: 0, y: -5 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.8 + 1 }}
                            >
                                <div className="flex flex-col items-center">
                                    <div className="h-4 w-[1px] bg-brand-glow/50 mb-1"></div>
                                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-glow bg-slate-900/80 px-2 py-1 rounded border border-brand-blue/30 backdrop-blur-sm">
                                        {region.name}
                                    </span>
                                </div>
                            </motion.div>

                            {/* Expanded Info Card (Hover) */}
                            <AnimatePresence>
                                {activeRegion === region.id && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 20 }}
                                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                        className="absolute top-8 left-1/2 -translate-x-1/2 w-56 bg-brand-dark/95 backdrop-blur-xl border border-brand-glow/30 p-4 rounded-xl shadow-2xl z-50 text-center"
                                    >
                                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-brand-dark border-t border-l border-brand-glow/30 transform rotate-45"></div>
                                        <h4 className="text-white font-bold mb-1 relative z-10">{region.name}</h4>
                                        <p className="text-slate-300 text-xs leading-snug relative z-10">{region.description}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                         </motion.div>
                    </div>
                 ))}
            </div>
        </div>
        
        {/* Footer Data Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-slate-900/80 backdrop-blur border-t border-white/5 flex items-center justify-between px-8 text-[10px] text-slate-500 font-mono uppercase tracking-wider">
            <span>System Status: Optimal</span>
            <span className="hidden md:inline">Nodes Active: 3/3</span>
            <span className="flex items-center gap-2">
                Live Data 
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            </span>
        </div>
      </div>
    </Section>
  );
};

export default GlobalReach;