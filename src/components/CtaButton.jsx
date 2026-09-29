import { scrollToTarget } from '../lib/lenis'

/** Every CTA takes the visitor to the enrolment form on this page. */
export default function CtaButton({ children, size = 'md', variant = 'ink', className = '' }) {
  const go = (e) => {
    e.preventDefault()
    scrollToTarget('#enroll')
    // Move focus into the form once the scroll has started, for keyboard users.
    setTimeout(() => document.getElementById('enroll-name')?.focus({ preventScroll: true }), 900)
  }

  return (
    <a className={`cta cta--${size} cta--${variant} ${className}`} href="#enroll" onClick={go}>
      <span className="cta__label">{children}</span>
      <span className="cta__arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="1em" height="1em">
          <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  )
}
