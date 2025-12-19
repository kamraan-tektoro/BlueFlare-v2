import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Twitter, Linkedin, Github } from 'lucide-react';

interface FooterCTAProps {
  showMainCTA?: boolean;
}

const FooterCTA: React.FC<FooterCTAProps> = ({ showMainCTA = true }) => {
  return (
    <footer id="contact" className={`relative bg-slate-950 ${showMainCTA ? 'pt-24' : 'pt-12'} pb-12 overflow-hidden`}>
      {/* Background Gradient Shift */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/20 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Main CTA - Only shown on Home page */}
        {showMainCTA && (
          <motion.div 
              className="bg-brand-blue rounded-3xl p-8 md:p-16 text-center shadow-2xl shadow-blue-900/20 mb-20 relative overflow-hidden"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
          >
              {/* Background Texture */}
              <div className="absolute top-0 right-0 p-12 opacity-10 transform translate-x-1/2 -translate-y-1/2">
                   <Zap size={300} fill="currentColor" />
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">
                  Let's Build Smarter Energy Systems
              </h2>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10 relative z-10">
                  Ready to optimize your infrastructure? Partner with BlueFlare for end-to-end energy solutions.
              </p>
              <a 
                  href="/contact"
                  className="relative z-10 bg-white text-brand-blue font-bold px-10 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
              >
                  Start a Conversation
                  <ArrowRight size={20} />
              </a>
          </motion.div>
        )}

        {/* Footer Links */}
        <div className={`grid md:grid-cols-5 gap-12 border-t border-slate-800 pt-12 ${!showMainCTA ? 'mt-0' : ''}`}>
            <div className="col-span-1 md:col-span-2">
                <div className="flex flex-col gap-1 mb-6">
                    <div className="flex justify-start items-center">
                        <img 
                            src="/BlueFlare-Logo-250-102px.png" 
                            alt="BlueFlare" 
                            className="h-12 w-auto object-contain"
                        />
                    </div>
                </div>
                <p className="text-slate-500 max-w-sm mb-6">
                    Decentralize. Decarbonize. Optimize. <br/>
                    Leading the transition to resilient energy infrastructure.
                </p>
                <div className="flex gap-4">
                    {[Linkedin, Twitter, Github].map((Icon, i) => (
                        <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-brand-blue hover:text-white transition-all">
                            <Icon size={18} />
                        </a>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="text-white font-bold mb-6">Solutions</h4>
                <ul className="space-y-4 text-slate-400 text-sm">
                    <li><a href="/generator-solutions" className="hover:text-brand-light transition-colors">Generator Solutions</a></li>
                    <li><a href="/carbon-cube" className="hover:text-brand-light transition-colors">Carbon Cube</a></li>
                    <li><a href="/blueflare-os" className="hover:text-brand-light transition-colors">BlueFlare OS</a></li>
                    <li><a href="/power-projects" className="hover:text-brand-light transition-colors">Power Projects</a></li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-bold mb-6">MineX™ Series</h4>
                <ul className="space-y-4 text-slate-400 text-sm">
                    <li><a href="/minex-50" className="hover:text-brand-light transition-colors">MineX™ 50</a></li>
                    <li><a href="/minex-125" className="hover:text-brand-light transition-colors">MineX™ 125</a></li>
                    <li><a href="/minex-250" className="hover:text-brand-light transition-colors">MineX™ 250</a></li>
                    <li><a href="/minex-500" className="hover:text-brand-light transition-colors">MineX™ 500</a></li>
                    <li><a href="/minex-750" className="hover:text-brand-light transition-colors">MineX™ 750</a></li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-bold mb-6">Company</h4>
                <ul className="space-y-4 text-slate-400 text-sm">
                    <li><a href="/about" className="hover:text-brand-light transition-colors">About Us</a></li>
                    <li><a href="#" className="hover:text-brand-light transition-colors">Careers</a></li>
                    <li><a href="#" className="hover:text-brand-light transition-colors">News & Insights</a></li>
                    <li><a href="/contact" className="hover:text-brand-light transition-colors">Contact</a></li>
                </ul>
            </div>
        </div>
        
        <div className="text-center text-slate-600 text-xs mt-12">
            &copy; {new Date().getFullYear()} BlueFlare Energy. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default FooterCTA;
