import './Services.css'

const SERVICES = [
  {
    id: 'web',
    icon: '◆',
    title: 'Websites',
    description: 'Marketing sites and web apps built for speed, and easy for your team to update after launch.',
  },
  {
    id: 'apps',
    icon: '▲',
    title: 'Apps',
    description: 'iOS, Android, and cross-platform apps carried from first prototype through App Store release.',
  },
  {
    id: 'platform',
    icon: '●',
    title: 'Platforms',
    description: 'Internal tools and product platforms that scale cleanly as your data and team grow.',
  },
  {
    id: 'design',
    icon: '■',
    title: 'Product design',
    description: 'UX and UI grounded in how people actually use the product — wireframes to dev-ready design systems.',
  },
]

function Services() {
  return (
    <section className="services" id="services">
      <div className="services__header">
        <span className="services__eyebrow">what we build</span>
        <h2 className="services__title">Four ways to work with us.</h2>
      </div>

      <div className="services__grid">
        {SERVICES.map((service) => (
          <div className="service-card" key={service.id}>
            <span className="service-card__icon">{service.icon}</span>
            <h3 className="service-card__title">{service.title}</h3>
            <p className="service-card__description">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services