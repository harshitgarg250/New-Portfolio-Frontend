import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import portfolioService from '../services/portfolio'

export default function Home(){
  const [profile, setProfile] = useState(null)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    portfolioService.getProfile().then(setProfile).catch(console.error)
    portfolioService.getProjects().then((res) => setProjects(res?.data || [])).catch(console.error)
  }, [])

  return (
    <main>
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold mb-4">Portfolio CMS</h1>
        <p className="text-lg text-slate-400 mb-8">Manage your portfolio content</p>
        <div className="flex justify-center gap-4">
          <a href={import.meta.env.VITE_ADMIN_URL || 'http://localhost:5174'} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-indigo-600 rounded text-white">Admin</a>
          <Link to="/projects" className="px-6 py-3 bg-slate-700 rounded text-white">Projects</Link>
        </div>
      </section>
    </main>
  )
}
