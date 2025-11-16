import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'
import { Search, Truck, Ship, Plane, Train, Menu, LogIn, LogOut } from 'lucide-react'

const primary = '#E60000'

function Navbar({ authed, onLogout }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white/80 backdrop-blur border-b border-red-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold tracking-tight" style={{color: primary}}>
          CargoConnect
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/" className="hover:text-red-600">Home</Link>
          <Link to="/track" className="hover:text-red-600">Tracking</Link>
          <Link to="/about" className="hover:text-red-600">About</Link>
          <Link to="/support" className="hover:text-red-600">Customer Care</Link>
          {authed ? (
            <>
              <Link to="/admin" className="text-white px-3 py-1.5 rounded" style={{backgroundColor: primary}}>Dashboard</Link>
              <button onClick={onLogout} className="flex items-center gap-2 text-red-600"><LogOut size={16}/> Logout</button>
            </>
          ) : (
            <Link to="/login" className="flex items-center gap-2 text-red-600"><LogIn size={16}/> Admin</Link>
          )}
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)}><Menu/></button>
      </div>
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/" className="block">Home</Link>
          <Link to="/track" className="block">Tracking</Link>
          <Link to="/about" className="block">About</Link>
          <Link to="/support" className="block">Customer Care</Link>
          {authed ? (
            <div className="flex items-center gap-4">
              <Link to="/admin" className="text-white px-3 py-1.5 rounded" style={{backgroundColor: primary}}>Dashboard</Link>
              <button onClick={onLogout} className="text-red-600">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="text-red-600">Admin</Link>
          )}
        </div>
      )}
    </header>
  )
}

function Hero({ onTrack }) {
  return (
    <section className="relative h-[88vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/cEecEwR6Ehj4iT8T/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-white pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center gap-6">
        <motion.h1 initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.1}} className="text-4xl md:text-6xl font-extrabold text-white max-w-3xl">
          We Keep Your Items Safe and On Time
        </motion.h1>
        <motion.p initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.2}} className="text-white/90 max-w-2xl">
          Global logistics with speed, transparency, and care.
        </motion.p>
        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.3}} className="bg-white rounded-xl p-2 w-full max-w-2xl flex items-center gap-2 shadow-lg">
          <Search className="text-gray-500 ml-2" size={20}/>
          <input id="track" placeholder="Enter Tracking Code" className="flex-1 outline-none p-2" />
          <button onClick={() => {
            const val = document.getElementById('track').value.trim()
            if (val) onTrack(val)
          }} className="text-white px-4 py-2 rounded-lg" style={{backgroundColor: primary}}>Track Shipment</button>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {[
            ['50k+','Deliveries'],
            ['250+','Land Shipments'],
            ['25+','Countries'],
            ['120+','Train Routes']
          ].map(([a,b],i)=> (
            <motion.div key={i} initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.3 + i*0.1}} className="bg-white/90 rounded-lg p-4 text-center shadow">
              <p className="text-2xl font-bold" style={{color: primary}}>{a}</p>
              <p className="text-gray-700">{b}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Partners(){
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-6 opacity-80">
        {Array.from({length:5}).map((_,i)=> (
          <div key={i} className="h-12 bg-gray-100 rounded" />
        ))}
      </div>
    </section>
  )
}

function Services(){
  const items = [
    {icon: <Ship color={primary}/>, title:'Maritime Freight', text:'Reliable sea cargo solutions worldwide.'},
    {icon: <Truck color={primary}/>, title:'Land Transport', text:'Door-to-door trucking with real-time updates.'},
    {icon: <Plane color={primary}/>, title:'Air Cargo', text:'Express air freight for urgent deliveries.'},
    {icon: <Train color={primary}/>, title:'Train Freight', text:'Cost-effective rail logistics across regions.'},
  ]
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Our Services</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it,i)=> (
            <motion.div key={i} whileHover={{y:-4}} className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg mb-4" style={{backgroundColor: '#ffe5e5'}}>{it.icon}</div>
              <h3 className="font-semibold mb-2">{it.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{it.text}</p>
              <button className="text-sm font-semibold" style={{color: primary}}>Read More →</button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer(){
  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-6">
        <div>
          <p className="text-xl font-bold">CargoConnect</p>
          <p className="text-sm text-white/70 mt-2">Logistics with speed, transparency, and care.</p>
        </div>
        <div>
          <p className="font-semibold mb-3">Links</p>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/track">Tracking</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/support">Customer Care</Link></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-3">Contact</p>
          <p className="text-sm text-white/80">Email: shippercouriersurport@gmail.com</p>
          <p className="text-sm text-white/80">Phone: +1 717 451 5811</p>
          <p className="text-sm text-white/80">24/7 Support Available</p>
        </div>
        <div>
          <p className="font-semibold mb-3">Follow</p>
          <div className="flex gap-3 text-white/80 text-sm">
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
            <a href="#">X</a>
          </div>
        </div>
      </div>
      <div className="text-center text-white/60 text-sm mt-8">© 2025 CargoConnect. All Rights Reserved.</div>
    </footer>
  )
}

function Home(){
  const navigate = useNavigate()
  const onTrack = (code) => navigate(`/track?code=${encodeURIComponent(code)}`)
  return (
    <div className="font-[Poppins]">
      <Hero onTrack={onTrack}/>
      <Partners/>
      <Services/>
      <Footer/>
    </div>
  )
}

export default function App(){
  const [authed, setAuthed] = useState(!!localStorage.getItem('cc_token'))
  useEffect(()=>{
    const handler = () => setAuthed(!!localStorage.getItem('cc_token'))
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  },[])
  const logout = () => { localStorage.removeItem('cc_token'); setAuthed(false) }
  return (
    <div className="min-h-screen bg-white">
      <Navbar authed={authed} onLogout={logout}/>
      <main className="pt-16">
        <Home/>
      </main>
    </div>
  )
}
