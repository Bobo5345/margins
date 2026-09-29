import { gsap, ScrollTrigger, MQ } from '../lib/motion'

/**
 * One batched ScrollTrigger drives every generic reveal on the page,
 * instead of one trigger per element.
 *
 *   data-reveal         -> text: fade + rise
 *   data-reveal="image" -> image: fade + settle from a slight scale
 */
export function initReveals(mm) {
  const setup = (distance) => {
    const items = gsap.utils.toArray('[data-reveal]')
    const images = items.filter((el) => el.dataset.reveal === 'image')
    const texts = items.filter((el) => el.dataset.reveal !== 'image')

    gsap.set(texts, { autoAlpha: 0, y: distance })
    gsap.set(images, { autoAlpha: 0, scale: 1.04 })

    ScrollTrigger.batch(items, {
      start: 'top 88%',
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          stagger: 0.08,
          duration: 1,
          overwrite: true,
        }),
    })
  }

  mm.add(MQ.desktop, () => setup(30))
  mm.add(MQ.mobile, () => setup(18))
  // Reduced motion: content is simply there. No transforms, no waiting.
}
