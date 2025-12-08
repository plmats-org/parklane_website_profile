'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/src/lib/utils';
import { CloseIcon, Logo, MenuIcon } from '../icons';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Why PLM', href: '#why-plm' },
  { name: 'Logistics', href: '#logistics' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-12 pt-4">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }}
        className={cn(
          'rounded-2xl transition-all duration-300 overflow-hidden',
          scrolled
            ? 'bg-white/98 backdrop-blur-md shadow-xl'
            : 'bg-white/95 backdrop-blur-sm shadow-lg'
        )}
      >
        <div className="px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
             <Link href="#home" className="inline-flex items-center space-x-3 group">
              <Logo size={45} className="text-primary-400 group-hover:scale-110 transition-transform duration-300" />
              <div>
                <div className="font-display text-xl font-bold">
                  Parklane Materials
                </div>
                <div className="text-sm text-primary/30">
                  Global Sourcing Excellence
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-[#a68b56] transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="hidden lg:block"
            >
              <Link
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-primary-400 hover:bg-primary-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                Get Quote
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? <CloseIcon size={28} /> : <MenuIcon size={28} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-slate-200 overflow-hidden"
            >
              <div className="px-6 py-6">
                <div className="flex flex-col space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-3 rounded-lg text-slate-700 font-medium hover:bg-slate-50 hover:text-[#a68b56] transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navLinks.length * 0.05 }}
                    className="pt-4"
                  >
                    <Link
                      href="#contact"
                      onClick={() => setIsOpen(false)}
                      className="block w-full text-center px-6 py-3 bg-[#d4af37] hover:bg-[#c19b2b] text-white font-semibold rounded-lg shadow-md transition-all duration-300"
                    >
                      Get Quote
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}