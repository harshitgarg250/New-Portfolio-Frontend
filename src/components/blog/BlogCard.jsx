import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiClock, FiCalendar } from 'react-icons/fi'

function BlogCard({ post, index = 0 }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link to={`/blog/${post.slug}`} className="group block h-full">
        <div className="card overflow-hidden p-0 h-full flex flex-col">
          <div className="relative aspect-video overflow-hidden">
            <img
              src={post.image || `https://picsum.photos/seed/${post.id}/800/450`}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-3 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <FiCalendar className="w-4 h-4" />
                {formatDate(post.created_at)}
              </span>
              <span className="flex items-center gap-1">
                <FiClock className="w-4 h-4" />
                {post.read_time || 5} min
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:gradient-text transition-all">
              {post.title}
            </h3>
            <p className="text-slate-400 text-sm line-clamp-2 mb-4 flex-1">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap gap-2">
              {(post.tags || []).slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 rounded bg-slate-700/50 text-slate-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default BlogCard
