import { motion } from 'framer-motion'

function SkillCard({ skill, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.05 }}
      className="card text-center group cursor-default"
    >
      {skill.icon && (
        <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-slate-800/50 flex items-center justify-center group-hover:scale-110 transition-transform">
          <img src={skill.icon} alt={skill.name} className="w-10 h-10" />
        </div>
      )}
      <h3 className="text-white font-semibold mb-2">{skill.name}</h3>
      {skill.level && (
        <span className="text-sm text-slate-500">{skill.level}</span>
      )}
      {skill.proficiency && (
        <div className="mt-3">
          <div className="h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.proficiency}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="h-full gradient-bg rounded-full"
            />
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default SkillCard
