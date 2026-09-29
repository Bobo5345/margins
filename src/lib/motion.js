import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Shared animation language: one easing curve, one duration scale.
gsap.defaults({ ease: 'power3.out', duration: 0.9 })

export const MQ = {
  desktop: '(min-width: 900px) and (prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 899.98px) and (prefers-reduced-motion: no-preference)',
  reduced: '(prefers-reduced-motion: reduce)',
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia(MQ.reduced).matches

export { gsap, ScrollTrigger }
