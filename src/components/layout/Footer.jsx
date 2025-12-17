import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiHeart } from 'react-icons/fi'

const socialLinks = [
  { name: 'GitHub', icon: FiGithub, url: 'https://github.com' },
  { name: 'LinkedIn', icon: FiLinkedin, url: 'https://linkedin.com' },
  { name: 'Twitter', icon: FiTwitter, url: 'https://twitter.com' },
  { name: 'Email', icon: FiMail, url: 'mailto:hello@example.com' },
]

function Footer() {
  return (
    <footer className="relative mt-24 border-t border-slate-800/50">
      <div className="absolute top-0 left-0 right-0 h-px gradient-bg opacity-50" />
      
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <span className="text-3xl font-bold">
                <span className="gradient-text">Port</span>
                <span className="text-white">folio</span>
              </span>
            </Link>
            <p className="text-slate-400 max-w-md mb-8 leading-relaxed">
              Building digital experiences that matter. Let's create something amazing together.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-12 h-12 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/50 transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'About', 'Projects', 'Blog'].map((item) => (
                <li key={item}>
                  <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-slate-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Connect</h4>
            <ul className="space-y-4">
              <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Resume</a></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm">
          <p className="flex items-center">
            © {new Date().getFullYear()} Portfolio. Made with <FiHeart className="w-4 h-4 mx-1 text-pink-500" /> React & Tailwind
          </p>
          <p className="mt-4 md:mt-0">All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
