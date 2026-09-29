import { gsap, MQ } from '../lib/motion'

/**
 * POEM, IDEA, MEMORY... appear where they sit on the stage, then gather
 * into the centre and become ONE MAGAZINE.
 * Offsets are functions + invalidateOnRefresh, so they re-measure on resize.
 */
export function collectiveGather(mm, root) {
  const q = gsap.utils.selector(root)
  const stage = q('.collective__stage')[0]
  const words = q('.collective__word')
  const title = q('.collective__one')[0]

  // Distance from a word's centre to the stage's centre, ignoring the
  // word's own current transform so repeated refreshes stay stable.
  const toCentre = (el, axis) => {
    const s = stage.getBoundingClientRect()
    const r = el.getBoundingClientRect()
    const current = gsap.getProperty(el, axis)
    return axis === 'x'
      ? s.left + s.width / 2 - (r.left + r.width / 2) + current
      : s.top + s.height / 2 - (r.top + r.height / 2) + current
  }

  const build = (scrollTrigger) => {
    gsap
      .timeline({ scrollTrigger })
      .from(words, {
        autoAlpha: 0,
        y: 30,
        rotate: (i) => (i % 2 ? 7 : -7),
        stagger: 0.12,
        duration: 0.8,
      })
      .to(
        words,
        {
          x: (i, el) => toCentre(el, 'x'),
          y: (i, el) => toCentre(el, 'y'),
          scale: 0.35,
          rotate: 0,
          autoAlpha: 0,
          duration: 1.2,
          stagger: { each: 0.05, from: 'edges' },
          ease: 'power2.in',
        },
        '+=0.5',
      )
      .fromTo(title, { autoAlpha: 0, scale: 0.75 }, { autoAlpha: 1, scale: 1, duration: 1 }, '-=0.35')
  }

  mm.add(MQ.desktop, () =>
    build({ trigger: root, start: 'top top', end: '+=130%', pin: true, scrub: 0.7, invalidateOnRefresh: true }),
  )

  // Mobile: no pin. Plays once when the stage comes into view.
  mm.add(MQ.mobile, () => build({ trigger: stage, start: 'top 65%', once: true }))

  mm.add(MQ.reduced, () => gsap.set(title, { autoAlpha: 1 }))
}
