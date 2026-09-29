import { SITE } from '../config'

/** Every CTA opens the Google Form in a new tab. */
export default function CtaButton({ children, size = 'md', variant = 'ink', className = '' }) {
  return (
    <a
      className={`cta cta--${size} cta--${variant} ${className}`}
      href={SITE.formUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="cta__label">{children}</span>
      <span className="cta__arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="1em" height="1em">
          <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="sr-only"> (opens the enrolment form in a new tab)</span>
    </a>
  )
}
