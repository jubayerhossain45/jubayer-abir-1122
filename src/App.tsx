/**
 * Main App Component
 * Jubayer Hossain Portfolio — Premium Full Stack Developer Portfolio
 *
 * Tech Stack: React + Vite + Tailwind CSS + Framer Motion
 * Features: Dark/Light mode, animations, contact form, responsive
 */

import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import BackToTop from './components/BackToTop';

type Theme = 'dark' | 'light';

export default function App() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isLoading, setIsLoading] = useState(true);

  // Initialize theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle('light', saved === 'light');
    }
  }, []);

  // Simulate loading screen (1.8s)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen isLoading={isLoading} />

      {/* Main App (only show after loading) */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`min-h-screen ${theme === 'light' ? 'light-mode' : ''}`}
          >
            {/* Toast Notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'rgba(15, 15, 20, 0.95)',
                  color: '#fff',
                  border: '1px solid rgba(124, 58, 237, 0.3)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(20px)',
                  fontSize: '14px',
                  fontFamily: 'Inter, sans-serif',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
                  padding: '14px 18px',
                },
                success: {
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />

            {/* Sticky Navbar */}
            <Navbar theme={theme} toggleTheme={toggleTheme} />

            {/* Main Sections */}
            <main>
              <Hero />
              <About />
              <Projects />
              <Services />
              <Contact />
            </main>

            {/* Footer */}
            <Footer />

            {/* Back to Top Button */}
            <BackToTop />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
