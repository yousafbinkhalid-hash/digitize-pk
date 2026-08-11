import { Link } from 'react-router-dom'
import StatCard from './StatCard.jsx'
import './DedicatedResources.css'

const STATS = [
  { id: 'engineers', target: 40, suffix: '+', label: 'dedicated engineers placed' },
  { id: 'overlap', target: 6, suffix: 'hrs', label: 'daily working-hour overlap' },
  { id: 'retention', target: 98, suffix: '%', label: 'client retention rate' },
]

function DedicatedResources() {
  return (
    <section className="dedicated" id="dedicated-resources">
      <div className="dedicated__inner">
        <div className="dedicated__text">
          <span className="dedicated__eyebrow">dedicated resources</span>
          <h2 className="dedicated__title">
            An offshore team that overlaps your day, not just your timezone.
          </h2>
          <p className="dedicated__subtitle">
            Add vetted engineers straight into your team on a monthly
            retainer — same repo, same standups, same bar for quality.
          </p>
          <Link to="/contact" className="dedicated__cta">Explore dedicated teams →</Link>
        </div>

        <div className="dedicated__stats">
          {STATS.map((stat) => (
            <StatCard key={stat.id} target={stat.target} suffix={stat.suffix} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default DedicatedResources