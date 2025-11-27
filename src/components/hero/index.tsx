'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import Icons from '../icons';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Premium Construction Materials',
    subtitle: 'Global sourcing of quality cement, steel, and building supplies',
    image: `material-mat.jpeg`,
    cta: 'Request Quote',
  },
  {
    id: 2,
    title: 'Reliable Diesel Supply',
    subtitle: 'Consistent fuel delivery for your industrial operations',
    image: `cit.jpeg`,
    cta: 'Request Quote',
  },
  {
    id: 3,
    title: 'General supply of equipment',
    subtitle: 'Quality generators and equipment for uninterrupted power',
    image: 'https://images.unsplash.com/photo-1599707254554-027aeb4deacd?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cta: 'Request Quote',
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  }, [currentSlide]);

  // Auto-slide functionality
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-end overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Slider */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 35 },
            opacity: { duration: 0.6 },
          }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${slides[currentSlide].image}')`,
            }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content Container */}
      <div className="relative z-10 w-full pb-16 sm:pb-20 lg:pb-24">
        <div className="px-6 sm:px-8 lg:px-16 xl:px-24 max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            {/* Left Content - Main Title */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="text-white"
              >
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight">
                  {slides[currentSlide].title}
                </h1>
              </motion.div>
            </AnimatePresence>

            {/* Right Content - Subtitle and CTA */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="flex flex-col items-start lg:items-end text-white space-y-6"
              >
                <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-md text-left lg:text-right">
                  {slides[currentSlide].subtitle}
                </p>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact"
                  className="inline-flex items-center justify-center px-10 py-4 bg-primary-400 hover:bg-primary-500 text-white font-semibold rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 text-lg"
                >
                  {slides[currentSlide].cta}
                </motion.a>

                {/* Navigation Indicators */}
                <div className="flex items-center gap-3 pt-4">
                  <button
                    onClick={prevSlide}
                    className="w-11 h-11 rounded-full border-2 border-white/80 text-white flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                    aria-label="Previous slide"
                  >
                    <Icons.ChevronLeft size={22} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-11 h-11 rounded-full border-2 border-white/80 text-white flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                    aria-label="Next slide"
                  >
                    <Icons.ChevronRight size={22} />
                  </button>

                  {/* Slide Dots */}
                  <div className="flex gap-2 ml-2">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === currentSlide
                            ? 'w-8 bg-primary-400'
                            : 'w-2 bg-white/60 hover:bg-white/80'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
        <motion.div
          className="h-full bg-primary-400"
          key={currentSlide}
          initial={{ width: '0%' }}
          animate={{ width: isPaused ? '0%' : '100%' }}
          transition={{
            duration: 5,
            ease: 'linear',
          }}
        />
      </div>
    </section>
  );
};

export default Hero;