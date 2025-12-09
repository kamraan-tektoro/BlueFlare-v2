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
    <Section id="why-us" className="relative overflow-hidden bg-brand-dark">
      {/* Radial Gradient Background to match How We Help */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-brand-blue/10 rounded-full blur-[80px] md:blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Heading (keeps theme/gradient, removes 'Wins') */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-glow">BlueFlare</span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Deep industry roots paired with cutting-edge technology—built to deliver resilient, ready-to-deploy power everywhere you need it.
              </p>
            </motion.div>
          </div>

          {/* Right: Cards grid styled like How We Help, old 2-column layout */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {pillars.map((pillar, index) => (
              <motion.article
                key={pillar.title}
                className="group relative flex flex-col justify-between h-full bg-brand-navy/20 backdrop-blur-sm border border-white/5 rounded-3xl p-6 md:p-8 hover:border-brand-blue/40 hover:shadow-[0_0_40px_rgba(37,99,235,0.15)] transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div>
                  {/* Icon with Animated Ring to mirror How We Help */}
                  <div className="relative flex items-center justify-center w-16 h-16 mb-8">
                    <div className="absolute inset-0 rounded-full border border-brand-blue/30 animate-ring-orbit" />
                    <div className="relative z-10 w-10 h-10 flex items-center justify-center rounded-xl bg-brand-navy text-brand-glow border border-white/10 group-hover:border-brand-blue/50 group-hover:scale-105 transition-all duration-300">
                      <pillar.icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4">{pillar.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {pillar.text}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default WhyBlueFlare;