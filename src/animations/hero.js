import { gsap, MQ } from '../lib/motion'

const MOTION = `${MQ.desktop}, ${MQ.mobile}`

/**
 * The page-load sequence. Kept under ~2s, and nothing blocks input:
 * the veil is pointer-events:none, so the CTA is clickable immediately.
 */
export function heroIntro(mm, root) {
  const q = gsap.utils.selector(root)
  // Page-level overlays live outside the hero, so select them explicitly
  // (selector strings inside a gsap.context resolve within its scope).
  const veil = document.querySelector('.veil')
  const grain = document.querySelector('.grain')

  mm.add(MOTION, () => {
    const path = q('.hero__underline path')[0]
    const length = path ? path.getTotalLength() : 0

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.set(path, { strokeDasharray: length, strokeDashoffset: length })
      .set(q('.hero__inner'), { visibility: 'visible' })
      .fromTo(veil, { autoAlpha: 1 }, { autoAlpha: 0, duration: 1.1, ease: 'power2.inOut' }, 0)
      .fromTo(grain, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.4 }, 0.1)
      .from(q('.hero__line > span'), { yPercent: 110, duration: 1.1, stagger: 0.12 }, 0.25)
      .from(q('.hero__sub'), { autoAlpha: 0, y: 20, duration: 0.8 }, 0.85)
      .from(q('.hero__cta'), { autoAlpha: 0, y: 16, duration: 0.7 }, 1.0)
      .to(path, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' }, 1.15)
      .from(q('.hero__note'), { autoAlpha: 0, rotate: -6, duration: 0.6 }, 1.6)
  })

  mm.add(MQ.reduced, () => {
    gsap.set(veil, { autoAlpha: 0 })
    gsap.set(grain, { autoAlpha: 1 })
  })
}
