import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Zap, 
  Cpu,
  Leaf,
  Building2
} from 'lucide-react';
import Navbar from './Navbar';
import FooterCTA from './FooterCTA';

const VALUE_CHIPS = [
  'Intelligent infrastructure',
  'Modular + scalable',
  'Built for remote operations',
];

const WHAT_WE_BUILD = [
  {
    icon: Zap,
    title: 'Power Generation',
    description: 'Modular generation systems engineered for industrial and remote environments.',
  },
  {
    icon: Cpu,
    title: 'Automation Software',
    description: 'Operational visibility and control built for field deployment and resilient operations.',
  },
  {
    icon: Leaf,
    title: 'Emissions Mitigation',
    description: 'Solutions designed to reduce emissions intensity and support environmental performance.',
  },
];

const AboutPage: React.FC = () => {
  return (
    <div className="bg-brand-dark min-h-screen text-white font-sans selection:bg-brand-blue selection:text-white overflow-x-hidden">
      <Navbar />

      <main className="pt-28">
        {/* A) Hero Section */}
        <section className="relative overflow-hidden py-16 md:py-24">
          {/* Background Gradient */}
          <div className="pointer-events-none absolute inset-x-0 -top-20 flex justify-center">
            <div className="w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-brand-blue/10 rounded-full blur-[100px]" />
          </div>

          {/* Grid Overlay */}
          <div 
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #38BDF8 1px, transparent 1px), linear-gradient(to bottom, #38BDF8 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />

          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-glow text-xs font-semibold uppercase tracking-wider mb-6">
                  <span className="w-2 h-2 rounded-full bg-brand-glow animate-pulse" />
                  About Us
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
                  About{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-glow">
                    BlueFlare
                  </span>
                </h1>

                <p className="text-slate-400 text-lg md:text-xl max-w-3xl leading-relaxed mb-8">
                  BlueFlare is an energy infrastructure company delivering intelligent, modular, and scalable power solutions for industrial, energy, and remote environments.
                </p>

                {/* Value Chips */}
                <motion.div
                  className="flex flex-wrap gap-3 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {VALUE_CHIPS.map((chip, index) => (
                    <span
                      key={chip}
                      className="text-sm font-medium text-white bg-brand-blue/20 border border-brand-blue/30 px-4 py-2 rounded-full"
                    >
                      {chip}
                    </span>
                  ))}
                </motion.div>

                {/* CTAs */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <a
                    href="/contact"
                    className="group px-8 py-4 bg-brand-blue text-white font-semibold rounded-lg shadow-lg shadow-brand-blue/30 hover:shadow-brand-blue/50 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    Contact Us
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href="#solutions"
                    className="px-8 py-4 bg-transparent border border-white/10 text-white font-semibold rounded-lg hover:bg-white/5 hover:border-white/30 transition-all flex items-center justify-center"
                  >
                    View Solutions
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* B) Company Overview Section */}
        <section className="relative py-16 md:py-24 bg-brand-navy/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-brand-glow" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-blue/90 mb-1">
                    Our Mission
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    Company Overview
                  </h2>
                </div>
              </div>

              <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
                <p>
                  BlueFlare is an energy infrastructure company delivering intelligent, modular, and scalable power solutions for industrial, energy, and remote environments. By integrating power generation, automation software, and emissions mitigation technologies, BlueFlare enables resilient infrastructure designed for reliability, efficiency, and environmental performance.
                </p>
                <p>
                  Our platforms support mission-critical operations where traditional infrastructure is impractical—reducing emissions intensity, optimizing energy use, and powering the next generation of industrial and data-driven systems.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* C) What We Build Section */}
        <section className="relative py-16 md:py-24">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <motion.div
              className="text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-brand-blue/90">
                Our Focus
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                What We{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-glow">
                  Build
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {WHAT_WE_BUILD.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="group bg-brand-navy/20 backdrop-blur-sm border border-white/5 rounded-3xl p-6 md:p-8 hover:border-brand-blue/40 hover:shadow-[0_0_40px_rgba(37,99,235,0.15)] transition-all duration-500"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  {/* Icon with Animated Ring */}
                  <div className="relative flex items-center justify-center w-16 h-16 mb-6">
                    <div className="absolute inset-0 rounded-full border border-brand-blue/30 animate-ring-orbit" />
                    <div className="relative z-10 w-12 h-12 flex items-center justify-center rounded-xl bg-brand-navy text-brand-glow border border-white/10 group-hover:border-brand-blue/50 group-hover:scale-105 transition-all duration-300">
                      <item.icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* D) Closing CTA Band */}
        <section className="relative py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              className="bg-gradient-to-br from-brand-blue to-blue-600 rounded-3xl p-8 md:p-16 text-center shadow-2xl shadow-blue-900/30 relative overflow-hidden"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
            >
              {/* Background Texture */}
              <div className="absolute top-0 right-0 p-12 opacity-10 transform translate-x-1/2 -translate-y-1/2">
                <Building2 size={300} />
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 relative z-10">
                Built for reliability—designed for the field.
              </h2>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10 relative z-10">
                Partner with BlueFlare for intelligent, modular, and scalable power solutions that deliver results in the most demanding environments.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <a
                  href="/contact"
                  className="bg-white text-brand-blue font-bold px-10 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  Contact Us
                  <ArrowRight size={20} />
                </a>
                <a
                  href="#solutions"
                  className="bg-transparent border-2 border-white/30 text-white font-bold px-10 py-4 rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 inline-flex items-center justify-center"
                >
                  Explore Solutions
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <FooterCTA showMainCTA={false} />
    </div>
  );
};

export default AboutPage;
