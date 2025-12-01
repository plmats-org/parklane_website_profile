'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const WhyPLM = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const reasons = [
    {
      title: 'Who we are',
      description: 'PLM is a leading general procurement and supply company delivering high-quality products, equipment, and logistics solutions across Africa and globally. With a strong network of manufacturers, international suppliers, and logistics partners, PLM provides end-to-end, reliable, and cost-effective procurement services to governments, companies, NGOs, and major infrastructure contractors.',
    },
    {
      title: 'Our Mission',
      description: 'To simplify global sourcing by providing reliable procurement, world-class logistics, and consistent quality across all sectors — from medical to construction, energy, and general supplies.',
    },
    {
      title: 'Our Vision',
      description: 'To be one of Africa’s most trusted integrated procurement and supply companies, known for transparency, speed, and ability to deliver even the most complex supply requirements.',
    },
    {
      title: 'Our Strengths',
      description: 'Global supplier partnerships - Strong presence in Africa - Deep understanding of government and corporate procurement - Ability to deliver at speed, anywhere - Full logistics ecosystem (sea, land, air & special charter) - Multi-sector procurement expertise - Flexible and scalable supply programs',
    },
    {
      title: 'Reliable Delivery',
      description: 'Comprehensive logistics management via air, land, and sea ensures your materials arrive on time, every time, anywhere in the world.',
    },
    {
      title: 'Dedicated Support',
      description: 'Expert procurement specialists and responsive customer service provide personalized solutions tailored to your project requirements.',
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
                Parklane
              </span>
            </h2>
            <p className=" text-slate-400 max-w-4xl leading-relaxed">
              Parklane Materials combines elite global sourcing, rigorous quality control, and cutting-edge logistics expertise to deliver unmatched procurement solutions across construction and industrial sectors.
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