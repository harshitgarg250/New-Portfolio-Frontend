import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink, FiFilter, FiSearch } from 'react-icons/fi'
import portfolioService from '../services/portfolio'

const categories = ['All', 'Web App', 'Mobile', 'UI/UX', 'API', 'Other']

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  useEffect(() => {
    portfolioService.getProjects()
      .then((res) => setProjects(res?.data || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filteredProjects = projects.filter((project) => {
    const matchesFilter = filter === 'All' || project.category === filter
    const matchesSearch = project.title?.toLowerCase().includes(search.toLowerCase()) ||
      project.description?.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  // Sample projects if none exist
  const displayProjects = filteredProjects.length > 0 ? filteredProjects : [
    { id: 1, slug: 'project-1', title: 'E-Commerce Platform', description: 'A full-featured e-commerce solution with React and Node.js', category: 'Web App', image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800', technologies: ['React', 'Node.js', 'PostgreSQL'], github_url: '#', live_url: '#' },
    { id: 2, slug: 'project-2', title: 'Task Management App', description: 'Collaborative task management with real-time updates', category: 'Web App', image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800', technologies: ['Next.js', 'Prisma', 'WebSocket'], github_url: '#', live_url: '#' },
    { id: 3, slug: 'project-3', title: 'Finance Dashboard', description: 'Analytics dashboard for financial data visualization', category: 'UI/UX', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', technologies: ['React', 'D3.js', 'Tailwind'], github_url: '#', live_url: '#' },
    { id: 4, slug: 'project-4', title: 'Social Media API', description: 'RESTful API for social media platform', category: 'API', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800', technologies: ['FastAPI', 'PostgreSQL', 'Redis'], github_url: '#', live_url: '#' },
    { id: 5, slug: 'project-5', title: 'Fitness Tracker', description: 'Mobile-first fitness tracking application', category: 'Mobile', image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800', technologies: ['React Native', 'Firebase', 'Redux'], github_url: '#', live_url: '#' },
    { id: 6, slug: 'project-6', title: 'Weather App', description: 'Beautiful weather application with location support', category: 'Web App', image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800', technologies: ['Vue.js', 'OpenWeather API', 'CSS'], github_url: '#', live_url: '#' },
  ]

  return (
    <main>
      {/* Header */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="badge mb-6">Portfolio</div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              My <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              A collection of projects I've worked on. From web applications to APIs,
              each project represents a unique challenge and learning experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-y border-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              <FiFilter className="text-slate-500 flex-shrink-0" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    filter === category
                      ? 'bg-indigo-500 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input pl-12 py-3 w-full md:w-64"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="card animate-pulse">
                  <div className="aspect-video bg-slate-700 rounded-xl mb-4" />
                  <div className="h-4 bg-slate-700 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-slate-700 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={filter + search}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {displayProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    layout
                  >
                    <div className="card group overflow-hidden p-0 h-full flex flex-col">
                      {/* Image */}
                      <Link to={`/projects/${project.slug}`} className="relative aspect-video overflow-hidden">
                        <img
                          src={project.image || `https://picsum.photos/seed/${project.id}/800/450`}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        {/* Overlay Links */}
                        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all">
                          {project.github_url && (
                            <motion.a
                              href={project.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1 }}
                              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <FiGithub className="w-5 h-5" />
                            </motion.a>
                          )}
                          {project.live_url && (
                            <motion.a
                              href={project.live_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1 }}
                              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <FiExternalLink className="w-5 h-5" />
                            </motion.a>
                          )}
                        </div>
                      </Link>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        {/* Category */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.category && (
                            <span className="badge">{project.category}</span>
                          )}
                        </div>

                        {/* Title */}
                        <Link to={`/projects/${project.slug}`}>
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:gradient-text transition-all">
                            {project.title}
                          </h3>
                        </Link>

                        {/* Description */}
                        <p className="text-slate-400 text-sm line-clamp-2 mb-4 flex-1">
                          {project.description}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2">
                          {(project.technologies || []).slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="text-xs px-2 py-1 rounded bg-slate-700/50 text-slate-400"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {!loading && displayProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">No projects found</h3>
              <p className="text-slate-400">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  )
}

export default Projects
