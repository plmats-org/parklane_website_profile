'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Logo, MailIcon, PhoneIcon, MapPinIcon, GlobeIcon } from '../icons';

const footerLinks = {
  company: [
    { name: 'About Us', href: '#about' },
    { name: 'Our Services', href: '#services' },
    { name: 'Why PLM', href: '#why-plm' },
    { name: 'Contact', href: '#contact' },
  ],
  services: [
    { name: 'Global Sourcing', href: '#services' },
    { name: 'Quality Assurance', href: '#services' },
    { name: 'Logistics Solutions', href: '#logistics' },
    { name: 'Procurement Support', href: '#services' },
  ],
  resources: [
    { name: 'Supplier Network', href: '#' },
    { name: 'Case Studies', href: '#' },
    { name: 'Industry Insights', href: '#' },
    { name: 'FAQ', href: '#' },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="#home" className="inline-flex items-center space-x-3 mb-6 group">
              <Logo size={45} className="text-primary-400 group-hover:scale-110 transition-transform duration-300" />
              <div>
                <div className="font-display text-xl font-bold">
                  Parklane Materials
                </div>
                <div className="text-sm text-white/70">
                  Global Sourcing Excellence
                </div>
              </div>
            </Link>

            <p className="text-white/80 mb-6 leading-relaxed max-w-md">
              A subsidiary of the Parklane Group, specializing in the
              procurement and supply of world-class construction materials and
              equipment.
            </p>

            <div className="space-y-3">
              <a
                href="mailto:info@plmats.com"
                className="flex items-center space-x-3 text-white/80 hover:text-primary-400 transition-colors duration-300"
              >
                <MailIcon size={18} />
                <span>info@plmats.com</span>
              </a>
              <a
                href="https://www.plmats.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-white/80 hover:text-primary-400 transition-colors duration-300"
              >
                <GlobeIcon size={18} />
                <span>www.plmats.com</span>
              </a>
              <div className="flex items-center space-x-3 text-white/80">
                <MapPinIcon size={18} />
                <span>Kigali, Rwanda</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-primary-400 transition-colors duration-300 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-primary-400 transition-colors duration-300 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-primary-400 transition-colors duration-300 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-white/60 text-sm text-center md:text-left">
              © {currentYear} Parklane Materials Ltd. All rights reserved.
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link
                href="#"
                className="text-white/60 hover:text-primary-400 transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-white/60 hover:text-primary-400 transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-white/60 hover:text-primary-400 transition-colors duration-300"
              >
                Cookie Policy
              </Link>
            </div>

            {/* Social Media Icons (Placeholder) */}
            <div className="flex items-center space-x-4">
              {['linkedin', 'twitter', 'facebook'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary-600 flex items-center justify-center transition-colors duration-300"
                  aria-label={social}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {social === 'linkedin' && (
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    )}
                    {social === 'twitter' && (
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    )}
                    {social === 'facebook' && (
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    )}
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-8 pt-8 border-t border-white/10"
          >
            <p className="text-primary-400 font-display text-lg italic">
              "Global Reach. Local Precision. Trusted Value."
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}