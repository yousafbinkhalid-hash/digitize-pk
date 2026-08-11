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
       <a href="/">
        <img src={logo} alt="Digitize.pk" className="navbar__logo-img" />
      </a>
</div>

        <nav className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#dedicated-resources" onClick={() => setMenuOpen(false)}>Dedicated Resources</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
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