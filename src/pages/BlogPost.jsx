import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiClock, FiCalendar, FiShare2, FiTwitter, FiLinkedin, FiLink } from 'react-icons/fi'
import portfolioService from '../services/portfolio'

function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    portfolioService.getPost(slug)
      .then(setPost)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [slug])

  // Sample post data
  const displayPost = post || {
    id: 1,
    title: 'Getting Started with React in 2024',
    slug: 'getting-started-with-react',
    excerpt: 'A comprehensive guide to starting your React journey with the latest features and best practices.',
    content: `
## Introduction

React has evolved significantly over the years, and 2024 brings even more exciting features and improvements. Whether you're new to React or looking to update your skills, this guide will help you get started on the right foot.

## Why React?

React remains one of the most popular JavaScript libraries for building user interfaces. Here's why developers love it:

- **Component-Based Architecture**: Build encapsulated components that manage their own state
- **Virtual DOM**: Efficient updates and rendering for better performance
- **Rich Ecosystem**: Vast library of tools, extensions, and community support
- **Learn Once, Write Anywhere**: Use React for web, mobile (React Native), and even desktop apps

## Setting Up Your Environment

Before diving into React, you'll need to set up your development environment. Here's what you need:

1. **Node.js** (version 18 or higher)
2. **npm** or **yarn** package manager
3. **Code editor** (VS Code recommended)

## Creating Your First React App

The easiest way to create a new React application is using Vite:

\`\`\`bash
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install
npm run dev
\`\`\`

## Understanding Components

Components are the building blocks of React applications. Here's a simple example:

\`\`\`jsx
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}
\`\`\`

## Conclusion

React continues to be a powerful choice for building modern web applications. With its latest features and strong community support, there's never been a better time to learn React.

Stay tuned for more tutorials on advanced React patterns and best practices!
    `,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200',
    category: 'React',
    tags: ['React', 'JavaScript', 'Tutorial', 'Web Development'],
    read_time: 8,
    views: 1234,
    created_at: '2024-01-15',
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const shareUrl = window.location.href

  const shareLinks = [
    { icon: FiTwitter, url: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${displayPost.title}`, label: 'Twitter' },
    { icon: FiLinkedin, url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, label: 'LinkedIn' },
  ]

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    alert('Link copied to clipboard!')
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
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
            >
              <FiArrowLeft /> Back to Blog
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="badge-purple">{displayPost.category}</span>
              <span className="text-slate-500 flex items-center gap-1">
                <FiCalendar className="w-4 h-4" /> {formatDate(displayPost.created_at)}
              </span>
              <span className="text-slate-500 flex items-center gap-1">
                <FiClock className="w-4 h-4" /> {displayPost.read_time} min read
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {displayPost.title}
            </h1>

            <p className="text-xl text-slate-400 leading-relaxed mb-8">
              {displayPost.excerpt}
            </p>

            {/* Share */}
            <div className="flex items-center gap-4">
              <span className="text-slate-500 flex items-center gap-2">
                <FiShare2 /> Share:
              </span>
              {shareLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/50 transition-all"
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
              <button
                onClick={copyLink}
                className="w-10 h-10 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/50 transition-all"
              >
                <FiLink className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-5xl mx-auto"
          >
            <div className="absolute inset-0 gradient-bg rounded-2xl blur-2xl opacity-20" />
            <img
              src={displayPost.image}
              alt={displayPost.title}
              className="relative w-full aspect-video object-cover rounded-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section pt-12">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="prose prose-invert prose-lg max-w-none"
            >
              <div
                className="text-slate-300 leading-relaxed 
                  [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mt-12 [&>h2]:mb-6
                  [&>p]:mb-6 [&>p]:leading-relaxed
                  [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ul]:mb-6
                  [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>ol]:mb-6
                  [&>li]:text-slate-300
                  [&>strong]:text-white [&>strong]:font-semibold
                  [&>pre]:bg-slate-800/50 [&>pre]:p-4 [&>pre]:rounded-xl [&>pre]:overflow-x-auto [&>pre]:mb-6
                  [&>code]:text-indigo-400 [&>code]:bg-slate-800/50 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded"
                dangerouslySetInnerHTML={{
                  __html: displayPost.content
                    .replace(/## (.*)/g, '<h2>$1</h2>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
                    .replace(/`([^`]+)`/g, '<code>$1</code>')
                    .replace(/^\d+\. (.*)/gm, '<li>$1</li>')
                    .replace(/^- (.*)/gm, '<li>$1</li>')
                    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
                    .split('\n\n').filter(p => p.trim()).join('</p><p>')
                }}
              />
            </motion.article>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 pt-8 border-t border-slate-800"
            >
              <div className="flex flex-wrap gap-2">
                {(displayPost.tags || []).map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-lg bg-slate-800/50 text-slate-300 border border-slate-700">
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center card"
          >
            <h3 className="text-2xl font-bold mb-4">Enjoyed this article?</h3>
            <p className="text-slate-400 mb-6">
              Check out more articles or get in touch to discuss your ideas.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/blog">
                <motion.button whileHover={{ scale: 1.05 }} className="btn-secondary">
                  More Articles
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button whileHover={{ scale: 1.05 }} className="btn-primary">
                  Get in Touch
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default BlogPost
