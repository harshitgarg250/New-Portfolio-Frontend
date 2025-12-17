import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

function ProjectCard({ project, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="card group overflow-hidden p-0 h-full flex flex-col">
        <Link to={`/projects/${project.slug}`} className="relative aspect-video overflow-hidden">
          <img
            src={project.image || `https://picsum.photos/seed/${project.id}/800/450`}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
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

        <div className="p-6 flex-1 flex flex-col">
          <div className="flex flex-wrap gap-2 mb-3">
            {project.category && <span className="badge">{project.category}</span>}
          </div>

          <Link to={`/projects/${project.slug}`}>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:gradient-text transition-all">
              {project.title}
            </h3>
          </Link>

          <p className="text-slate-400 text-sm line-clamp-2 mb-4 flex-1">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {(project.technologies || []).slice(0, 4).map((tech) => (
              <span key={tech} className="text-xs px-2 py-1 rounded bg-slate-700/50 text-slate-400">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard
