import React, { useEffect, useState } from 'react'
import { Navbar, Footer } from '../App'

export default function SiteLayout({ children }){
  const [authed, setAuthed] = useState(!!localStorage.getItem('cc_token'))
  useEffect(()=>{
    const handler = () => setAuthed(!!localStorage.getItem('cc_token'))
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  },[])
  const logout = () => { localStorage.removeItem('cc_token'); setAuthed(false) }
  return (
    <div className="min-h-screen bg-white">
      <Navbar authed={authed} onLogout={logout} />
      <main className="pt-16">
        {children}
      </main>
      <Footer/>
    </div>
  )
}
