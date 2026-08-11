import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useReveal } from '../useReveal.js'
import { PARTNERS } from './partnersData.jsx'
import './PartnersStrip.css'

function PartnersStrip() {
  const [ref, visible] = useReveal(0.2)

  return (
    <section className="partners-strip" id="partners" ref={ref}>
      <div className="partners-strip__inner">
        <div className="partners-strip__heading">
          <span className="partners-strip__eyebrow">the stack behind every build</span>
          <h2 className="partners-strip__title">We Build With Tools We Trust</h2>
        </div>

        <div className={`partners-strip__row ${visible ? 'partners-strip__row--visible' : ''}`}>
          {PARTNERS.map((p, i) => {
            const Mark = p.mark
            return (
              <Link
                key={p.id}
                to={`/partners#${p.id}`}
                className="partners-strip__item"
                style={{ '--accent': p.color, transitionDelay: `${i * 0.06}s` }}
              >
                <span className="partners-strip__icon">
                  <Mark />
                </span>
                <span className="partners-strip__name">{p.name}</span>
              </Link>
            )
          })}
        </div>

        <Link to="/partners" className="partners-strip__cta">
          View all partners
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}

export default PartnersStrip
