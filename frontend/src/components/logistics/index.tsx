'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Logistics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const logisticsServices = [
    {
      title: 'Air Freight',
      description: 'Fast and secure air cargo services with priority handling, express customs clearance, and real-time tracking for urgent deliveries worldwide.',
    },
    {
      title: 'Ocean Clearance',
      description: 'Comprehensive ocean freight customs clearance services ensuring smooth port operations and full compliance with international trade regulations.',
    },
    {
      title: 'Consolidation',
      description: 'FDL services including China seafreight container consolidation, optimizing cargo space and reducing shipping costs for bulk orders.',
    },
    {
      title: 'Truck Hub',
      description: 'Complete land transportation solutions with modern fleet management, covering local, regional, and cross-border deliveries with full tracking capabilities.',
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
    <section id="logistics" ref={ref} className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-primary-50/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-16 max-w-6xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-primary-400 to-primary-600" />
              <span className="text-primary-600 font-semibold tracking-wider uppercase text-sm">
                Logistics Services
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.15] mb-6 max-w-3xl">
              Comprehensive{' '}
              <span className="text-primary-500">Supply Chain Solutions</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
              Seamless logistics solutions across air, ocean, and land—delivering excellence with every shipment worldwide.
            </p>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            variants={containerVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {logisticsServices.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative bg-white border border-slate-200 rounded-xl p-6 transition-all duration-300 hover:border-primary-300 hover:shadow-xl"
              >
                {/* Content */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-xl border-2 border-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Logistics;