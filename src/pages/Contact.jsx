import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { FiMail, FiMapPin, FiPhone, FiSend, FiGithub, FiLinkedin, FiTwitter, FiCheck } from 'react-icons/fi'
import portfolioService from '../services/portfolio'

const contactInfo = [
  { icon: FiMail, label: 'Email', value: 'hello@example.com', href: 'mailto:hello@example.com' },
  { icon: FiMapPin, label: 'Location', value: 'San Francisco, CA', href: null },
  { icon: FiPhone, label: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
]

const socialLinks = [
  { icon: FiGithub, label: 'GitHub', href: 'https://github.com' },
  { icon: FiLinkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: FiTwitter, label: 'Twitter', href: 'https://twitter.com' },
]

function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      await portfolioService.submitContact(data)
      setSubmitted(true)
      reset()
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main>
      {/* Header */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="badge-pink mb-6 mx-auto">Contact</div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Let's <span className="gradient-text">Connect</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Have a project in mind or just want to chat? I'd love to hear from you.
              Fill out the form below or reach out through any of the channels.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section pt-12">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>

              {/* Contact Cards */}
              <div className="space-y-4 mb-12">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="card flex items-center gap-4"
                  >
                    <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-white hover:gradient-text transition-all">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Follow Me</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="w-14 h-14 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/50 transition-all"
                    >
                      <social.icon className="w-6 h-6" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Decorative */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 relative"
              >
                <div className="absolute inset-0 gradient-bg rounded-2xl blur-2xl opacity-20" />
                <div className="relative card bg-gradient-to-br from-indigo-500/10 to-purple-500/10">
                  <h3 className="text-xl font-bold mb-2">Available for Freelance</h3>
                  <p className="text-slate-400">
                    I'm currently accepting new projects. Let's build something amazing together!
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card text-center py-16"
                >
                  <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center mx-auto mb-6">
                    <FiCheck className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Message Sent!</h3>
                  <p className="text-slate-400 mb-8">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-secondary"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="card">
                  <h2 className="text-2xl font-bold mb-6">Send a Message</h2>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="label">Name *</label>
                      <input
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        className={`input ${errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="label">Email *</label>
                      <input
                        type="email"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Invalid email address',
                          },
                        })}
                        className={`input ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="label">Subject</label>
                    <input
                      type="text"
                      {...register('subject')}
                      className="input"
                      placeholder="Project Inquiry"
                    />
                  </div>

                  <div className="mb-8">
                    <label className="label">Message *</label>
                    <textarea
                      {...register('message', { required: 'Message is required' })}
                      rows={6}
                      className={`input resize-none ${errors.message ? 'border-red-500 focus:border-red-500' : ''}`}
                      placeholder="Tell me about your project..."
                    />
                    {errors.message && (
                      <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend /> Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map or Additional Section */}
      <section className="section">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Let's Create Something Amazing</h2>
            <p className="text-slate-400 text-lg">
              Whether you have a project in mind, need technical consultation,
              or just want to say hello, I'm always open to discussing new opportunities.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default Contact
