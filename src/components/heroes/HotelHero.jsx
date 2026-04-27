import { motion, useReducedMotion } from 'framer-motion'
import { ACTIVE_VENUE, venues } from '../../config/venue'

function scrollToMenu() {
  const target = document.querySelector('#menu')
  if (target) {
    const top = target.getBoundingClientRect().top + window.scrollY - 64
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

const hotelDishes = [
  { id: 1, src: '/hotel-1.png', style: { top: '10%', left: '-4%' }, size: 'clamp(180px, 62vw, 290px)', delay: 0, duration: 6.2, yRange: 10, rotate: [-2, 1.5], opacity: 0.72, blur: 0.8, tilt: 12 },
  { id: 2, src: '/hotel-2.png', style: { top: '65%', right: '-4%' }, size: 'clamp(160px, 52vw, 240px)', delay: 1.4, duration: 6.8, yRange: 9, rotate: [1, -2], opacity: 0.55, blur: 0.8, tilt: -14 },
  { id: 3, src: '/hotel-3.png', style: { top: '40%', left: '0%' }, size: 'clamp(110px, 34vw, 160px)', delay: 0.7, duration: 7.2, yRange: 11, rotate: [-1.5, 2], opacity: 0.6, blur: 0.7, tilt: 18 },
  { id: 4, src: '/hotel-4.png', style: { top: '42%', right: '-4%' }, size: 'clamp(110px, 34vw, 160px)', delay: 2.0, duration: 6.5, yRange: 9, rotate: [2, -1], opacity: 0.55, blur: 0.9, tilt: -10 },
]

const dosaDishes = [
  { id: 1, src: '/dosa-1.png', style: { top: '10%', left: '-4%' }, size: 'clamp(180px, 62vw, 290px)', delay: 0, duration: 6.2, yRange: 10, rotate: [-2, 1.5], opacity: 0.72, blur: 0.8, tilt: 12 },
  { id: 2, src: '/dosa-2.png', style: { top: '65%', right: '-4%' }, size: 'clamp(160px, 52vw, 240px)', delay: 1.4, duration: 6.8, yRange: 9, rotate: [1, -2], opacity: 0.55, blur: 0.8, tilt: -14 },
  { id: 3, src: '/hotel-1.png', style: { top: '40%', left: '0%' }, size: 'clamp(110px, 34vw, 160px)', delay: 0.7, duration: 7.2, yRange: 11, rotate: [-1.5, 2], opacity: 0.6, blur: 0.7, tilt: 18 },
  { id: 4, src: '/hotel-2.png', style: { top: '42%', right: '-4%' }, size: 'clamp(110px, 34vw, 160px)', delay: 2.0, duration: 6.5, yRange: 9, rotate: [2, -1], opacity: 0.55, blur: 0.9, tilt: -10 },
]

function FloatingDish({ dish, reduced }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        width: dish.size,
        zIndex: 2,
        ...dish.style,
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={
        reduced
          ? { opacity: dish.opacity }
          : {
              opacity: dish.opacity,
              y: [0, -dish.yRange, 0],
              rotate: dish.rotate,
            }
      }
      transition={
        reduced
          ? { duration: 0.8 }
          : {
              opacity: { duration: 1.2, delay: dish.delay },
              y: {
                duration: dish.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: dish.delay,
              },
              rotate: {
                duration: dish.duration * 1.2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: dish.delay,
                repeatType: 'reverse',
              },
            }
      }
    >
      <img
        src={dish.src}
        alt=""
        loading="lazy"
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'contain',
          transform: `rotate(${dish.tilt ?? 0}deg)`,
          filter: `blur(${dish.blur}px) drop-shadow(0 10px 28px rgba(0,0,0,0.65))`,
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

export default function HotelHero() {
  const dishes = ACTIVE_VENUE === 'dosacafe' ? dosaDishes : hotelDishes
  const reduced = useReducedMotion()
  const venue = venues[ACTIVE_VENUE]

  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden"
      style={{ background: 'var(--bg-deep)' }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(160,90,10,0.09) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {dishes.map(dish => (
        <FloatingDish key={dish.id} dish={dish} reduced={reduced} />
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
                lineHeight: 1.1,
                marginBottom: i < venue.titleLines.length - 1 ? '-0.05em' : 0,
                textShadow: '0 2px 20px rgba(0,0,0,0.8)',
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
          className="flex items-center gap-4 mt-6 mb-7"
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