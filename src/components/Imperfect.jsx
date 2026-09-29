import { useRef } from 'react'
import { useGsap } from '../lib/useGsap'
import { placedWords } from '../animations/sections'

const DONT = [
  "You don't have to be a writer.",
  "You don't need perfect handwriting.",
  "You don't need something extraordinary.",
]
const ENOUGH = ['A thought.', 'A story.', 'A sketch.', 'A memory.', 'An idea.']

export default function Imperfect() {
  const ref = useRef(null)
  useGsap(ref, placedWords)

  return (
    <section className="imperfect section" ref={ref}>
      <div className="wrap imperfect__inner">
        <h2 className="h-statement" data-reveal>
          You don't have to be an artist.
        </h2>

        <ul className="imperfect__dont">
          {DONT.map((line) => (
            <li key={line} data-reveal>{line}</li>
          ))}
          <li className="imperfect__yours" data-reveal>
            You just need something that is yours.
          </li>
        </ul>

        <ul className="placed-list" aria-label="Things that are enough">
          {ENOUGH.map((w) => (
            <li className="placed" key={w}>{w}</li>
          ))}
        </ul>

        <p className="imperfect__end" data-reveal>
          That's enough to start a page.
        </p>
      </div>
    </section>
  )
}
