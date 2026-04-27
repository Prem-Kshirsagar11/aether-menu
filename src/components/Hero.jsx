import { ACTIVE_VENUE } from '../config/venue'
import MatkaBiryaniHero from './heroes/MatkaBiryaniHero'
import HotelHero from './heroes/HotelHero'
import CafeHero from './heroes/CafeHero'

export default function Hero() {
  if (ACTIVE_VENUE === 'matkabiryani') return <MatkaBiryaniHero />
  if (ACTIVE_VENUE === 'sundar')       return <HotelHero />
  if (ACTIVE_VENUE === 'mauli')        return <HotelHero />
  if (ACTIVE_VENUE === 'dosacafe') return <HotelHero />
  if (ACTIVE_VENUE === 'cafe')         return <CafeHero />
  return <HotelHero />
}