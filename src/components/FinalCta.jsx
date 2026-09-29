import CtaButton from './CtaButton'

export default function FinalCta() {
  return (
    <section className="final section" aria-labelledby="final-title">
      <div className="wrap final__inner">
        <h2 className="final__title" id="final-title" data-reveal>
          Leave a page behind.
        </h2>
        <p className="final__sub" data-reveal>
          Your college years happen once.
          <br />
          Make something worth finding years later.
        </p>
        <div className="final__actions" data-reveal>
          <CtaButton size="lg">Become a Contributor</CtaButton>
          <span className="final__time">Takes only a few minutes.</span>
        </div>
      </div>
    </section>
  )
}
