import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ACTIVE_VENUE, venues } from '../../config/venue'

function Steam() {
  return (
    <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}>
      <div className="steam-wisp steam-a" style={{ left: 0, opacity: 0.6 }} />
      <div className="steam-wisp steam-b" style={{ opacity: 0.5 }} />
      <div className="steam-wisp steam-c" style={{ opacity: 0.4 }} />
    </div>
  )
}

function scrollToMenu() {
  const target = document.querySelector('#menu')
  if (target) {
    const top = target.getBoundingClientRect().top + window.scrollY - 64
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

const items = [
  {
    id: 1,
    src: '/cafe-1.png',
    style: { top: '14%', left: '-18%' },
    size: 'clamp(300px, 80vw, 380px)',
    delay: 0,
    duration: 6.4,
    yRange: 9,
    rotate: [-2, 1.5],
    opacity: 0.72,
    blur: 0.8,
    tilt: -14,
  },
  {
    id: 2,
    src: '/cafe-2.png',
    style: { top: '55%', right: '-4%' },
    size: 'clamp(40px, 34vw, 175px)',
    delay: 1.6,
    duration: 7.0,
    yRange: 8,
    rotate: [1.5, -1],
    opacity: 0.55,
    blur: 1.2,
    tilt: 12,
  },
  {
    id: 3,
    src: '/cafe-3.png',
    style: { bottom: '20%', left: '-20%', transform: 'translateX(-50%)' },
    size: 'clamp(225px, 55vw, 300px)',
    delay: 0.8,
    duration: 6.8,
    yRange: 7,
    rotate: [-1, 1],
    opacity: 0.82,
    blur: 0.8,
    tilt: -12,
  },
]
// ── Steam position over cafe-1 coffee cup ──
const steamPos = {
  top: '13%',
  left: '17%',
}
function FloatingItem({ item, reduced }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        width: item.size,
        zIndex: 2,
        ...item.style,
      }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={
        reduced
          ? { opacity: item.opacity }
          : {
              opacity: item.opacity,
              y: [0, -item.yRange, 0],
              rotate: item.rotate,
            }
      }
      transition={
        reduced
          ? { duration: 0.8 }
          : {
              opacity: { duration: 1.2, delay: item.delay },
              y: {
                duration: item.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: item.delay,
              },
              rotate: {
                duration: item.duration * 1.2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: item.delay,
                repeatType: 'reverse',
              },
            }
      }
    >
      <img
  src={item.src}
  alt=""
  loading="eager"
  onLoad={item.id === 1 ? item.onLoad : undefined}
  style={{
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
    transform: `rotate(${item.tilt ?? 0}deg)`,
    filter: `blur(${item.blur}px) drop-shadow(0 10px 28px rgba(0,0,0,0.6))`,
    willChange: reduced ? 'auto' : 'transform',
  }}
/>
    </motion.div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0 },
}

export default function CafeHero() {
  const reduced = useReducedMotion()
  const venue = venues[ACTIVE_VENUE]
const [coffeeLoaded, setCoffeeLoaded] = useState(false)
  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden"
      style={{ background: 'var(--bg-deep)' }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 50% at 50% 48%, rgba(120,70,20,0.1) 0%, transparent 68%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

{coffeeLoaded && <div
  style={{
    position: 'absolute',
    zIndex: 3,
    pointerEvents: 'none',
    top: steamPos.top,
    left: steamPos.left,
  }}
>
  <Steam />
</div>}
      {items.map(item => (
  <FloatingItem
    key={item.id}
    item={{ ...item, onLoad: item.id === 1 ? () => setCoffeeLoaded(true) : undefined }}
    reduced={reduced}
  />
))}

      <div className="relative flex flex-col items-center z-10 text-center">

        <motion.div
          style={{ width: 1, height: 52, background: 'var(--gold-dim)', marginBottom: 28 }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.9 }}
        />

        <motion.p
          className="font-body uppercase text-gold mb-6"
          style={{ fontSize: 'clamp(9px, 2.2vw, 11px)', letterSpacing: '0.28em' }}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          {venue.eyebrow}
        </motion.p>

        <div className="flex flex-col items-center mb-2">
          {venue.titleLines.map((line, i) => (
            <motion.h1
              key={i}
              className="text-center leading-none"
              style={{
                fontFamily: line.font,
                fontWeight: line.weight,
                fontStyle: line.italic ? 'italic' : 'normal',
                fontSize: line.size,
                color: line.color,
                letterSpacing: line.spacing,
                lineHeight: i === 0 ? 1.05 : 1.2,
                marginBottom: i < venue.titleLines.length - 1 ? '0.1em' : 0,
                textShadow: '0 2px 20px rgba(0,0,0,0.7)',
              }}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.4 + i * 0.18, duration: 0.9 }}
            >
              {line.text}
            </motion.h1>
          ))}
        </div>

        <motion.div
          className="flex items-center gap-4 mt-7 mb-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.82, duration: 0.8 }}
        >
          <div style={{ width: 44, height: 1, background: 'var(--divider)' }} />
          <div style={{ width: 5, height: 5, background: 'var(--gold)', transform: 'rotate(45deg)' }} />
          <div style={{ width: 44, height: 1, background: 'var(--divider)' }} />
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
          {venue.tagline}
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
        >
          <motion.div
            animate={reduced ? {} : { y: [0, 7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 1,
              height: 36,
              background: 'linear-gradient(to bottom, var(--gold), transparent)',
            }}
          />
        </motion.button>

      </div>
    </section>
  )
}