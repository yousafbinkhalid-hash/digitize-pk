import { useCountUp } from '../useCountUp.js'

function StatCard({ target, suffix, label }) {
  const [ref, value] = useCountUp(target)

  return (
    <div className="stat-card" ref={ref}>
      <div className="stat-card__number">
        {value}
        <span className="stat-card__suffix">{suffix}</span>
      </div>
      <p className="stat-card__label">{label}</p>
    </div>
  )
}

export default StatCard