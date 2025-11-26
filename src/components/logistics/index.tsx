'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const Logistics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const logisticsServices = [
    {
      icon: '✈️',
      title: 'Air Freight',
      description: 'Fast and secure delivery for urgent project needs with priority handling and express customs clearance.',
      image: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&q=85',
      features: ['Express Delivery', 'Real-time Tracking', 'Priority Customs', 'Temperature Control'],
    },
    {
      icon: '🚛',
      title: 'Land Transport',
      description: 'Reliable trucking and rail services across regions with specialized equipment for heavy machinery.',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=85',
      features: ['Cross-Border', 'Heavy Equipment', 'Last-Mile Delivery', 'Route Optimization'],
    },
    {
      icon: '🚢',
      title: 'Sea Freight',
      description: 'Cost-effective bulk shipping with comprehensive tracking and port-to-port delivery worldwide.',
      image: `gen.jpeg`,
      features: ['FCL & LCL', 'Bulk Shipping', 'Port-to-Port', 'Customs Brokerage'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section id="logistics" ref={ref} className="relative py-20 lg:py-28 bg-white overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(251, 191, 36, 0.4) 1px, transparent 0)`,
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
                Logistics Services
              </span>
            </div>
            <div className="grid lg:grid-cols-2 gap-8 items-end">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Comprehensive <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600">
                  Supply Chain Solutions
                </span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                PLM offers integrated logistics solutions via air, land, and sea—ensuring efficient and safe delivery to project sites across the globe with top-tier partners.
              </p>
            </div>
          </motion.div>

          {/* Main Services Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {logisticsServices.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group relative"
              >
                <div className="relative h-full bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200">
                  {/* Image Section */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.div
                      animate={{
                        scale: hoveredCard === index ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full h-full"
                    >
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                          backgroundImage: `url('${service.image}')`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    </motion.div>

                    {/* Title Overlay */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl font-semibold text-white mb-1">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8">
                    <p className="text-slate-600 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-3">
                      {service.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ delay: 0.3 + idx * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary-500"></div>
                          <span className="text-sm text-slate-700 font-medium">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-500/40  transition-all duration-500 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Process Steps */}
          {/* <motion.div variants={itemVariants} className="mb-20">
            <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-12 text-center">
              Our Logistics Process
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Order Confirmation', desc: 'Documentation & preparation' },
                { step: '02', title: 'Route Planning', desc: 'Optimal path selection' },
                { step: '03', title: 'Transit & Tracking', desc: 'Real-time monitoring' },
                { step: '04', title: 'Safe Delivery', desc: 'On-site delivery & support' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <div className="p-6 rounded-2xl bg-white border-2 border-slate-200 hover:border-primary-500 transition-all duration-300">
                    <div className="text-6xl font-bold text-primary-500/20 mb-4">{item.step}</div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div> */}

          {/* CTA Banner */}
          <motion.div
            variants={itemVariants}
            className="relative  overflow-hidden"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=85')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-slate-900/80" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-12 lg:p-16 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 mb-8"
              >
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </motion.div>
              <h3 className="text-3xl lg:text-5xl font-bold text-white mb-6">
                Ready to Streamline Your Supply Chain?
              </h3>
              <p className=" text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Partner with PLM for reliable, efficient, and cost-effective logistics solutions that deliver results across continents.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg shadow-xl hover:shadow-primary-500/50 transition-all duration-300"
                >
                  <span>Get Started</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.a>
                <motion.a
                  href="#services"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-slate-900 transition-all duration-300"
                >
                  <span>View Services</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Logistics;