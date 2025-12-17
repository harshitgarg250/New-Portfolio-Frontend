import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { FiSend, FiCheck } from 'react-icons/fi'
import portfolioService from '../../services/portfolio'

function ContactForm() {
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
      console.error('Error:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card text-center py-12"
      >
        <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4">
          <FiCheck className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-slate-400 mb-6">I'll get back to you soon.</p>
        <button onClick={() => setSubmitted(false)} className="btn-secondary">
          Send Another
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card">
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="label">Name *</label>
          <input
            type="text"
            {...register('name', { required: 'Required' })}
            className={`input ${errors.name ? 'border-red-500' : ''}`}
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="label">Email *</label>
          <input
            type="email"
            {...register('email', { required: 'Required' })}
            className={`input ${errors.email ? 'border-red-500' : ''}`}
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="label">Subject</label>
        <input
          type="text"
          {...register('subject')}
          className="input"
          placeholder="What's this about?"
        />
      </div>

      <div className="mb-6">
        <label className="label">Message *</label>
        <textarea
          {...register('message', { required: 'Required' })}
          rows={5}
          className={`input resize-none ${errors.message ? 'border-red-500' : ''}`}
          placeholder="Your message..."
        />
      </div>

      <motion.button
        type="submit"
        disabled={submitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {submitting ? 'Sending...' : <><FiSend /> Send Message</>}
      </motion.button>
    </form>
  )
}

export default ContactForm
