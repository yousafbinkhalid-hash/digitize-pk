import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useReveal } from '../useReveal.js'
import { PARTNERS } from './partnersData.jsx'
import './PartnersPage.css'

// fixed positions around the orbit, starting at 12 o'clock, evenly spaced
const ORBIT_POSITIONS = PARTNERS.map((_, i) => {
  const angle = (i * 60 - 90) * (Math.PI / 180)
  return {
    x: 50 + 38 * Math.cos(angle),
    y: 50 + 38 * Math.sin(angle),
  }
})

function OrbitVisual() {
  const [activeId, setActiveId] = useState(null)

  return (
    <div className="partners-orbit">
      <svg viewBox="0 0 100 100" className="partners-orbit__lines" aria-hidden="true">
        <circle className="partners-orbit__ring" cx="50" cy="50" r="38" fill="none" />
        {PARTNERS.map((p, i) => {
          const pos = ORBIT_POSITIONS[i]
          const isActive = activeId === p.id
          return (
            <line
              key={p.id}
              className={`partners-orbit__line ${isActive ? 'partners-orbit__line--active' : ''}`}
              x1="50"
              y1="50"
              x2={pos.x}
              y2={pos.y}
              style={{ '--line-color': p.color, animationDelay: `${0.15 * i}s` }}
            />
          )
        })}
      </svg>

      <div className="partners-orbit__hub">
        <span className="partners-orbit__hub-text">digitize.pk</span>
      </div>

      {PARTNERS.map((p, i) => {
        const pos = ORBIT_POSITIONS[i]
        const Mark = p.mark
        return (
          <a
            key={p.id}
            href={`#${p.id}`}
            className="partners-orbit__node"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              '--node-color': p.color,
              animationDelay: `${0.5 + i * 0.12}s`,
            }}
            onMouseEnter={() => setActiveId(p.id)}
            onMouseLeave={() => setActiveId(null)}
            onFocus={() => setActiveId(p.id)}
            onBlur={() => setActiveId(null)}
          >
            <span className="partners-orbit__node-icon">
              <Mark />
            </span>
            <span className="partners-orbit__node-label">{p.name}</span>
          </a>
        )
      })}
    </div>
  )
}

function PartnerCard({ partner, index }) {
  const [ref, visible] = useReveal(0.15)
  const Mark = partner.mark

  return (
    <div
      id={partner.id}
      ref={ref}
      className={`partner-card ${visible ? 'partner-card--visible' : ''}`}
      style={{ '--accent': partner.color, transitionDelay: `${index * 0.06}s` }}
    >
      <div className="partner-card__top">
        <span className="partner-card__icon">
          <Mark />
        </span>
        <span className="partner-card__category">{partner.category}</span>
      </div>
      <h3 className="partner-card__name">{partner.name}</h3>
      <p className="partner-card__blurb">{partner.blurb}</p>
    </div>
  )
}

function PartnersPage() {
  return (
    <section className="partners-page">
      <div className="partners-page__bg" aria-hidden="true">
        <span className="partners-page__blob partners-page__blob--1"></span>
        <span className="partners-page__blob partners-page__blob--2"></span>
        <div className="partners-page__grid"></div>
      </div>

      {/* ---------------- intro ---------------- */}
      <div className="partners-page__intro">
        <span className="partners-page__eyebrow">
          <span className="partners-page__eyebrow-dot"></span>
          the stack behind every build
        </span>
        <h1 className="partners-page__title">
          <span>We Don't Build Alone.</span>
          <span className="partners-page__title-accent">We Build With the Best.</span>
        </h1>
        <p className="partners-page__subtitle">
          Every product we ship runs on tools we trust, not tools we settled for. Here's
          the ecosystem behind our work — and exactly where each one fits.
        </p>
      </div>

      {/* ---------------- orbit signature ---------------- */}
      <OrbitVisual />

      {/* ---------------- detailed cards ---------------- */}
      <div className="partners-grid">
        {PARTNERS.map((partner, i) => (
          <PartnerCard key={partner.id} partner={partner} index={i} />
        ))}
      </div>

      {/* ---------------- CTA ---------------- */}
      <div className="partners-cta">
        <h2 className="partners-cta__title">Want to build with this stack?</h2>
        <p className="partners-cta__text">
          Tell us what you're working on — we'll bring the tools, the team, and the
          process to match.
        </p>
        <Link to="/contact" className="partners-cta__button">
          Start a Project
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}

export default PartnersPage
