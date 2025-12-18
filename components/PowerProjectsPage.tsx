import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Zap,
  Shield,
  Clock,
  DollarSign,
  Leaf,
  Factory,
  Server,
  Battery,
  Building2,
  Search,
  Settings,
  Rocket,
  Headphones,
  Anchor
} from 'lucide-react';
import Navbar from './Navbar';
import FooterCTA from './FooterCTA';

const AT_A_GLANCE = [
  { icon: Shield, label: 'Reliability-first delivery' },
  { icon: Clock, label: 'Speed of deployment' },
  { icon: DollarSign, label: 'Cost optimization' },
];

const PROJECT_TYPES = [
  { icon: Zap, label: 'Microgrids' },
  { icon: Factory, label: 'Industrial power systems' },
  { icon: Battery, label: 'Backup & resiliency infrastructure' },
  { icon: Building2, label: 'Utility-scale generation' },
];

const VALUE_PROPS = [
  { label: 'Reliability' },
  { label: 'Speed of deployment' },
  { label: 'Cost optimization' },
  { label: 'Energy efficiency' },
  { label: 'Decarbonization' },
];

const DELIVERY_STEPS = [
  { icon: Search, step: '01', label: 'Assess requirements' },
  { icon: Settings, step: '02', label: 'Engineer the system' },
  { icon: Rocket, step: '03', label: 'Deploy and commission' },
  { icon: Headphones, step: '04', label: 'Operate and support' },
];

const PowerProjectsPage: React.FC = () => {
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
                    Large-Scale Infrastructure
                  </div>

                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
                    Power{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-glow">
                      Projects
                    </span>
                  </h1>

                  <p className="text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed">
                    Industrial / Utility / Large-Scale Energy Infrastructure
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
                    className="group px-8 py-4 bg-brand-blue text-white font-semibold rounded-lg shadow-lg shadow-brand-blue/30 hover:shadow-brand-blue/50 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    Discuss a Project
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href="/contact"
                    className="px-8 py-4 bg-transparent border border-white/10 text-white font-semibold rounded-lg hover:bg-white/5 hover:border-white/30 transition-all flex items-center justify-center"
                  >
                    Request a Scope Review
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
                      <Anchor className="w-6 h-6 text-brand-glow" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">At-a-Glance</h3>
                      <p className="text-slate-400 text-sm">Power Projects</p>
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

        {/* B) What Qualifies as a Power Project */}
        <section className="relative py-16 md:py-24 bg-brand-navy/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              className="text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-brand-blue/90">
                Project Scope
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                What Qualifies as a{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-glow">
                  Power Project
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROJECT_TYPES.map((type, index) => (
                <motion.div
                  key={type.label}
                  className="group bg-brand-navy/20 backdrop-blur-sm border border-white/5 rounded-2xl p-6 text-center hover:border-brand-blue/40 hover:shadow-[0_0_40px_rgba(37,99,235,0.15)] transition-all duration-500"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative flex items-center justify-center w-16 h-16 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full border border-brand-blue/30 animate-ring-orbit" />
                    <div className="relative z-10 w-12 h-12 flex items-center justify-center rounded-xl bg-brand-navy text-brand-glow border border-white/10 group-hover:border-brand-blue/50 transition-all duration-300">
                      <type.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-white font-semibold">{type.label}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* C) Messaging Focus - Value Props */}
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
                  Deliver
                </span>
              </h2>
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {VALUE_PROPS.map((prop, index) => (
                <motion.span
                  key={prop.label}
                  className="text-sm font-semibold text-white bg-brand-blue/20 border border-brand-blue/30 px-6 py-3 rounded-full hover:bg-brand-blue/30 hover:border-brand-blue/50 transition-all cursor-default"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {prop.label}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* D) How We Deliver */}
        <section className="relative py-16 md:py-24 bg-brand-navy/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              className="text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-brand-blue/90">
                Our Process
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                How We{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-glow">
                  Deliver
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {DELIVERY_STEPS.map((step, index) => (
                <motion.div
                  key={step.label}
                  className="relative bg-brand-navy/20 backdrop-blur-sm border border-white/5 rounded-2xl p-6 text-center hover:border-brand-blue/30 transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  {/* Step Number */}
                  <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-brand-blue/30">
                    {step.step}
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-7 h-7 text-brand-glow" />
                  </div>
                  <h3 className="text-white font-semibold">{step.label}</h3>
                </motion.div>
              ))}
            </div>
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
                <Anchor size={300} />
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 relative z-10">
                Build resilient energy infrastructure—without delays.
              </h2>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10 relative z-10">
                From microgrids to utility-scale generation, BlueFlare delivers power projects focused on reliability, speed, and efficiency.
              </p>

              <a
                href="/contact"
                className="bg-white text-brand-blue font-bold px-10 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2 relative z-10"
              >
                Discuss a Project
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

export default PowerProjectsPage;
