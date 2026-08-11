import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Github, Terminal, Sparkles, ArrowRight } from 'lucide-react'
import { useReveal } from '../useReveal.js'
import './PartnersPage.css'

// ---------- small original marks for partners with no safe lucide icon ----------
// (deliberately not reproductions of the real logo artwork — simple original
// glyphs in brand-adjacent colors, paired with the wordmark text)

function GoogleMark() {
  return (
    <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
      <circle cx="11" cy="11" r="5" fill="#4285F4" />
      <circle cx="21" cy="11" r="5" fill="#EA4335" />
      <circle cx="11" cy="21" r="5" fill="#FBBC05" />
      <circle cx="21" cy="21" r="5" fill="#34A853" />
    </svg>
  )
}

function AdobeMark() {
  return (
    <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
      <path d="M4 27 L13 5 L19 5 L28 27 L21.5 27 L16 12.5 L11.8 23 H17 L18.7 27 Z" fill="#FA0F00" />
    </svg>
  )
}

function VercelMark() {
  return (
    <svg viewBox="0 0 32 32" width="18" height="18" aria-hidden="true">
      <path d="M16 6 L28 26 H4 Z" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinejoin="round" />
    </svg>
  )
}

const PARTNERS = [
  {
    id: 'google',
    name: 'Google',
    category: 'Cloud & Search',
    color: '#4285F4',
    mark: GoogleMark,
    blurb:
      "From Google Cloud infrastructure to Workspace collaboration, Google's ecosystem keeps our projects running reliably and our team in sync.",
  },
  {
    id: 'adobe',
    name: 'Adobe',
    category: 'Creative & Design',
    color: '#FA0F00',
    mark: AdobeMark,
    blurb:
      'Creative Cloud is where our design system lives — Photoshop, Illustrator, and After Effects, from first concept to final polish.',
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'Hosting & Deployment',
    color: '#a1a1aa',
    mark: VercelMark,
    blurb:
      'Every site we ship deploys through Vercel — instant previews, global edge delivery, and zero-downtime releases as standard.',
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Version Control & CI',
    color: '#8957e5',
    icon: Github,
    blurb:
      'Every line of code lives in GitHub — version history, pull requests, and CI pipelines that keep our releases clean and reviewable.',
  },
  {
    id: 'vscode',
    name: 'Visual Studio',
    category: 'Development Environment',
    color: '#007ACC',
    icon: Terminal,
    blurb:
      "VS Code is where the team spends most of its day — extensions, debugging, and a consistent setup across every engineer's machine.",
  },
  {
    id: 'claude',
    name: 'Claude',
    category: 'AI-Assisted Engineering',
    color: '#DA7756',
    icon: Sparkles,
    blurb:
      'Claude sits alongside our engineers for planning, code review, and pairing — moving faster without cutting corners on quality.',
  },
]

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
        const Icon = p.icon
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
              {Mark ? <Mark /> : <Icon size={18} aria-hidden="true" />}
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
  const Icon = partner.icon
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
          {Mark ? <Mark /> : <Icon size={22} aria-hidden="true" />}
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
