import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import logo from '../assets/logo.png'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <div className="navbar__logo">
       <Link to="/">
        <img src={logo} alt="Digitize.pk" className="navbar__logo-img" />
      </Link>
</div>

        <nav className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          <Link to="/#work" onClick={() => setMenuOpen(false)}>Work</Link>
          <Link to="/#dedicated-resources" onClick={() => setMenuOpen(false)}>Dedicated Resources</Link>
          <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link to="/partners" onClick={() => setMenuOpen(false)}>Partners</Link>
          <Link to="/contact" className="navbar__cta" onClick={() => setMenuOpen(false)}>Contact</Link>
        </nav>

        <button
          className={`navbar__toggle ${menuOpen ? 'navbar__toggle--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

export default Navbar