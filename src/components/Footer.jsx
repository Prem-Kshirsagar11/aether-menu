import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0 },
}

const links = {
  'Experience': ['The Menu', 'Reservations', 'Private Dining', 'Chef\'s Table'],
  'Visit':      ['Location', 'Opening Hours', 'Parking', 'Accessibility'],
  'Connect':    ['Instagram', 'Contact Us', 'Press & Media', 'Careers'],
}

const hours = [
  { day: 'Monday – Thursday', time: '12:00 – 22:30' },
  { day: 'Friday – Saturday', time: '12:00 – 23:30' },
  { day: 'Sunday',            time: '12:00 – 21:00' },
]

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--divider)',
        background: 'var(--bg-deep)',
      }}
    >
      {/* Reserve Banner */}
      <motion.div
  id="reserve"
  className="flex flex-col items-center text-center px-6 py-20"
  style={{ borderBottom: '1px solid var(--divider)', scrollMarginTop: 64 }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ staggerChildren: 0.12 }}
      >
        <motion.p
          className="font-body uppercase text-gold mb-5"
          style={{ fontSize: 10, letterSpacing: '0.32em' }}
          variants={fadeUp}
          transition={{ duration: 0.7 }}
        >
          An evening awaits
        </motion.p>

        <motion.h2
          className="font-display"
          style={{
            fontSize: 'clamp(2.6rem, 7vw, 6rem)',
            color: 'var(--cream)',
            letterSpacing: '0.03em',
            lineHeight: 1,
            marginBottom: '1.5rem',
          }}
          variants={fadeUp}
          transition={{ duration: 0.8 }}
        >
          Reserve Your Table
        </motion.h2>

        <motion.p
          className="font-body font-light text-cream-muted text-center mb-10"
          style={{
            fontSize: 'clamp(0.8rem, 1.6vw, 0.95rem)',
            maxWidth: '38ch',
            lineHeight: 1.8,
            letterSpacing: '0.02em',
          }}
          variants={fadeUp}
          transition={{ duration: 0.7 }}
        >
          For groups of six or more, or for our Chef's Table experience,
          please contact us directly.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          {/* Primary CTA */}
          <button
            className="font-body uppercase px-10 py-4 transition-all duration-300"
            style={{
              fontSize: 10,
              letterSpacing: '0.25em',
              background: 'var(--gold)',
              color: 'var(--bg-deep)',
              border: 'none',
              cursor: 'pointer',
              minWidth: 180,
              minHeight: 48,
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--gold-light)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--gold)'}
          >
            Book Now
          </button>

          {/* Secondary CTA */}
          <button
            className="font-body uppercase px-10 py-4 transition-all duration-300"
            style={{
              fontSize: 10,
              letterSpacing: '0.25em',
              background: 'none',
              color: 'var(--cream-muted)',
              border: '1px solid var(--divider)',
              cursor: 'pointer',
              minWidth: 180,
              minHeight: 48,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--gold-dim)'
              e.currentTarget.style.color = 'var(--cream)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--divider)'
              e.currentTarget.style.color = 'var(--cream-muted)'
            }}
          >
            Call Us
          </button>
        </motion.div>
      </motion.div>

      {/* Main Footer Grid */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

        {/* Brand column */}
        <div className="md:col-span-1 flex flex-col gap-5">
          <span
            className="font-display"
            style={{
              fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
              color: 'var(--cream)',
              letterSpacing: '0.1em',
            }}
          >
            Aether
          </span>
          <p
            className="font-body font-light"
            style={{
              fontSize: '0.8rem',
              color: 'var(--cream-muted)',
              lineHeight: 1.8,
              maxWidth: '22ch',
            }}
          >
            A purely vegetarian fine dining experience rooted in the flavours of India.
          </p>

          {/* Divider + hours */}
          <div style={{ height: 1, background: 'var(--divider)', margin: '4px 0' }} />
          <div className="flex flex-col gap-2">
            {hours.map(h => (
              <div key={h.day} className="flex flex-col">
                <span
                  className="font-body uppercase"
                  style={{ fontSize: 8, letterSpacing: '0.18em', color: 'var(--gold-dim)' }}
                >
                  {h.day}
                </span>
                <span
                  className="font-body font-light"
                  style={{ fontSize: '0.78rem', color: 'var(--cream-muted)' }}
                >
                  {h.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Nav link columns */}
        {Object.entries(links).map(([heading, items]) => (
          <div key={heading} className="flex flex-col gap-5">
            <span
              className="font-body uppercase"
              style={{ fontSize: 9, letterSpacing: '0.28em', color: 'var(--gold)' }}
            >
              {heading}
            </span>
            <ul className="flex flex-col gap-3">
              {items.map(item => (
                <li key={item}>
                  <button
                    className="font-body font-light transition-colors duration-300"
                    style={{
                      fontSize: '0.82rem',
                      color: 'var(--cream-muted)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      textAlign: 'left',
                      letterSpacing: '0.02em',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--cream)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--cream-muted)'}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>

      {/* Bottom bar */}
      <div
        className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 md:px-12 py-6"
        style={{ borderTop: '1px solid var(--divider)' }}
      >
        <p
          className="font-body font-light"
          style={{ fontSize: 10, letterSpacing: '0.15em', color: 'var(--gold-dim)' }}
        >
          © {new Date().getFullYear()} Aether. All rights reserved.
        </p>

        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rotate-45" style={{ background: 'var(--gold-dim)' }} />
          <p
            className="font-body font-light italic"
            style={{
              fontSize: '0.72rem',
              color: 'var(--gold-dim)',
              letterSpacing: '0.06em',
            }}
          >
            Pure. Refined. Indian.
          </p>
          <div className="w-1 h-1 rotate-45" style={{ background: 'var(--gold-dim)' }} />
        </div>
      </div>

    </footer>
  )
}