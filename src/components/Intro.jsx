import { useRef } from 'react'
import { useGsap } from '../lib/useGsap'
import { hookScene } from '../animations/sections'

/** The hook: digital lines fade out, the ink line stays. */
export default function Intro() {
  const ref = useRef(null)
  useGsap(ref, hookScene)

  return (
    <section className="hook" id="about" ref={ref} aria-label="Everything is digital now">
      <div className="wrap hook__stage">
        <p className="hook__lead display">Everything is digital now.</p>
        <ul className="hook__list">
          <li className="hook__fade">Messages disappear.</li>
          <li className="hook__fade">Photos get buried.</li>
          <li className="hook__fade">Posts get forgotten.</li>
        </ul>
        <p className="hook__stays display">
          But a handwritten page{' '}
          <span className="hook__stays-word">
            stays.
            <span className="hook__stays-mark" aria-hidden="true" />
          </span>
        </p>
      </div>
    </section>
  )
}
