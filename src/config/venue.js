// ─────────────────────────────────────────────
//  CHANGE THIS ONE LINE TO SWITCH THE VENUE
// ─────────────────────────────────────────────
const DEFAULT_VENUE = 'sundar'
export const ACTIVE_VENUE = localStorage.getItem('activeVenue') || DEFAULT_VENUE
// Options: 'sundar' | 'mauli' | 'matkabiryani' | 'cafe'
// ─────────────────────────────────────────────

export const venues = {

  sundar: {
    colors: {
      '--gold':       '#c9a84c',
      '--gold-light': '#e8c97a',
      '--gold-dim':   '#7a6330',
      '--divider':    'rgba(201,168,76,0.18)',
    },
    titleLines: [
      {
        text: 'Hotel',
        font: "'Cormorant Garamond', serif",
        weight: 300,
        italic: false,
        size: 'clamp(1.6rem, 5vw, 4rem)',
        color: 'var(--cream)',
        spacing: '0.18em',
      },
      {
        text: 'सुंदर',
        font: "'Rozha One', serif",
        weight: 400,
        italic: false,
        size: 'clamp(3rem, 11vw, 9rem)',
        color: 'var(--cream)',
        spacing: '0.04em',
      },
    ],
    eyebrow: 'Est. 2024 · Pure Vegetarian',
    tagline: 'a warm welcome, always',
    pageTitle: 'Hotel Sundar — Fine Dining',
  },

  mauli: {
    colors: {
      '--gold':       '#c9a84c',
      '--gold-light': '#e8c97a',
      '--gold-dim':   '#7a6330',
      '--divider':    'rgba(201,168,76,0.18)',
    },
    titleLines: [
      {
        text: 'Hotel',
        font: "'Cormorant Garamond', serif",
        weight: 300,
        italic: false,
        size: 'clamp(1.6rem, 5vw, 4rem)',
        color: 'var(--cream)',
        spacing: '0.18em',
      },
      {
        text: 'माउली',
        font: "'Rozha One', serif",
        weight: 400,
        italic: false,
        size: 'clamp(3rem, 11vw, 9rem)',
        color: 'var(--cream)',
        spacing: '0.04em',
      },
    ],
    eyebrow: 'Est. 2024 · Pure Vegetarian',
    tagline: 'blessed food, crafted with love',
    pageTitle: 'Hotel Mauli — Fine Dining',
  },

  matkabiryani: {
    colors: {
      '--gold':       '#d4832a',
      '--gold-light': '#e8a455',
      '--gold-dim':   '#8a5218',
      '--divider':    'rgba(212,131,42,0.2)',
    },
    titleLines: [
      {
        text: 'मटका',
        font: "'Rozha One', serif",
        weight: 400,
        italic: false,
        size: 'clamp(3rem, 12vw, 9rem)',
        color: 'var(--cream)',
        spacing: '0.04em',
      },
      {
        text: 'बिर्याणी',
        font: "'Rozha One', serif",
        weight: 400,
        italic: false,
        size: 'clamp(2.2rem, 8vw, 6.5rem)',
        color: 'var(--gold)',
        spacing: '0.04em',
      },
    ],
    eyebrow: 'Dum Cooked · Slow Spiced',
    tagline: 'the old way. the only way.',
    pageTitle: 'Matka Biryani — Dum Cooked',
  },

  cafe: {
    colors: {
      '--gold':       '#a0826d',
      '--gold-light': '#c4a090',
      '--gold-dim':   '#6b5244',
      '--divider':    'rgba(160,130,109,0.2)',
    },
    titleLines: [
      {
        text: 'Café',
        font: "'Italiana', serif",
        weight: 400,
        italic: false,
        size: 'clamp(3.5rem, 13vw, 10rem)',
        color: 'var(--cream)',
        spacing: '0.08em',
      },
      {
        text: 'a quiet corner',
        font: "'Cormorant Garamond', serif",
        weight: 300,
        italic: true,
        size: 'clamp(1rem, 3vw, 2.2rem)',
        color: 'var(--gold)',
        spacing: '0.14em',
      },
    ],
    eyebrow: 'Brews · Bakes · Bites',
    tagline: 'slow coffee, good light',
    pageTitle: 'Café — A Quiet Corner',
  },

}