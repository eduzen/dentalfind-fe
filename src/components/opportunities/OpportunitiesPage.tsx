import { useState } from 'react'
import { MapPin, Search } from 'lucide-react'
import type { BrowserNavigate } from '../../hooks/useBrowserPath'
import OpportunityCard from './OpportunityCard'
import { filterOpportunities, opportunities, opportunityCopy, type Language } from './opportunities'
import '../public-pages.css'

export default function OpportunitiesPage({
  language,
  navigate,
}: {
  language: Language
  navigate: BrowserNavigate
}) {
  const t = opportunityCopy[language]
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const [type, setType] = useState('all')
  const [saved, setSaved] = useState<string[]>([])
  const [savedOnly, setSavedOnly] = useState(false)
  const visible = filterOpportunities(opportunities, query, location, type).filter(
    (item) => !savedOnly || saved.includes(item.id),
  )

  function resetFilters() {
    setQuery('')
    setLocation('')
    setType('all')
    setSavedOnly(false)
  }

  return (
    <section className="container public-page" aria-labelledby="opportunities-title">
      <div className="public-page-heading">
        <span className="eyebrow">{t.eyebrow}</span>
        <h1 id="opportunities-title">{t.title}</h1>
        <p>{t.intro}</p>
      </div>
      <div className="opportunity-filters">
        <label>
          <span>{t.search}</span>
          <div className="public-input">
            <Search size={18} aria-hidden="true" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} />
          </div>
        </label>
        <label>
          <span>{t.location}</span>
          <div className="public-input">
            <MapPin size={18} aria-hidden="true" />
            <input value={location} onChange={(event) => setLocation(event.target.value)} />
          </div>
        </label>
        <label>
          <span>{t.type}</span>
          <select value={type} onChange={(event) => setType(event.target.value)}>
            <option value="all">{t.all}</option>
            <option value="temporary">{t.temporary}</option>
            <option value="permanent">{t.permanent}</option>
          </select>
        </label>
      </div>
      <div className="opportunity-results-bar">
        <p role="status">
          {visible.length} {t.results}
        </p>
        <label className="saved-filter">
          <input
            type="checkbox"
            checked={savedOnly}
            onChange={(event) => setSavedOnly(event.target.checked)}
          />
          {t.saved}
        </label>
        <button type="button" className="text-link" onClick={resetFilters}>
          {t.reset}
        </button>
      </div>
      <p className="demo-note">{t.demo}</p>
      <div className="opportunity-grid">
        {visible.map((item) => (
          <OpportunityCard
            key={item.id}
            opportunity={item}
            language={language}
            saved={saved.includes(item.id)}
            navigate={navigate}
            onToggleSave={() =>
              setSaved((current) =>
                current.includes(item.id)
                  ? current.filter((id) => id !== item.id)
                  : [...current, item.id],
              )
            }
          />
        ))}
        {visible.length === 0 && (
          <div className="empty-state">
            <h2>{t.empty}</h2>
            <p>{t.hint}</p>
            <button type="button" className="button button-dark" onClick={resetFilters}>
              {t.reset}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
