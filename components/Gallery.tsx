import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Maximize2 } from 'lucide-react';
import Section from './ui/Section';
import { GALLERY_ITEMS } from '../constants';
import { GalleryItem } from '../types';

const Gallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Helper to determine grid span classes based on size
  const getSpanClass = (size: string) => {
    switch (size) {
      case 'large': return 'md:col-span-2 md:row-span-2';
      case 'wide': return 'md:col-span-2';
      case 'tall': return 'md:row-span-2';
      default: return 'md:col-span-1';
    }
  };

  return (
    <Section id="gallery" className="bg-brand-dark">
      <div className="mb-12">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
         >
            <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Field Operations</h2>
                <p className="text-slate-400">See our infrastructure powering the data centers.</p>
            </div>
         </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-4">
        {GALLERY_ITEMS.map((item, index) => (
            <motion.div
                key={item.id}
                className={`relative group rounded-xl overflow-hidden bg-slate-800 border border-slate-700 cursor-pointer ${getSpanClass(item.size)}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => setSelectedItem(item)}
            >
                {/* Media Content */}
                {item.type === 'video' ? (
                    <video 
                        src={item.src} 
                        poster={item.poster}
                        autoPlay 
                        muted 
                        loop 
                        playsInline 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <img 
                        src={item.src} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                )}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Play Icon for Video */}
                {item.type === 'video' && (
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur flex items-center justify-center border border-white/20">
                        <Play size={12} className="text-white fill-white ml-0.5" />
                    </div>
                )}

                {/* Hover Content */}
                <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-brand-glow text-xs font-bold uppercase tracking-wider mb-1 opacity-0 group-hover:opacity-100 transition-opacity delay-100">{item.category}</p>
                    <div className="flex justify-between items-center">
                        <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                        <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
                    </div>
                </div>

                {/* Selection Ring */}
                <div className="absolute inset-0 border-2 border-brand-glow opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
            </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
            <motion.div 
                className="fixed inset-0 z-[60] flex items-center justify-center bg-brand-dark/95 backdrop-blur-xl p-4 md:p-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedItem(null)}
            >
                <motion.div 
                    className="relative max-w-6xl w-full max-h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black"
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                >
                     <button 
                        onClick={() => setSelectedItem(null)}
                        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="w-full h-[60vh] md:h-[80vh]">
                        {selectedItem.type === 'video' ? (
                            <video 
                                src={selectedItem.src} 
                                autoPlay 
                                controls
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <img 
                                src={selectedItem.src} 
                                alt={selectedItem.title} 
                                className="w-full h-full object-contain"
                            />
                        )}
                    </div>
                    
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                        <span className="inline-block px-2 py-1 bg-brand-blue text-white text-[10px] font-bold uppercase tracking-wider rounded mb-2">
                            {selectedItem.category}
                        </span>
                        <h3 className="text-2xl text-white font-bold">{selectedItem.title}</h3>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
};

export default Gallery;
