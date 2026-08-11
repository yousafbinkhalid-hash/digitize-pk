import { useState, useEffect, useRef } from 'react'
import './Hero.css'
import { useCountUp } from '../useCountUp.js'

// Each slide needs: id, theme (drives the accent color via CSS — see
// Hero.css [data-theme]), eyebrow, titleLines, subtitle, a two-button CTA
// pair, and a visual key that picks which signature graphic renders on the
// right (see VISUALS below). Add slide 3 the same way — autoplay, dot-nav,
// and entrance animations already support any number of slides.
const SLIDES = [
  {
    id: 'develop-deliver',
    theme: 'talent',
    eyebrow: 'youth talent network',
    titleLines: ['Developing Skilled Youth.', 'Delivering Dedicated Talent.'],
    subtitle: 'Skill sharpened with purpose. Talent deployed where it counts.',
    ctaPrimary: { label: 'Get Mentored', href: '#mentorship' },
    ctaSecondary: { label: 'Get Deployed', href: '#dedicated-resources' },
    visual: 'network',
  },
  {
    id: 'design-results',
    theme: 'design',
    eyebrow: 'design that performs',
    titleLines: ['Human-Centered Design.', 'Business-Driven Results.'],
    subtitle:
      "Empathy gets you understood. Data gets you results. We design interfaces that start with the person on the other side of the screen — and end with a number your board can point to.",
    ctaPrimary: { label: 'View Our Work', href: '#work' },
    ctaSecondary: { label: 'Start a Project', href: '#contact' },
    visual: 'design',
  },
  {
    id: 'standout-relevant',
    theme: 'standout',
    eyebrow: 'always evolving',
    titleLines: ['Stand Out.', 'Stay Relevant.'],
    subtitle:
      "Standing out gets you noticed once. Staying relevant keeps you chosen every time after. We build brands and products engineered to keep adapting — so the version of you people meet next year is even harder to ignore.",
    ctaPrimary: { label: 'See Our Services', href: '#services' },
    ctaSecondary: { label: 'Get In Touch', href: '#contact' },
    visual: 'radar',
  },
]

const SLIDE_DURATION = 7000

const NET_PATHS = [
  'M100,110 Q220,150 330,290',
  'M470,90 Q380,180 330,290',
  'M90,360 Q210,320 330,290',
  'M120,470 Q230,390 330,290',
  'M480,430 Q400,350 330,290',
  'M300,60 Q315,170 330,290',
]

const NET_NODES = [
  { cx: 100, cy: 110, r: 7, color: 'var(--node-a)', delay: '0.3s' },
  { cx: 470, cy: 90, r: 6, color: 'var(--node-b)', delay: '0.55s' },
  { cx: 90, cy: 360, r: 6, color: 'var(--node-b)', delay: '0.8s' },
  { cx: 120, cy: 470, r: 8, color: 'var(--node-a)', delay: '1.05s' },
  { cx: 480, cy: 430, r: 7, color: 'var(--node-c)', delay: '1.3s' },
  { cx: 300, cy: 60, r: 5, color: 'var(--node-c)', delay: '1.55s' },
]

// dim, unremarkable "competitors" scattered around the radar
const RADAR_BLIPS = [
  { cx: 344, cy: 203, delay: '0.4s' },
  { cx: 460, cy: 280, delay: '1.1s' },
  { cx: 196, cy: 380, delay: '0.7s' },
  { cx: 83, cy: 245, delay: '1.6s' },
  { cx: 222, cy: 211, delay: '0.2s' },
]

// the one blip the sweep keeps finding — positioned at 150° clockwise from
// north so its highlight animation lines up with the 6s sweep rotation
// (150 / 360 * 6s = 2.5s into every lap)
const RADAR_YOU = { cx: 355, cy: 410 }

