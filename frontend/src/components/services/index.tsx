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
    // 1. HEALTHCARE & MEDICAL SOLUTIONS
    {
      title: 'Healthcare & Medical Solutions',
      shortDescription: 'Comprehensive hospital supplies, medical equipment, and pharmaceutical solutions',
      fullDescription: 'End-to-end healthcare procurement covering hospital consumables, advanced medical equipment, laboratory diagnostics, pharmaceutical supplies, and maternal health products. We equip healthcare facilities of any scale with quality-assured medical solutions.',
      image: `hospital.jpeg`,
      details: [
        // Hospital & Clinical Supplies
        'Consumables (gloves, syringes, masks, gowns)',
        'IV fluids & accessories',
        'Catheters & tubing',
        'Diagnostic disposables',
        'Sterilization & infection control products',
        // Medical Equipment
        'Patient monitors & ventilators',
        'Ultrasound, X-ray & imaging equipment',
        'ECG machines & dialysis equipment',
        'Laboratory analyzers & microscopes',
        // Medical Furniture
        'Hospital beds (manual & electric)',
        'Operating tables & examination tables',
        'Stretchers, wheelchairs & trolleys',
        // Maternal Health
        'Maternity kits & pregnancy test kits',
        'Gynecological equipment',
        // Pharmaceuticals
        'Essential medicines & vaccines',
        'OTC products & medical gases',
      ],
    },
    // 2. ENERGY & POWER SOLUTIONS
    {
      title: 'Energy & Power Solutions',
      shortDescription: 'Power generation, renewable energy, and oil & gas equipment',
      fullDescription: 'Complete energy solutions from power generation equipment to renewable systems and oil & gas infrastructure. We provide generators, solar systems, transformers, and comprehensive fuel supply services for industrial and commercial operations.',
      image: `diesel-supply.jpeg`,
      details: [
        // Power Generation
        'Gas & diesel generators',
        'Solar power systems & wind power components',
        'Turbines & hybrid power solutions',
        // Energy Infrastructure
        'Transformers & switchgear',
        'Substations & transmission lines',
        'Cables, conductors & energy meters',
        // Oil & Gas Equipment
        'Drilling & gas processing equipment',
        'Pipelines, valves & compressors',
        'Storage tanks & safety systems',
        // Renewable Energy
        'Solar panels & inverters',
        'Battery storage systems',
        'EV charging stations & mini-grid systems',
        // Fuel Supply
        'Diesel, gasoline & gas supply (LPG, CNG)',
        'Energy logistics & fuel storage solutions',
        'Energy consulting services',
      ],
    },
    // 3. INDUSTRIAL, HEAVY & LIGHT EQUIPMENT
    {
      title: 'Industrial & Heavy Equipment',
      shortDescription: 'Construction, mining, manufacturing machinery and material handling',
      fullDescription: 'Comprehensive industrial equipment solutions covering construction machinery, manufacturing systems, material handling equipment, mining gear, and agricultural equipment. We source and deliver specialized heavy-duty equipment globally.',
      image: `cst.png`,
      details: [
        // Construction Equipment
        'Excavators, bulldozers & cranes',
        'Loaders, compactors & concrete mixers',
        // Industrial Machinery
        'Manufacturing & processing equipment',
        'Packaging machinery & CNC machines',
        'Factory automation systems',
        // Material Handling
        'Forklifts & pallet trucks',
        'Conveyors, hoists & warehouse racking',
        // Mining & Quarry
        'Drilling rigs & crushers',
        'Screens & haul trucks',
        'Processing plants',
        // Agricultural Equipment
        'Tractors & harvesters',
        'Irrigation systems',
        'Agro-processing equipment & storage silos',
      ],
    },
    // 4. CONSTRUCTION MATERIALS & BUILDING SOLUTIONS
    {
      title: 'Construction Materials & Building Solutions',
      shortDescription: 'Structural, finishing, roofing, and infrastructure materials',
      fullDescription: 'Quality-assured construction materials from structural components to finishing touches. We supply cement, steel, tiles, electrical systems, plumbing materials, and road infrastructure products for projects of any scale.',
      image: `clinker.jpeg`,
      details: [
        // Structural Materials
        'Cement, clinker & structural steel',
        'Steel rebar & precast concrete',
        'Blocks & bricks',
        // Finishing Materials
        'Tiles, marble & paints',
        'Gypsum boards & flooring systems',
        'Doors & windows',
        // Roofing & Exterior
        'Roofing sheets & insulation materials',
        'Facade systems & cladding',
        'Waterproofing materials',
        // Electrical & Plumbing
        'Electrical cables, switches & sockets',
        'Lighting systems',
        'Pipes, fittings & water tanks',
        'Pumps',
        // Roads & Infrastructure
        'Asphalt, bitumen & aggregates',
        'Drainage systems & road signage',
      ],
    },
    // 5. ICT, DIGITAL & SMART INFRASTRUCTURE
    {
      title: 'ICT & Digital Solutions',
      shortDescription: 'Hardware, software, telecom infrastructure and smart city platforms',
      fullDescription: 'Complete ICT solutions from enterprise hardware to digital platforms. We provide servers, networking equipment, ERP systems, cybersecurity solutions, and telecommunications infrastructure for modern digital operations.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop',
      details: [
        // Hardware & Devices
        'Servers & data centers',
        'Computers, laptops & networking equipment',
        'Storage systems',
        // Software & Digital
        'ERP systems & cloud services',
        'Cybersecurity solutions',
        'Government IT solutions',
        'Smart city platforms',
        // Telecom & Connectivity
        'Fiber optic cables',
        'Towers & base stations',
        'Routers, switches & satellite communication',
      ],
    },
    // 6. LOGISTICS, TRANSPORT & SUPPORT SERVICES
    {
      title: 'Logistics & Transport Services',
      shortDescription: 'Freight forwarding, fleet management, and supply chain solutions',
      fullDescription: 'Integrated logistics covering shipping, customs clearance, warehousing, and last-mile delivery. We manage complete supply chains with specialized vehicles, cold-chain logistics, and distribution services across Africa and globally.',
      image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?q=80&w=2065&auto=format&fit=crop',
      details: [
        // Logistics & Freight
        'Shipping & freight forwarding',
        'Customs clearance',
        'Warehousing & cold-chain logistics',
        // Fleet & Transportation
        'Trucks, buses & specialized vehicles',
        'Ambulances & heavy-duty transporters',
        // Supply Chain Management
        'Inventory management',
        'Distribution services',
        'Last-mile delivery solutions',
      ],
    },
    // 7. MANPOWER, PROFESSIONAL & TECHNICAL SERVICES
    {
      title: 'Manpower & Professional Services',
      shortDescription: 'Engineering, construction, design, legal, and skilled workforce solutions',
      fullDescription: 'Complete professional services from engineering consultants to skilled technicians. We provide project managers, architects, legal advisors, and specialized workforce for construction, energy, and infrastructure projects.',
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2187&auto=format&fit=crop',
      details: [
        // Engineering & Technical
        'Civil, mechanical & electrical engineers',
        'Energy specialists',
        // Construction & Project Services
        'Project managers & site supervisors',
        'Quantity surveyors & construction consultants',
        // Design & Architecture
        'Architects & urban planners',
        'Interior & landscape designers',
        // Legal, Financial & Advisory
        'Lawyers & financial advisors',
        'Auditors, tax consultants & PPP advisors',
        // Skilled Manpower
        'Technicians & welders',
        'Electricians, plumbers & equipment operators',
      ],
    },
    // 8. AGRICULTURE & FOOD SUPPLY
    {
      title: 'Agriculture & Food Supply',
      shortDescription: 'Agricultural inputs, processing equipment, and food commodities',
      fullDescription: 'Comprehensive agricultural solutions from farm inputs to food processing. We supply seeds, fertilizers, irrigation systems, processing machinery, cold storage, and food commodities for agricultural operations and food supply chains.',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop',
      details: [
        // Inputs & Equipment
        'Seeds, fertilizers & pesticides',
        'Irrigation systems',
        // Processing & Storage
        'Food processing machinery',
        'Cold storage solutions',
        'Packaging solutions',
        // Food & Commodity Supply
        'Grains & processed food',
        'Livestock feed',
      ],
    },
    // 9. SECURITY, SAFETY & COMPLIANCE
    {
      title: 'Security, Safety & Compliance',
      shortDescription: 'Safety equipment, security systems, and quality certification services',
      fullDescription: 'Complete safety and security solutions including PPE, fire systems, surveillance equipment, and compliance services. We provide quality assurance, inspection, testing, and certification support for regulatory adherence.',
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2096&auto=format&fit=crop',
      details: [
        // Safety Equipment
        'Personal Protective Equipment (PPE)',
        'Fire safety systems',
        'Emergency response equipment',
        // Security Systems
        'Surveillance systems (CCTV)',
        'Access control systems',
        'Alarm systems',
        // Compliance & Certification
        'Quality assurance services',
        'Inspection & testing',
        'Certification support',
      ],
    },
    // 10. FINANCING, TRADE & SUPPORT SERVICES
    {
      title: 'Financing & Trade Services',
      shortDescription: 'Procurement financing, trade finance, and banking partnerships',
      fullDescription: 'Financial solutions to support procurement and trade operations. We provide pre-financing, supplier credit structures, letters of credit, guarantees, and project financing coordination through strategic banking partnerships.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop',
      details: [
        // Procurement Financing
        'Pre-financing solutions',
        'Supplier credit structures',
        'Trade finance',
        // Banking & Financial Partnerships
        'Letters of credit',
        'Guarantees',
        'Project financing coordination',
      ],
    },
    // 11. LOCAL CONTENT & REGIONAL DEVELOPMENT SERVICES
    {
      title: 'Local Content & Regional Development',
      shortDescription: 'Local supplier development, capacity building, and regional sourcing',
      fullDescription: 'Supporting local economic development through supplier identification, capacity building programs, and regional sourcing coordination. We help businesses meet government local content requirements while developing sustainable local supply chains.',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop',
      details: [
        'Local supplier identification',
        'Capacity building programs',
        'Supplier development programs',
        'Government compliance advisory',
        'Regional sourcing coordination',
      ],
    },
    // 12. CUSTOM & SPECIALIZED REQUESTS
    {
      title: 'Custom & Specialized Requests',
      shortDescription: 'Bespoke procurement, government tenders, and emergency sourcing',
      fullDescription: 'Tailored procurement solutions for unique requirements. We handle bespoke procurement, government tenders, large-scale infrastructure sourcing, and emergency procurement with rapid response capabilities across Africa and global markets.',
      image: `gen.jpeg`,
      details: [
        'Bespoke procurement solutions',
        'Government tender support',
        'Large-scale infrastructure sourcing',
        'Emergency procurement',
        'Hard-to-find item sourcing',
        'Specialized equipment procurement',
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
                      <span>Contact Us</span>
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