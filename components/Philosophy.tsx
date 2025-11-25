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
    desc: "Leveraging real-time AI to balance loads and maximize asset efficiency.",
    icon: BarChart3,
    color: "text-cyan-400"
  }
];

const Philosophy: React.FC = () => {
  return (
    <Section className="bg-brand-dark">
      <div className="grid md:grid-cols-3 gap-8 relative">
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-slate-800 -z-10">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-cyan-500"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </div>

        {steps.map((step, idx) => (
          <motion.div
            key={step.title}
            className="relative flex flex-col items-center text-center p-6 bg-slate-900/50 rounded-2xl border border-slate-800/50 backdrop-blur-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.3 }}
          >
            <div className={`w-24 h-24 rounded-full bg-slate-900 border-4 border-slate-800 flex items-center justify-center mb-6 shadow-xl z-10 ${step.color}`}>
              <step.icon size={32} />
            </div>
            <div className="text-xs font-bold tracking-widest text-slate-500 mb-2">{step.id}</div>
            <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Philosophy;