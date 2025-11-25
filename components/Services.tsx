import React from 'react';
import { motion } from 'framer-motion';
import Section from './ui/Section';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
  return (
    <Section id="solutions" className="bg-brand-dark">
      <div className="text-center mb-16">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          How We Help
        </motion.h2>
        <motion.p 
          className="text-slate-400 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          Comprehensive energy solutions tailored for high-demand infrastructure.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SERVICES.map((service, index) => (
          <motion.div
            key={service.title}
            className="group relative p-6 bg-slate-800/40 border border-slate-700 rounded-2xl overflow-hidden hover:bg-slate-800/60 transition-colors"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Animated Border Line on Hover */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-glow to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />

            <div className="relative z-10">
              <div className="w-12 h-12 bg-brand-navy rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-slate-700 group-hover:border-brand-blue/50">
                <service.icon className="text-brand-light w-6 h-6" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {service.tags.map(tag => (
                  <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold text-brand-grey bg-slate-900/50 px-2 py-1 rounded border border-slate-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Services;