// ---------- Signature visual: slide 1 — talent network ----------
// Outer talent nodes (each with its own halo) draw connecting lines into a
// glowing central hub, ringed by a slow rotating orbit. Signal pulses keep
// traveling from every node into the hub on a loop — talent continuously
// flowing in, not a static diagram.
function TalentNetworkVisual() {
  return (
    <>
      <svg viewBox="0 0 560 560" className="hero__network" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* slow-rotating dashed orbit — pure ambient detail */}
        <circle className="hero__net-orbit hero__net-orbit--1" cx="330" cy="290" r="230" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 10" />
        <circle className="hero__net-orbit hero__net-orbit--2" cx="330" cy="290" r="190" fill="none" stroke="var(--node-a)" strokeWidth="1" strokeDasharray="1 8" />

        <g className="hero__net-lines" fill="none" stroke="var(--accent)" strokeWidth="1.4">
          {NET_PATHS.map((d, i) => (
            <path key={d} className="hero__net-line" style={{ animationDelay: `${0.3 + i * 0.25}s` }} d={d} />
          ))}
        </g>

        {/* traveling signal pulses — one per line, looping continuously */}
        <g className="hero__net-pulses">
          {NET_PATHS.map((d, i) => (
            <circle
              key={d}
              className="hero__net-pulse"
              r="4"
              fill="#ffffff"
              style={{ animationDelay: `${1.6 + i * 0.35}s` }}
            >
              <animateMotion dur="2.4s" begin={`${1.6 + i * 0.35}s`} repeatCount="indefinite" path={d} />
            </circle>
          ))}
        </g>

        <circle cx="330" cy="290" r="70" fill="url(#hubGlow)" />
        <circle className="hero__net-hub" cx="330" cy="290" r="13" fill="var(--accent)" />
        <circle className="hero__net-hub-ring" cx="330" cy="290" r="13" fill="none" stroke="var(--accent)" strokeWidth="1.5" />

        <g className="hero__net-nodes">
          {NET_NODES.map((n, i) => (
            <g key={i}>
              <circle
                className="hero__net-node-halo"
                style={{ animationDelay: n.delay }}
                cx={n.cx}
                cy={n.cy}
                r={n.r + 6}
                fill="none"
                stroke={n.color}
                strokeWidth="1.5"
              />
              <circle className="hero__net-node" style={{ animationDelay: n.delay }} cx={n.cx} cy={n.cy} r={n.r} fill={n.color} />
            </g>
          ))}
        </g>
      </svg>

      <span className="hero__visual-tag hero__visual-tag--1">mentored</span>
      <span className="hero__visual-tag hero__visual-tag--2">skilled</span>
      <span className="hero__visual-tag hero__visual-tag--3">deployed</span>
    </>
  )
}

// ---------- Signature visual: slide 2 — design that performs ----------
// A UI mockup — sitting on a second stacked card for depth — crossfades
// between a shimmering wireframe and a finished, colored dashboard on a
// slow rotating glow ring. A simulated cursor moves in, "clicks" the top
// bar, a result tooltip pops, and a trend line draws itself across the
// chart — design turning into a measurable result, animated rather than
// implied. Two live count-up stat chips carry the "business-driven" half.
function DesignResultsVisual() {
  const [chipRefA, conversionValue] = useCountUp(42, 1600)
  const [chipRefB, engagementValue] = useCountUp(31, 1600)

  return (
    <>
      <div className="hero__mockup-frame">
        <div className="hero__mockup-glow" aria-hidden="true"></div>
        <div className="hero__mockup-back" aria-hidden="true"></div>

        <div className="hero__mockup">
          <div className="hero__mockup-bar">
            <span className="hero__mockup-dot"></span>
            <span className="hero__mockup-dot"></span>
            <span className="hero__mockup-dot"></span>
            <span className="hero__mockup-url">app.digitize.pk</span>
          </div>
          <div className="hero__mockup-body">
            <div className="hero__wireframe">
              <div className="hero__shimmer" aria-hidden="true"></div>
              <div className="hero__wire-line" style={{ width: '46%' }}></div>
              <div className="hero__wire-line" style={{ width: '72%' }}></div>
              <div className="hero__wire-box"></div>
              <div className="hero__wire-line" style={{ width: '58%' }}></div>
              <div className="hero__wire-line" style={{ width: '38%' }}></div>
            </div>
            <div className="hero__uiblocks">
              <div className="hero__ui-card">
                <span className="hero__ui-dot"></span>

                <svg className="hero__ui-trend" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
                  <polyline className="hero__ui-trend-line" points="6,22 28,13 50,18 72,6 94,15" fill="none" />
                  <circle className="hero__ui-trend-dot" cx="72" cy="6" r="2.4" />
                </svg>

                <div className="hero__ui-bars">
                  <span className="hero__ui-bar" style={{ '--h': '38%', animationDelay: '0.05s' }}></span>
                  <span className="hero__ui-bar" style={{ '--h': '64%', animationDelay: '0.15s' }}></span>
                  <span className="hero__ui-bar" style={{ '--h': '48%', animationDelay: '0.25s' }}></span>
                  <span className="hero__ui-bar hero__ui-bar--hit" style={{ '--h': '82%', animationDelay: '0.35s' }}></span>
                  <span className="hero__ui-bar" style={{ '--h': '58%', animationDelay: '0.45s' }}></span>
                </div>

                <span className="hero__ui-tooltip">+18% MoM</span>
              </div>
              <div className="hero__ui-pill hero__ui-pill--1"></div>
              <div className="hero__ui-pill hero__ui-pill--2"></div>
              <span className="hero__cursor" aria-hidden="true">
                <span className="hero__cursor-ring"></span>
              </span>
            </div>
          </div>
        </div>

        <span className="hero__particle hero__particle--1"></span>
        <span className="hero__particle hero__particle--2"></span>
        <span className="hero__particle hero__particle--3"></span>
      </div>

      <div className="hero__stat-chip hero__stat-chip--1" ref={chipRefA}>
        <span className="hero__stat-icon">▲</span>
        <span className="hero__stat-text">
          <span className="hero__stat-num">+{conversionValue}%</span>
          <span className="hero__stat-label">conversion lift</span>
        </span>
      </div>
      <div className="hero__stat-chip hero__stat-chip--2" ref={chipRefB}>
        <span className="hero__stat-icon">▲</span>
        <span className="hero__stat-text">
          <span className="hero__stat-num">+{engagementValue}%</span>
          <span className="hero__stat-label">engagement</span>
        </span>
      </div>
    </>
  )
}

