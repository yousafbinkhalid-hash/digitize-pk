import { useState } from 'react'
import './Portfolio.css'

const CATEGORIES = ['All', 'Web', 'Apps', 'Platforms']

const PROJECTS = [
  { id: 'ledgerly', title: 'Ledgerly', category: 'Web', path: '~/work/ledgerly', description: 'Finance dashboard rebuilt for a 40k-user fintech.', gradient: 'linear-gradient(135deg, #3E7A5A, #C2A46B)' },
  { id: 'porthaus', title: 'Porthaus', category: 'Platforms', path: '~/work/porthaus', description: 'Logistics platform connecting shippers and carriers.', gradient: 'linear-gradient(135deg, #1F5C43, #8FBFA0)' },
  { id: 'fieldnote', title: 'Fieldnote', category: 'Apps', path: '~/work/fieldnote', description: 'Offline-first mobile app for field data collection.', gradient: 'linear-gradient(135deg, #4B8567, #2F5940)' },
  { id: 'cursive', title: 'Cursive', category: 'Web', path: '~/work/cursive', description: 'Marketing site and booking flow on a headless CMS.', gradient: 'linear-gradient(135deg, #C2A46B, #D8C48A)' },
  { id: 'haystack', title: 'Haystack', category: 'Platforms', path: '~/work/haystack', description: 'Internal ticket-triage tool that halved response time.', gradient: 'linear-gradient(135deg, #2F5940, #4B8567)' },
  { id: 'reeflow', title: 'Reeflow', category: 'Apps', path: '~/work/reeflow', description: 'iOS and Android companion app for a hardware launch.', gradient: 'linear-gradient(135deg, #D8C48A, #1F5C43)' },
]

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All')

  const visibleProjects =
    activeFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeFilter)

  return (
    <section className="portfolio" id="work">
      <div className="portfolio__header">
        <span className="portfolio__eyebrow">recent work</span>
        <h2 className="portfolio__title">A few things we've shipped.</h2>

        <div className="portfolio__filters">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              className={`portfolio__filter ${activeFilter === category ? 'portfolio__filter--active' : ''}`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="portfolio__grid">
        {visibleProjects.map((project) => (
          <div className="project-card" key={project.id}>
            <div className="project-card__thumb" style={{ background: project.gradient }} />
            <div className="project-card__body">
              <span className="project-card__path">{project.path}</span>
              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__description">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Portfolio