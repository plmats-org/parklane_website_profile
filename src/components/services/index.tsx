'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';

interface Service {
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  details: string[];
}

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const services: Service[] = [
    {
      title: 'General Procurement Services',
      shortDescription: 'End-to-end corporate and government procurement solutions',
      fullDescription: 'Comprehensive procurement services including vendor qualification, international sourcing, and bulk purchasing. We handle everything from complex government contracts to corporate supply agreements.',
      image: `gn.png`,
      details: [
        'Corporate procurement & sourcing',
        'Government procurement support',
        'Vendor identification & qualification',
        'International sourcing & supply negotiations',
        'Framework supply agreements',
        'Bulk purchasing and consolidation',
        'Custom procurement for hard-to-find items',
      ],
    },
    {
      title: 'Medical & Health Sector',
      shortDescription: 'Complete medical equipment and supplies',
      fullDescription: 'Turnkey medical supply chain management from PPE to hospital equipment. We provide everything needed to equip and maintain healthcare facilities of any size.',
      image: `hpt.png`,
      details: [
        'Personal protective equipment (PPE)',
        'Hospital equipment & consumables',
        'Diagnostic tools & testing kits',
        'Emergency response supplies',
        'Pharmaceuticals (non-controlled)',
        'Laboratory equipment & reagents',
        'Medical furniture & facility outfitting',
        'Turnkey medical supply chain management',
      ],
    },
    {
      title: 'Construction Supplies',
      shortDescription: 'Premium building materials and site consumables',
      fullDescription: 'Complete range of construction materials from cement and steel to finishing materials. Quality-assured supplies for projects of any scale.',
      image: `gns.png`,
      details: [
        'Cement, aggregates, sand & binding materials',
        'Rebar, steel, plates, beams, channels',
        'Plumbing and electrical materials',
        'Roofing materials',
        'Prefabricated building components',
        'Paints, coatings, waterproofing',
        'Insulation materials',
        'Safety equipment & site consumables',
      ],
    },
    {
      title: 'Construction Equipment Rental',
      shortDescription: 'Heavy machinery and specialized equipment',
      fullDescription: 'Full fleet of construction equipment available for rent. From earthmoving to lifting equipment, we have everything needed for your construction site.',
      image: `cst.png`,
      details: [
        'Earthmoving: excavators, graders, loaders',
        'Lifting equipment: cranes, forklifts, boom lifts',
        'Road construction: rollers, pavers',
        'Power solutions: generators, transformers',
        'Concrete equipment: mixers, pumps',
        'Site offices, mobile cabins',
        'Specialized equipment on request',
      ],
    },
    {
      title: 'Industrial Procurement',
      shortDescription: 'Heavy-duty supplies for industrial operations',
      fullDescription: 'Comprehensive industrial procurement services for mining, manufacturing, and oil & gas sectors. We source specialized equipment and supplies globally.',
      image: `ind.png`,
      details: [
        'Mining equipment & supplies',
        'Industrial machines (cutting, welding, fabrication)',
        'Heavy-duty electrical & mechanical components',
        'Oil & gas field supplies',
        'Safety gear and industrial PPE',
        'Bearings, hydraulics & automation parts',
      ],
    },
    {
      title: 'Logistics & Supply Chain',
      shortDescription: 'Complete freight and transportation solutions',
      fullDescription: 'Integrated logistics solutions covering sea, land, air freight, and special charter services. We handle everything from bulk shipping to express delivery.',
      image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?q=80&w=2065&auto=format&fit=crop',
      details: [
        'Sea Freight: FCL/LCL, bulk commodity shipping',
        'Land Transport: heavy cargo, cross-border haulage',
        'Air Freight: express shipments, temperature-controlled',
        'Special Charter: aircraft & vessel charter',
        'Port-to-port & door-to-door delivery',
        'Last-mile delivery solutions',
        'Oversized cargo handling',
      ],
    },
    {
      title: 'Energy & Infrastructure',
      shortDescription: 'Specialized supplies for major projects',
      fullDescription: 'Specialized procurement for energy, mining, and infrastructure projects. We supply everything from pipeline materials to road construction consumables.',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop',
      details: [
        'Pipeline materials & fuel handling equipment',
        'Mining: blast materials, drilling supplies',
        'Road construction consumables',
        'Bridge components',
        'Water & sanitation materials',
        'Street lighting & electrification hardware',
        'Camp equipment & heavy gear',
      ],
    },
    {
      title: 'Facility Management',
      shortDescription: 'Operational supplies and maintenance equipment',
      fullDescription: 'Complete facility management supplies from cleaning equipment to maintenance tools. Everything needed to keep your operations running smoothly.',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop',
      details: [
        'Cleaning equipment & industrial detergents',
        'Office and stationery supplies',
        'Tools, hardware & spare parts',
        'Maintenance supplies',
        'Groundskeeping & landscape tools',
      ],
    },
    {
      title: 'Turnkey Project Packages',
      shortDescription: 'Fully integrated supply solutions',
      fullDescription: 'Complete project supply packages tailored to your specific needs. From hospital setups to mining camps, we deliver everything in one integrated solution.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop',
      details: [
        'Hospital or clinic supply package',
        'School construction supply package',
        'Emergency disaster response kits',
        'Mining camp setup',
        'Road construction materials package',
        'Security & surveillance equipment package',
      ],
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

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <section id="services" ref={ref} className="relative py-24 lg:py-32 bg-slate-50 overflow-hidden">
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
                What We Do
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.15] mb-6 max-w-3xl">
              Comprehensive{' '}
              <span className="text-primary-500">Procurement Solutions</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
              From medical supplies to heavy machinery, we deliver complete procurement
              and logistics solutions across all sectors. Click any service to learn more.
            </p>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            variants={containerVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedService(service)}
                className="group relative bg-white border border-slate-200 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:border-primary-300 hover:shadow-xl"
              >
                {/* Service Number Badge */}
                {/* <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 font-bold text-sm">
                  {index + 1}
                </div> */}

                {/* Content */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 pr-8 group-hover:text-primary-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                {/* View More Button */}
                <div className="flex items-center gap-2 text-primary-600 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                  <span>View Details</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-xl border-2 border-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedService && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Modal Content */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden pointer-events-auto"
              >
                {/* Modal Header with Image */}
                <div className="relative h-64 sm:h-80">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${selectedService.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedService(null)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                  >
                    <X size={20} />
                  </button>

                  {/* Title Overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                      {selectedService.title}
                    </h3>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(90vh-20rem)]">
                  {/* Description */}
                  <p className="text-lg text-slate-600 leading-relaxed mb-8">
                    {selectedService.fullDescription}
                  </p>

                  {/* Details Grid */}
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-4">
                      What We Provide
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {selectedService.details.map((detail, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
                        >
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center">
                            <svg
                              className="w-3.5 h-3.5 text-primary-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <span className="text-slate-700 font-medium text-sm">{detail}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <a
                      href="#contact"
                      onClick={() => setSelectedService(null)}
                      className="inline-flex items-center gap-2 px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <span>Request Quote</span>
                      <ArrowRight size={18} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;