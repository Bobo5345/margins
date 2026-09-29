import { useEffect, useState } from 'react'
import { SITE } from '../config'
import { scrollToTarget } from '../lib/lenis'
import Logo from './Logo'
import CtaButton from './CtaButton'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#why', label: 'Why it matters' },
  { href: '#contribute', label: 'Contribute' },
]

export default function Navbar() {
  const [compact, setCompact] = useState(false)
  const [open, setOpen] = useState(false)

  // A passive listener with a boolean state change is cheaper than a ScrollTrigger here.
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (e, href) => {
    e.preventDefault()
    setOpen(false)
    scrollToTarget(href)
  }

  return (
    <nav className={`nav ${compact ? 'nav--compact' : ''}`} aria-label="Main">
      <div className="nav__inner">
        <a className="nav__brand" href="#top" onClick={(e) => go(e, '#top')}>
          <Logo which="college" className="nav__crest" height={34} eager />
          <span className="nav__name">{SITE.magazineName}</span>
        </a>

        <ul className="nav__links">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={(e) => go(e, l.href)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav__end">
          <CtaButton size="sm" className="nav__cta">
            Join
          </CtaButton>
          <button
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      <ul id="mobile-menu" className={`nav__sheet ${open ? 'is-open' : ''}`} hidden={!open}>
        {LINKS.map((l) => (
          <li key={l.href}>
            <a href={l.href} onClick={(e) => go(e, l.href)}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
