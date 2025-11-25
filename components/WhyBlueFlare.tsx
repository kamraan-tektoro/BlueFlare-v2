import React from 'react';
import { motion } from 'framer-motion';
import Section from './ui/Section';
import { ShieldCheck, Globe, Zap, Cpu } from 'lucide-react';

const pillars = [
  { title: "Alberta Energy Expertise", icon: ShieldCheck, text: "Rooted in decades of energy sector leadership." },
  { title: "Multinational Capabilities", icon: Globe, text: "Deploying mission-critical assets globally." },
  { title: "End-to-End Delivery", icon: Zap, text: "From initial permitting to final commissioning." },
  { title: "Innovation at the Core", icon: Cpu, text: "AI-driven load balancing and carbon-ready sites." }
];

const WhyBlueFlare: React.FC = () => {
  return (
    <Section id="why-us" className="bg-brand-dark overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left: Heading */}
        <div className="lg:w-1/3">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Why BlueFlare?</h2>
            <p className="text-slate-400 text-lg">
              We combine deep industry roots with cutting-edge technology to build the grid of tomorrow.
            </p>
          </motion.div>
        </div>

        {/* Right: Pillars */}
        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
           {/* Center Decoration */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-brand-blue/10 rounded-full blur-3xl -z-10"></div>

          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="shrink-0 mt-1">
                <pillar.icon className="w-8 h-8 text-brand-glow group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">{pillar.title}</h3>
                <p className="text-slate-400 text-sm">{pillar.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default WhyBlueFlare;