// ---------- Signature visual: slide 3 — stand out, stay relevant ----------
// A radar keeps sweeping the field, continuously scanning — that's "staying
// relevant." Every other blip is dim and identical; one blip, brighter and
// larger than the rest, lights up each time the sweep passes over it —
// that's "standing out." The metaphor runs the whole visual, not just the
// headline.
function RadarVisual() {
  return (
    <>
      <svg viewBox="0 0 560 560" className="hero__radar" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="280" cy="280" r="220" fill="url(#radarGlow)" />

        {/* range rings + crosshair */}
        <g className="hero__radar-grid" fill="none" stroke="#ffffff" strokeOpacity="0.12">
          <circle cx="280" cy="280" r="70" />
          <circle cx="280" cy="280" r="140" />
          <circle cx="280" cy="280" r="210" />
          <line x1="280" y1="60" x2="280" y2="500" />
          <line x1="60" y1="280" x2="500" y2="280" />
        </g>

        {/* rotating sweep beam */}
        <g className="hero__radar-sweep">
          <path d="M280,280 L204.8,73.2 A220,220 0 0,1 355.2,73.2 Z" fill="var(--accent)" />
        </g>

        {/* dim, forgettable blips */}
        {RADAR_BLIPS.map((b, i) => (
          <circle key={i} className="hero__radar-blip" style={{ animationDelay: b.delay }} cx={b.cx} cy={b.cy} r="4" fill="#6b7180" />
        ))}

        {/* the one that stands out */}
        <circle className="hero__radar-you-halo" cx={RADAR_YOU.cx} cy={RADAR_YOU.cy} r="9" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
        <circle className="hero__radar-you" cx={RADAR_YOU.cx} cy={RADAR_YOU.cy} r="8" fill="var(--accent)" />

        <circle className="hero__radar-center" cx="280" cy="280" r="5" fill="var(--accent)" />
      </svg>

      <span className="hero__visual-tag hero__visual-tag--1">distinct</span>
      <span className="hero__visual-tag hero__visual-tag--2">always current</span>
      <span className="hero__visual-tag hero__visual-tag--3">that&rsquo;s you</span>
    </>
  )
}

const VISUALS = {
  network: TalentNetworkVisual,
  design: DesignResultsVisual,
  radar: RadarVisual,
}

function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)
  const hasMultipleSlides = SLIDES.length > 1

  useEffect(() => {
    if (!hasMultipleSlides) return
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % SLIDES.length)
    }, SLIDE_DURATION)
    return () => clearInterval(timer)
  }, [hasMultipleSlides])

  // subtle mouse-parallax tilt on the visual — skipped entirely for anyone
  // who prefers reduced motion
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = heroRef.current
    if (!el) return

    function handleMove(e) {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      setTilt({ x: x * 10, y: y * -8 })
    }

    function handleLeave() {
      setTilt({ x: 0, y: 0 })
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  const slide = SLIDES[activeIndex]
  const Visual = VISUALS[slide.visual]

  return (
    <section className="hero" id="home" data-theme={slide.theme} ref={heroRef}>
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__blob hero__blob--1"></span>
        <span className="hero__blob hero__blob--2"></span>
        <div className="hero__grid"></div>
      </div>

      <div className="hero__inner">
        <div className="hero__content" key={`content-${slide.id}`}>
          <span className="hero__eyebrow">
            <span className="hero__eyebrow-dot"></span>
            {slide.eyebrow}
          </span>

          <h1 className="hero__title">
            {slide.titleLines.map((line, i) => (
              <span className="hero__title-line" key={i} style={{ animationDelay: `${0.16 + i * 0.12}s` }}>
                {line}
              </span>
            ))}
          </h1>

          <p className="hero__subtitle">{slide.subtitle}</p>

          <div className="hero__ctas">
            <a href={slide.ctaPrimary.href} className="hero__cta hero__cta--primary">
              {slide.ctaPrimary.label}
            </a>
            <a href={slide.ctaSecondary.href} className="hero__cta hero__cta--secondary">
              {slide.ctaSecondary.label}
            </a>
          </div>
        </div>

        <div
          className={`hero__visual hero__visual--${slide.visual}`}
          aria-hidden="true"
          key={`visual-${slide.id}`}
          style={{ '--tiltX': `${tilt.x}deg`, '--tiltY': `${tilt.y}deg` }}
        >
          <Visual />
        </div>
      </div>

      {hasMultipleSlides && (
        <div className="hero__dots">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              className={`hero__dot ${i === activeIndex ? 'hero__dot--active' : ''}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Show slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      <a href="#services" className="hero__scroll" aria-label="Scroll to services">
        <span className="hero__scroll-line"></span>
      </a>
    </section>
  )
}

export default Hero
