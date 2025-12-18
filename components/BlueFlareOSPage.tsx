import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Shield, 
  BarChart3, 
  Radio, 
  Settings2,
  Factory,
  Fuel,
  Server,
  Building2,
  Globe,
  Cpu
} from 'lucide-react';
import Navbar from './Navbar';
import FooterCTA from './FooterCTA';

const CAPABILITIES = [
  { icon: Activity, label: 'Real-time monitoring' },
  { icon: Settings2, label: 'Automation & control logic' },
  { icon: Radio, label: 'Telemetry' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Shield, label: 'Secure remote management' },
];

const USE_ENVIRONMENTS = [
  { icon: Zap, label: 'Energy infrastructure' },
  { icon: Globe, label: 'Remote and off-grid power sites' },
  { icon: Factory, label: 'Industrial facilities' },
  { icon: Server, label: 'Data-intensive infrastructure' },
];

const BlueFlareOSPage: React.FC = () => {
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
                    Operational Technology Platform
                  </div>

                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
                    BlueFlare{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-glow">
                      OS™
                    </span>
                  </h1>

                  <p className="text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed">
                    BlueFlare's operational technology platform built on the Ignition SCADA framework with integrated DCIM functionality.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <a
                    href="/contact"
                    className="group px-8 py-4 bg-brand-blue text-white font-semibold rounded-lg shadow-lg shadow-brand-blue/30 hover:shadow-brand-blue/50 transition-all active:scale-95 inline-flex items-center justify-center gap-2"
                  >
                    Request a Demo
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              </div>

              {/* Right Column - Platform Status Card */}
              <motion.div
                className="flex justify-center lg:justify-end"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="bg-brand-navy/30 backdrop-blur-sm border border-white/10 rounded-3xl p-8 max-w-md w-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center">
                      <Cpu className="w-6 h-6 text-brand-glow" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">Platform Status</h3>
                      <p className="text-slate-400 text-sm">BlueFlare OS™</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-brand-dark/50 rounded-xl border border-white/5">
                      <div className="w-3 h-3 rounded-full bg-brand-glow animate-pulse" />
                      <span className="text-slate-300 text-sm font-medium">Proprietary software</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-brand-dark/50 rounded-xl border border-white/5">
                      <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-slate-300 text-sm font-medium">Live deployments at website launch</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* B) Description Section */}
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
                    BlueFlare OS™
                  </span>
                  ?
                </h2>

                <div className="space-y-4 text-slate-400 leading-relaxed">
                  <p>
                    BlueFlare OS™ (Ignite OS) is BlueFlare's proprietary operational technology platform built on the Ignition SCADA framework with integrated DCIM functionality. The platform provides real-time monitoring, automation, control logic, telemetry, and analytics across distributed energy infrastructure, industrial power systems, and remote assets.
                  </p>
                  <p>
                    Designed for live field operations, BlueFlare OS™ enables autonomous system control, centralized oversight, and secure remote management of power generation, emissions mitigation systems, and industrial instrumentation—supporting both grid-connected and off-grid environments.
                  </p>
                </div>
              </motion.div>

              {/* Capabilities List */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-xl font-bold text-white mb-6">Core Capabilities</h3>
                <div className="grid gap-4">
                  {CAPABILITIES.map((cap, index) => (
                    <motion.div
                      key={cap.label}
                      className="flex items-center gap-4 p-4 bg-brand-navy/20 backdrop-blur-sm border border-white/5 rounded-xl hover:border-brand-blue/30 transition-colors"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center">
                        <cap.icon className="w-5 h-5 text-brand-glow" />
                      </div>
                      <span className="text-slate-300 font-medium">{cap.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* C) Primary Use Environments */}
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
                Deployment Environments
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Primary Use{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-glow">
                  Environments
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {USE_ENVIRONMENTS.map((env, index) => (
                <motion.div
                  key={env.label}
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
                      <env.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-white font-semibold">{env.label}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* D) Target Market Segments */}
        <section className="relative py-16 md:py-24 bg-brand-navy/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              className="text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-brand-blue/90">
                Market Focus
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Target Market{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-glow">
                  Segments
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Primary Market */}
              <motion.div
                className="bg-brand-navy/20 backdrop-blur-sm border border-brand-blue/30 rounded-3xl p-8 relative overflow-hidden"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="absolute top-0 right-0 p-6 opacity-5">
                  <Fuel size={150} />
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-brand-glow text-xs font-semibold uppercase tracking-wider mb-6">
                  Primary Market
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center">
                    <Fuel className="w-7 h-7 text-brand-glow" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Oil & Gas</h3>
                </div>

                <ul className="space-y-3">
                  {['Upstream operations', 'Midstream infrastructure', 'Remote field operations'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-brand-glow flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Secondary / Adjacent Markets */}
              <motion.div
                className="bg-brand-navy/20 backdrop-blur-sm border border-white/10 rounded-3xl p-8 relative overflow-hidden"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="absolute top-0 right-0 p-6 opacity-5">
                  <Building2 size={150} />
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-slate-300 text-xs font-semibold uppercase tracking-wider mb-6">
                  Secondary / Adjacent
                </div>

                <h3 className="text-xl font-bold text-white mb-6">Expanding Markets</h3>

                <ul className="space-y-3">
                  {[
                    'Energy infrastructure',
                    'Data centers & compute infrastructure',
                    'Remote and off-grid industrial sites'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-slate-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
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
                <Activity size={300} />
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 relative z-10">
                Operate smarter across distributed infrastructure.
              </h2>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10 relative z-10">
                BlueFlare OS™ delivers the visibility, automation, and control you need to manage complex energy systems at scale.
              </p>

              <a
                href="/contact"
                className="bg-white text-brand-blue font-bold px-10 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2 relative z-10"
              >
                Request a Demo
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

export default BlueFlareOSPage;
