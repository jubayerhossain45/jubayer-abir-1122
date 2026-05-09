/**
 * About Section Component
 * Bio, timeline, stats, achievements
 */

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Briefcase, Award, Code2, Heart, Coffee, Zap, Star } from 'lucide-react';

const skills = [
  { name: 'HTML5 & CSS3', level: 95, color: '#f97316' },
  { name: 'Tailwind CSS', level: 92, color: '#06b6d4' },
  { name: 'JavaScript', level: 90, color: '#eab308' },
  { name: 'React.js', level: 88, color: '#61dafb' },
  { name: 'Node.js', level: 82, color: '#84cc16' },
  { name: 'Express.js', level: 80, color: '#94a3b8' },
  { name: 'MongoDB', level: 78, color: '#22c55e' },
  { name: 'TypeScript', level: 75, color: '#3b82f6' },
  { name: 'Git / GitHub', level: 88, color: '#f472b6' },
];

const timeline = [
  {
    type: 'work',
    icon: Briefcase,
    title: 'Junior Full Stack Developer',
    org: 'Tech Startup BD',
    period: '2023 – Present',
    desc: 'Building scalable MERN stack applications, RESTful APIs, and responsive UIs for clients across industries.',
    color: '#7c3aed',
  },
  {
    type: 'work',
    icon: Code2,
    title: 'Frontend Developer (Freelance)',
    org: 'Fiverr & Upwork',
    period: '2022 – 2023',
    desc: 'Delivered 20+ projects including e-commerce stores, portfolios, and SaaS dashboards for international clients.',
    color: '#3b82f6',
  },
  {
    type: 'edu',
    icon: GraduationCap,
    title: 'B.Sc. in Computer Science',
    org: 'BUET – Bangladesh',
    period: '2020 – 2024',
    desc: 'Focused on algorithms, data structures, software engineering, and web technologies.',
    color: '#06b6d4',
  },
  {
    type: 'edu',
    icon: Award,
    title: 'Diploma Certificate',
    org: 'Bangladeh sweden polytechnic institute',
    period: '2018 – 2020',
    desc: 'Science stream with distinction. Active participant in programming clubs and hackathons.',
    color: '#f59e0b',
  },
];

const achievements = [
  { icon: Star, label: '5-Star Freelancer', desc: 'Rated by 20+ clients', color: '#f59e0b' },
  { icon: Zap, label: 'Hackathon Winner', desc: '2 national competitions', color: '#7c3aed' },
  { icon: Heart, label: 'Open Source', desc: '1000+ contributions', color: '#ef4444' },
  { icon: Coffee, label: '1000+ Commits', desc: 'Consistent coder', color: '#06b6d4' },
];

function SkillBar({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.08 }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <span className="text-gray-200 font-medium text-sm">{skill.name}</span>
        <span className="text-gray-400 text-sm font-semibold" style={{ color: skill.color }}>{skill.level}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.2, delay: index * 0.08 + 0.3, ease: 'easeOut' }}
          className="h-full rounded-full relative"
          style={{ background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 border-[#0a0a0f]"
            style={{ background: skill.color, boxShadow: `0 0 8px ${skill.color}` }} />
        </motion.div>
      </div>
    </motion.div>
  );
}

function containerVariants(delay = 0) {
  return {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
  };
}

export default function About() {
  const { ref: sectionRef, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-bg opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-700/8 rounded-full blur-[100px] pointer-events-none" />

      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          variants={containerVariants()}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/20 text-purple-400 text-sm font-semibold mb-4">
            <Code2 size={14} /> About Me
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold font-poppins text-white mb-4">
            The Developer <span className="gradient-text">Behind the Code</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Passionate about building elegant solutions to complex problems. Every line of code is a step toward a better digital world.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">

          {/* Bio Card */}
          <motion.div
            variants={containerVariants(0.2)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            <div className="glass rounded-3xl p-8 border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/10 rounded-full blur-2xl" />

              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <Code2 size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-space">Jubayer Hossain</h3>
                  <p className="text-purple-400 text-sm font-medium">Full Stack Developer & Designer</p>
                </div>
              </div>

              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  I'm a passionate <span className="text-purple-400 font-semibold">Full Stack Developer</span> from Bangladesh
                  with 2+ years of experience crafting high-performance, scalable web applications using the MERN stack.
                </p>
                <p>
                  My journey started with curiosity about how websites work, which evolved into a deep passion for
                  <span className="text-blue-400 font-semibold"> clean code</span>,{' '}
                  <span className="text-cyan-400 font-semibold">great UX</span>, and{' '}
                  <span className="text-emerald-400 font-semibold">performance optimization</span>.
                </p>
                <p>
                  I specialize in <span className="text-purple-400 font-semibold">React</span>,{' '}
                  <span className="text-green-400 font-semibold">Node.js</span>,{' '}
                  <span className="text-yellow-400 font-semibold">MongoDB</span>, and modern CSS frameworks.
                  I believe great software is born from the intersection of logic and creativity.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {['📍 Dhaka, Bangladesh', '🎂 22 Years Old', '🌐 Remote Ready', '⏰ GMT+6'].map(tag => (
                  <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-gray-300 text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((ach, i) => (
                <motion.div
                  key={ach.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="glass rounded-2xl p-4 border border-white/5 hover:border-purple-500/20 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `${ach.color}20`, border: `1px solid ${ach.color}30` }}>
                    <ach.icon size={18} style={{ color: ach.color }} />
                  </div>
                  <p className="text-white font-semibold text-sm">{ach.label}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{ach.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            variants={containerVariants(0.3)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="glass rounded-3xl p-8 border border-white/5 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl" />
            <h3 className="text-xl font-bold text-white font-space mb-2">Technical Skills</h3>
            <p className="text-gray-500 text-sm mb-8">Technologies I work with daily</p>
            <div className="space-y-5">
              {skills.map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants(0.1)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <h3 className="text-2xl font-bold text-white font-space text-center mb-12">
            My <span className="gradient-text">Journey</span>
          </h3>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 -translate-x-0.5 top-0 bottom-0 w-px bg-gradient-to-b from-purple-600/50 via-blue-500/30 to-transparent hidden md:block" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.15 }}
                  className={`flex items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Card */}
                  <div className="flex-1 glass rounded-2xl p-6 border border-white/5 hover:border-purple-500/20 transition-all duration-300 card-hover">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${item.color}20`, border: `1px solid ${item.color}30` }}>
                        <item.icon size={18} style={{ color: item.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                          <h4 className="text-white font-bold font-space text-base">{item.title}</h4>
                          <span className="text-xs font-semibold px-2 py-1 rounded-lg"
                            style={{ background: `${item.color}15`, color: item.color }}>
                            {item.period}
                          </span>
                        </div>
                        <p className="text-purple-400 text-sm font-medium mb-2">{item.org}</p>
                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex w-10 h-10 rounded-full flex-shrink-0 border-2 items-center justify-center z-10"
                    style={{ background: `${item.color}20`, borderColor: `${item.color}60`, boxShadow: `0 0 20px ${item.color}40` }}>
                    <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                  </div>

                  {/* Spacer for alternating */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
