/**
 * Footer Component
 * Professional footer with links, socials, and copyright
 */

import { motion } from 'framer-motion';
import { Heart, Code2, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './Icons';

const footerLinks = {
  Navigation: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ],
  Services: [
    { label: 'Web Development', href: '#services' },
    { label: 'UI/UX Design', href: '#services' },
    { label: 'Backend Dev', href: '#services' },
    { label: 'API Integration', href: '#services' },
    { label: 'Consulting', href: '#contact' },
  ],
  Connect: [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Twitter/X', href: 'https://twitter.com' },
    { label: 'Email Me', href: 'mailto:jubayer123abir@gmail.com' },
    { label: 'Fiverr', href: 'https://fiverr.com' },
  ],
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative border-t border-white/5 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#05050a] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">

          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <Code2 size={18} className="text-white" />
              </div>
              <div>
                <span className="font-space font-bold text-lg text-white">Jubayer Hossain</span>
                <p className="text-[10px] text-purple-400 font-medium tracking-widest uppercase">Full Stack Developer</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
              Building premium web experiences with clean code, modern design, and a passion for excellence.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { Icon: GithubIcon, href: 'https://github.com', label: 'GitHub' },
                { Icon: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
                { Icon: TwitterIcon, href: 'https://twitter.com', label: 'Twitter' },
              ].map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 rounded-xl glass border border-white/8 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/30 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-bold text-sm font-space mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-gray-500 hover:text-purple-400 text-sm transition-colors duration-200 text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm flex items-center gap-1.5">
            © {new Date().getFullYear()} Jubayer Hossain. Made with{' '}
            <Heart size={13} className="text-red-500 inline" fill="currentColor" /> and{' '}
            <Code2 size={13} className="text-purple-500 inline" />
          </p>

          <div className="flex items-center gap-6">
            <span className="text-gray-600 text-xs">Privacy Policy</span>
            <span className="text-gray-600 text-xs">Terms of Service</span>
          </div>

          {/* Back to top */}
          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl glass border border-white/8 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/30 transition-all duration-300"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
