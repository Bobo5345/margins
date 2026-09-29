import { useRef } from 'react'
import { useGsap } from '../lib/useGsap'
import { futureScene } from '../animations/sections'
import MagazinePage from './MagazinePage'

export default function FutureMemory() {
  const ref = useRef(null)
  useGsap(ref, futureScene)

  return (
    <section className="future" ref={ref} aria-label="A magazine we can keep">
      <div className="wrap future__inner">
        <p className="future__lead h-statement" data-reveal>Years from now…</p>

        <ul className="future__forget">
          <li data-reveal>You'll forget some lectures.</li>
          <li data-reveal>You'll forget some assignments.</li>
          <li data-reveal>You'll forget what you were worried about on a random Tuesday.</li>
        </ul>

        <p className="future__imagine" data-reveal>
          But imagine opening this magazine years later…
        </p>

        <MagazinePage variant="future" className="future__page" />

        <p className="future__finding h-statement" data-reveal>
          And finding your handwriting.
        </p>
      </div>
    </section>
  )
}
