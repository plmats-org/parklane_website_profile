'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
    Network,
    Shield,
    TrendingUp,
    Wallet,
    RefreshCw,
    Zap,
    Scale,
    Clock
} from 'lucide-react';

const Advantages = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const coreAdvantages = [
        {
            icon: Network,
            title: 'Living Supplier Network',
            description: 'Unlike traditional procurement relying on single suppliers, PLM operates a dynamic, multi-layered supplier network with pre-positioned alternatives.',
            benefits: [
                'No downtime in project execution',
                'Immediate replacement if supplier underperforms',
                'Multiple options for pricing comparison',
            ],
        },
        {
            icon: Shield,
            title: 'Risk Management',
            description: 'PLM does not wait for failure—we pre-position alternatives. If one supplier delays or fails, contracts and logistics adjust immediately.',
            benefits: [
                'Pre-qualified alternative suppliers',
                'Zero or minimal client disruption',
                'Critical for infrastructure & healthcare',
            ],
        },
        {
            icon: TrendingUp,
            title: 'Pricing Power Through Scale',
            description: 'By aggregating demand across multiple clients and maintaining suppliers per category, PLM delivers competitive pricing and flexible terms.',
            benefits: [
                'Better pricing through competition',
                'Volume-based discounts',
                'Flexible commercial terms',
            ],
        },
        {
            icon: Wallet,
            title: 'Financing as an Enabler',
            description: 'PLM removes capital bottlenecks by offering in-house pre-financing, bank-supported trade finance, and supplier-backed structured payments.',
            benefits: [
                'Projects start on time',
                'Suppliers are protected',
                'Clients not constrained by cash flow',
            ],
        },
    ];

    const quickStats = [
        { icon: RefreshCw, label: 'Supplier Backup', value: 'Always Ready' },
        { icon: Zap, label: 'Response Time', value: 'Immediate' },
        { icon: Scale, label: 'Price Advantage', value: 'Competitive' },
        { icon: Clock, label: 'Project Start', value: 'On Schedule' },
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
            id="advantages"
            ref={ref}
            className="relative py-24 lg:py-32 bg-black overflow-hidden"
        >
            {/* PLM Background Text */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <div className="text-[15rem] lg:text-[25rem] font-bold text-white/60 select-none">
                    PLM
                </div>
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(rgba(251, 191, 36, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 191, 36, 0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px',
                    }}
                />
            </div>

            <div className="container mx-auto px-6 sm:px-8 lg:px-16 max-w-6xl relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {/* Section Header */}
                    <motion.div variants={itemVariants} className="mb-16 lg:mb-20">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-600 font-semibold tracking-wider uppercase text-sm">
                                Our Unique Advantage
                            </span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                            The PLM{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-primary-500 to-primary-500">
                                Difference
                            </span>
                        </h2>
                        <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">
                            PLM's strength is not just sourcing—it is coordination, substitution, and continuity.
                            We are the risk manager in the middle, ensuring your projects never stop.
                        </p>
                    </motion.div>

                    {/* Core Advantages Grid */}
                    <motion.div
                        variants={containerVariants}
                        className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16"
                    >
                        {coreAdvantages.map((advantage, index) => {
                            return (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                    className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 hover:bg-slate-800/80 hover:border-primary-500/50 transition-all duration-500"
                                >
                                    {/* Gradient Glow on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-amber-500/0 to-primary-600/0 group-hover:from-primary-500/5 group-hover:via-amber-500/5 group-hover:to-primary-600/5 rounded-2xl transition-all duration-500" />

                                    <div className="relative z-10">

                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-400 group-hover:to-amber-500 transition-all duration-300">
                                            {advantage.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-slate-400 leading-relaxed mb-6">
                                            {advantage.description}
                                        </p>

                                        {/* Benefits */}
                                        <ul className="space-y-2">
                                            {advantage.benefits.map((benefit, idx) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <svg
                                                            className="w-3 h-3 text-primary-500"
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
                                                    <span className="text-slate-300 text-sm">{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Corner Accent */}
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Quick Stats Bar */}
                    <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                        {quickStats.map((stat, index) => {
                            const IconComponent = stat.icon;
                            return (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 p-4 bg-slate-800/30 border border-slate-700/30"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
                                        <IconComponent className="w-5 h-5 text-primary-500" />
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold text-sm">{stat.value}</div>
                                        <div className="text-slate-500 text-xs">{stat.label}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>

                    {/* Bottom CTA */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-16 text-center"
                    >
                        <p className="text-slate-400 text-lg mb-6">
                            Critical for infrastructure projects, healthcare supply chains, energy projects, and government contracts.
                        </p>
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-amber-600 hover:from-primary-600 hover:to-amber-700 text-white font-semibold rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                        >
                            <span>Partner With PLM</span>
                            <svg
                                className="w-5 h-5"
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
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Advantages;
