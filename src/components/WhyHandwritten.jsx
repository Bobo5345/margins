const REASONS = [
  {
    title: 'It is personal',
    body: 'Every line carries the handwriting of the person who created it.',
  },
  {
    title: 'It is imperfect',
    body: 'Uneven letters, crossed-out words, sketches in the margins — the imperfections are part of the story.',
  },
  {
    title: 'It becomes a memory',
    body: 'A digital post can disappear into an endless feed. A physical magazine can sit on a shelf for years.',
  },
  {
    title: 'It belongs to everyone',
    body: "The magazine isn't written by one person. It is built from the ideas, creativity and experiences of an entire college community.",
  },
]

export default function WhyHandwritten() {
  return (
    <section className="why section" id="why">
      <div className="wrap why__grid">
        <div className="why__intro">
          <h2 className="h-section" data-reveal>Why handwritten?</h2>
          <p className="why__lead" data-reveal>
            Because handwriting carries something a screen cannot.
          </p>
        </div>

        <ol className="why__list">
          {REASONS.map((r, i) => (
            <li className="why__item" key={r.title} data-reveal>
              <span className="why__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="why__title">{r.title}</h3>
              <p className="why__body">{r.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
