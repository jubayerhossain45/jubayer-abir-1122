/**
 * Contact Section Component
 * Real working contact form with validation and API integration
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, MessageSquare, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './Icons';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'jubayer123abir@gmail.com',
    href: 'mailto:jubayer123abir@gmail.com',
    color: '#7c3aed',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+880 1234-567890',
    href: 'tel:+8801234567890',
    color: '#3b82f6',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Dhaka, Bangladesh',
    href: 'https://maps.google.com/?q=Dhaka,Bangladesh',
    color: '#10b981',
  },
];

const socialLinks = [
  { Icon: GithubIcon, href: 'https://github.com', label: 'GitHub', color: '#f3f4f6' },
  { Icon: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn', color: '#3b82f6' },
  { Icon: TwitterIcon, href: 'https://twitter.com', label: 'Twitter', color: '#38bdf8' },
];

// Email validation
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Form validation
function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim() || data.name.trim().length < 2) errors.name = 'Name must be at least 2 characters';
  if (!validateEmail(data.email)) errors.email = 'Please enter a valid email address';
  if (!data.subject.trim() || data.subject.trim().length < 5) errors.subject = 'Subject must be at least 5 characters';
  if (!data.message.trim() || data.message.trim().length < 20) errors.message = 'Message must be at least 20 characters';
  return errors;
}

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const [form, setForm] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please fix the form errors before submitting.');
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      // Try sending to backend API first
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        signal: AbortSignal.timeout(8000),
      });

      if (response.ok) {
        setSubmitted(true);
        setForm({ name: '', email: '', subject: '', message: '' });
        toast.success('Message sent successfully! I\'ll get back to you within 24 hours. 🎉');
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Server error. Please try again.');
      }
    } catch (err: unknown) {
      // If backend not available, use mailto fallback
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      if (errorMsg.includes('fetch') || errorMsg.includes('NetworkError') || errorMsg.includes('timeout')) {
        // Fallback: open mailto
        const mailBody = `Name: ${form.name}\nEmail: ${form.email}\nSubject: ${form.subject}\n\nMessage:\n${form.message}`;
        window.location.href = `mailto:jubayer123abir@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(mailBody)}`;
        setSubmitted(true);
        toast.success('Opening your email client to send the message!');
      } else {
        toast.error(errorMsg || 'Something went wrong. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-bg opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-700/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-700/8 rounded-full blur-[100px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/20 text-purple-400 text-sm font-semibold mb-4">
            <MessageSquare size={14} /> Get In Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold font-poppins text-white mb-4">
            Let's Build Something <span className="gradient-text">Amazing Together</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Have a project in mind? I'm just one message away. Response guaranteed within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">

          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Info cards */}
            {contactInfo.map((info, i) => (
              <motion.a
                key={info.label}
                href={info.href}
                target={info.label === 'Location' ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 glass rounded-2xl p-5 border border-white/5 hover:border-purple-500/20 transition-all duration-300 group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${info.color}20`, border: `1px solid ${info.color}30` }}
                >
                  <info.icon size={20} style={{ color: info.color }} />
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-medium mb-0.5">{info.label}</p>
                  <p className="text-white font-semibold text-sm">{info.value}</p>
                </div>
              </motion.a>
            ))}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="glass rounded-2xl p-6 border border-white/5"
            >
              <p className="text-gray-400 text-sm font-medium mb-4">Follow Me Online</p>
              <div className="flex gap-3">
                {socialLinks.map(({ Icon, href, label, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-11 h-11 rounded-xl glass border border-white/8 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                    style={{ '--hover-color': color } as React.CSSProperties}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = `${color}40`;
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 15px ${color}20`;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    }}
                    aria-label={label}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="glass rounded-2xl p-6 border border-emerald-500/15 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-emerald-400 font-semibold text-sm">Currently Available</span>
                </div>
                <p className="text-gray-400 text-sm">
                  I'm open to freelance projects, full-time opportunities, and exciting collaborations.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-3xl p-8 border border-white/5 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/8 rounded-full blur-2xl" />

              {submitted ? (
                <SuccessState onReset={() => setSubmitted(false)} />
              ) : (
                <form onSubmit={handleSubmit} noValidate className="relative z-10 space-y-5">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white font-space mb-1">Send a Message</h3>
                    <p className="text-gray-500 text-sm">All fields are required. I'll respond within 24 hours.</p>
                  </div>

                  {/* Name + Email row */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <InputField
                      label="Full Name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      error={errors.name}
                    />
                    <InputField
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      error={errors.email}
                    />
                  </div>

                  {/* Subject */}
                  <InputField
                    label="Subject"
                    name="subject"
                    type="text"
                    placeholder="Web Development Project"
                    value={form.subject}
                    onChange={handleChange}
                    error={errors.subject}
                  />

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-gray-300 text-sm font-medium block">Message</label>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Tell me about your project, requirements, timeline, and budget..."
                      value={form.message}
                      onChange={handleChange}
                      className={`input-glass resize-none ${errors.message ? 'border-red-500/50 focus:border-red-500' : ''}`}
                    />
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-xs flex items-center gap-1"
                      >
                        <AlertCircle size={12} /> {errors.message}
                      </motion.p>
                    )}
                    <p className="text-gray-600 text-xs text-right">{form.message.length}/500</p>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={!submitting ? { scale: 1.02, y: -1 } : {}}
                    whileTap={!submitting ? { scale: 0.98 } : {}}
                    className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-base disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10 flex items-center gap-2">
                      {submitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Send Message
                        </>
                      )}
                    </span>
                  </motion.button>

                  <p className="text-center text-gray-600 text-xs">
                    🔒 Your data is secure. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Input field component
function InputField({
  label, name, type, placeholder, value, onChange, error
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-gray-300 text-sm font-medium block">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`input-glass ${error ? 'border-red-500/50' : ''}`}
        style={{ WebkitAppearance: 'none' }}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-xs flex items-center gap-1"
        >
          <AlertCircle size={12} /> {error}
        </motion.p>
      )}
    </div>
  );
}

// Success state component
function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-12 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-6"
      >
        <CheckCircle size={36} className="text-emerald-400" />
      </motion.div>
      <h3 className="text-2xl font-bold text-white font-space mb-3">Message Sent! 🎉</h3>
      <p className="text-gray-400 max-w-sm mb-6">
        Thank you for reaching out! I'll review your message and get back to you within 24 hours.
      </p>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onReset}
        className="px-6 py-3 rounded-xl glass border border-white/10 text-white font-semibold text-sm hover:border-purple-500/40 transition-all"
      >
        Send Another Message
      </motion.button>
    </motion.div>
  );
}
