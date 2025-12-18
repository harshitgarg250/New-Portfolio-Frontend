import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiGithub, FiLinkedin, FiTwitter, FiBookOpen, FiServer, FiUpload } from 'react-icons/fi'
import { useEffect, useState } from 'react'

// Animated background orbs
const BackgroundOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-float" />
    <div className="absolute top-1/2 -right-20 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
    <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
  </div>
)

// Hero Section for CMS platform
const HeroSection = () => {
  const appName = import.meta.env.VITE_APP_NAME || 'Portfolio CMS'
  const adminUrl = import.meta.env.VITE_ADMIN_URL || 'http://localhost:5174'

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <BackgroundOrbs />
      <div className="absolute inset-0 grid-pattern" />

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            {appName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-slate-400 mb-8"
          >
            A lightweight, custom-built CMS platform — API, admin panel, and media management in one place. Manage content for multiple portfolios, projects, blogs and more.
          </motion.p>

          <motion.div className="flex items-center justify-center gap-4">
            <a href={adminUrl} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2">
              Open Admin
              <FiArrowRight />
            </a>
            <Link to="/projects" className="btn-secondary flex items-center gap-2">
              View Demo Site
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Platform Features Section
const ServicesSection = () => {
  const features = [
    { icon: FiServer, title: 'API-first', desc: 'Fully-featured REST API for content models and auth.' },
    { icon: FiBookOpen, title: 'Admin UI', desc: 'React-based admin panel for CRUD, media uploads and dashboards.' },
    { icon: FiUpload, title: 'Media & Uploads', desc: 'Built-in media upload endpoints and admin media manager.' },
  ]

  return (
    <section className="section relative">
      <div className="container mx-auto px-6">
        <motion.div className="text-center mb-12">
          <h2 className="section-title">Platform Features</h2>
          <p className="section-subtitle mx-auto">A compact CMS platform for managing portfolio sites, projects, blogs, and media.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="p-6 bg-slate-800 rounded-lg">
              <div className="w-12 h-12 flex items-center justify-center bg-primary-600 rounded mb-4">
                <f.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-slate-400">{f.desc}</p>
            </div>
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
