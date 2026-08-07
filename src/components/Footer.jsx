import './Footer.css'

const SITEMAP = [
  { label: 'services', href: '#services' },
  { label: 'work', href: '#work' },
  { label: 'dedicated-resources', href: '#dedicated-resources' },
  { label: 'contact', href: '#contact' },
]

const SOCIALS = [
  { label: 'GitHub', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'X', href: '#' },
]

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            Digitize<span className="footer__logo-dot">.pk</span>
          </div>
          <p className="footer__tagline">
            We build software, apps, and websites — and staff dedicated
            offshore teams that overlap your working hours.
          </p>
        </div>

        <div className="footer__col">
          <h5 className="footer__heading">sitemap</h5>
          <ul className="footer__list">
            {SITEMAP.map((item) => (
              <li key={item.label}>
                <a href={item.href}>/{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h5 className="footer__heading">connect</h5>
          <ul className="footer__list">
            {SOCIALS.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <span>&copy; {new Date().getFullYear()} Digitize.pk. All rights reserved.</span>
        <button className="footer__top-btn" onClick={scrollToTop}>
          back to top ↑
        </button>
      </div>
    </footer>
  )
}

export default Footer