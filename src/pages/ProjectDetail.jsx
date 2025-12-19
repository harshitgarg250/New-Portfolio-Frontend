import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'
import LoadingSpinner from '../components/common/LoadingSpinner'

export default function ProjectDetail(){
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{if(slug) fetchProject()}, [slug])

  async function fetchProject(){
    setLoading(true)
    try{
      const res = await api.get(`/projects/${slug}`)
      setProject(res.data)
    }catch(e){}
    setLoading(false)
  }

  if(loading) return <LoadingSpinner />
  if(!project) return <div>Not found</div>

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">{project.title}</h2>
      <p className="text-slate-400 mb-4">{project.summary}</p>
      <div className="prose max-w-none text-slate-200" dangerouslySetInnerHTML={{__html: project.content}} />
    </div>
  )
}
