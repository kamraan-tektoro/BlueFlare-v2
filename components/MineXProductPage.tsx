import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle2,
  Zap,
  Server,
  Cpu,
  Gauge,
  Thermometer,
  Box,
  Fuel,
  Settings,
  Wrench,
  MapPin,
  DollarSign,
  Clock,
  Radio,
  Activity,
  TrendingUp,
  RotateCw,
  Antenna,
  BarChart3,
  RefreshCcw,
  AlertTriangle,
  Microchip
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Navbar from './Navbar';
import FooterCTA from './FooterCTA';
import { MineXProduct } from '../data/minexProducts';

/**
 * Maps Edge Box capability text to semantically appropriate icons
 * Uses keyword matching to identify capability type
 * Matches based on primary distinguishing keywords
 */
const getCapabilityIcon = (capability: string): LucideIcon => {
  const lowerCap = capability.toLowerCase();
  
  // Network / Cellular / Starlink / Failover
  if (lowerCap.includes('cellular') || lowerCap.includes('starlink') || lowerCap.includes('failover') || lowerCap.includes('networking') || (lowerCap.includes('network') && !lowerCap.includes('monitoring'))) {
    return Antenna;
  }
  
  // Auto-restart / Automation / Control logic / Exception-based
  if (lowerCap.includes('auto-restart') || lowerCap.includes('restart') || lowerCap.includes('automation') || lowerCap.includes('control logic') || lowerCap.includes('exception-based') || lowerCap.includes('safe-shutdown') || lowerCap.includes('auto-tuning')) {
    return RotateCw;
  }
  
  // ASIC / Fleet monitoring (must check before general monitoring)
  if (lowerCap.includes('asic') || (lowerCap.includes('fleet') && lowerCap.includes('monitoring'))) {
    return Cpu;
  }
  
  // Predictive maintenance / Alerts
  if (lowerCap.includes('predictive') || (lowerCap.includes('maintenance') && lowerCap.includes('alert'))) {
    return Activity;
  }
  
  // Generator / Telemetry (generator-specific features)
  if (lowerCap.includes('generator') || lowerCap.includes('telemetry')) {
    return Gauge;
  }
  
  // Analytics / Dashboard / Efficiency
  if (lowerCap.includes('analytics') || lowerCap.includes('dashboard') || lowerCap.includes('efficiency')) {
    return BarChart3;
  }
  
  // General monitoring (fallback)
  if (lowerCap.includes('monitoring')) {
    return Cpu;
  }
  
  // Default fallback
  return Settings;
};

interface MineXProductPageProps {
  product: MineXProduct;
}

