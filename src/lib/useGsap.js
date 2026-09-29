import { useLayoutEffect } from 'react'
import { gsap } from './motion'

/**
 * Scope every component's animations to a gsap.context so that
 * tweens + ScrollTriggers are reverted on unmount (and on StrictMode's
 * double-invoke in dev). `setup` receives the matchMedia instance so
 * components can author desktop/mobile/reduced variants.
 */
export function useGsap(scopeRef, setup, deps = []) {
  useLayoutEffect(() => {
    if (!scopeRef.current) return
    const mm = gsap.matchMedia()
    const ctx = gsap.context(() => setup(mm, scopeRef.current), scopeRef)
    return () => {
      mm.revert()
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
