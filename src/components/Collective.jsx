import { useRef } from 'react'
import { useGsap } from '../lib/useGsap'
import { collectiveGather } from '../animations/collective'

// Positions are % of the stage, kept clear of the centre where the title lands.
const WORDS = [
  { w: 'Poem', x: 10, y: 16, s: 1.1 },
  { w: 'Idea', x: 72, y: 12, s: 0.9 },
  { w: 'Memory', x: 6, y: 64, s: 1.2 },
  { w: 'Sketch', x: 64, y: 72, s: 1 },
  { w: 'Story', x: 38, y: 6, s: 0.95 },
  { w: 'Photo', x: 80, y: 44, s: 0.85 },
  { w: 'Dream', x: 34, y: 82, s: 1.15 },
]

export default function Collective() {
  const ref = useRef(null)
  useGsap(ref, collectiveGather)

  return (
    <section className="collective" ref={ref} aria-label="Every contribution becomes one magazine">
      <div className="collective__stage">
        {WORDS.map((d) => (
          <span
            key={d.w}
            className="collective__word hand"
            style={{ left: `${d.x}%`, top: `${d.y}%`, '--s': d.s }}
            aria-hidden="true"
          >
            {d.w}
          </span>
        ))}
        <h2 className="collective__one">
          <span className="sr-only">Poems, ideas, memories, sketches, stories, photos and dreams become </span>
          One magazine
        </h2>
      </div>
    </section>
  )
}
