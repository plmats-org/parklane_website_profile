"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const Partners = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as any,
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as any,
      },
    },
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <section
        id="partners"
      className="relative py-20 lg:py-32 bg-black overflow-hidden"
      >
        {/* Background Pattern */}
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

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-100/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-primary-100/20 to-transparent rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="mb-16 lg:mb-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600"></div>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-600 font-semibold tracking-wider uppercase text-sm">
                  Our Partners
                </span>
              </div>
              <div className="grid lg:grid-cols-2 gap-8 items-end">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Trusted by <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600">
                    Industry Leaders
                  </span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  We collaborate with world-class partners to deliver
                  exceptional procurement solutions and construction materials
                  across Africa and beyond.{" "}
                </p>
              </div>
            </motion.div>

            {/* Single Partner Card - Centered */}
            <motion.div
              variants={containerVariants}
              className="flex justify-center mb-16"
            >
              <motion.div
                variants={logoVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                }}
                className="group relative max-w-2xl w-full cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <div className="relative h-auto bg-white  overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200 hover:border-primary-300">
                  {/* Partner Logo/Image */}
                  <div className="relative h-[360px] overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{
                        backgroundImage: `url('/seal.png')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  </div>

                  {/* Partner Info */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">
                      Road Construction , Paving & Soil Stabilization
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      Leading providers of Top Seal products - superior
                      performing, cost-saving GREEN solutions for road paving
                      and soil stabilization.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-primary-600 font-medium">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>Verified Partner</span>
                      <span className="mx-2">•</span>
                      <span className="group-hover:underline">
                        Click to learn more
                      </span>
                    </div>
                  </div>

                  {/* Hover Accent Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-700 to-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              </motion.div>
            </motion.div>

            {/* Bottom CTA */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 bg-gradient-to-br from-slate-50 to-white border border-slate-200 shadow-md">
                <div className="flex-1 text-left">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Become a Partner
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Join our network of trusted industry leaders and grow
                    together.
                  </p>
                </div>
                <button
                  onClick={scrollToContact}
                  className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-700 text-white font-semibold rounded-xl hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group whitespace-nowrap"
                >
                  <span className="flex items-center gap-2">
                    Partner With Us
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-[#8B9D3B] to-[#6B7D2B] text-white p-6 rounded-t-2xl flex justify-between items-center z-10">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Top Seal Products</h2>
                  <p className="text-green-100 text-sm">
                    Superior Performing, Cost-Saving Solutions
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8">
                {/* Introduction */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-amber-700 to-primary-600"></div>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-900 to-yellow-800 font-semibold tracking-wider uppercase text-sm">
                      About Top Seal
                    </span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    Top Seal products are polymer-based emulsions designed to
                    bind soil particles, increasing load-bearing capacity and
                    making soil significantly less permeable to water. They are
                    non-petroleum-based, eco-friendly solutions mixed with water
                    and cured through water evaporation.
                  </p>
                </div>

                {/* Product Images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div className="relative h-64 rounded-xl overflow-hidden shadow-md group">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{
                        backgroundImage: `url('https://terrapave.com.au/wp-content/uploads/2023/06/photo_17.wide_.jpg')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-lg">
                        Top Seal Black Application
                      </h3>
                      <p className="text-white/80 text-sm">
                        Paved road surface treatment
                      </p>
                    </div>
                  </div>
                  <div className="relative h-64 rounded-xl overflow-hidden shadow-md group">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{
                        backgroundImage: `url('https://terrapave.com.au/wp-content/uploads/2023/06/preview_1_b9grRiZ.normal.jpg')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-lg">
                        Top Seal White Application
                      </h3>
                      <p className="text-white/80 text-sm">
                        Unpaved road stabilization
                      </p>
                    </div>
                  </div>
                </div>

                {/* Key Benefits */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">
                    Key Benefits of Top Seal Black
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-xl border border-slate-200">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mb-4">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">
                        Asphalt-Like Durability
                      </h4>
                      <p className="text-slate-600 text-sm">
                        Creates a durable, black-sealed surface like traditional
                        asphalt paving at a more cost-effective price.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-xl border border-slate-200">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8B9D3B] to-[#6B7D2B] flex items-center justify-center mb-4">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">
                        Enhanced Flexibility
                      </h4>
                      <p className="text-slate-600 text-sm">
                        Polymer-based emulsion provides increased flexibility
                        and elasticity to resist cracking.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-xl border border-slate-200">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center mb-4">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">
                        Extended Lifespan
                      </h4>
                      <p className="text-slate-600 text-sm">
                        Longer lifespan between 10 to 15 years minimum, reducing
                        maintenance costs.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-xl border border-slate-200">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mb-4">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">
                        Improved Soil Strength
                      </h4>
                      <p className="text-slate-600 text-sm">
                        Enhanced adhesion with road base increases soil strength
                        and resistance to weathering.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Product Comparison Table */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">
                    Product Comparison
                  </h3>
                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-[#8B9D3B] to-[#6B7D2B] text-white">
                          <th className="p-4 text-left font-semibold">
                            Feature
                          </th>
                          <th className="p-4 text-left font-semibold">
                            Top Seal Black
                          </th>
                          <th className="p-4 text-left font-semibold">
                            Top Seal White
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        <tr className="bg-white hover:bg-slate-50 transition-colors">
                          <td className="p-4 font-medium text-slate-900">
                            Surface Finish
                          </td>
                          <td className="p-4 text-slate-600">
                            Hardened, asphalt-like membrane
                          </td>
                          <td className="p-4 text-slate-600">
                            Solid, flexible, integrated base
                          </td>
                        </tr>
                        <tr className="bg-slate-50 hover:bg-slate-100 transition-colors">
                          <td className="p-4 font-medium text-slate-900">
                            Main Benefit
                          </td>
                          <td className="p-4 text-slate-600">
                            Durable pavement alternative
                          </td>
                          <td className="p-4 text-slate-600">
                            Soil stabilization & dust control
                          </td>
                        </tr>
                        <tr className="bg-white hover:bg-slate-50 transition-colors">
                          <td className="p-4 font-medium text-slate-900">
                            Aesthetics
                          </td>
                          <td className="p-4 text-slate-600">
                            Creates a "paved" look
                          </td>
                          <td className="p-4 text-slate-600">
                            Natural, unpaved appearance
                          </td>
                        </tr>
                        <tr className="bg-slate-50 hover:bg-slate-100 transition-colors">
                          <td className="p-4 font-medium text-slate-900">
                            Water Permeability
                          </td>
                          <td className="p-4 text-slate-600">
                            Significantly reduces penetration
                          </td>
                          <td className="p-4 text-slate-600">
                            Extremely low (exceeds EPA standards)
                          </td>
                        </tr>
                        <tr className="bg-white hover:bg-slate-50 transition-colors">
                          <td className="p-4 font-medium text-slate-900">
                            Key Applications
                          </td>
                          <td className="p-4 text-slate-600">
                            Roads, parking lots, industrial areas
                          </td>
                          <td className="p-4 text-slate-600">
                            Haul roads, mine roads, trails
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Environmental Benefits */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-green-900">
                        Eco-Friendly Solution
                      </h3>
                      <p className="text-green-700 text-sm">
                        Non-petroleum based, environmentally responsible
                      </p>
                    </div>
                  </div>
                  <p className="text-green-800 leading-relaxed">
                    Top Seal products are eco-friendly, mixed with water with no
                    other solvents during application, and evaporate only water
                    while curing. This makes them a sustainable choice for
                    modern construction projects.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Partners;
