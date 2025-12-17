import { motion } from 'framer-motion'
import { FiBriefcase, FiBook, FiMapPin } from 'react-icons/fi'

function TimelineItem({ item, index = 0 }) {
  const isWork = item.type === 'Work'

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative pl-20 pb-12 last:pb-0"
    >
      {/* Timeline dot */}
      <div className="absolute left-6 w-5 h-5 rounded-full gradient-bg border-4 border-slate-950" />

      <div className="card">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className={`badge ${isWork ? '' : 'badge-purple'}`}>
            {isWork ? <FiBriefcase className="w-3 h-3 mr-1 inline" /> : <FiBook className="w-3 h-3 mr-1 inline" />}
            {item.type}
          </span>
          <span className="text-sm text-slate-500">
            {item.start_date} - {item.is_current ? 'Present' : item.end_date}
          </span>
          {item.is_current && (
            <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded-full">Current</span>
          )}
        </div>

        <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
        <p className="text-indigo-400 mb-3">{item.organization}</p>
        
        {item.location && (
          <p className="text-sm text-slate-500 mb-3">
            <FiMapPin className="w-4 h-4 inline mr-1" />
            {item.location}
          </p>
        )}
        
        {item.description && (
          <p className="text-slate-400 mb-4">{item.description}</p>
        )}

        {item.skills && item.skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.skills.map((skill) => (
              <span key={skill} className="text-xs px-2 py-1 rounded bg-slate-700/50 text-slate-300">
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default TimelineItem
