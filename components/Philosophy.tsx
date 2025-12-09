import React from 'react';
import { motion } from 'framer-motion';
import Section from './ui/Section';
import { GitMerge, Leaf, BarChart3 } from 'lucide-react';

const steps = [
  { 
    id: "01",
    title: "Decentralize", 
    desc: "Moving from fragile centralized grids to resilient, localized power generation nodes.",
    icon: GitMerge,
    color: "text-blue-400"
  },
  { 
    id: "02",
    title: "Decarbonize", 
    desc: "Implementing carbon-capture and renewable integration to lower industrial footprints.",
    icon: Leaf,
    color: "text-green-400"
  },
  { 
    id: "03",
    title: "Optimize", 
    desc: "Leveraging real-time AI to balance loads and maximize asset efficiency",
    icon: BarChart3,
    color: "text-cyan-400"
  }
];

const Philosophy: React.FC = () => {
  return (
    <Section className="relative overflow-hidden bg-brand-dark">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-brand-blue/10 rounded-full blur-[80px] md:blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-glow">BlueFlare</span> Method
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute inset-0 top-1/2 -translate-y-1/2 left-[16%] right-[16%] h-[2px] md:h-[3px] -z-10">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#1DA2F5]/40 via-[#00D1FF]/60 to-[#1DA2F5]/40"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </div>

          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              className="group relative flex flex-col items-center text-center p-6 md:p-8 bg-brand-navy/20 backdrop-blur-sm border border-white/5 rounded-3xl hover:border-brand-blue/40 hover:shadow-[0_0_40px_rgba(37,99,235,0.15)] transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.3 }}
            >
              <div className="relative flex items-center justify-center w-16 h-16 mb-8">
                <div className="absolute inset-0 rounded-full border border-brand-blue/30 animate-ring-orbit" />
                <div className={`relative z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-brand-navy text-brand-glow border border-white/10 group-hover:border-brand-blue/50 group-hover:scale-105 transition-all duration-300 ${step.color}`}>
                  <step.icon className="w-6 h-6 md:w-7 md:h-7" />
                </div>
              </div>
              <div className="text-xs font-bold tracking-widest text-slate-500 mb-2">{step.id}</div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Philosophy;