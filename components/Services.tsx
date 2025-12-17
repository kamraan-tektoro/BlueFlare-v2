import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';
import { cn } from '../lib/utils';

const Services: React.FC = () => {
  return (
    <section id="solutions" className="relative overflow-hidden bg-brand-dark py-24 sm:py-32">
      {/* Radial Gradient Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-brand-blue/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <motion.p 
            className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-brand-blue/90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Core Pillars
          </motion.p>
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-glow">Help</span>
          </motion.h2>
          <motion.p 
            className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Comprehensive energy solutions tailored for high-demand infrastructure, ensuring reliability and efficiency at every scale.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {SERVICES.map((service, index) => {
            const CardWrapper = service.href ? 'a' : 'div';
            const cardProps = service.href ? { href: service.href } : {};
            
            return (
              <motion.article
                key={service.title}
                className="group relative flex flex-col justify-between h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <CardWrapper 
                  {...cardProps}
                  className={`flex flex-col justify-between h-full bg-brand-navy/20 backdrop-blur-sm border border-white/5 rounded-3xl p-6 md:p-8 hover:border-brand-blue/40 hover:shadow-[0_0_40px_rgba(37,99,235,0.15)] transition-all duration-500 ${service.href ? 'cursor-pointer' : ''}`}
                >
                  <div>
                    {/* Icon with Animated Ring */}
                    <div className="relative flex items-center justify-center w-16 h-16 mb-8">
                      {/* Orbiting Ring */}
                      <div className="absolute inset-0 rounded-full border border-brand-blue/30 animate-ring-orbit" />
                      
                      {/* Icon Tile */}
                      <div className="relative z-10 w-10 h-10 flex items-center justify-center rounded-xl bg-brand-navy text-brand-glow border border-white/10 group-hover:border-brand-blue/50 group-hover:scale-105 transition-all duration-300">
                        <service.icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8">
                      {service.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {service.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="text-[11px] uppercase tracking-wider font-medium text-slate-500 border border-white/5 px-3 py-1 rounded-full group-hover:text-brand-blue/80 group-hover:border-brand-blue/20 transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardWrapper>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;