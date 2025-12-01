'use client';

import { motion, Variants } from 'framer-motion';
import Icons from '../icons'; // Assuming you still want to use this for the CTA icon if you choose to add one

// --- Static Content for PLM ---
const PLM_HERO_CONTENT = {
  title: 'Procurement, Supply & Logistics',
  subtitle: 'Leading general procurement and supply company delivering high-quality products, equipment, and logistics solutions across Africa and globally.',
  cta: 'Request Quote',
  // Strategic image representing procurement, supply, and logistics (e.g., a port, a warehouse, or a composite of industrial materials/shipping)
  // **CLIENT MUST REPLACE THIS URL** with their preferred strategic image.
image: 'https://eliteextra.com/wp-content/uploads/2022/07/AdobeStock_390578609-980x551.jpeg',};
// 

const Hero = () => {

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
        delay: 0.2, // Add a slight delay for the content to appear after the background loads
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-end overflow-hidden"
    >
      {/* Background Image - Static */}
      <div className="absolute inset-0">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${PLM_HERO_CONTENT.image}')`,
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content Container - Simplified Motion */}
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full pb-16 sm:pb-20 lg:pb-24"
      >
        <div className="px-6 sm:px-8 lg:px-16 xl:px-24 max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            {/* Left Content - Main Title */}
            <div className="text-white">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight">
                {PLM_HERO_CONTENT.title}
              </h1>
            </div>

            {/* Right Content - Subtitle and CTA */}
            <div className="flex flex-col items-start lg:items-end text-white space-y-6">
              <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-md text-left lg:text-right">
                {PLM_HERO_CONTENT.subtitle}
              </p>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="inline-flex items-center justify-center px-10 py-4 bg-primary-400 hover:bg-primary-500 text-white font-semibold rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 text-lg"
              >
                {PLM_HERO_CONTENT.cta}
              </motion.a>
              
              {/* Removed Navigation Indicators */}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Removed Progress Bar */}
    </section>
  );
};

export default Hero;
