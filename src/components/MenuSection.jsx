import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const menuData = {
  Starters: [
    {
      name: 'Paneer Tikka',
      description: 'Cottage cheese marinated in saffron yogurt and spices, char-grilled in a clay oven. Served with mint chutney and pickled onions.',
      price: '₹480',
      tag: "Chef's Pick",
      image: '/paneer-tikka.jpg',
    },
    {
      name: 'Veg Seekh Kebab',
      description: 'A refined blend of seasoned chickpeas, paneer, and roasted spices, hand-rolled on skewers and finished over charcoal.',
      price: '₹420',
      tag: null,
      image: '/veg-seekh-kebab.jpg',
    },
    {
      name: 'Misal Pav',
      description: 'Sprouted moth beans in a slow-cooked spiced gravy, topped with farsan and fresh lime. Served with butter-toasted pav.',
      price: '₹320',
      tag: 'Regional Favourite',
      image: '/misal-pav.jpg',
    },
  ],
  Mains: [
    {
      name: 'Dal Tadka',
      description: 'Yellow lentils tempered with clarified butter, cumin, garlic, and dried red chilli. A timeless preparation, elevated.',
      price: '₹360',
      tag: null,
      image: '/dal-tadka.jpg',
    },
    {
      name: 'Veg Biryani',
      description: 'Aged basmati layered with seasonal vegetables, whole spices, and saffron milk. Sealed and slow-cooked in the dum method.',
      price: '₹520',
      tag: 'Signature',
      image: '/veg-biryani.jpg',
    },
    {
      name: 'Paneer Butter Masala',
      description: 'Soft cottage cheese in a velvety tomato and cream sauce, finished with kashmiri chilli and a touch of honey.',
      price: '₹480',
      tag: null,
      image: '/paneer-butter-masala.jpg',
    },
  ],
  'Breads & Sides': [
    {
      name: 'Garlic Naan',
      description: 'Hand-stretched leavened bread, charred in a clay oven and brushed with cultured butter, roasted garlic, and coriander.',
      price: '₹120',
      tag: null,
      image: '/garlic-naan.jpg',
    },
    {
      name: 'Tandoori Roti',
      description: 'Whole wheat flatbread, baked directly on the walls of a clay oven. Light, slightly smoky, and perfectly blistered.',
      price: '₹80',
      tag: null,
      image: '/tandoori-roti.jpg',
    },
    {
      name: 'Cucumber Raita',
      description: 'Chilled whipped yogurt with hand-grated cucumber, roasted cumin, and fresh mint. A cooling counterpoint to the meal.',
      price: '₹160',
      tag: 'Cooling',
      image: '/cucumber-raita.jpg',
    },
  ],
  Desserts: [
    {
      name: 'Gulab Jamun',
      description: 'Slow-fried milk-solid dumplings in cardamom and rose water syrup. Served warm alongside a quenelle of clotted cream.',
      price: '₹280',
      tag: 'Signature',
      image: '/gulab-jamun.jpg',
    },
    {
      name: 'Rasmalai',
      description: 'Delicate cottage cheese medallions poached in chilled saffron milk, garnished with crushed pistachios and dried rose petals.',
      price: '₹320',
      tag: "Chef's Pick",
      image: '/rasmalai.jpg',
    },
  ],
}

const categories = Object.keys(menuData)

const tagColors = {
  "Chef's Pick":       { bg: 'rgba(201,168,76,0.12)',  text: 'var(--gold)' },
  'Signature':         { bg: 'rgba(201,168,76,0.12)',  text: 'var(--gold)' },
  'Regional Favourite':{ bg: 'rgba(76,140,201,0.12)',  text: '#8ab8e0' },
  'Cooling':           { bg: 'rgba(76,168,140,0.12)',  text: '#7ecfb8' },
}

/* Fallback shown when image is missing */
function ImagePlaceholder() {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-2"
      style={{ background: 'var(--bg-card)' }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          border: '1px solid var(--divider)',
        }}
      />
      <span
        className="font-body uppercase"
        style={{ fontSize: 8, letterSpacing: '0.2em', color: 'var(--gold-dim)' }}
      >
        Photo
      </span>
    </div>
  )
}

