'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const WhyPLM = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const reasons = [
    {
      title: 'Who We Are',
      description: 'PLM is a leading procurement and supply company headquartered in Rwanda, delivering high-quality products, equipment, and logistics solutions across Africa and globally. With deep roots in one of Africa\'s most stable and investment-friendly markets, we are uniquely positioned to serve both local and international clients.',
    },
    {
      title: 'Our Mission',
      description: 'To simplify global sourcing by providing reliable procurement, world-class logistics, and consistent quality across all sectors—while prioritizing African suppliers and building local capacity.',
    },
    {
      title: 'Our Vision',
      description: 'To be Africa\'s most trusted integrated procurement platform, known for transparency, speed, supplier network depth, and the ability to deliver even the most complex supply requirements.',
    },
    {
      title: 'Network Strength',
      description: 'Unlike traditional procurement models, PLM maintains a living supplier network with pre-qualified alternatives at every tier—local, regional, and global—ensuring zero downtime and continuous project execution.',
    },
    {
      title: 'Risk Mitigation',
      description: 'PLM acts as the risk manager in the middle. If one supplier delays or fails, we immediately activate alternatives. Contracts adjust, logistics adapt, and clients experience minimal to zero disruption.',
    },
    {
      title: 'Financing Support',
      description: 'We remove capital bottlenecks through in-house pre-financing, bank-supported trade finance, and supplier-backed structured payments—ensuring projects start on time and suppliers are protected.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      id="why-plm"
      ref={ref}
      className="relative py-20 lg:py-32 bg-black overflow-hidden"
    >
      {/* PLM Background Text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="text-[20rem] lg:text-[30rem] font-bold text-white/60 select-none">
          PLM
        </div>
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(251, 191, 36, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 191, 36, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-16 lg:mb-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600"></div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-600 font-semibold tracking-wider uppercase text-sm">
                Mission & Vision
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl cursor-pointer lg:text-6xl font-bold text-white mb-6">
              Why choose{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-primary-500 to-primary-500">
                PLM
              </span>
            </h2>
            <p className=" text-slate-400 max-w-4xl leading-relaxed">
              PLM combines elite global sourcing, rigorous quality control, and cutting-edge logistics expertise to deliver unmatched procurement solutions across construction and industrial sectors.
            </p>
          </motion.div>

          {/* Reasons Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50  p-8 hover:bg-slate-800/80 hover:border-amber-500/50 transition-all duration-500"
              >
                {/* Gradient Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-yellow-500/0 to-amber-600/0 group-hover:from-amber-500/5 group-hover:via-yellow-500/5 group-hover:to-amber-600/5 rounded-2xl transition-all duration-500" />

                <div className="relative z-10">
                  {/* Number Badge */}
                  {/* <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-bold text-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                    {(index + 1).toString().padStart(2, '0')}
                  </div> */}

                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-amber-400 group-hover:to-yellow-500 transition-all duration-300">
                    {reason.title}
                  </h3>

                  <p className="text-slate-400 leading-relaxed text-sm">
                    {reason.description}
                  </p>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyPLM;