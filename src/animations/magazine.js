import { gsap, MQ } from '../lib/motion'

/**
 * The flat magazine page settles onto the desk as you scroll, and the
 * loose bits on top (sticky note, photo) drift at slightly different
 * speeds. Parallax distances are much smaller on mobile.
 */
export function magazineScroll(mm, root) {
  const q = gsap.utils.selector(root)

  const build = (drift) => {
    const st = { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.8 }

    gsap.fromTo(
      q('.mag-page'),
      { scale: 0.92, rotate: -3, y: drift },
      { scale: 1, rotate: -0.8, y: -drift * 0.4, ease: 'none', scrollTrigger: st },
    )
    gsap.fromTo(q('.mag-sticky'), { y: drift * 1.2, rotate: 9 }, { y: -drift, rotate: 4, ease: 'none', scrollTrigger: st })
    gsap.fromTo(q('.mag-photo'), { y: drift * 0.8 }, { y: -drift * 0.6, ease: 'none', scrollTrigger: st })
  }

  mm.add(MQ.desktop, () => build(80))
  mm.add(MQ.mobile, () => build(24))
}
