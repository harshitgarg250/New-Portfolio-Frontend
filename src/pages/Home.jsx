import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiGithub, FiLinkedin, FiTwitter, FiDownload, FiCode, FiLayers, FiZap } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import portfolioService from '../services/portfolio'

// Animated background orbs
const BackgroundOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-float" />
    <div className="absolute top-1/2 -right-20 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
    <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
  </div>
)

// Hero Section
const HeroSection = ({ profile }) => {
  const roles = ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Creative Thinker']
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <BackgroundOrbs />
      <div className="absolute inset-0 grid-pattern" />
      
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-slate-300 text-sm">Available for work</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            Hi, I'm{' '}
            <span className="gradient-text">{profile?.name || 'Developer'}</span>
          </motion.h1>

          {/* Animated Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-12 md:h-16 mb-8 overflow-hidden"
          >
            <motion.p
              key={roleIndex}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-4xl text-slate-400 font-light"
            >
              {roles[roleIndex]}
            </motion.p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            {profile?.bio || 'I craft beautiful digital experiences with modern technologies. Passionate about creating impactful solutions that make a difference.'}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link to="/projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center gap-2 group"
              >
                View My Work
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary flex items-center gap-2"
              >
                <FiDownload />
                Download CV
              </motion.button>
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-6"
          >
            {[
              { icon: FiGithub, url: 'https://github.com', label: 'GitHub' },
              { icon: FiLinkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
              { icon: FiTwitter, url: 'https://twitter.com', label: 'Twitter' },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                className="text-slate-500 hover:text-white transition-colors"
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-slate-600 flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-slate-400 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// Services Section
const ServicesSection = () => {
  const services = [
    {
      icon: FiCode,
      title: 'Web Development',
      description: 'Building responsive, performant web applications with modern frameworks and best practices.',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      icon: FiLayers,
      title: 'UI/UX Design',
      description: 'Creating intuitive and beautiful user interfaces that provide exceptional user experiences.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: FiZap,
      title: 'Performance',
      description: 'Optimizing applications for speed, accessibility, and search engine visibility.',
      color: 'from-orange-500 to-red-500',
    },
  ]

  return (
    <section className="section relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            What I <span className="gradient-text">Do</span>
          </h2>
          <p className="section-subtitle mx-auto">
            I specialize in building modern web applications with cutting-edge technologies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="card group"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-slate-400 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Featured Projects Section
const FeaturedProjectsSection = ({ projects }) => (
  <section className="section relative bg-slate-900/50">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
      >
        <div>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">Some of my best work that I'm proud of</p>
        </div>
        <Link to="/projects" className="btn-ghost flex items-center gap-2 mt-6 md:mt-0">
          View All Projects <FiArrowRight />
        </Link>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {(projects || []).slice(0, 4).map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={`/projects/${project.slug}`} className="group block">
              <div className="card overflow-hidden p-0">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image || `https://picsum.photos/seed/${project.id}/800/450`}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(project.technologies || []).slice(0, 3).map((tech) => (
                      <span key={tech} className="badge">{tech}</span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:gradient-text transition-all">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 line-clamp-2">{project.description}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {(!projects || projects.length === 0) && (
        <div className="text-center py-12">
          <p className="text-slate-500">No projects yet. Check back soon!</p>
        </div>
      )}
    </div>
  </section>
)

// Stats Section
const StatsSection = () => {
  const stats = [
    { number: '50+', label: 'Projects Completed' },
    { number: '30+', label: 'Happy Clients' },
    { number: '5+', label: 'Years Experience' },
    { number: '100%', label: 'Client Satisfaction' },
  ]

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg opacity-10" />
      <div className="container mx-auto px-6 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.number}</div>
              <div className="text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section
const CTASection = () => (
  <section className="section">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-3xl overflow-hidden"
      >
        <div className="absolute inset-0 gradient-bg opacity-90" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        
        <div className="relative px-8 py-20 md:px-16 md:py-24 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Let's Work Together
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Have a project in mind? I'd love to hear about it. Let's discuss how we can bring your ideas to life.
          </p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 rounded-xl font-semibold text-indigo-600 bg-white shadow-2xl hover:shadow-white/25 transition-all"
            >
              Start a Conversation
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
)

function Home() {
  const [profile, setProfile] = useState(null)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    portfolioService.getProfile().then(setProfile).catch(console.error)
    portfolioService.getProjects().then((res) => setProjects(res?.data || [])).catch(console.error)
  }, [])

  return (
    <main className="overflow-hidden">
      <HeroSection profile={profile} />
      <ServicesSection />
      <FeaturedProjectsSection projects={projects} />
      <StatsSection />
      <CTASection />
    </main>
  )
}

export default Home
