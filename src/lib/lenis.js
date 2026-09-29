import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './motion'

let lenis = null

/**
 * One scroll system: Lenis drives the wheel, GSAP's ticker drives Lenis,
 * and ScrollTrigger listens to Lenis. Touch devices keep native scrolling
 * (syncTouch stays off) so we never fight iOS/Android momentum.
 */
export function initLenis() {
  if (prefersReducedMotion()) return null

  lenis = new Lenis({
    lerp: 0.12, // snappy enough to feel in control, soft enough to feel smooth
    wheelMultiplier: 1,
    smoothWheel: true,
  })

  const raf = (time) => lenis.raf(time * 1000)
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)

  return () => {
    gsap.ticker.remove(raf)
    lenis.destroy()
    lenis = null
  }
}

export function scrollToTarget(target) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: -24, duration: 1.2 })
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}