function DishCard({ item, index }) {
  const [hovered, setHovered] = useState(false)
  const [imgError, setImgError]   = useState(false)
  const tag = item.tag ? tagColors[item.tag] : null

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top hairline */}
      <div style={{ height: 1, background: 'var(--divider)' }} />

      <div
        className="flex gap-5 py-6"
        style={{
          background: hovered ? 'rgba(201,168,76,0.025)' : 'transparent',
          transition: 'background 0.35s',
        }}
      >

        {/* Image — 4:5 aspect, fixed width */}
        <div
          className="flex-shrink-0 overflow-hidden"
          style={{
            width: 'clamp(80px, 18vw, 112px)',
            aspectRatio: '4 / 5',
            border: '1px solid var(--divider)',
          }}
        >
          {imgError ? (
            <ImagePlaceholder />
          ) : (
            <img
              src={item.image}
              alt={item.name}
              onError={() => setImgError(true)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                filter: hovered ? 'brightness(1.08)' : 'brightness(0.92)',
                transition: 'filter 0.4s, transform 0.5s',
                transform: hovered ? 'scale(1.04)' : 'scale(1)',
              }}
            />
          )}
        </div>

        {/* Text content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between py-1">

          {/* Name + tag row */}
          <div>
            <div className="flex flex-wrap items-start gap-2 mb-2">
              <h3
                className="font-display leading-tight"
                style={{
                  fontSize: 'clamp(1.15rem, 2.4vw, 1.55rem)',
                  color: hovered ? 'var(--gold-light)' : 'var(--cream)',
                  letterSpacing: '0.02em',
                  transition: 'color 0.3s',
                }}
              >
                {item.name}
              </h3>
              {tag && (
                <span
                  className="font-body uppercase flex-shrink-0"
                  style={{
                    fontSize: 8,
                    letterSpacing: '0.18em',
                    padding: '3px 7px',
                    marginTop: 4,
                    background: tag.bg,
                    color: tag.text,
                  }}
                >
                  {item.tag}
                </span>
              )}
            </div>

            {/* Description */}
            <p
              className="font-body font-light"
              style={{
                fontSize: 'clamp(0.74rem, 1.4vw, 0.825rem)',
                color: 'var(--cream-muted)',
                lineHeight: 1.75,
              }}
            >
              {item.description}
            </p>
          </div>

          {/* Price — anchored to bottom */}
          <div className="flex items-center gap-3 mt-4">
            <div style={{ height: 1, width: 16, background: 'var(--gold-dim)' }} />
            <span
              className="font-display"
              style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
                color: 'var(--gold)',
                letterSpacing: '0.06em',
              }}
            >
              {item.price}
            </span>
          </div>

        </div>
      </div>
    </motion.div>
  )
}

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('Starters')
  const tabsRef = useRef(null)
  const items = menuData[activeCategory]

  return (
    <section id="menu" style={{ paddingBottom: 120 }}>

      {/* Section Header */}
      <div className="flex flex-col items-center pt-24 pb-16 px-6">
        <p
          className="font-body uppercase text-gold mb-4"
          style={{ fontSize: 10, letterSpacing: '0.3em' }}
        >
          Purely Vegetarian
        </p>
        <h2
          className="font-display text-center"
          style={{
            fontSize: 'clamp(2.4rem, 6vw, 5rem)',
            color: 'var(--cream)',
            letterSpacing: '0.04em',
            lineHeight: 1,
          }}
        >
          The Menu
        </h2>
        <div className="flex items-center gap-4 mt-6">
          <div className="w-12 h-px" style={{ background: 'var(--divider)' }} />
          <div className="w-1 h-1 rotate-45" style={{ background: 'var(--gold-dim)' }} />
          <div className="w-12 h-px" style={{ background: 'var(--divider)' }} />
        </div>
      </div>

      {/* Sticky Tab Bar */}
      <div
        ref={tabsRef}
        className="sticky top-16 z-30 flex justify-center px-4"
        style={{
          background: 'rgba(10,9,6,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--divider)',
          borderTop: '1px solid var(--divider)',
        }}
      >
        <div className="flex items-center overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="relative font-body uppercase py-5 px-5 transition-colors duration-300"
                style={{
                  fontSize: 10,
                  letterSpacing: '0.2em',
                  color: isActive ? 'var(--gold)' : 'var(--cream-muted)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  minHeight: 44,
                }}
              >
                {cat}
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0"
                    style={{ height: 1, background: 'var(--gold)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 mt-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {items.map((item, i) => (
              <DishCard key={item.name} item={item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom note */}
        <div className="flex flex-col items-center mt-16 gap-3">
          <div className="h-px w-24" style={{ background: 'var(--divider)' }} />
          <p
            className="font-body text-center"
            style={{
              fontSize: 10,
              letterSpacing: '0.2em',
              color: 'var(--cream-muted)',
              textTransform: 'uppercase',
            }}
          >
            100% vegetarian &nbsp;·&nbsp; All prices inclusive of taxes &nbsp;·&nbsp; Menu changes seasonally
          </p>
        </div>
      </div>

    </section>
  )
}