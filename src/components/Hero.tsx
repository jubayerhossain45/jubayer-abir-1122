/**
 * Hero Section Component
 * Premium hero with typing animation, floating icons, glow effects
 */

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Download, ArrowRight, ExternalLink, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './Icons';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

const floatingIcons = [
  { icon: '⚛️', label: 'React', x: '8%', y: '20%', delay: 0 },
  { icon: '🟩', label: 'Node.js', x: '88%', y: '15%', delay: 0.5 },
  { icon: '🍃', label: 'MongoDB', x: '92%', y: '65%', delay: 1.0 },
  { icon: '🐳', label: 'Docker', x: '5%', y: '72%', delay: 1.5 },
  { icon: '▲', label: 'Vercel', x: '50%', y: '5%', delay: 0.3 },
  { icon: '💙', label: 'TypeScript', x: '15%', y: '50%', delay: 0.8 },
  { icon: '🎨', label: 'Figma', x: '82%', y: '38%', delay: 1.2 },
];

const stats = [
  { value: '2+', label: 'Years Exp.' },
  { value: '30+', label: 'Projects Done' },
  { value: '20+', label: 'Happy Clients' },
  { value: '100%', label: 'Satisfaction' },
];

export default function Hero() {
  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-700/15 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/12 rounded-full blur-[100px] animate-blob-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-600/8 rounded-full blur-[80px] animate-blob-slow" />
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#0a0a0f] pointer-events-none" />

      {/* Floating tech icons */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute hidden md:flex flex-col items-center gap-1 pointer-events-none select-none z-10"
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { delay: item.delay + 1, duration: 0.5 },
            scale: { delay: item.delay + 1, duration: 0.5 },
            y: { delay: item.delay + 1.5, repeat: Infinity, duration: 4 + item.delay, ease: 'easeInOut' },
          }}
        >
          <div className="w-12 h-12 rounded-2xl glass border border-white/8 flex items-center justify-center text-2xl shadow-lg">
            {item.icon}
          </div>
          <span className="text-[10px] text-gray-500 font-medium">{item.label}</span>
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-10 px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left: Text */}
          <div className="flex-1 text-center lg:text-left">

            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/20 mb-6"
            >
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-300">Available for Freelance</span>
              <span className="text-xs text-purple-400 font-semibold">→ Open to Work</span>
            </motion.div>

            {/* Name heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-poppins font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] mb-4"
            >
              <span className="text-white">Hi, I'm</span>
              <br />
              <span className="gradient-text">Jubayer</span>
              <br />
              <span className="text-white">Hossain</span>
            </motion.h1>

            {/* Typing animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-2 justify-center lg:justify-start mb-6 h-12"
            >
              <span className="text-gray-400 text-xl sm:text-2xl font-medium">I'm a</span>
              <span className="text-purple-400 text-xl sm:text-2xl font-bold font-space">
                <TypeAnimation
                  sequence={[
                    'Full Stack Developer',
                    2000,
                    'MERN Stack Engineer',
                    2000,
                    'UI/UX Designer',
                    2000,
                    'Creative Frontend Dev',
                    2000,
                    'React Specialist',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </span>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Crafting{' '}
              <span className="text-purple-400 font-semibold">pixel-perfect</span>,
              high-performance web applications with modern technologies.
              Transforming ideas into{' '}
              <span className="text-blue-400 font-semibold">stunning digital experiences</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
            >
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleScroll('contact')}
                className="relative flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-base overflow-hidden group hover:shadow-xl hover:shadow-purple-500/30 transition-shadow"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Hire Me
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleScroll('projects')}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass border border-white/10 text-white font-semibold text-base hover:border-purple-500/40 hover:bg-white/8 transition-all duration-300"
              >
                <ExternalLink size={18} />
                View Projects
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="#"
                download
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass border border-white/10 text-white font-semibold text-base hover:border-emerald-500/40 hover:bg-white/8 transition-all duration-300"
              >
                <Download size={18} />
                Download CV
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-4 justify-center lg:justify-start"
            >
              <span className="text-gray-500 text-sm">Connect:</span>
              {[
                { icon: <GithubIcon size={16} />, href: 'https://github.com/jubayerhossain45', label: 'GitHub' },
                { icon: <LinkedinIcon size={16} />, href: 'www.linkedin.com/in/', label: 'LinkedIn' },
                { icon: <TwitterIcon size={16} />, href: 'https://twitter.com', label: 'Twitter' },
                { icon: <Mail size={16} />, href: 'https://mail.google.com/mail/u/0/#inbox?compose=new', label: 'Email' },
              ].map(({ icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl glass border border-white/8 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/40 transition-all duration-300"
                  aria-label={label}
                >
                  {icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right: Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="flex-shrink-0"
          >
            <AvatarSection />
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              className="glass rounded-2xl p-6 text-center border border-white/5 hover:border-purple-500/20 transition-all duration-300"
            >
              <div className="text-3xl font-bold font-space gradient-text mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-gray-500 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 rounded-full border border-gray-600 flex items-start justify-center pt-1.5"
        >
          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Avatar with animated rings
function AvatarSection() {
  return (
    <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
      {/* Spinning outer ring */}
      <div className="absolute inset-0 rounded-full border border-dashed border-purple-500/20 animate-spin-slow" />

      {/* Glowing rings */}
      <div className="absolute inset-4 rounded-full border border-purple-500/15" />
      <div className="absolute inset-8 rounded-full border border-blue-500/10" />

      {/* Background glow blob */}
      <div className="absolute inset-8 rounded-full bg-gradient-to-br from-purple-700/30 to-blue-600/20 blur-xl animate-blob" />

      {/* Main avatar */}
      <div className="absolute inset-10 rounded-full overflow-hidden border-2 border-purple-500/30 bg-gradient-to-br from-[#1a1025] to-[#0d1a2e] flex items-center justify-center glow-purple">
        <img src="/Gemini_Generated_Image_oupsv7oupsv7oups.png" alt="" />
      </div>

      {/* Floating badges */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute top-4 right-0 glass rounded-xl px-3 py-1.5 border border-emerald-500/20 z-20"
      >
        <span className="text-emerald-400 text-xs font-bold">✓ Open to Work</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 4, delay: 1 }}
        className="absolute bottom-8 -left-4 glass rounded-xl px-3 py-1.5 border border-blue-500/20 z-20"
      >
        <span className="text-blue-400 text-xs font-bold">🚀 MERN Stack</span>
      </motion.div>
    </div>
  );
}

