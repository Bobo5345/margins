/**
 * A flat, physical-looking magazine page built from HTML + inline SVG,
 * so it costs no image requests and stays sharp at any size.
 * Swap the drawings for scans of real student work when you have them.
 *
 * variant="preview" -> section 4, an article spread
 * variant="future"  -> section 8, the same page years later, with
 *                      "your" handwriting circled
 */
export default function MagazinePage({ variant = 'preview', className = '' }) {
  const future = variant === 'future'

  return (
    <figure className={`mag ${className}`} aria-label="A handwritten magazine page">
      <div className="mag-page">
        <div className="mag-page__rules" aria-hidden="true" />

        <p className="mag-page__issue hand">Issue 01, {future ? 'kept since 2026' : 'spring 2026'}</p>
        <h3 className="mag-page__title hand">
          Our stories
          <svg className="mag-page__squiggle" viewBox="0 0 220 16" aria-hidden="true">
            <path d="M3 10c20-8 38 6 58-1s38-6 58 1 38 5 58-2 26-4 40 0" />
          </svg>
        </h3>

        <div className="mag-page__body hand">
          <p>
            The canteen chai was too sweet again. We stayed back after the lab anyway, arguing about whether the{' '}
            <del>robot</del> project would ever walk.
          </p>
          <p>It didn't. We wrote about it instead.</p>
          <p className={future ? 'mag-page__yours' : ''}>
            {future ? (
              <>
                written by you
                <svg className="mag-circle" viewBox="0 0 260 80" aria-hidden="true">
                  <path d="M40 14C100 2 220 4 248 30c20 22-40 44-130 44C38 74 4 58 10 38 16 20 60 10 150 8" />
                </svg>
              </>
            ) : (
              <>
                <span className="mag-page__margin-note">(p.s. draw the lab)</span>
              </>
            )}
          </p>
        </div>

        {/* pencil sketch: a tree and a bench, drawn in one loose line */}
        <svg className="mag-page__sketch" viewBox="0 0 160 130" aria-hidden="true">
          <path d="M60 118V70M60 84c-8-4-14-10-16-18M60 78c8-3 14-8 17-15" />
          <path d="M60 70c-22 2-38-10-34-26 3-12 14-16 22-14 2-14 20-20 30-10 12-6 28 2 26 16 12 4 14 22 2 28-10 8-28 8-46 6z" />
          <path d="M92 104h56M96 104v14M144 104v14M92 96h56" />
          <path d="M8 120c40-3 100-3 150-1" strokeDasharray="2 5" />
        </svg>

        <div className="mag-photo">
          <svg viewBox="0 0 120 90" aria-hidden="true">
            <rect width="120" height="90" fill="#cfc7b3" />
            <path d="M0 62h120v28H0z" fill="#a9a08a" />
            <path d="M14 62V36h30v26M52 62V24h40v38M98 62V40h14v22" fill="#8a826d" />
            <path d="M58 30h8v6h-8zM72 30h8v6h-8zM58 42h8v6h-8zM72 42h8v6h-8z" fill="#cfc7b3" />
            <circle cx="98" cy="18" r="7" fill="#e7e0cf" />
          </svg>
          <span className="hand">campus, 6:40 pm</span>
        </div>

        <svg className="mag-page__star" viewBox="0 0 40 40" aria-hidden="true">
          <path d="M20 4l4 11 12 1-9 8 3 12-10-7-10 7 3-12-9-8 12-1z" />
        </svg>
      </div>

      <div className="mag-sticky hand" aria-hidden="true">
        {future ? 'still here.' : 'your page goes here →'}
      </div>
    </figure>
  )
}
