'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section
      id="about"
      className="relative py-32 lg:py-40 bg-white overflow-hidden"
    >
      {/* Highly Visible Animated World Map SVG Background */}
      <div className="absolute inset-0 flex items-end justify-center overflow-hidden pointer-events-none">
        <motion.svg
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          viewBox="0 0 1200 600"
          className="w-full h-auto max-h-[75%]"
          style={{
            filter: 'opacity(0.12)',
          }}
        >
          {/* World Map Continents */}
          <g fill="#a68b56" stroke="#a68b56" strokeWidth="2" fillOpacity="0.4" strokeOpacity="0.6">
            {/* Africa - Emphasized */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 0.3, ease: 'easeInOut' }}
              d="M580 280 L600 270 L620 275 L630 290 L625 310 L635 330 L630 350 L620 370 L605 385 L590 395 L575 390 L565 375 L560 355 L555 335 L560 315 L570 295 Z"
              fill="#a68b56"
              fillOpacity="0.5"
            />

            {/* Europe */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
              d="M580 230 L600 225 L620 230 L635 240 L645 250 L640 265 L625 270 L610 268 L595 260 L585 245 Z"
            />

            {/* Asia */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 0.7, ease: 'easeInOut' }}
              d="M650 240 L700 235 L750 245 L780 260 L790 280 L785 300 L770 315 L750 325 L720 330 L690 325 L670 310 L660 290 L655 270 Z"
            />

            {/* North America */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 0.4, ease: 'easeInOut' }}
              d="M250 220 L300 210 L340 220 L360 240 L365 265 L355 285 L335 295 L310 298 L285 290 L265 275 L255 255 Z"
            />

            {/* South America */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 0.6, ease: 'easeInOut' }}
              d="M340 310 L360 305 L375 315 L380 335 L375 360 L365 385 L350 405 L335 410 L325 400 L320 380 L318 355 L325 330 Z"
            />

            {/* Australia */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 0.8, ease: 'easeInOut' }}
              d="M820 380 L850 375 L875 385 L885 400 L880 420 L865 430 L845 428 L830 415 L825 395 Z"
            />
          </g>

          {/* Animated Connection Lines */}
          <g stroke="#a68b56" strokeWidth="2" fill="none" opacity="0.4">
            <motion.line
              x1="600" y1="280" x2="700" y2="270"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse', repeatDelay: 1 }}
            />
            <motion.line
              x1="590" y1="290" x2="340" y2="260"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1.2, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse', repeatDelay: 1 }}
            />
            <motion.line
              x1="750" y1="280" x2="850" y2="395"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1.4, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse', repeatDelay: 1 }}
            />
          </g>

          {/* Animated Dots at Connection Points */}
          {[
            { cx: 600, cy: 280 },
            { cx: 700, cy: 270 },
            { cx: 340, cy: 260 },
            { cx: 850, cy: 395 },
          ].map((dot, index) => (
            <motion.circle
              key={index}
              cx={dot.cx}
              cy={dot.cy}
              r="5"
              fill="#a68b56"
              opacity="0.5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.3, 1], opacity: [0, 0.7, 0.5] }}
              transition={{
                duration: 1.5,
                delay: 1 + index * 0.2,
                ease: 'easeOut',
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />
          ))}
        </motion.svg>
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-16 max-w-6xl relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {/* Section Label */}
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="inline-flex items-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-primary-400 to-primary-600" />
              <span className="text-primary-600 font-semibold tracking-wider uppercase text-sm">
                Who We Are
              </span>
            </div>
          </motion.div>

          {/* Grid Layout - Title Left, Description Right */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-16">
            {/* Left - Main Title */}
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.15] mb-4">
                Built in Africa.{' '}
                <span className="text-primary-500">Connected to the World.</span>
              </h2>
              <p className="text-xl font-semibold text-slate-700">
                Africa-First. Rwanda-Led. Globally Connected.
              </p>
            </motion.div>

            {/* Right - Company Description */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <p className="text-lg text-slate-600 leading-relaxed">
                Parklane Materials (PLM) is uniquely positioned as a procurement
                and services platform operating out of Africa, starting with Rwanda—one
                of the continent's most stable, reform-driven, and investment-friendly markets.
              </p>
              <p className="text-base text-slate-500 leading-relaxed">
                PLM unlocks opportunity on both sides of the value chain:
                <strong className="text-slate-700"> empowering local manufacturers and suppliers</strong>,
                while giving clients access to <strong className="text-slate-700">depth, choice, speed, and certainty</strong>.
              </p>
              <p className="text-base text-slate-500 leading-relaxed">
                With a strong network of manufacturers, international suppliers, and logistics partners,
                we provide end-to-end procurement services to governments, companies, NGOs,
                and major infrastructure contractors across Africa and globally.
              </p>
            </motion.div>
          </div>

          {/* Key Stats - Below the grid */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl"
          >
            {[
              { label: 'Starting Point', value: 'Rwanda' },
              { label: 'Regional Reach', value: 'Africa' },
              { label: 'Global Network', value: 'Worldwide' },
              { label: 'Quality', value: 'Assured' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group"
              >
                <div className="mb-2 text-3xl sm:text-4xl font-bold text-primary-500 group-hover:text-primary-600 transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Accent Line */}
          <motion.div
            variants={fadeInUp}
            className="mt-20"
          >
            <div className="h-1 w-24 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;