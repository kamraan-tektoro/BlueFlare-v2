import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Settings, 
  Wrench,
  ShoppingCart,
  Gauge,
  MapPin,
  Factory,
  Battery,
  Clock
} from 'lucide-react';
import Navbar from './Navbar';
import FooterCTA from './FooterCTA';

const CAPABILITIES_LIST = [
  { icon: ShoppingCart, label: 'Equipment sales' },
  { icon: Settings, label: 'Installation & commissioning' },
  { icon: Clock, label: 'Preventive maintenance' },
  { icon: Wrench, label: 'Ongoing service & repair' },
];

const AT_A_GLANCE = [
  { icon: Gauge, label: '50 kW – 2.5 MW' },
  { icon: Battery, label: 'Standby / Prime / Continuous-duty' },
  { icon: Factory, label: 'Industrial + remote applications' },
];

const REFERENCE_PROJECTS = [
  { name: 'Hinton', icon: MapPin },
  { name: 'Harvest', icon: MapPin },
  { name: 'Redwater', icon: MapPin },
];

const PREFERRED_BRANDS = ['CAT', 'Weichai'];

const GeneratorSolutionsPage: React.FC = () => {
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
                    Turnkey Generator Systems
                  </div>

                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
                    Generator Sales,{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-glow">
                      Installation & Repair
                    </span>
                  </h1>

                  <p className="text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed">
                    Turnkey generator systems for standby, prime, and continuous-duty operations.
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
                    Request a Quote
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
                      <Zap className="w-6 h-6 text-brand-glow" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">At-a-Glance</h3>
                      <p className="text-slate-400 text-sm">Generator Solutions</p>
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

        {/* B) Service Overview Section */}
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
                  Service{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-glow">
                    Overview
                  </span>
                </h2>

                <div className="space-y-4 text-slate-400 leading-relaxed">
                  <p>
                    BlueFlare provides turnkey generator solutions including equipment sales, installation, commissioning, and ongoing maintenance. Systems are engineered for standby, prime, and continuous-duty operation across industrial, energy, and remote applications.
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
                <h3 className="text-xl font-bold text-white mb-6">What We Offer</h3>
                <div className="grid gap-4">
                  {CAPABILITIES_LIST.map((item, index) => (
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

        {/* C) Capabilities Section */}
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
                Technical Specifications
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                System{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-glow">
                  Capabilities
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Capacity Range */}
              <motion.div
                className="bg-brand-navy/20 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center mx-auto mb-6">
                  <Gauge className="w-8 h-8 text-brand-glow" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Capacity Range</h3>
                <p className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-glow mb-4">
                  50 kW – 2.5 MW
                </p>
                <p className="text-slate-400 text-sm">
                  Scalable solutions for any power requirement
                </p>
              </motion.div>

              {/* Preferred Brands */}
              <motion.div
                className="bg-brand-navy/20 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-brand-glow" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Preferred Brands</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {PREFERRED_BRANDS.map((brand) => (
                    <span 
                      key={brand}
                      className="text-sm font-semibold text-white bg-brand-blue/20 border border-brand-blue/30 px-6 py-3 rounded-full"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
                <p className="text-slate-400 text-sm mt-4">
                  Industry-leading equipment partners
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* D) Reference Projects Section */}
        <section className="relative py-16 md:py-24 bg-brand-navy/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              className="text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-brand-blue/90">
                Proven Track Record
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Reference{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-glow">
                  Projects
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {REFERENCE_PROJECTS.map((project, index) => (
                <motion.div
                  key={project.name}
                  className="group bg-brand-navy/20 backdrop-blur-sm border border-white/5 rounded-2xl p-6 text-center hover:border-brand-blue/40 hover:shadow-[0_0_40px_rgba(37,99,235,0.15)] transition-all duration-500"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative flex items-center justify-center w-14 h-14 mx-auto mb-4">
                    <div className="absolute inset-0 rounded-full border border-brand-blue/30 animate-ring-orbit" />
                    <div className="relative z-10 w-10 h-10 flex items-center justify-center rounded-xl bg-brand-navy text-brand-glow border border-white/10 group-hover:border-brand-blue/50 transition-all duration-300">
                      <project.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-lg">{project.name}</h3>
                  <p className="text-slate-500 text-sm mt-1">Alberta, Canada</p>
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
                <Zap size={300} />
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 relative z-10">
                Need generator capacity you can rely on?
              </h2>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10 relative z-10">
                From equipment selection to installation and ongoing maintenance, BlueFlare delivers turnkey generator solutions for industrial and remote operations.
              </p>

              <a
                href="/contact"
                className="bg-white text-brand-blue font-bold px-10 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2 relative z-10"
              >
                Request a Quote
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

export default GeneratorSolutionsPage;
