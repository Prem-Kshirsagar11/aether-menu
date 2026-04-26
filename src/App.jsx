import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MenuSection from './components/MenuSection'
import Footer from './components/Footer'
import { ACTIVE_VENUE, venues } from './config/venue'

export default function App() {
  useEffect(() => {
    const colors = venues[ACTIVE_VENUE].colors
    const root = document.documentElement
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
  }, [])

  return (
    <main className="bg-bg-deep min-h-screen">
      <Navbar />
      <Hero />
      <MenuSection />
      <Footer />
    </main>
  )
}