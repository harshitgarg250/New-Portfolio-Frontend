import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHome, FiArrowLeft } from 'react-icons/fi'

function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* 404 Number */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.4 }}
            className="text-[12rem] md:text-[16rem] font-bold leading-none gradient-text"
          >
            404
          </motion.div>

          {/* Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 -mt-8">
            Page Not Found
          </h1>
          <p className="text-slate-400 text-lg max-w-md mx-auto mb-12">
            Oops! The page you're looking for seems to have wandered off into the digital void.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center gap-2"
              >
                <FiHome /> Back to Home
              </motion.button>
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn-secondary flex items-center gap-2"
            >
              <FiArrowLeft /> Go Back
            </button>
          </div>

          {/* Fun element */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-slate-600 text-sm"
          >
            Lost? Maybe try the search bar, or just head back home. 🏠
          </motion.p>
        </motion.div>
      </div>
    </main>
  )
}

export default NotFound
