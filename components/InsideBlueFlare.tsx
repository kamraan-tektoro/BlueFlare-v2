import React from 'react';
import { motion } from 'framer-motion';

const InsideBlueFlare: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-brand-dark py-20 md:py-32">
      {/* Radial Gradient Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-brand-blue/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Inside <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-glow">BlueFlare</span>
          </motion.h2>
          <motion.p 
            className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            A quick look at the teams, projects, and field operations that power BlueFlare.
          </motion.p>
        </div>

        {/* Video Block */}
        <motion.div
          className="w-full group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <video
            className="w-full rounded-3xl border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] group-hover:border-brand-blue/40 group-hover:shadow-[0_0_40px_rgba(37,99,235,0.15)] transition-all duration-500"
            autoPlay
            muted
            playsInline
            controls
            loop
            preload="metadata"
            poster="/videos/inside-blueflare-poster.png"
          >
            <source src="/videos/inside-blueflare.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </div>
    </section>
  );
};

export default InsideBlueFlare;

