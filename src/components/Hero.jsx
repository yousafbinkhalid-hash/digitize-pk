import { useState, useEffect } from 'react'
import './Hero.css'
import { CodeIcon, TerminalIcon, PhoneIcon, GridIcon, BrowserIcon, CursorIcon } from './HeroIcons.jsx'

const SLIDES = [
  {
    theme: 'software',
    eyebrow: 'software',
    title: 'We build software that ships.',
    subtitle: 'From first sketch to production, built on stacks your team can actually maintain.',
    icons: [CodeIcon, TerminalIcon],
  },
  {
    theme: 'apps',
    eyebrow: 'apps',
    title: 'iOS and Android, done right.',
    subtitle: 'Native and cross-platform apps taken from prototype through App Store release.',
    icons: [PhoneIcon, GridIcon],
  },
  {
    theme: 'websites',
    eyebrow: 'websites',
    title: 'Websites that convert visitors.',
    subtitle: 'Fast, maintainable sites designed to turn traffic into customers.',
    icons: [BrowserIcon, CursorIcon],
  },
]

const SLIDE_DURATION = 6000

function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % SLIDES.length)
    }, SLIDE_DURATION)
    return () => clearInterval(timer)
  }, [])

  const slide = SLIDES[activeIndex]
  const [IconA, IconB] = slide.icons

  return (
    <section className={`hero hero--${slide.theme}`}>
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__blob hero__blob--1"></span>
        <span className="hero__blob hero__blob--2"></span>
        <span className="hero__blob hero__blob--3"></span>
        <div className="hero__grid"></div>
      </div>

      <div className="hero__icons" aria-hidden="true" key={activeIndex}>
        <IconA className="hero__icon hero__icon--1" />
        <IconB className="hero__icon hero__icon--2" />
      </div>

      <div className="hero__content" key={`content-${activeIndex}`}>
        <span className="hero__eyebrow">{slide.eyebrow}</span>
        <h1 className="hero__title">{slide.title}</h1>
        <p className="hero__subtitle">{slide.subtitle}</p>
        <a href="#contact" className="hero__cta">Start a project</a>
      </div>

      <div className="hero__dots">
        {SLIDES.map((s, i) => (
          <button
            key={s.theme}
            className={`hero__dot ${i === activeIndex ? 'hero__dot--active' : ''}`}
            onClick={() => setActiveIndex(i)}
            aria-label={`Show slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero