import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiDownload, FiMapPin, FiMail, FiBriefcase, FiBook, FiAward, FiCode } from 'react-icons/fi'
import portfolioService from '../services/portfolio'

// Page Header
const PageHeader = ({ profile }) => (
  <section className="relative pt-32 pb-20 overflow-hidden">
    <div className="absolute inset-0 grid-pattern" />
    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
    <div className="absolute bottom-0 -right-20 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl" />

    <div className="container mx-auto px-6 relative">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 rounded-3xl gradient-bg opacity-20 blur-2xl" />
            <div className="absolute inset-4 rounded-3xl glass overflow-hidden">
              <img
                src={profile?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500'}
                alt={profile?.name || 'Profile'}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl gradient-bg flex items-center justify-center animate-float">
              <FiCode className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-2xl glass flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
              <span className="text-2xl font-bold gradient-text">5+</span>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="badge mb-6">About Me</div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            I'm <span className="gradient-text">{profile?.name || 'Developer'}</span>
          </h1>
          <p className="text-xl text-indigo-400 font-medium mb-6">
            {profile?.title || 'Full Stack Developer'}
          </p>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            {profile?.bio || 'Passionate developer with expertise in building modern web applications. I love turning complex problems into simple, beautiful solutions.'}
          </p>

          {/* Info */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              { icon: FiMapPin, label: 'Location', value: profile?.location || 'San Francisco, CA' },
              { icon: FiMail, label: 'Email', value: profile?.email || 'hello@example.com' },
              { icon: FiBriefcase, label: 'Experience', value: '5+ Years' },
              { icon: FiAward, label: 'Projects', value: '50+ Completed' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">{item.label}</p>
                  <p className="text-sm text-white">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <motion.a
            href={profile?.resume_url || '#'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary inline-flex items-center gap-2"
          >
            <FiDownload /> Download Resume
          </motion.a>
        </motion.div>
      </div>
    </div>
  </section>
)

// Skills Section
const SkillsSection = ({ skills }) => {
  const skillCategories = skills?.reduce((acc, skill) => {
    const cat = skill.category || 'Other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(skill)
    return acc
  }, {}) || {}

  const defaultSkills = {
    Frontend: [
      { name: 'React', proficiency: 95, color: '#61DAFB' },
      { name: 'TypeScript', proficiency: 90, color: '#3178C6' },
      { name: 'Tailwind CSS', proficiency: 95, color: '#06B6D4' },
      { name: 'Next.js', proficiency: 88, color: '#000000' },
    ],
    Backend: [
      { name: 'Node.js', proficiency: 90, color: '#339933' },
      { name: 'Python', proficiency: 85, color: '#3776AB' },
      { name: 'PostgreSQL', proficiency: 85, color: '#4169E1' },
      { name: 'MongoDB', proficiency: 80, color: '#47A248' },
    ],
    Tools: [
      { name: 'Git', proficiency: 92, color: '#F05032' },
      { name: 'Docker', proficiency: 80, color: '#2496ED' },
      { name: 'AWS', proficiency: 75, color: '#FF9900' },
      { name: 'Figma', proficiency: 85, color: '#F24E1E' },
    ],
  }

  const displaySkills = Object.keys(skillCategories).length > 0 ? skillCategories : defaultSkills

  return (
    <section className="section bg-slate-900/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Technologies and tools I work with on a daily basis
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(displaySkills).map(([category, categorySkills], catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
              className="card"
            >
              <h3 className="text-xl font-bold text-white mb-6">{category}</h3>
              <div className="space-y-5">
                {categorySkills.map((skill, index) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-300">{skill.name}</span>
                      <span className="text-indigo-400">{skill.proficiency}%</span>
                    </div>
                    <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-full rounded-full gradient-bg"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Experience Timeline
const ExperienceSection = ({ experience }) => {
  const defaultExperience = [
    {
      id: 1,
      type: 'Work',
      title: 'Senior Full Stack Developer',
      organization: 'Tech Company',
      location: 'San Francisco, CA',
      start_date: '2022',
      end_date: null,
      is_current: true,
      description: 'Leading development of scalable web applications using React, Node.js, and AWS.',
      skills: ['React', 'Node.js', 'AWS', 'PostgreSQL'],
    },
    {
      id: 2,
      type: 'Work',
      title: 'Full Stack Developer',
      organization: 'Startup Inc',
      location: 'Remote',
      start_date: '2020',
      end_date: '2022',
      description: 'Built and maintained multiple client projects using modern JavaScript frameworks.',
      skills: ['Vue.js', 'Python', 'MongoDB'],
    },
    {
      id: 3,
      type: 'Education',
      title: 'B.S. Computer Science',
      organization: 'University of Technology',
      location: 'California',
      start_date: '2016',
      end_date: '2020',
      description: 'Graduated with honors. Focus on software engineering and web development.',
    },
  ]

  const displayExperience = experience?.length > 0 ? experience : defaultExperience

  return (
    <section className="section">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Experience & <span className="gradient-text">Education</span>
          </h2>
          <p className="section-subtitle mx-auto">
            My professional journey and educational background
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500" />

            {displayExperience.map((item, index) => (
              <motion.div
                key={item.id}
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
                    <span className={`badge ${item.type === 'Education' ? 'badge-purple' : ''}`}>
                      {item.type === 'Education' ? <FiBook className="w-3 h-3 mr-1 inline" /> : <FiBriefcase className="w-3 h-3 mr-1 inline" />}
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
                  {item.location && <p className="text-sm text-slate-500 mb-3"><FiMapPin className="w-4 h-4 inline mr-1" />{item.location}</p>}
                  {item.description && <p className="text-slate-400 mb-4">{item.description}</p>}

                  {item.skills && (
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
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  const [profile, setProfile] = useState(null)
  const [skills, setSkills] = useState([])
  const [experience, setExperience] = useState([])

  useEffect(() => {
    portfolioService.getProfile().then(setProfile).catch(console.error)
    portfolioService.getSkills().then((res) => setSkills(res?.data || [])).catch(console.error)
    portfolioService.getExperience().then((res) => setExperience(res?.data || [])).catch(console.error)
  }, [])

  return (
    <main>
      <PageHeader profile={profile} />
      <SkillsSection skills={skills} />
      <ExperienceSection experience={experience} />
    </main>
  )
}

export default About
