import { useEffect, useState } from 'react'
import api from '../services/api'
import LoadingSpinner from '../components/common/LoadingSpinner'

export default function Projects(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{fetchProjects()}, [])

  async function fetchProjects(){
    setLoading(true)
    try{
      const res = await api.get('/projects')
      setItems(res.data)
    }catch(e){}
    setLoading(false)
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Projects</h2>
      {loading ? <LoadingSpinner/> : (
        <div className="grid md:grid-cols-2 gap-4">
          {items.map(p=> (
            <div key={p.id} className="p-4 bg-slate-800 rounded">
              <h3 className="font-bold">{p.title}</h3>
              <p className="text-slate-400 text-sm">{p.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
