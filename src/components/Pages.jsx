import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Clock } from 'lucide-react'

const primary = '#E60000'
const apiBase = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function useQuery(){
  const { search } = useLocation();
  return useMemo(()=> new URLSearchParams(search), [search])
}

export function TrackingPage(){
  const q = useQuery()
  const [code, setCode] = useState(q.get('code') || '')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  const fetchData = async (c) => {
    setLoading(true); setError(''); setData(null)
    try{
      const res = await fetch(`${apiBase}/track/${encodeURIComponent(c)}`)
      if(!res.ok){ throw new Error('Tracking Number Not Found') }
      const d = await res.json(); setData(d)
    }catch(e){ setError(e.message) }
    finally{ setLoading(false) }
  }

  useEffect(()=>{ if(code && q.get('code')) fetchData(code) }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold mb-6">Track Shipment</h1>
      <div className="bg-white rounded-xl shadow p-3 flex gap-2">
        <input value={code} onChange={e=>setCode(e.target.value)} placeholder="Enter Tracking Code" className="flex-1 p-2 outline-none"/>
        <button onClick={()=> code && fetchData(code)} className="text-white px-4 py-2 rounded" style={{backgroundColor: primary}}>Search</button>
      </div>

      {loading && <p className="mt-6">Loading...</p>}
      {error && <p className="mt-6 text-red-600 font-medium">{error}</p>}

      {data && (
        <div className="mt-8 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
            <p className="text-sm text-gray-600">Tracking Code</p>
            <p className="text-xl font-semibold mb-4">{data.tracking_code}</p>
            <div className="aspect-video w-full rounded-lg bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="mx-auto mb-2" color={primary}/>
                <p className="text-gray-600 text-sm">Map placeholder (Leaflet/Google Maps can be integrated)</p>
              </div>
            </div>
            <h3 className="mt-6 font-semibold mb-3">Status Timeline</h3>
            <ul className="space-y-3">
              {data.timeline?.map((t, i)=> (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{backgroundColor: primary}}/>
                  <div className="flex-1">
                    <p className="font-medium">{t.status}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1"><Clock size={14}/> {new Date(t.timestamp).toLocaleString()}</p>
                  </div>
                </li>
              ))}
            </ul>
            <a href={`${apiBase}/shipments/${data.tracking_code}/receipt.pdf`} target="_blank" className="inline-block mt-6 text-white px-4 py-2 rounded" style={{backgroundColor: primary}}>Download Receipt</a>
          </div>
          <div className="bg-white rounded-xl shadow p-6 space-y-2">
            <h3 className="font-semibold mb-4">Shipment Details</h3>
            <p><span className="text-gray-500">Sender:</span> {data.sender_name}</p>
            <p><span className="text-gray-500">Receiver:</span> {data.receiver_name}</p>
            <p><span className="text-gray-500">Origin:</span> {data.origin}</p>
            <p><span className="text-gray-500">Destination:</span> {data.destination}</p>
            <p><span className="text-gray-500">Amount:</span> ${data.amount}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export function AboutPage(){
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold mb-6">About CargoConnect</h1>
      <p className="text-gray-700 leading-7">CargoConnect delivers global logistics solutions with speed, transparency, and care. Our network spans sea, land, air, and rail to keep your items safe and on time across 25+ countries.</p>
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <div className="h-40 bg-gray-200 rounded"/>
        <div className="h-40 bg-gray-200 rounded"/>
        <div className="h-40 bg-gray-200 rounded"/>
      </div>
    </div>
  )
}

export function SupportPage(){
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold mb-6">Customer Care</h1>
      <form onSubmit={e=> e.preventDefault()} className="bg-white rounded-xl shadow p-6 grid md:grid-cols-2 gap-4">
        <input placeholder="Name" className="p-3 border rounded"/>
        <input placeholder="Email" className="p-3 border rounded"/>
        <input placeholder="Subject" className="p-3 border rounded md:col-span-2"/>
        <textarea placeholder="Message" className="p-3 border rounded md:col-span-2 h-32"/>
        <button className="text-white px-4 py-2 rounded md:col-span-2" style={{backgroundColor: primary}}>Send Message</button>
      </form>
      <div className="mt-6 text-sm text-gray-700">
        <p>Email: shippercouriersurport@gmail.com</p>
        <p>Phone: +1 717 451 5811</p>
        <p>24/7 Support Available</p>
      </div>
      <div className="mt-8 text-sm text-gray-500">Live chat placeholder (Tidio/Crisp can be embedded here)</div>
    </div>
  )
}

export function LoginPage(){
  const navigate = useNavigate()
  const [email, setEmail] = useState('admin@cargoconnect.com')
  const [password, setPassword] = useState('Admin@123')
  const [error, setError] = useState('')

  const submit = async () => {
    setError('')
    try{
      const res = await fetch(`${apiBase}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ username: email, password }) })
      if(!res.ok){ throw new Error('Invalid credentials') }
      const data = await res.json()
      localStorage.setItem('cc_token', data.access_token)
      navigate('/admin')
    }catch(e){ setError(e.message) }
  }

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold mb-6">Admin Login</h1>
      <div className="space-y-3 bg-white rounded-xl shadow p-6">
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="p-3 border rounded w-full"/>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="p-3 border rounded w-full"/>
        <button onClick={submit} className="text-white px-4 py-2 rounded w-full" style={{backgroundColor: primary}}>Sign In</button>
      </div>
    </div>
  )
}

export function AdminPage(){
  const navigate = useNavigate()
  const token = localStorage.getItem('cc_token')
  const [list, setList] = useState([])
  const [form, setForm] = useState({
    sender_name:'', receiver_name:'', receiver_email:'', receiver_phone:'', address:'', country:'', weight:'', description:'', amount:'', origin:'', destination:''
  })
  const [statusCode, setStatusCode] = useState('')

  useEffect(()=>{ if(!token) navigate('/login') }, [])

  const authFetch = (url, opts={}) => fetch(url, { ...opts, headers: { ...(opts.headers||{}), Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }})

  const load = async () => {
    const res = await authFetch(`${apiBase}/shipments`)
    const data = await res.json()
    setList(data)
  }
  useEffect(()=>{ if(token) load() }, [token])

  const create = async () => {
    const payload = { ...form, weight: parseFloat(form.weight||'0'), amount: parseFloat(form.amount||'0') }
    const res = await authFetch(`${apiBase}/shipments`, { method:'POST', body: JSON.stringify(payload) })
    const d = await res.json(); setStatusCode(d.tracking_code || d.trackingCode); await load()
  }

  const updateStatus = async (code, status) => {
    await authFetch(`${apiBase}/shipments/${code}`, { method:'PATCH', body: JSON.stringify({ status }) })
    await authFetch(`${apiBase}/shipments/${code}/notify`, { method:'POST' })
    await load()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">Tracking</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Origin</th>
                  <th className="py-2">Destination</th>
                  <th className="py-2">Updated</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {list.map((row)=> (
                  <tr key={row._id} className="border-b">
                    <td className="py-2">{row.tracking_code}</td>
                    <td className="py-2">{row.status}</td>
                    <td className="py-2">{row.origin}</td>
                    <td className="py-2">{row.destination}</td>
                    <td className="py-2">{row.last_update ? new Date(row.last_update).toLocaleString() : ''}</td>
                    <td className="py-2">
                      <div className="flex gap-2">
                        {['Package Pickup','Sorting Center','In Transit','Customs Clearance','Out for Delivery','Delivered'].map(s=> (
                          <button key={s} onClick={()=>updateStatus(row.tracking_code, s)} className="text-xs px-2 py-1 rounded border" style={{borderColor: '#eee'}}>{s}</button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 space-y-3">
          <h3 className="font-semibold">Create Shipment</h3>
          {Object.entries(form).map(([k,v])=> (
            <input key={k} value={v} onChange={e=> setForm(f=> ({...f, [k]: e.target.value}))} placeholder={k.replace('_',' ')} className="p-2 border rounded w-full"/>
          ))}
          <button onClick={create} className="text-white px-4 py-2 rounded w-full" style={{backgroundColor: primary}}>Create</button>
          {statusCode && <p className="text-sm">New Tracking: <span className="font-semibold" style={{color: primary}}>{statusCode}</span></p>}
        </div>
      </div>
    </div>
  )
}
