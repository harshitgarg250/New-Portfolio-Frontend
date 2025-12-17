import { motion } from 'framer-motion'

function SectionWrapper({ children, className = '', id }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className={`section ${className}`}
    >
      {children}
    </motion.section>
  )
}

export default SectionWrapper
