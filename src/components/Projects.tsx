/**
 * Projects Section Component
 * Filterable project cards with glass UI, hover effects
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Code2, Filter } from 'lucide-react';
import { GithubIcon } from './Icons';

type Category = 'All' | 'Frontend' | 'Full Stack' | 'UI Design';

interface Project {
  id: number;
  title: string;
  description: string;
  category: Category;
  tech: string[];
  github: string;
  live: string;
  color: string;
  emoji: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'ShopNest E-Commerce',
    description: 'A full-featured e-commerce platform with real-time inventory, Stripe payments, admin dashboard, and JWT authentication. Handles 10k+ products.',
    category: 'Full Stack',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
    github: 'https://github.com',
    live: 'https://demo.com',
    color: '#7c3aed',
    emoji: '🛒',
    featured: true,
  },
  {
    id: 2,
    title: 'DevConnect Social Platform',
    description: 'A developer-focused social network with posts, follow system, real-time chat via Socket.io, and GitHub OAuth integration.',
    category: 'Full Stack',
    tech: ['React', 'Express', 'MongoDB', 'Socket.io', 'JWT'],
    github: 'https://github.com',
    live: 'https://demo.com',
    color: '#3b82f6',
    emoji: '💬',
    featured: true,
  },
  {
    id: 3,
    title: 'TaskFlow Project Manager',
    description: 'Trello-inspired drag-and-drop project management tool with team collaboration, deadlines, and Gantt chart visualization.',
    category: 'Full Stack',
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'DnD'],
    github: 'https://github.com',
    live: 'https://demo.com',
    color: '#06b6d4',
    emoji: '📋',
  },
  {
    id: 4,
    title: 'WeatherSense Dashboard',
    description: 'Beautiful weather dashboard with animated visualizations, 7-day forecast, geolocation, and dark/light mode. Powered by OpenWeather API.',
    category: 'Frontend',
    tech: ['React', 'Tailwind', 'Chart.js', 'OpenWeather API'],
    github: 'https://github.com',
    live: 'https://demo.com',
    color: '#f59e0b',
    emoji: '🌤️',
  },
  {
    id: 5,
    title: 'SaaSify Landing Page',
    description: 'High-converting SaaS landing page with Framer Motion animations, pricing tables, testimonials, and CTA optimization. 98% Lighthouse score.',
    category: 'UI Design',
    tech: ['React', 'Framer Motion', 'Tailwind', 'GSAP'],
    github: 'https://github.com',
    live: 'https://demo.com',
    color: '#ec4899',
    emoji: '🎨',
  },
  {
    id: 6,
    title: 'FinTrack Budget App',
    description: 'Personal finance tracker with expense categorization, AI-powered spending insights, monthly reports, and bank-level data encryption.',
    category: 'Full Stack',
    tech: ['React', 'Node.js', 'MongoDB', 'Chart.js', 'OpenAI'],
    github: 'https://github.com',
    live: 'https://demo.com',
    color: '#10b981',
    emoji: '💰',
  },
  {
    id: 7,
    title: 'Portfolio UI Kit',
    description: 'A premium Figma UI kit with 50+ components, dark/light themes, and handoff-ready design system for developer portfolios.',
    category: 'UI Design',
    tech: ['Figma', 'Design System', 'Prototyping', 'Auto Layout'],
    github: 'https://github.com',
    live: 'https://demo.com',
    color: '#a855f7',
    emoji: '🎭',
  },
  {
    id: 8,
    title: 'CryptoTracker Pro',
    description: 'Real-time cryptocurrency tracker with price alerts, portfolio management, and technical analysis charts. Supports 500+ coins.',
    category: 'Frontend',
    tech: ['React', 'TypeScript', 'CoinGecko API', 'Recharts'],
    github: 'https://github.com',
    live: 'https://demo.com',
    color: '#f97316',
    emoji: '₿',
  },
];

const categories: Category[] = ['All', 'Frontend', 'Full Stack', 'UI Design'];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-blue-700/8 rounded-full blur-[120px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/20 text-blue-400 text-sm font-semibold mb-4">
            <Code2 size={14} /> Featured Work
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold font-poppins text-white mb-4">
            Projects That <span className="gradient-text">Speak Volumes</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A curated selection of projects that showcase my expertise in full-stack development, UI design, and problem-solving.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-2 flex-wrap mb-12"
        >
          <Filter size={16} className="text-gray-500 mr-1" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20'
                  : 'glass border border-white/8 text-gray-400 hover:text-white hover:border-purple-500/30'
              }`}
            >
              {cat}
              <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-md ${
                activeCategory === cat ? 'bg-white/20' : 'bg-white/5'
              }`}>
                {cat === 'All' ? projects.length : projects.filter(p => p.category === cat).length}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} inView={inView} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass border border-white/10 text-white font-semibold hover:border-purple-500/40 hover:bg-white/5 transition-all duration-300"
          >
            <GithubIcon size={18} />
            View All on GitHub
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// Individual project card
function ProjectCard({ project, index, inView }: { project: Project; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group glass rounded-2xl border border-white/5 overflow-hidden hover:border-purple-500/25 transition-all duration-400 card-hover relative"
      style={{
        boxShadow: hovered ? `0 20px 60px ${project.color}20, 0 0 0 1px ${project.color}20` : 'none',
      }}
    >
      {/* Project color header */}
      <div
        className="relative h-40 flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${project.color}20, ${project.color}08)` }}
      >
        {/* Animated bg */}
        <motion.div
          className="absolute inset-0"
          style={{ background: `radial-gradient(circle at 50% 50%, ${project.color}25, transparent 70%)` }}
          animate={hovered ? { scale: 1.2 } : { scale: 1 }}
          transition={{ duration: 0.4 }}
        />

        {/* Emoji icon */}
        <motion.div
          className="relative z-10 text-5xl"
          animate={hovered ? { scale: 1.15, rotate: 5 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          {project.emoji}
        </motion.div>

        {/* Category badge */}
        <div
          className="absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-bold"
          style={{ background: `${project.color}25`, color: project.color, border: `1px solid ${project.color}30` }}
        >
          {project.category}
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
            ⭐ Featured
          </div>
        )}

        {/* Hover overlay with links */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center gap-3 z-20"
          initial={{ opacity: 0 }}
          animate={hovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ background: `${project.color}15`, backdropFilter: 'blur(4px)' }}
        >
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-all border border-white/15"
            onClick={e => e.stopPropagation()}
          >
            <GithubIcon size={14} /> Code
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-white border border-white/15 hover:bg-white/20"
            style={{ background: `${project.color}30` }}
            onClick={e => e.stopPropagation()}
          >
            <ExternalLink size={14} /> Live Demo
          </a>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-white font-bold font-space text-base mb-2 group-hover:text-purple-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map(t => (
            <span
              key={t}
              className="text-[10px] font-semibold px-2 py-1 rounded-lg bg-white/5 border border-white/8 text-gray-400"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="text-[10px] font-semibold px-2 py-1 rounded-lg bg-white/5 border border-white/8 text-gray-500">
              +{project.tech.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
