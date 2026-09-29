import { useRef } from 'react'
import { SITE } from '../config'
import { useGsap } from '../lib/useGsap'
import { heroIntro } from '../animations/hero'
import CtaButton from './CtaButton'

export default function Hero() {
  const ref = useRef(null)
  useGsap(ref, heroIntro)

  return (
    <header className="hero" id="top" ref={ref}>
      <div className="wrap hero__inner">
        <h1 className="hero__title">
          <span className="hero__line"><span>Some things</span></span>
          <span className="hero__line"><span>are meant to</span></span>
          <span className="hero__line">
            <span>
              be{' '}
              <span className="hero__key">
                written.
                <svg className="hero__underline" viewBox="0 0 300 24" aria-hidden="true">
                  <path d="M4 16C60 6 130 5 190 9c40 3 70 6 104 2" />
                </svg>
              </span>
            </span>
          </span>
        </h1>

        <p className="hero__note hand" aria-hidden="true">not uploaded.</p>

        <p className="hero__sub">
          A handwritten magazine created by the students of {SITE.collegeName}.
        </p>

        <div className="hero__cta">
          <CtaButton size="lg">Become a Contributor</CtaButton>
        </div>
      </div>
    </header>
  )
}
