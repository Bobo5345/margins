import { useRef } from 'react'
import { useGsap } from '../lib/useGsap'
import { magazineScroll } from '../animations/magazine'
import MagazinePage from './MagazinePage'

export default function MagazinePreview() {
  const ref = useRef(null)
  useGsap(ref, magazineScroll)

  return (
    <section className="preview section" ref={ref} aria-label="A page from the magazine">
      <div className="wrap preview__inner">
        <MagazinePage variant="preview" />
        <p className="preview__caption" data-reveal>
          One page. Written, drawn and stuck down by hand.
        </p>
      </div>
    </section>
  )
}
