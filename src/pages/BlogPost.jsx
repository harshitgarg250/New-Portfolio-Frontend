import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'
import LoadingSpinner from '../components/common/LoadingSpinner'

export default function BlogPost(){
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{if(id) fetchPost()}, [id])

  async function fetchPost(){
    setLoading(true)
    try{
      const res = await api.get(`/posts/${id}`)
      setPost(res.data)
    }catch(e){}
    setLoading(false)
  }

  if(loading) return <LoadingSpinner />
  if(!post) return <div>Not found</div>

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">{post.title}</h2>
      <div className="prose max-w-none text-slate-200" dangerouslySetInnerHTML={{__html: post.content}} />
    </div>
  )
}