function DevAvatarSVG() {
  return (
    <svg viewBox="0 0 200 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a0533" />
          <stop offset="100%" stopColor="#0a1628" />
        </linearGradient>
        <linearGradient id="skinG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4956a" />
          <stop offset="100%" stopColor="#b8733e" />
        </linearGradient>
        <linearGradient id="shirtG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <radialGradient id="glowG" cx="50%" cy="80%" r="60%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="200" height="220" fill="url(#bgG)" />
      <ellipse cx="100" cy="220" rx="80" ry="30" fill="url(#glowG)" />
      {/* Body */}
      <ellipse cx="100" cy="200" rx="58" ry="45" fill="url(#shirtG)" />
      {/* Neck */}
      <rect x="87" y="125" width="26" height="24" rx="5" fill="url(#skinG)" />
      {/* Head */}
      <ellipse cx="100" cy="104" rx="40" ry="42" fill="url(#skinG)" />
      {/* Hair */}
      <ellipse cx="100" cy="70" rx="40" ry="22" fill="#150824" />
      <rect x="60" y="70" width="80" height="18" fill="#150824" />
      {/* Ear */}
      <ellipse cx="61" cy="105" rx="7" ry="9" fill="#c4824d" />
      <ellipse cx="139" cy="105" rx="7" ry="9" fill="#c4824d" />
      {/* Glasses frame */}
      <rect x="74" y="97" width="20" height="16" rx="5" fill="none" stroke="#a78bfa" strokeWidth="2.5" />
      <rect x="106" y="97" width="20" height="16" rx="5" fill="none" stroke="#a78bfa" strokeWidth="2.5" />
      <line x1="94" y1="105" x2="106" y2="105" stroke="#a78bfa" strokeWidth="2" />
      <line x1="69" y1="105" x2="74" y2="105" stroke="#a78bfa" strokeWidth="2" />
      <line x1="126" y1="105" x2="131" y2="105" stroke="#a78bfa" strokeWidth="2" />
      {/* Eyes */}
      <ellipse cx="84" cy="105" rx="4" ry="5" fill="#0f0a1a" />
      <ellipse cx="116" cy="105" rx="4" ry="5" fill="#0f0a1a" />
      <circle cx="85.5" cy="103.5" r="1.5" fill="white" />
      <circle cx="117.5" cy="103.5" r="1.5" fill="white" />
      {/* Nose */}
      <path d="M97 113 Q100 117 103 113" stroke="#a06535" strokeWidth="1.5" fill="none" />
      {/* Smile */}
      <path d="M88 122 Q100 130 112 122" stroke="#7a4520" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Code text on shirt */}
      <text x="100" y="200" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11" fontFamily="monospace" fontWeight="bold">&lt;/DEV&gt;</text>
    </svg>
  );
}
