import { useState } from 'react'
import './Navbar.css'
import logo from '../assets/logo.png'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <div className="navbar__logo">
          <img src={logo} alt="Digitize.pk" className="navbar__logo-img" />
        </div>

        <nav className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#dedicated-resources" onClick={() => setMenuOpen(false)}>Dedicated Resources</a>
          <a href="#contact" className="navbar__cta" onClick={() => setMenuOpen(false)}>Contact</a>
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