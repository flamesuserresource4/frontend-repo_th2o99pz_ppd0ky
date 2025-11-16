import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Test from './Test'
import './index.css'
import SiteLayout from './components/SiteLayout'
import { TrackingPage, AboutPage, SupportPage, LoginPage, AdminPage } from './components/Pages'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/track" element={<SiteLayout><TrackingPage/></SiteLayout>} />
        <Route path="/about" element={<SiteLayout><AboutPage/></SiteLayout>} />
        <Route path="/support" element={<SiteLayout><SupportPage/></SiteLayout>} />
        <Route path="/login" element={<SiteLayout><LoginPage/></SiteLayout>} />
        <Route path="/admin" element={<SiteLayout><AdminPage/></SiteLayout>} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
