import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { NavItem } from '../types';

const NavDropdown: React.FC<{ item: NavItem; onClose?: () => void }> = ({ item, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group py-2 flex items-center gap-1"
      >
        {item.label}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 min-w-[220px] bg-brand-dark/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl shadow-black/30 overflow-hidden z-50"
            role="menu"
          >
            {item.children?.map((child) => (
              <a
                key={child.label}
                href={child.href}
                role="menuitem"
                onClick={() => {
                  setIsOpen(false);
                  onClose?.();
                }}
                className="block px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-brand-blue/20 transition-colors border-b border-white/5 last:border-b-0"
              >
                {child.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MobileNavDropdown: React.FC<{ item: NavItem; onItemClick: () => void }> = ({ item, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between text-lg font-medium text-slate-200 hover:text-brand-glow py-2"
      >
        {item.label}
        <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pl-4 py-2 space-y-2 border-l border-white/10 ml-2">
              {item.children?.map((child) => (
                <a
                  key={child.label}
                  href={child.href}
                  onClick={onItemClick}
                  className="block text-base text-slate-400 hover:text-brand-glow py-1"
                >
                  {child.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-brand-dark/90 backdrop-blur-md shadow-lg border-b border-white/10' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-28 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <img 
            src="/BlueFlare-Logo-250-102px.png" 
            alt="BlueFlare" 
            className="h-16 w-auto object-contain"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            item.children ? (
              <NavDropdown key={item.label} item={item} />
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full" />
              </a>
            )
          ))}
          <a
            href="/contact"
            className="px-5 py-2.5 text-sm font-semibold text-white bg-brand-blue rounded-lg hover:bg-blue-500 transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] active:scale-95"
          >
            Start a Conversation
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-dark/95 backdrop-blur-xl border-b border-white/10"
          >
            <div className="flex flex-col p-6 gap-4">
              {NAV_ITEMS.map((item) => (
                item.children ? (
                  <MobileNavDropdown 
                    key={item.label} 
                    item={item} 
                    onItemClick={() => setIsOpen(false)} 
                  />
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-slate-200 hover:text-brand-glow"
                  >
                    {item.label}
                  </a>
                )
              ))}
              <a
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-4 w-full text-center px-5 py-3 text-base font-semibold text-white bg-brand-blue rounded-lg"
              >
                Start a Conversation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;