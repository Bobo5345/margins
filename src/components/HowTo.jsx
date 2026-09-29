import EnrollForm from './EnrollForm'

const STEPS = [
  { title: 'Think', body: 'What do you want to put on a page?' },
  { title: 'Create', body: 'Write it. Draw it. Capture it. Make it.' },
  { title: 'Enroll', body: "Fill out the form and tell us what you'd like to contribute." },
]

export default function HowTo() {
  return (
    <section className="howto section" id="join">
      <div className="wrap">
        <h2 className="h-section" data-reveal>How to take part</h2>
        <ol className="howto__steps">
          {STEPS.map((s, i) => (
            <li className="howto__step" key={s.title} data-reveal>
              <span className="howto__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="howto__title">{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
        <div data-reveal>
          <EnrollForm />
        </div>
      </div>
    </section>
  )
}
