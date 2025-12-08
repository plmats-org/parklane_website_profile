'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const contactInfo = [
    {
      icon: '📧',
      label: 'Email',
      value: 'info@plmats.com',
      href: 'mailto:info@plmats.com',
    },
    {
      icon: '🌐',
      label: 'Website',
      value: 'www.plmats.com',
      href: 'https://www.plmats.com',
    },
    {
      icon: '📍',
      label: 'Location',
      value: 'Kigali, Rwanda',
      href: null,
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
      });
      
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 2000);
  };

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
      id="contact"
      ref={ref}
      className="relative py-20 lg:py-28 bg-white overflow-hidden"
    >
      {/* Background Pattern */}
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
                Get in Touch
              </span>
            </div>
            <div className="grid lg:grid-cols-2 gap-8 items-end">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Ready to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600">
                  Streamline
                </span>
                <br />
                Your Procurement?
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Let's discuss how Parklane Materials can optimize your supply chain and deliver exceptional value to your projects worldwide.
              </p>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Information */}
            <motion.div variants={itemVariants}>
              <div className="bg-gradient-to-br from-dark-900 to-primary-900  p-8 lg:p-12 text-white h-full relative overflow-hidden shadow-2xl">
                {/* Background Pattern */}
                {/* <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }} />
                </div> */}

                {/* Animated Glow */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.15, 0.25, 0.15],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-r from-dark-500 to-primary-300 rounded-full blur-3xl"
                />

                <div className="relative z-10">
                  <h3 className="text-3xl lg:text-4xl font-bold mb-4">Let's Connect</h3>
                  <p className="text-slate-300 mb-10 leading-relaxed text-lg">
                    Have questions about our services or need a custom quote? Our team is ready to help you find the perfect procurement solutions.
                  </p>

                  {/* Contact Details */}
                  <div className="space-y-6 mb-12">
                    {contactInfo.map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-start gap-4 group"
                      >
                        <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-2xl group-hover:bg-gradient-to-r group-hover:from-primary-500 group-hover:to-primary-600 transition-all duration-300">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-slate-400 mb-1 font-medium">
                            {item.label}
                          </div>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="text-white text-lg font-semibold hover:text-primary-400 transition-colors duration-300"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <div className="text-white text-lg font-semibold">
                              {item.value}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Business Hours */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <span>🕐</span>
                      <span>Business Hours</span>
                    </h4>
                    <div className="space-y-2 text-slate-300">
                      <p className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span className="font-semibold">8:00 AM - 6:00 PM</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Saturday</span>
                        <span className="font-semibold">9:00 AM - 1:00 PM</span>
                      </p>
                      <div className="pt-3 mt-3 border-t border-white/10">
                        <p className="text-primary-400 font-semibold text-sm flex items-center gap-2">
                          <span>⚡</span>
                          <span>24/7 Emergency Support Available</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-slate-900 mb-2"
                  >
                    Full Name <span className="text-primary-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-primary-500 focus:outline-none transition-all duration-300 text-slate-900 placeholder:text-slate-400"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-slate-900 mb-2"
                  >
                    Email Address <span className="text-primary-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-primary-500 focus:outline-none transition-all duration-300 text-slate-900 placeholder:text-slate-400"
                    placeholder="john@company.com"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-semibold text-slate-900 mb-2"
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-primary-500 focus:outline-none transition-all duration-300 text-slate-900 placeholder:text-slate-400"
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-slate-900 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-primary-500 focus:outline-none transition-all duration-300 text-slate-900 placeholder:text-slate-400"
                      placeholder="+250 XXX XXX XXX"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-slate-900 mb-2"
                  >
                    Message <span className="text-primary-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-primary-500 focus:outline-none transition-all duration-300 resize-none text-slate-900 placeholder:text-slate-400"
                    placeholder="Tell us about your project requirements..."
                  />
                </div>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 border-2 border-green-500 text-green-800 px-5 py-4 rounded-xl flex items-center gap-3"
                  >
                    <span className="text-2xl">✓</span>
                    <span className="font-semibold">Thank you! Your message has been sent successfully.</span>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-5 bg-gradient-to-r from-primary-400 to-primary-400 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </motion.button>

                <p className="text-sm text-slate-500 text-center leading-relaxed">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}