import { useState } from 'react'
import api from '../services/api'

export default function Contact(){
  const [form, setForm] = useState({name:'', email:'', message:''})
  const [status, setStatus] = useState(null)

  async function submit(e){
    e.preventDefault()
    try{
      await api.post('/contacts', form)
      setStatus('ok')
    }catch(e){setStatus('err')}
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Contact</h2>
      <form onSubmit={submit} className="space-y-3 max-w-xl">
        <input className="w-full p-2 rounded bg-slate-800" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        <input className="w-full p-2 rounded bg-slate-800" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        <textarea className="w-full p-2 rounded bg-slate-800" placeholder="Message" value={form.message} onChange={e=>setForm({...form, message:e.target.value})} />
        <div><button className="px-4 py-2 bg-indigo-600 rounded">Send</button></div>
      </form>
      {status === 'ok' && <div className="mt-3 text-green-400">Sent</div>}
      {status === 'err' && <div className="mt-3 text-red-400">Error</div>}
    </div>
  )
}
