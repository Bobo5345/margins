import { gsap, MQ } from '../lib/motion'

const MOTION = `${MQ.desktop}, ${MQ.mobile}`

/**
 * THE HOOK. Digital things literally fade away while the ink line stays.
 * Desktop: a short pinned, scrubbed scene. Mobile: no pin (it eats the
 * screen), so each line simply dims as it scrolls past.
 */
export function hookScene(mm, root) {
  const q = gsap.utils.selector(root)

  mm.add(MQ.desktop, () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: '+=140%',
        pin: true,
        scrub: 0.6,
      },
    })
    tl.from(q('.hook__lead'), { autoAlpha: 0, y: 30, duration: 1 })
      .from(q('.hook__fade'), { autoAlpha: 0, y: 24, stagger: 0.5, duration: 1 }, '+=0.2')
      .to(q('.hook__fade'), { autoAlpha: 0.12, stagger: 0.35, duration: 1 }, '+=0.5')
      .to(q('.hook__lead'), { autoAlpha: 0.12, duration: 1 }, '<')
      .from(q('.hook__stays'), { autoAlpha: 0, y: 30, duration: 1.2 }, '-=0.3')
      .from(q('.hook__stays-mark'), { scaleX: 0, transformOrigin: 'left center', duration: 1 })
      .to({}, { duration: 0.6 }) // a beat of stillness before releasing the pin
  })

  mm.add(MQ.mobile, () => {
    q('.hook__fade').forEach((el) => {
      gsap.fromTo(
        el,
        { autoAlpha: 1 },
        {
          autoAlpha: 0.15,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 45%', end: 'top 15%', scrub: true },
        },
      )
    })
    gsap.from(q('.hook__stays-mark'), {
      scaleX: 0,
      transformOrigin: 'left center',
      scrollTrigger: { trigger: q('.hook__stays')[0], start: 'top 75%' },
    })
  })
}

/**
 * "A thought. A story. A sketch." Each word is set down on the page
 * with a slightly different tilt, like pieces placed by hand.
 */
export function placedWords(mm, root) {
  const q = gsap.utils.selector(root)
  mm.add(MOTION, () => {
    gsap.from(q('.placed'), {
      autoAlpha: 0,
      y: 22,
      rotate: (i) => (i % 2 ? 4 : -4),
      stagger: 0.14,
      duration: 0.8,
      ease: 'back.out(1.6)',
      scrollTrigger: { trigger: q('.placed-list')[0], start: 'top 75%' },
    })
  })
}

/**
 * The emotional climax: the page arrives, then the handwriting is circled.
 */
export function futureScene(mm, root) {
  const q = gsap.utils.selector(root)

  mm.add(MOTION, () => {
    gsap.from(q('.future__page'), {
      autoAlpha: 0,
      y: 60,
      rotate: -5,
      duration: 1.4,
      scrollTrigger: { trigger: q('.future__page')[0], start: 'top 85%' },
    })

    const circle = q('.mag-circle path')[0]
    if (circle) {
      const len = circle.getTotalLength()
      gsap.fromTo(
        circle,
        { strokeDasharray: len, strokeDashoffset: len },
        {
          strokeDashoffset: 0,
          duration: 1.3,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: q('.future__finding')[0], start: 'top 85%' },
        },
      )
    }
  })
}
