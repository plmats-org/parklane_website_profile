'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Icons from '../icons';

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    {
      title: 'General Supply',
      description: 'Premium construction equipment and materials sourced globally. From generators to heavy machinery, we provide comprehensive solutions for all your project needs.',
      images: [
        'https://www.tractafric-equipment.com/tae_images/6532845cc68aaVJU.jpg',
        `plmh.jpeg`,
        'https://images.unsplash.com/photo-1637241612956-b7309005288b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1754818700642-8cf121ff76e6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      ],
      details: ['Power Generators', 'Construction Equipment', 'Building Materials', 'Industrial Tools', 'Medical Equipment supply'],
    },
    {
      title: 'Diesel Supply',
      description: 'Reliable fuel delivery services for industrial and commercial operations. We ensure consistent, high-quality diesel supply with flexible scheduling and competitive pricing.',
      images: [
        `diesel-supply.jpeg`,
        `cit.jpeg`,
        'https://sc04.alicdn.com/kf/H8d7c3c359eb84db6885055772b35f3b8T.png',
      ],
      details: ['Bulk Diesel Delivery', 'Storage Solutions', 'Fleet Fueling'],
    },
    {
      title: 'Cement Supply',
      description: 'Quality cement and building materials from certified manufacturers including:',
      images: [
        `cement.jpeg`,
        `cmt.jpeg`,
      ],
      details: ['Ready-Mixed concrete', 'Bulk supply of 32.5N cement', 'Bulk supply of 42.5N cement', 'Bulk supply of 52.5N cement', 'Bulk supply of 50kg truck loads of dry cement ⁠', 'Bulk orders'],
    },
    {
      title: 'Coal Supply',
      description: 'Efficient coal supply chain management for industrial energy needs. Sourced from verified mines and delivered with precision logistics for uninterrupted operations.',
      images: [
        `coal-truc.jpeg`,
        'https://images.pexels.com/photos/10421760/pexels-photo-10421760.jpeg',
        'https://images.pexels.com/photos/23540605/pexels-photo-23540605.jpeg',
      ],
      details: ['Industrial Coal', 'Energy Coal', 'Bulk Transport', 'Quality Certified'],
    },
        {
      title: 'Clinker Supply',
      description: 'Efficient clinker supply chain management for industrial energy needs. Sourced from verified mines and delivered with precision logistics for uninterrupted operations.',
      images: [
        'https://infrabound.com/wp-content/uploads/2025/04/Cement-and-Clinker-Export.jpg',
        `clinker.jpeg`,
        'https://karbincement.com/wp-content/uploads/2025/09/ChatGPT-Image-Sep-6-2025-01_08_34-PM.webp'
      ],
      details: ['Industrial Clinker', 'Bulk Transport'],
    },
  ];

  const [activeImageIndices, setActiveImageIndices] = useState(
    services.map(() => 0)
  );

  useEffect(() => {
    const intervals = services.map((service, serviceIndex) => {
      return setInterval(() => {
        setActiveImageIndices((prev) => {
          const newIndices = [...prev];
          newIndices[serviceIndex] = (newIndices[serviceIndex] + 1) % service.images.length;
          return newIndices;
        });
      }, 4000 + serviceIndex * 500);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const goToImage = (serviceIndex: number, imageIndex: number) => {
    setActiveImageIndices((prev) => {
      const newIndices = [...prev];
      newIndices[serviceIndex] = imageIndex;
      return newIndices;
    });
  };

  return (
    <section id="services" ref={ref} className="relative py-20 lg:py-28 bg-slate-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbbf24' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-0.5 bg-gradient-to-r from-primary-900 to-primary-900"></div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-600 font-semibold tracking-wider uppercase text-sm">
                What We Do
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 max-w-3xl">
              Premium Materials & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-500">
                Supply Solutions
              </span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              At Parklane Materials, we don't just pour concrete—we lay the groundwork for success. Whether you're building an industrial site, commercial space, or residential project, our premium supply services are engineered for reliability and excellence.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="">
            {services.map((service, serviceIndex) => (
              <motion.div
                key={serviceIndex}
                variants={itemVariants}
                className={`grid lg:grid-cols-2 gap-0 bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${
                  serviceIndex % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Text Content */}
                <div 
                  className={`p-8 lg:p-12 flex flex-col justify-center ${
                    serviceIndex % 2 === 1 ? 'lg:col-start-2' : ''
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: serviceIndex % 2 === 0 ? -30 : 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: serviceIndex % 2 === 0 ? -30 : 30 }}
                    transition={{ delay: 0.2 + serviceIndex * 0.1, duration: 0.6 }}
                  >
                    <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 uppercase tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-base lg:text-lg leading-relaxed mb-8">
                      {service.description}
                    </p>

                    {/* Service Details */}
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {service.details.map((detail, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                          transition={{ delay: 0.4 + idx * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary-400 to-primary-400"></div>
                          <span className="text-sm text-slate-700 font-medium">{detail}</span>
                        </motion.div>
                      ))}
                    </div>

                    <motion.a
                      href="#contact"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-400 to-primary-400 text-white font-semibold rounded-lg shadow-lg hover:shadow-primary-500 transition-all duration-300 w-fit"
                    >
                      <span>Learn More</span>
                      <Icons.ArrowRight size={18} />
                    </motion.a>
                  </motion.div>
                </div>

                {/* Image Slider */}
                <div 
                  className={`relative h-[400px] lg:h-[500px] ${
                    serviceIndex % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''
                  }`}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImageIndices[serviceIndex]}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                          backgroundImage: `url('${service.images[activeImageIndices[serviceIndex]]}')`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Image Navigation Dots */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                    {service.images.map((_, imageIndex) => (
                      <button
                        key={imageIndex}
                        onClick={() => goToImage(serviceIndex, imageIndex)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          activeImageIndices[serviceIndex] === imageIndex
                            ? 'w-8 bg-white'
                            : 'w-2 bg-white/50 hover:bg-white/75'
                        }`}
                        aria-label={`Go to image ${imageIndex + 1}`}
                      />
                    ))}
                  </div>

                  {/* Service Badge */}
                  <div className="absolute top-6 left-6 z-10">
                    <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                      <span className="text-white font-semibold text-sm">
                        {serviceIndex + 1} / {services.length}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;