import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiClock, FiCalendar, FiArrowRight, FiSearch, FiTag } from 'react-icons/fi'
import portfolioService from '../services/portfolio'

function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState(null)

  useEffect(() => {
    portfolioService.getPosts()
      .then((res) => setPosts(res?.data || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  // Sample posts if none exist
  const samplePosts = [
    {
      id: 1,
      slug: 'getting-started-with-react',
      title: 'Getting Started with React in 2024',
      excerpt: 'A comprehensive guide to starting your React journey with the latest features and best practices.',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
      category: 'React',
      tags: ['React', 'JavaScript', 'Tutorial'],
      read_time: 8,
      created_at: '2024-01-15',
    },
    {
      id: 2,
      slug: 'tailwind-css-tips',
      title: 'Advanced Tailwind CSS Tips and Tricks',
      excerpt: 'Level up your Tailwind CSS skills with these advanced techniques and patterns.',
      image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800',
      category: 'CSS',
      tags: ['Tailwind', 'CSS', 'Design'],
      read_time: 6,
      created_at: '2024-01-10',
    },
    {
      id: 3,
      slug: 'building-rest-apis',
      title: 'Building RESTful APIs with FastAPI',
      excerpt: 'Learn how to build fast, modern APIs with Python and FastAPI framework.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
      category: 'Backend',
      tags: ['Python', 'FastAPI', 'API'],
      read_time: 10,
      created_at: '2024-01-05',
    },
    {
      id: 4,
      slug: 'typescript-best-practices',
      title: 'TypeScript Best Practices for 2024',
      excerpt: 'Write better TypeScript code with these industry-proven best practices and patterns.',
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
      category: 'TypeScript',
      tags: ['TypeScript', 'JavaScript', 'Best Practices'],
      read_time: 7,
      created_at: '2024-01-01',
    },
  ]

  const displayPosts = posts.length > 0 ? posts : samplePosts

  const allTags = [...new Set(displayPosts.flatMap((post) => post.tags || []))]

  const filteredPosts = displayPosts.filter((post) => {
    const matchesSearch = post.title?.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(search.toLowerCase())
    const matchesTag = !selectedTag || (post.tags || []).includes(selectedTag)
    return matchesSearch && matchesTag
  })

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <main>
      {/* Header */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="badge-purple mb-6">Blog</div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Thoughts & <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Articles about web development, design, and technology.
              I share what I learn along my journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Tags */}
      <section className="py-8 border-y border-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Tags */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              <FiTag className="text-slate-500 flex-shrink-0" />
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  !selectedTag ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                All
              </button>
              {allTags.slice(0, 6).map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    selectedTag === tag ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input pl-12 py-3 w-full md:w-64"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="section">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="card animate-pulse">
                  <div className="aspect-video bg-slate-700 rounded-xl mb-4" />
                  <div className="h-4 bg-slate-700 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-slate-700 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {filteredPosts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-12"
                >
                  <Link to={`/blog/${filteredPosts[0].slug}`} className="group block">
                    <div className="card overflow-hidden p-0 grid md:grid-cols-2">
                      <div className="relative aspect-video md:aspect-auto overflow-hidden">
                        <img
                          src={filteredPosts[0].image || 'https://picsum.photos/seed/featured/800/450'}
                          alt={filteredPosts[0].title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="badge">{filteredPosts[0].category || 'Article'}</span>
                          <span className="text-sm text-slate-500 flex items-center gap-1">
                            <FiClock className="w-4 h-4" /> {filteredPosts[0].read_time || 5} min read
                          </span>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4 group-hover:gradient-text transition-all">
                          {filteredPosts[0].title}
                        </h2>
                        <p className="text-slate-400 mb-6 line-clamp-3">{filteredPosts[0].excerpt}</p>
                        <div className="flex items-center gap-2 text-indigo-400 font-medium">
                          Read Article <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Other Posts */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.slice(1).map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
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
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-2xl font-bold text-white mb-2">No articles found</h3>
                  <p className="text-slate-400">Try adjusting your search or filter criteria</p>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  )
}

export default Blog
