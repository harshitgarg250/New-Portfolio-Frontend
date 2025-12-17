import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiGithub, FiExternalLink, FiCalendar, FiTag, FiCheck } from 'react-icons/fi'
import portfolioService from '../services/portfolio'

function ProjectDetail() {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    portfolioService.getProject(slug)
      .then(setProject)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [slug])

  // Sample project data
  const displayProject = project || {
    id: 1,
    title: 'E-Commerce Platform',
    slug: 'e-commerce-platform',
    description: 'A full-featured e-commerce solution with modern technologies.',
    content: `
## Overview

This e-commerce platform was built to provide a seamless shopping experience for users while giving merchants powerful tools to manage their online stores.

## Key Features

- **User Authentication**: Secure login with OAuth support for Google and Facebook
- **Product Management**: Easy-to-use interface for adding and managing products
- **Shopping Cart**: Persistent cart with real-time updates
- **Payment Integration**: Stripe and PayPal payment gateways
- **Order Tracking**: Real-time order status updates
- **Admin Dashboard**: Comprehensive analytics and management tools

## Technical Implementation

The frontend is built with React and uses Redux for state management. The backend is powered by Node.js with Express, utilizing PostgreSQL for data persistence.

Performance optimizations include:
- Lazy loading for images
- Code splitting for faster initial load
- Redis caching for frequently accessed data
- CDN integration for static assets
    `,
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=1200',
    category: 'Web App',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe', 'Docker'],
    features: ['User Authentication', 'Product Management', 'Shopping Cart', 'Payment Integration', 'Order Tracking', 'Admin Dashboard'],
    github_url: 'https://github.com',
    live_url: 'https://example.com',
    year: '2024',
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
      </main>
    )
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative pt-24 pb-12">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
            >
              <FiArrowLeft /> Back to Projects
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex flex-wrap gap-3 mb-6">
                {displayProject.category && <span className="badge">{displayProject.category}</span>}
                {displayProject.year && (
                  <span className="badge-purple flex items-center gap-1">
                    <FiCalendar className="w-3 h-3" /> {displayProject.year}
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {displayProject.title}
              </h1>

              <p className="text-xl text-slate-400 leading-relaxed mb-8">
                {displayProject.description}
              </p>

              {/* Links */}
              <div className="flex flex-wrap gap-4 mb-8">
                {displayProject.live_url && (
                  <motion.a
                    href={displayProject.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary flex items-center gap-2"
                  >
                    <FiExternalLink /> Live Demo
                  </motion.a>
                )}
                {displayProject.github_url && (
                  <motion.a
                    href={displayProject.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <FiGithub /> View Code
                  </motion.a>
                )}
              </div>

              {/* Technologies */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <FiTag /> Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(displayProject.technologies || []).map((tech) => (
                    <span key={tech} className="px-4 py-2 rounded-lg bg-slate-800/50 text-slate-300 border border-slate-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 gradient-bg rounded-2xl blur-2xl opacity-20" />
              <div className="relative rounded-2xl overflow-hidden glass">
                <img
                  src={displayProject.image}
                  alt={displayProject.title}
                  className="w-full aspect-video object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      {displayProject.features && displayProject.features.length > 0 && (
        <section className="py-16 bg-slate-900/50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-8">Key Features</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayProject.features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/30 border border-slate-700/50"
                  >
                    <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center flex-shrink-0">
                      <FiCheck className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Content */}
      {displayProject.content && (
        <section className="section">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="prose prose-invert prose-lg max-w-none">
                <div className="card">
                  <div
                    className="text-slate-300 leading-relaxed [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mt-8 [&>h2]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>p]:mb-4 [&>strong]:text-white"
                    dangerouslySetInnerHTML={{
                      __html: displayProject.content
                        .replace(/## (.*)/g, '<h2>$1</h2>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/- (.*)/g, '<li>$1</li>')
                        .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
                        .replace(/<\/ul>\s*<ul>/g, '')
                        .split('\n\n').join('</p><p>')
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Interested in working together?</h3>
            <p className="text-slate-400 mb-8">Let's discuss your project and see how I can help.</p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Get in Touch
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default ProjectDetail
