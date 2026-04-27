import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ACTIVE_VENUE, venues } from '../config/venue'

const navLinks = [
  { label: 'Starters',  href: '#menu' },
  { label: 'Mains',     href: '#menu' },
  { label: 'Desserts',  href: '#menu' },
  { label: 'Reserve',   href: '#reserve' },
]

const venueOptions = [
  { key: 'sundar',       label: 'Hotel Sundar' },
  { key: 'mauli',        label: 'Hotel Mauli' },
  { key: 'matkabiryani', label: 'Matka Biryani' },
  { key: 'cafe',         label: 'Café' },
  { key: 'dosacafe',     label: 'Dosa Cafe' },
]

function switchVenue(key) {
  localStorage.setItem('activeVenue', key)
  window.location.reload()
}

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false)
  const [menuOpen, setMenuOpen]       = useState(false)
  const [showSwitcher, setShowSwitcher] = useState(false)
  const [active, setActive]           = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function handleNavClick(e, link) {
    e.preventDefault()
    setActive(link.label)
    setMenuOpen(false)
    const target = document.querySelector(link.href)
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 64
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12"
        style={{ height: 64 }}
        animate={{
          backgroundColor: scrolled ? 'rgba(10,9,6,0.92)' : 'rgba(10,9,6,0)',
          borderBottom: scrolled
            ? '1px solid rgba(201,168,76,0.12)'
            : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {/* Logo */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col items-start leading-none"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.6, duration: 0.7 }}
        >
          {venues[ACTIVE_VENUE].titleLines.map((line, i) => (
            <span
              key={i}
              style={{
                fontFamily: line.font,
                fontWeight: line.weight,
                fontStyle: line.italic ? 'italic' : 'normal',
                fontSize: i === 0
                  ? 'clamp(0.6rem, 1.5vw, 0.85rem)'
                  : 'clamp(1rem, 2.5vw, 1.5rem)',
                color: line.color,
                letterSpacing: line.spacing,
                lineHeight: 1.15,
              }}
            >
              {line.text}
            </span>
          ))}
        </motion.button>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              className="relative font-body font-light uppercase transition-colors duration-300"
              style={{
                fontSize: 11,
                letterSpacing: '0.22em',
                color: active === link.label ? 'var(--gold)' : 'var(--cream-muted)',
                textDecoration: 'none',
                padding: '8px 0',
              }}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 + i * 0.08, duration: 0.5 }}
            >
              {link.label}
              {active === link.label && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-px"
                  style={{ background: 'var(--gold)' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </motion.a>
          ))}
        </nav>

        {/* Reserve — desktop */}
        <motion.a
          href="#reserve"
          onClick={(e) => handleNavClick(e, { label: 'Reserve', href: '#reserve' })}
          className="hidden md:block font-body font-light uppercase px-5 py-2 transition-all duration-300"
          style={{
            fontSize: 10,
            letterSpacing: '0.22em',
            border: '1px solid var(--gold-dim)',
            color: 'var(--gold)',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--gold)'
            e.currentTarget.style.color = 'var(--bg-deep)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'none'
            e.currentTarget.style.color = 'var(--gold)'
          }}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.0, duration: 0.6 }}
        >
          Reserve
        </motion.a>

        {/* Hamburger */}
        <motion.button
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10"
          onClick={() => { setMenuOpen(v => !v); setShowSwitcher(false) }}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          aria-label="Toggle menu"
        >
          <motion.span
            className="block h-px w-6"
            style={{ background: 'var(--cream)' }}
            animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block h-px w-6"
            style={{ background: 'var(--cream)' }}
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block h-px w-6"
            style={{ background: 'var(--cream)' }}
            animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ background: 'rgba(10,9,6,0.97)' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <AnimatePresence mode="wait">

              {/* ── Main menu view ── */}
              {!showSwitcher && (
                <motion.div
                  key="main"
                  className="flex flex-col items-center gap-8 w-full px-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link)}
                      className="font-display italic text-cream transition-colors duration-300"
                      style={{
                        fontSize: 'clamp(2rem, 8vw, 3rem)',
                        textDecoration: 'none',
                        letterSpacing: '0.06em',
                        color: 'var(--cream)',
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.4 }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--cream)'}
                    >
                      {link.label}
                    </motion.a>
                  ))}

                  {/* Divider */}
                  <div style={{ height: 1, width: 48, background: 'var(--divider)' }} />

                  {/* Reserve button */}
                  <motion.a
                    href="#reserve"
                    onClick={(e) => handleNavClick(e, { label: 'Reserve', href: '#reserve' })}
                    className="font-body uppercase px-8 py-3"
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.25em',
                      border: '1px solid var(--gold-dim)',
                      color: 'var(--gold)',
                      textDecoration: 'none',
                      minHeight: 44,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.32, duration: 0.4 }}
                  >
                    Reserve a Table
                  </motion.a>

                  {/* Switch venue button */}
                  <motion.button
                    onClick={() => setShowSwitcher(true)}
                    className="font-body uppercase"
                    style={{
                      fontSize: 9,
                      letterSpacing: '0.28em',
                      color: 'var(--cream-muted)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      minHeight: 44,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                  >
                    <span style={{
                      display: 'inline-block',
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: 'var(--gold)',
                    }} />
                    Switch Venue
                  </motion.button>
                </motion.div>
              )}

              {/* ── Venue switcher view ── */}
              {showSwitcher && (
                <motion.div
                  key="switcher"
                  className="flex flex-col items-center w-full px-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Back button */}
                  <button
                    onClick={() => setShowSwitcher(false)}
                    className="font-body uppercase mb-10 self-start flex items-center gap-2"
                    style={{
                      fontSize: 9,
                      letterSpacing: '0.25em',
                      color: 'var(--cream-muted)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      minHeight: 44,
                    }}
                  >
                    ← Back
                  </button>

                  <p
                    className="font-body uppercase mb-8 text-center"
                    style={{ fontSize: 9, letterSpacing: '0.3em', color: 'var(--gold)' }}
                  >
                    Select Venue
                  </p>

                  <div className="flex flex-col w-full gap-1">
                    {venueOptions.map((v, i) => {
                      const isActive = ACTIVE_VENUE === v.key
                      return (
                        <motion.button
                          key={v.key}
                          onClick={() => switchVenue(v.key)}
                          className="flex items-center justify-between w-full py-4 px-2"
                          style={{
                            background: 'none',
                            border: 'none',
                            borderBottom: '1px solid var(--divider)',
                            cursor: isActive ? 'default' : 'pointer',
                          }}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06, duration: 0.35 }}
                        >
                          <span
                            className="font-display italic"
                            style={{
                              fontSize: 'clamp(1.4rem, 5vw, 1.9rem)',
                              color: isActive ? 'var(--gold)' : 'var(--cream)',
                              letterSpacing: '0.04em',
                            }}
                          >
                            {v.label}
                          </span>

                          {/* Toggle pill */}
                          <div
                            style={{
                              width: 42,
                              height: 24,
                              borderRadius: 12,
                              background: isActive ? 'var(--gold)' : 'rgba(255,255,255,0.08)',
                              border: '1px solid var(--gold-dim)',
                              position: 'relative',
                              flexShrink: 0,
                              transition: 'background 0.3s',
                            }}
                          >
                            <div
                              style={{
                                position: 'absolute',
                                top: 3,
                                left: isActive ? 20 : 3,
                                width: 16,
                                height: 16,
                                borderRadius: '50%',
                                background: isActive ? 'var(--bg-deep)' : 'var(--cream-muted)',
                                transition: 'left 0.3s',
                              }}
                            />
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>

                  <p
                    className="font-body text-center mt-8"
                    style={{ fontSize: 9, letterSpacing: '0.15em', color: 'var(--cream-muted)' }}
                  >
                    Switching reloads the page
                  </p>
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}