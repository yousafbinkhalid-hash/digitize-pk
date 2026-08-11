import { useState, useEffect } from 'react'
import './Hero.css'

// Each slide needs: eyebrow, titleLines (array, rendered as separate lines),
// subtitle, and a two-button CTA pair. Add slide 2 and 3 to this array later —
// the autoplay, dot-nav, and entrance animations already support any number
// of slides without further changes.
const SLIDES = [
  {
    id: 'develop-deliver',
    eyebrow: 'youth talent network',
    titleLines: ['Developing Skilled Youth.', 'Delivering Dedicated Talent.'],
    subtitle: "Skill sharpened with purpose. Talent deployed where it counts.",
    ctaPrimary: { label: 'Get Mentored', href: '#mentorship' },
    ctaSecondary: { label: 'Get Deployed', href: '#dedicated-resources' },
  },
]

const SLIDE_DURATION = 7000

function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const hasMultipleSlides = SLIDES.length > 1

  useEffect(() => {
    if (!hasMultipleSlides) return
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % SLIDES.length)
    }, SLIDE_DURATION)
    return () => clearInterval(timer)
  }, [hasMultipleSlides])

  const slide = SLIDES[activeIndex]

  return (
    <section className="hero" id="home">
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__blob hero__blob--1"></span>
        <span className="hero__blob hero__blob--2"></span>
        <div className="hero__grid"></div>
      </div>

      <div className="hero__inner">
        <div className="hero__content" key={`content-${slide.id}`}>
          <span className="hero__eyebrow">{slide.eyebrow}</span>

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

        <div className="hero__visual" aria-hidden="true">
          <svg viewBox="0 0 560 560" className="hero__network" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.55" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* connecting lines from each talent node to the central hub */}
            <g className="hero__net-lines" fill="none" stroke="var(--accent)" strokeWidth="1.4">
              <path className="hero__net-line" style={{ animationDelay: '0.3s' }} d="M100,110 Q220,150 330,290" />
              <path className="hero__net-line" style={{ animationDelay: '0.55s' }} d="M470,90 Q380,180 330,290" />
              <path className="hero__net-line" style={{ animationDelay: '0.8s' }} d="M90,360 Q210,320 330,290" />
              <path className="hero__net-line" style={{ animationDelay: '1.05s' }} d="M120,470 Q230,390 330,290" />
              <path className="hero__net-line" style={{ animationDelay: '1.3s' }} d="M480,430 Q400,350 330,290" />
              <path className="hero__net-line" style={{ animationDelay: '1.55s' }} d="M300,60 Q315,170 330,290" />
            </g>

            {/* hub */}
            <circle cx="330" cy="290" r="70" fill="url(#hubGlow)" />
            <circle className="hero__net-hub" cx="330" cy="290" r="13" fill="var(--accent)" />

            {/* outer talent nodes */}
            <g className="hero__net-nodes">
              <circle className="hero__net-node" style={{ animationDelay: '0.3s' }} cx="100" cy="110" r="7" fill="var(--node-a)" />
              <circle className="hero__net-node" style={{ animationDelay: '0.55s' }} cx="470" cy="90" r="6" fill="var(--node-b)" />
              <circle className="hero__net-node" style={{ animationDelay: '0.8s' }} cx="90" cy="360" r="6" fill="var(--node-b)" />
              <circle className="hero__net-node" style={{ animationDelay: '1.05s' }} cx="120" cy="470" r="8" fill="var(--node-a)" />
              <circle className="hero__net-node" style={{ animationDelay: '1.3s' }} cx="480" cy="430" r="7" fill="var(--node-c)" />
              <circle className="hero__net-node" style={{ animationDelay: '1.55s' }} cx="300" cy="60" r="5" fill="var(--node-c)" />
            </g>
          </svg>

          <span className="hero__visual-tag hero__visual-tag--1">mentored</span>
          <span className="hero__visual-tag hero__visual-tag--2">skilled</span>
          <span className="hero__visual-tag hero__visual-tag--3">deployed</span>
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
