import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

function scrollToMenu() {
  const target = document.querySelector('#menu')
  if (target) {
    const top = target.getBoundingClientRect().top + window.scrollY - 64
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

function Steam() {
  return (
    <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}>
      <div className="steam-wisp steam-a" style={{ left: 0 }} />
      <div className="steam-wisp steam-b" />
      <div className="steam-wisp steam-c" />
    </div>
  )
}

const pots = [
  {
    id: 1,
    src: '/matka-1.webp',
    style: { top: '2%', left: '6%' },
    size: 'clamp(150px, 22vw, 160px)',
    delay: 0,
    duration: 5.8,
    yRange: 10,
    rotate: [-2, 1],
    steamOffset: { top: '6%', left: '35%' },
    blur: 0.5,
    opacity: 0.7,
    tilt: 28,   // negative = tilts left, positive = tilts right
  },
  {
    id: 2,
    src: '/matka-2.webp',
    style: { top: '4%', right: '15%' },
    size: 'clamp(90px, 22vw, 160px)',
    delay: 1.3,
    duration: 6.4,
    yRange: 10,
    rotate: [1, -1.5],
    steamOffset: { top: '6%', right: '24%' },
    blur: 1.5,
    opacity: 0.55,
        tilt: -5,   // negative = tilts left, positive = tilts right

  },
  {
    id: 3,
    src: '/matka-3.webp',
    style: { top: '36%', left: '0%' },
    size: 'clamp(80px, 18vw, 140px)',
    delay: 0.6,
    duration: 7.1,
    yRange: 10,
    rotate: [-1, 2],
    steamOffset: { top: '38%', left: '8%' },
    blur: 2,
    opacity: 0.45,
        tilt: 25,   // negative = tilts left, positive = tilts right

  },
  {
    id: 4,
    src: '/matka-4.webp',
    style: { top: '40%', right: '0%' },
    size: 'clamp(100px, 18vw, 140px)',
    delay: 2.1,
    duration: 6.0,
    yRange: 10,
    rotate: [2, -1],
    steamOffset: { top: '42%', right: '8%' },
    blur: 1.0,
    opacity: 0.6,
  },
  {
    id: 5,
    src: '/matka-5.webp',
    style: { bottom: '5%', left: '20%', transform: 'translateX(-50%)' },
    size: 'clamp(200px, 60vw, 230px)',
    delay: 0.9,
    duration: 6.8,
    yRange: 7,
    rotate: [-1, 1],
    steamOffset: { bottom: '16%', left: '46%' },
    blur: 0.5,
    opacity: 0.8,
  },
]

function FloatingPot({ pot, reduced, allLoaded }) {
  return (
    <>
      {/* Steam above pot */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          zIndex: 3,
          ...pot.steamOffset,
        }}
      >
       {!reduced && allLoaded && <Steam />}
      </div>

      {/* Pot image — no circular crop, transparent PNG floats freely */}
      <motion.div
        style={{
          position: 'absolute',
          width: pot.size,
          zIndex: 2,
          ...pot.style,
        }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={
          reduced
            ? { opacity: pot.opacity }
            : {
              opacity: pot.opacity,
                y: [0, -pot.yRange, 0],
                rotate: pot.rotate,
              }
        }
        transition={
          reduced
            ? { duration: 0.8 }
            : {
                opacity: { duration: 1.2, delay: pot.delay },
                y: {
                  duration: pot.duration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: pot.delay,
                },
                rotate: {
                  duration: pot.duration * 1.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: pot.delay,
                  repeatType: 'reverse',
                },
              }
        }
      >
        <img
  src={pot.src}
  alt=""
  loading="eager"
  onLoad={pot.onLoad}
  style={{
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
    transform: `rotate(${pot.tilt ?? 0}deg)`,
    filter: `blur(${pot.blur}px) drop-shadow(0 8px 20px rgba(0,0,0,0.6))`,
    willChange: reduced ? 'auto' : 'transform',
  }}
/>
      </motion.div>
    </>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0 },
}

export default function MatkaBiryaniHero() {
  const reduced = useReducedMotion()
const [potsLoaded, setPotsLoaded] = useState(0)
const allLoaded = potsLoaded >= 4
  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden"
      style={{ background: 'var(--bg-deep)' }}
    >
      {/* Warm amber glow in center */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 70% 50% at 50% 55%, rgba(180,100,20,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Floating pots */}
      {pots.map(pot => (
  <FloatingPot
    key={pot.id}
    pot={{ ...pot, onLoad: () => setPotsLoaded(v => v + 1) }}
    reduced={reduced}
    allLoaded={allLoaded}
  />
))}

      {/* Main content */}
      <div className="relative flex flex-col items-center z-10 text-center">

        <motion.div
          style={{ width: 1, height: 48, background: 'var(--gold-dim)', marginBottom: 32 }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.9 }}
        />

        <motion.p
          className="font-body uppercase text-gold mb-5"
          style={{ fontSize: 'clamp(9px, 2.2vw, 11px)', letterSpacing: '0.28em' }}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Dum Cooked &nbsp;·&nbsp; Slow Spiced
        </motion.p>

        <motion.h1
          style={{
            fontFamily: "'Rozha One', serif",
            fontSize: 'clamp(3.2rem, 14vw, 8rem)',
            color: 'var(--cream)',
            lineHeight: 1.0,
            letterSpacing: '0.04em',
            textShadow: '0 2px 24px rgba(0,0,0,0.8)',
          }}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.42, duration: 0.9 }}
        >
          मटका
        </motion.h1>

        <motion.h1
          style={{
            fontFamily: "'Rozha One', serif",
            fontSize: 'clamp(2.2rem, 10vw, 6rem)',
            color: 'var(--gold)',
            lineHeight: 1.05,
            letterSpacing: '0.04em',
            marginBottom: '0.6em',
            textShadow: '0 2px 24px rgba(0,0,0,0.8)',
          }}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.6, duration: 0.9 }}
        >
          बिर्याणी
        </motion.h1>

        <motion.div
          className="flex items-center gap-4 mb-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.82, duration: 0.8 }}
        >
          <div style={{ width: 48, height: 1, background: 'var(--divider)' }} />
          <div style={{ width: 6, height: 6, background: 'var(--gold)', transform: 'rotate(45deg)' }} />
          <div style={{ width: 48, height: 1, background: 'var(--divider)' }} />
        </motion.div>

        <motion.p
          className="font-display italic"
          style={{
            fontSize: 'clamp(1rem, 3.5vw, 1.8rem)',
            color: 'var(--cream-muted)',
            letterSpacing: '0.06em',
            marginBottom: '2rem',
          }}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.95, duration: 0.8 }}
        >
          the old way. the only way.
        </motion.p>

        <motion.p
          className="font-body font-light uppercase"
          style={{
            fontSize: 'clamp(8px, 2vw, 10px)',
            letterSpacing: '0.2em',
            color: 'var(--cream-muted)',
            marginBottom: '3.5rem',
          }}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          Scroll to explore the menu
        </motion.p>

        <motion.button
  onClick={scrollToMenu}
  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.5, duration: 0.8 }}
  aria-label="Scroll to menu"
/>

      </div>
    </section>
  )
}