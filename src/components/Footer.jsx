import { SITE } from '../config'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div className="footer__logos">
          <Logo which="college" height={72} />
          <Logo which="group" height={72} />
        </div>

        <div className="footer__about">
          <p className="footer__college">{SITE.collegeName}</p>
          <p className="footer__mag">
            {SITE.magazineName}, the handwritten magazine. {SITE.year}
          </p>
          <p className="footer__made">
            Made by students.
            <br />
            For students.
          </p>
        </div>

        <ul className="footer__links">
          <li>
            <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a>
          </li>
          <li>
            <a href={`mailto:${SITE.contactEmail}`}>Contact</a>
          </li>
        </ul>

        <p className="footer__sign hand">See you on the pages.</p>
      </div>
    </footer>
  )
}
