'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Globe, MapPin, Building2 } from 'lucide-react';

const SourcingModel = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const sourcingTiers = [
        {
            tier: '1',
            title: 'Local First',
            subtitle: 'Rwanda',
            icon: MapPin,
            description: 'PLM prioritizes Rwandan manufacturers, service providers, and local SMEs.',
            benefits: [
                'Full local content compliance',
                'Faster delivery times',
                'Lower logistics costs',
                'Job creation & capacity building',
                'Strong regulatory alignment',
            ],
            highlight: 'Local suppliers gain access to regional and international clients through PLM\'s network.',
            color: 'from-emerald-500 to-green-600',
            bgColor: 'bg-emerald-50',
            borderColor: 'border-emerald-200',
            iconBg: 'bg-emerald-100',
            iconColor: 'text-emerald-600',
        },
        {
            tier: '2',
            title: 'Regional Sourcing',
            subtitle: 'Africa',
            icon: Building2,
            description: 'When local capacity is limited, PLM expands to regional African suppliers.',
            benefits: [
                'East Africa (Kenya, Tanzania, Uganda)',
                'Southern Africa',
                'West and Central Africa',
                'Competitive regional pricing',
                'Shorter lead times than overseas',
            ],
            highlight: 'Strong African supplier partnerships increase supply resilience.',
            color: 'from-primary-500 to-amber-600',
            bgColor: 'bg-primary-50',
            borderColor: 'border-primary-200',
            iconBg: 'bg-primary-100',
            iconColor: 'text-primary-600',
        },
        {
            tier: '3',
            title: 'Global Sourcing',
            subtitle: 'International',
            icon: Globe,
            description: 'For specialized, high-volume, or cost-sensitive products, PLM activates its global network.',
            benefits: [
                'Asia & Europe',
                'Middle East & United States',
                'Advanced technology access',
                'High-capacity manufacturing',
                'Specialized niche products',
            ],
            highlight: 'Competitive global pricing with quality assurance.',
            color: 'from-blue-500 to-indigo-600',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600',
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
            id="sourcing"
            ref={ref}
            className="relative py-24 lg:py-32 bg-slate-50 overflow-hidden"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 1px, transparent 0)`,
                        backgroundSize: '40px 40px',
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
                    <motion.div variants={itemVariants} className="mb-16 text-center">
                        <div className="inline-flex items-center gap-3 mb-4 justify-center">
                            <div className="h-px w-12 bg-gradient-to-r from-primary-400 to-primary-600" />
                            <span className="text-primary-600 font-semibold tracking-wider uppercase text-sm">
                                Our Sourcing Approach
                            </span>
                            <div className="h-px w-12 bg-gradient-to-l from-primary-400 to-primary-600" />
                        </div>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.15] mb-6">
                            Africa-First{' '}
                            <span className="text-primary-500">Sourcing Model</span>
                        </h2>
                        <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            PLM follows a structured sourcing hierarchy that ensures local content compliance,
                            competitiveness, and reliability across all procurement needs.
                        </p>
                    </motion.div>

                    {/* Sourcing Tiers Grid */}
                    <motion.div
                        variants={containerVariants}
                        className="grid lg:grid-cols-3 gap-8"
                    >
                        {sourcingTiers.map((tier, index) => {
                            const IconComponent = tier.icon;
                            return (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                    className={`group relative ${tier.bgColor} ${tier.borderColor} border-2 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500`}
                                >
                                    {/* Tier Badge */}
                                    <div className={`absolute -top-4 left-8 px-4 py-1 bg-gradient-to-r ${tier.color} text-white text-sm font-bold rounded-full shadow-lg`}>
                                        Tier {tier.tier}
                                    </div>

                                    {/* Icon */}
                                    <div className={`w-14 h-14 rounded-xl ${tier.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <IconComponent className={`w-7 h-7 ${tier.iconColor}`} />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-bold text-slate-900 mb-1">
                                        {tier.title}
                                    </h3>
                                    <p className={`text-sm font-semibold ${tier.iconColor} mb-4`}>
                                        {tier.subtitle}
                                    </p>

                                    {/* Description */}
                                    <p className="text-slate-600 mb-6 leading-relaxed">
                                        {tier.description}
                                    </p>

                                    {/* Benefits List */}
                                    <ul className="space-y-2 mb-6">
                                        {tier.benefits.map((benefit, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <svg
                                                    className={`w-5 h-5 ${tier.iconColor} flex-shrink-0 mt-0.5`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                                <span className="text-slate-700 text-sm">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Highlight */}
                                    <div className={`p-4 rounded-lg bg-white/60 border ${tier.borderColor}`}>
                                        <p className="text-sm text-slate-600 italic">
                                            {tier.highlight}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Bottom Tagline */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-16 text-center"
                    >
                        <div className="inline-flex items-center gap-4 px-8 py-4 bg-white rounded-2xl shadow-lg border border-slate-200">
                            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                            <p className="text-slate-700 font-medium">
                                Local → Regional → Global: Structured sourcing for maximum value
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default SourcingModel;