const MineXProductPage: React.FC<MineXProductPageProps> = ({ product }) => {
  return (
    <div className="bg-brand-dark min-h-screen text-white font-sans selection:bg-brand-blue selection:text-white overflow-x-hidden">
      <Navbar />

      <main className="pt-28">
        {/* Hero Section */}
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
                    MineX Series • {product.subtitle}
                  </div>

                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
                    {product.model.split(' ')[0]}{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-glow">
                      {product.model.split(' ').slice(1).join(' ')}
                    </span>
                  </h1>

                  <p className="text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed">
                    {product.tagline}
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
                    Schedule Engineering Review
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              </div>

              {/* Right Column - Product Image Placeholder */}
              <motion.div
                className="flex justify-center lg:justify-end"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="relative w-full max-w-md">
                  {/* Glow effect behind */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-brand-glow/10 rounded-3xl blur-xl" />
                  
                  {/* Main container */}
                  <div className="relative bg-brand-navy/30 backdrop-blur-sm border border-brand-blue/30 rounded-3xl p-8 shadow-[0_0_60px_rgba(37,99,235,0.15)]">
                    {/* Inner glow border */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-blue/10 via-transparent to-brand-glow/10 pointer-events-none" />
                    
                    <div className="relative aspect-square flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-24 h-24 mx-auto rounded-2xl bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center">
                          <Server className="w-12 h-12 text-brand-glow" />
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm">Product Image</p>
                          <p className="text-brand-glow font-semibold">{product.model}</p>
                        </div>
                        <p className="text-slate-500 text-xs px-4">
                          Place {product.model} product image here
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quick Specs Section */}
        <section className="relative py-16 md:py-20 bg-brand-navy/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-brand-blue/90">
                At a Glance
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Quick{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-glow">
                  Specifications
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {product.quickStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-brand-navy/20 backdrop-blur-sm border border-white/5 rounded-2xl p-5 text-center hover:border-brand-blue/30 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <p className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-glow">
                    {stat.value}
                  </p>
                  <p className="text-brand-glow text-sm font-medium">{stat.suffix}</p>
                  <p className="text-slate-400 text-xs mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Overview Section */}
        <section className="relative py-16 md:py-24">
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
                  Product{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-glow">
                    Overview
                  </span>
                </h2>

                <div className="space-y-4 text-slate-400 leading-relaxed">
                  {product.overview.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </motion.div>

              {/* Ideal For List */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-xl font-bold text-white mb-6">Ideal For</h3>
                <div className="grid gap-3">
                  {product.idealFor.map((item, index) => (
                    <motion.div
                      key={item}
                      className="flex items-center gap-4 p-4 bg-brand-navy/20 backdrop-blur-sm border border-white/5 rounded-xl hover:border-brand-blue/30 transition-colors"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-brand-glow flex-shrink-0" />
                      <span className="text-slate-300">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Detailed Specifications Section */}
        <section className="relative py-16 md:py-24 bg-brand-navy/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              className="text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-brand-blue/90">
                Technical Details
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Detailed{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-glow">
                  Specifications
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.specSections.map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  className="bg-brand-navy/20 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-brand-blue/20 transition-colors"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: sectionIndex * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center">
                      {sectionIndex === 0 && <Zap className="w-5 h-5 text-brand-glow" />}
                      {sectionIndex === 1 && <Fuel className="w-5 h-5 text-brand-glow" />}
                      {sectionIndex === 2 && <Thermometer className="w-5 h-5 text-brand-glow" />}
                      {sectionIndex === 3 && <Cpu className="w-5 h-5 text-brand-glow" />}
                      {sectionIndex === 4 && <Settings className="w-5 h-5 text-brand-glow" />}
                    </div>
                    <h3 className="text-white font-bold">{section.title}</h3>
                  </div>

                  <div className="space-y-3">
                    {section.specs.map((spec) => (
                      <div key={spec.label} className="flex justify-between items-start gap-4 py-2 border-b border-white/5 last:border-b-0">
                        <span className="text-slate-400 text-sm">{spec.label}</span>
                        <span className="text-white text-sm font-medium text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Operational Requirements Section */}
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
                Requirements
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Operational{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-glow">
                  Requirements
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Site Requirements */}
              <motion.div
                className="bg-brand-navy/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-brand-glow" />
                  </div>
                  <h3 className="text-white font-bold">Site Requirements</h3>
                </div>
                <ul className="space-y-3">
                  {product.siteRequirements.map((req) => (
                    <li key={req} className="flex items-start gap-3 text-slate-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-brand-glow flex-shrink-0 mt-0.5" />
                      {req}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Gas Requirements */}
              <motion.div
                className="bg-brand-navy/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center">
                    <Fuel className="w-5 h-5 text-brand-glow" />
                  </div>
                  <h3 className="text-white font-bold">Gas Requirements</h3>
                </div>
                <ul className="space-y-3">
                  {product.gasRequirements.map((req) => (
                    <li key={req} className="flex items-start gap-3 text-slate-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-brand-glow flex-shrink-0 mt-0.5" />
                      {req}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Maintenance Requirements */}
              <motion.div
                className="bg-brand-navy/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center">
                    <Wrench className="w-5 h-5 text-brand-glow" />
                  </div>
                  <h3 className="text-white font-bold">Maintenance</h3>
                </div>
                <ul className="space-y-3">
                  {product.maintenanceRequirements.map((req) => (
                    <li key={req} className="flex items-start gap-3 text-slate-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-brand-glow flex-shrink-0 mt-0.5" />
                      {req}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* BlueFlare Edge Box Section */}
        <section className="relative py-16 md:py-24 bg-brand-navy/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              className="bg-gradient-to-br from-brand-navy/40 to-brand-navy/20 backdrop-blur-sm border border-brand-blue/30 rounded-3xl p-8 md:p-12 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Radio size={200} />
              </div>

              <div className="grid lg:grid-cols-2 gap-8 items-center relative z-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-brand-glow text-xs font-semibold uppercase tracking-wider mb-6">
                    <span className="w-2 h-2 rounded-full bg-brand-glow animate-pulse" />
                    Integrated Monitoring
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                    BlueFlare{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-glow">
                      Edge Box
                    </span>
                  </h2>

                  <p className="text-slate-400 mb-6">
                    Every {product.model} unit supports the Edge Box monitoring suite for autonomous operation and remote management.
                  </p>

                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-dark/50 border border-white/10">
                    <DollarSign className="w-4 h-4 text-brand-glow" />
                    <span className="text-white font-medium">Monthly Fee: {product.edgeBoxFee}</span>
                  </div>
                </div>

                <div className="grid gap-3">
                  {product.edgeBoxCapabilities.map((cap, index) => {
                    const IconComponent = getCapabilityIcon(cap);
                    return (
                      <motion.div
                        key={cap}
                        className="flex items-center gap-3 p-3 bg-brand-dark/30 rounded-xl border border-white/5"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="w-8 h-8 rounded-lg bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-4 h-4 text-brand-glow" />
                        </div>
                        <span className="text-slate-300 text-sm">{cap}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Deployment Process Section */}
        <section className="relative py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              className="text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-brand-blue/90">
                Installation
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Deployment{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-glow">
                  Process
                </span>
              </h2>
              <p className="text-slate-400 mt-4">
                Average on-site time:{' '}
                <span className="text-brand-blue font-semibold">{product.deploymentTimeline}</span>
              </p>
            </motion.div>

            {/* Timeline Wrapper - relative container for absolute line positioning */}
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* 
                  SINGLE Vertical Line - ONE element at wrapper level
                  - Positioned absolutely within the relative wrapper
                  - Spans full height from top to bottom
                  - Circle is w-12 (48px), center at 24px. Line is 2px wide, left edge at 23px to center
                  - z-0 ensures it sits behind everything
                  - Padded vertically by 24px (half circle height) to align with circle centers
                */}
                <div 
                  className="absolute left-[23px] top-6 bottom-6 w-[2px] hidden md:block z-0"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.4), rgba(59, 130, 246, 0.25) 50%, rgba(59, 130, 246, 0.1))'
                  }}
                  aria-hidden="true"
                />

                {/* Timeline Items - NO relative/z-index on container to avoid stacking context issues */}
                <div className="space-y-4">
                  {product.deploymentSteps.map((step, index) => {
                    const isEven = index % 2 === 1;
                    return (
                      <motion.div
                        key={step}
                        className="flex items-start gap-4 md:gap-6 group relative"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {/* Number circle - OPAQUE background to fully block line underneath */}
                        <div className="w-12 h-12 rounded-full bg-brand-dark border-2 border-brand-blue/40 flex items-center justify-center flex-shrink-0 relative z-10 transition-all duration-300 group-hover:border-brand-blue/60 group-hover:scale-[1.03] shadow-[0_0_0_4px_rgba(11,17,32,1)]">
                          <span className="text-brand-glow font-bold transition-colors group-hover:text-white">{index + 1}</span>
                        </div>
                        {/* Card - z-10 to stay above line but not interfere with circles */}
                        <div className={`flex-1 backdrop-blur-sm border border-white/5 rounded-xl p-4 hover:border-brand-blue/30 transition-all duration-300 relative z-10 ${
                          isEven ? 'bg-brand-navy/25' : 'bg-brand-navy/15'
                        }`}>
                          <span className="text-white">{step}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Financial Overview Section */}
        <section className="relative py-16 md:py-24 bg-brand-navy/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              className="text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-brand-blue/90">
                Investment
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Financial{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-glow">
                  Overview
                </span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <motion.div
                className="bg-brand-navy/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:border-brand-blue/30 transition-colors"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0 }}
              >
                <div className="w-12 h-12 rounded-xl bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-6 h-6 text-brand-glow" />
                </div>
                <p className="text-slate-400 text-sm mb-2">Installed Price</p>
                <p className="text-white font-bold text-lg">{product.financialOverview.installedPrice}</p>
              </motion.div>

              <motion.div
                className="bg-brand-navy/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:border-brand-blue/30 transition-colors"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center mx-auto mb-4">
                  <Gauge className="w-6 h-6 text-brand-glow" />
                </div>
                <p className="text-slate-400 text-sm mb-2">Operating Cost</p>
                <p className="text-white font-bold text-lg">{product.financialOverview.operatingCost}</p>
              </motion.div>

              <motion.div
                className="bg-brand-navy/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:border-brand-blue/30 transition-colors"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-12 h-12 rounded-xl bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-brand-glow" />
                </div>
                <p className="text-slate-400 text-sm mb-2">Net Monthly Revenue</p>
                <p className="text-white font-bold text-lg">{product.financialOverview.netMonthlyRevenue}</p>
              </motion.div>

              <motion.div
                className="bg-brand-navy/20 backdrop-blur-sm border border-brand-blue/30 rounded-2xl p-6 text-center relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-brand-glow" />
                  </div>
                  <p className="text-slate-400 text-sm mb-2">Expected Payback</p>
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-glow font-bold text-lg">
                    {product.financialOverview.expectedPayback}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="relative py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-brand-blue/90">
                Applications
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Use{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-glow">
                  Cases
                </span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {product.useCases.map((useCase, index) => (
                <motion.div
                  key={useCase}
                  className="flex items-center gap-3 p-4 bg-brand-navy/20 backdrop-blur-sm border border-white/5 rounded-xl hover:border-brand-blue/30 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-brand-glow flex-shrink-0" />
                  <span className="text-slate-300">{useCase}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
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
                <Server size={300} />
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 relative z-10">
                Ready to monetize your gas assets?
              </h2>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10 relative z-10">
                Schedule an engineering review to see how the {product.model} can transform your stranded gas into reliable revenue.
              </p>

              <a
                href="/contact"
                className="bg-white text-brand-blue font-bold px-10 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2 relative z-10"
              >
                Schedule Engineering Review
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

export default MineXProductPage;
