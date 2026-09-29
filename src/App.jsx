import { useEffect, useRef } from 'react'
import { initLenis } from './lib/lenis'
import { ScrollTrigger } from './lib/motion'
import { useGsap } from './lib/useGsap'
import { initReveals } from './animations/textReveal'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Intro from './components/Intro'
import WhyHandwritten from './components/WhyHandwritten'
import MagazinePreview from './components/MagazinePreview'
import Contributions from './components/Contributions'
import Imperfect from './components/Imperfect'
import Collective from './components/Collective'
import FutureMemory from './components/FutureMemory'
import HowTo from './components/HowTo'
import FinalCta from './components/FinalCta'
import Footer from './components/Footer'

export default function App() {
  const ref = useRef(null)

  // Parent layout effects run after children's, so pinned sections exist
  // (with their pin spacing) before the shared reveal batch measures.
  useGsap(ref, (mm) => initReveals(mm))

  useEffect(() => {
    const destroy = initLenis()
    // Web fonts change line heights; re-measure once they've landed.
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return () => destroy?.()
  }, [])

  return (
    <div className="page" ref={ref}>
      <div className="veil" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div className="margin-rule" aria-hidden="true" />
      <a className="skip" href="#why">Skip to content</a>

      <Navbar />
      <main>
        <Hero />
        <Intro />
        <WhyHandwritten />
        <MagazinePreview />
        <Contributions />
        <Imperfect />
        <Collective />
        <FutureMemory />
        <HowTo />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}
