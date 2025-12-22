import React from 'react';
import { motion } from 'framer-motion';
import { MINEX_CARDS } from '../constants';

const MineXSeries: React.FC = () => {
  return (
    <section id="minex" className="relative overflow-hidden bg-brand-dark py-24 sm:py-32">
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
            Product Line
          </motion.p>
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-glow">MineX™</span> Series
          </motion.h2>
          <motion.p 
            className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Five modular systems engineered to monetize gas across every well class.
          </motion.p>
        </div>

        {/* Cards Grid - 5 columns on xl, 3 on lg, 2 on md, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch">
          {MINEX_CARDS.map((card, index) => (
            <motion.article
              key={card.model}
              className="group relative flex flex-col justify-between h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <a 
                href={card.href}
                className="flex flex-col justify-between h-full bg-brand-navy/20 backdrop-blur-sm border border-white/5 rounded-3xl p-6 hover:border-brand-blue/40 hover:shadow-[0_0_40px_rgba(37,99,235,0.15)] transition-all duration-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:ring-offset-2 focus:ring-offset-brand-dark"
              >
                <div>
                  {/* Icon with Animated Ring */}
                  <div className="relative flex items-center justify-center w-16 h-16 mb-6">
                    {/* Orbiting Ring */}
                    <div className="absolute inset-0 rounded-full border border-brand-blue/30 animate-ring-orbit" />
                    
                    {/* Icon Tile */}
                    <div className="relative z-10 w-10 h-10 flex items-center justify-center rounded-xl bg-brand-navy text-brand-glow border border-white/10 group-hover:border-brand-blue/50 group-hover:scale-105 transition-all duration-300">
                      <card.icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">
                    {card.description}
                  </p>

                  {/* At a Glance Stats */}
                  <div className="grid grid-cols-2 gap-x-3 gap-y-2 mb-5">
                    {card.stats.map((stat) => (
                      <div key={stat.label} className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">{stat.label}</span>
                        <span className="text-xs text-white font-semibold">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {card.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="text-[10px] uppercase tracking-wider font-medium text-slate-500 border border-white/5 px-2.5 py-1 rounded-full group-hover:text-brand-blue/80 group-hover:border-brand-blue/20 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MineXSeries;




