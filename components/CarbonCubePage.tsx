import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Shield, 
  BarChart3, 
  Radio, 
  Wind,
  Box,
  Leaf,
  Battery,
  Gauge,
  FileCheck,
  TrendingUp
} from 'lucide-react';
import Navbar from './Navbar';
import FooterCTA from './FooterCTA';

const HIGHLIGHTS = [
  { icon: Leaf, label: 'Emissions reduction enablement' },
  { icon: Wind, label: 'Reliable instrument air generation' },
  { icon: BarChart3, label: 'Carbon credit readiness' },
  { icon: Battery, label: 'Hybrid power + intelligent automation' },
  { icon: Radio, label: 'Remote monitoring' },
];

const AT_A_GLANCE = [
  { icon: Box, label: 'Portable 6\' steel enclosure' },
  { icon: Wind, label: 'Methane mitigation + instrument air' },
  { icon: Zap, label: 'Autonomous operation (minimal generator runtime)' },
];

const CarbonCubePage: React.FC = () => {
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
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text Content */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-glow text-xs font-semibold uppercase tracking-wider mb-6">
                    <span className="w-2 h-2 rounded-full bg-brand-glow animate-pulse" />
                    Methane Mitigation System
                  </div>

                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
                    CARBON{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-glow">
                      CUBE
                    </span>
                  </h1>

                  <p className="text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed">
                    Portable Methane Mitigation & Instrument Air System
                  </p>
                </motion.div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <a
                    href="/contact"
                    className="group px-8 py-4 bg-brand-blue text-white font-semibold rounded-lg shadow-lg shadow-brand-blue/30 hover:shadow-brand-blue/50 transition-all active:scale-95 inline-flex items-center justify-center gap-2"
                  >
                    Request Specs
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              </div>

              {/* Right Column - At-a-glance Card */}
              <motion.div
                className="flex justify-center lg:justify-end"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="bg-brand-navy/30 backdrop-blur-sm border border-white/10 rounded-3xl p-8 max-w-md w-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center">
                      <Box className="w-6 h-6 text-brand-glow" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">At-a-Glance</h3>
                      <p className="text-slate-400 text-sm">Carbon Cube</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {AT_A_GLANCE.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-brand-dark/50 rounded-xl border border-white/5">
                        <div className="w-8 h-8 rounded-lg bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-4 h-4 text-brand-glow" />
                        </div>
                        <span className="text-slate-300 text-sm font-medium">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* B) General Description Section */}
        <section className="relative py-16 md:py-24 bg-brand-navy/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Description Text */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                  What is{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-glow">
                    Carbon Cube
                  </span>
                  ?
                </h2>

                <div className="space-y-4 text-slate-400 leading-relaxed">
                  <p>
                    The BlueFlare Carbon Cube is a fully integrated, portable methane mitigation and instrument air system housed in a compact 6' steel enclosure. Engineered for oil & gas field deployment, Carbon Cube enables emissions reduction, reliable instrument air generation, and carbon credit readiness—while operating autonomously with minimal generator runtime.
                  </p>
                  <p>
                    Carbon Cube combines hybrid power, intelligent automation, and remote monitoring to deliver ESG-aligned infrastructure without sacrificing operational reliability.
                  </p>
                </div>
              </motion.div>

              {/* Highlights List */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-xl font-bold text-white mb-6">Key Highlights</h3>
                <div className="grid gap-4">
                  {HIGHLIGHTS.map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="flex items-center gap-4 p-4 bg-brand-navy/20 backdrop-blur-sm border border-white/5 rounded-xl hover:border-brand-blue/30 transition-colors"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-brand-glow" />
                      </div>
                      <span className="text-slate-300 font-medium">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* C) Certifications & Testing Section */}
        <section className="relative py-16 md:py-24">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-brand-navy/20 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5">
                  <FileCheck size={150} />
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center">
                    <Shield className="w-7 h-7 text-brand-glow" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-blue/90 mb-1">
                      Compliance
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                      Certifications & Testing
                    </h2>
                  </div>
                </div>

                <p className="text-slate-400 leading-relaxed">
                  Third-party certifications and formal testing are planned and future-facing. System architecture is designed to align with applicable CSA, EPA, and ESG reporting frameworks.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {['CSA', 'EPA', 'ESG'].map((cert) => (
                    <span 
                      key={cert}
                      className="text-[11px] uppercase tracking-wider font-medium text-slate-500 border border-white/10 px-4 py-2 rounded-full"
                    >
                      {cert} Framework Ready
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* D) Deployment Metrics Section */}
        <section className="relative py-16 md:py-24 bg-brand-navy/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              className="text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-brand-blue/90">
                Team Experience
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Deployment{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-glow">
                  Metrics
                </span>
              </h2>
            </motion.div>

            <motion.div
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-brand-navy/20 backdrop-blur-sm border border-brand-blue/30 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5">
                  <TrendingUp size={150} />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center">
                      <Gauge className="w-8 h-8 text-brand-glow" />
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-5xl sm:text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-glow">
                      3.5+
                    </span>
                    <span className="text-3xl sm:text-4xl font-bold text-white ml-2">GW</span>
                  </div>

                  <p className="text-slate-400 text-lg max-w-md mx-auto leading-relaxed">
                    of deployed power infrastructure across North America (experience prior to BlueFlare Energy Solutions).
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* E) Final CTA Band */}
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
                <Box size={300} />
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 relative z-10">
                Deploy methane mitigation without sacrificing reliability.
              </h2>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10 relative z-10">
                Carbon Cube delivers ESG-aligned infrastructure with autonomous operation and intelligent automation for oil & gas field deployment.
              </p>

              <a
                href="/contact"
                className="bg-white text-brand-blue font-bold px-10 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2 relative z-10"
              >
                Request Specs
                <ArrowRight size={20} />
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <FooterCTA showMainCTA={false} />
    </div>
  );
};

export default CarbonCubePage;
