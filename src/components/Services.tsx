/**
 * Services Section Component
 * Premium animated service cards
 */

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Globe, Smartphone, Palette, Server, Plug, Gauge,
  CheckCircle, ArrowRight, Layers
} from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Building robust, scalable web applications with clean architecture using React, Next.js, Node.js, and modern frameworks.',
    features: ['React & Next.js', 'RESTful APIs', 'Database Design', 'Authentication'],
    color: '#7c3aed',
    gradient: 'from-purple-600/20 to-purple-900/10',
    popular: true,
  },
  {
    icon: Smartphone,
    title: 'Responsive Design',
    description: 'Crafting pixel-perfect, mobile-first interfaces that look and work flawlessly on every device and screen size.',
    features: ['Mobile-First', 'Cross-browser', 'Fluid Layouts', 'Touch-friendly'],
    color: '#3b82f6',
    gradient: 'from-blue-600/20 to-blue-900/10',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Designing intuitive, user-centered interfaces with a focus on aesthetics, usability, and conversion optimization.',
    features: ['Figma Design', 'Prototyping', 'Design Systems', 'User Research'],
    color: '#ec4899',
    gradient: 'from-pink-600/20 to-pink-900/10',
  },
  {
    icon: Server,
    title: 'Backend Development',
    description: 'Architecting secure, high-performance server-side systems with Node.js, Express, and MongoDB for enterprise-grade applications.',
    features: ['Node.js & Express', 'MongoDB', 'JWT & OAuth', 'Microservices'],
    color: '#10b981',
    gradient: 'from-emerald-600/20 to-emerald-900/10',
  },
  {
    icon: Plug,
    title: 'API Integration',
    description: 'Seamlessly integrating third-party services, payment gateways, and external APIs to extend your application\'s capabilities.',
    features: ['REST & GraphQL', 'Payment APIs', 'Social OAuth', 'Webhooks'],
    color: '#f59e0b',
    gradient: 'from-amber-600/20 to-amber-900/10',
  },
  {
    icon: Gauge,
    title: 'Performance Optimization',
    description: 'Auditing and optimizing web applications for speed, Core Web Vitals, SEO, and exceptional user experience.',
    features: ['Lighthouse 100', 'Lazy Loading', 'Code Splitting', 'CDN Setup'],
    color: '#06b6d4',
    gradient: 'from-cyan-600/20 to-cyan-900/10',
  },
];

const pricingBadges = [
  { label: 'Basic Website', price: '$199', desc: 'Landing + Contact' },
  { label: 'Full Stack App', price: '$599', desc: 'Custom features' },
  { label: 'Monthly Retainer', price: '$299/mo', desc: 'Ongoing support' },
];

export default function Services() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="services" className="relative py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 dot-bg opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-700/5 rounded-full blur-[150px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-pink-500/20 text-pink-400 text-sm font-semibold mb-4">
            <Layers size={14} /> Services
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold font-poppins text-white mb-4">
            What I <span className="gradient-text">Bring to the Table</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            End-to-end digital solutions tailored to your unique needs — from concept to deployment.
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} inView={inView} />
          ))}
        </div>

        {/* Pricing Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="glass rounded-3xl border border-white/5 p-8"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-2xl font-bold text-white font-space mb-2">
                Starting Prices
              </h3>
              <p className="text-gray-400">Transparent pricing, no hidden fees. Custom quotes available.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 flex-1 justify-center lg:justify-end">
              {pricingBadges.map(badge => (
                <div key={badge.label} className="glass rounded-2xl p-4 text-center border border-white/8 min-w-[140px]">
                  <div className="text-2xl font-bold gradient-text font-space">{badge.price}</div>
                  <div className="text-white text-sm font-semibold mt-1">{badge.label}</div>
                  <div className="text-gray-500 text-xs">{badge.desc}</div>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-purple-500/20 transition-all whitespace-nowrap"
            >
              Get Custom Quote
              <ArrowRight size={16} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index, inView }: { service: typeof services[0]; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={`relative glass rounded-2xl p-6 border border-white/5 overflow-hidden group cursor-pointer`}
      style={{
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        el.style.borderColor = `${service.color}30`;
        el.style.boxShadow = `0 20px 50px ${service.color}15, 0 0 0 1px ${service.color}15`;
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.borderColor = 'rgba(255,255,255,0.05)';
        el.style.boxShadow = 'none';
      }}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Corner glow */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `${service.color}25` }}
      />

      {/* Popular badge */}
      {service.popular && (
        <div className="absolute top-4 right-4 px-2 py-1 rounded-lg bg-purple-500/20 text-purple-400 text-[10px] font-bold border border-purple-500/30">
          ⚡ Popular
        </div>
      )}

      <div className="relative z-10">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `${service.color}20`,
            border: `1px solid ${service.color}30`,
            boxShadow: `0 0 20px ${service.color}15`,
          }}
        >
          <service.icon size={22} style={{ color: service.color }} />
        </div>

        {/* Title */}
        <h3 className="text-white font-bold font-space text-lg mb-3 group-hover:text-purple-200 transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-5">
          {service.description}
        </p>

        {/* Features list */}
        <div className="space-y-2">
          {service.features.map(feature => (
            <div key={feature} className="flex items-center gap-2">
              <CheckCircle size={14} style={{ color: service.color }} className="flex-shrink-0" />
              <span className="text-gray-300 text-sm">{feature}</span>
            </div>
          ))}
        </div>

        {/* Learn more */}
        <div className="flex items-center gap-1 mt-5 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: service.color }}>
          Learn More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}
