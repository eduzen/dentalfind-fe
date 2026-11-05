import { MapPin, Search } from 'lucide-react'
import { useMemo, useState, type ReactElement } from 'react'
import type { BrowserNavigate } from '../../hooks/useBrowserPath'
import { useUserLocation } from '../../hooks/useUserLocation'
import { distanceKm } from '../../services/location'
import MapView from '../maps/MapView'
import OpportunityCard from './OpportunityCard'
import { locationCopy } from './locationCopy'
import { filterOpportunities, opportunities, opportunityCopy, type Language } from './opportunities'
import '../public-pages.css'
import '../maps/maps.css'

type OpportunitiesPageProps = {
  language: Language
  navigate: BrowserNavigate
}

export default function OpportunitiesPage({
  language,
  navigate,
}: OpportunitiesPageProps): ReactElement {
  const t = opportunityCopy[language]
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const [type, setType] = useState('all')
  const [saved, setSaved] = useState<string[]>([])
  const [savedOnly, setSavedOnly] = useState(false)
  const nearby = locationCopy[language]
  const userLocation = useUserLocation()
  const [radius, setRadius] = useState('all')
  const [showMap, setShowMap] = useState(false)
  const visible = useMemo(
    () =>
      filterOpportunities(opportunities, query, location, type, language)
        .filter((item) => !savedOnly || saved.includes(item.id))
        .map((item) => ({
          ...item,
          distance: userLocation.coordinates
            ? distanceKm(userLocation.coordinates, item.coordinates)
            : undefined,
        }))
        .filter(
          (item) =>
            item.distance === undefined || radius === 'all' || item.distance <= Number(radius),
        )
        .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0)),
    [query, location, type, language, savedOnly, saved, userLocation.coordinates, radius],
  )
  const markers = useMemo(
    () =>
      visible.map((item) => ({
        id: item.id,
        position: item.coordinates,
        label: `${item.clinic} — ${item.area}`,
      })),
    [visible],
  )

  function clearLocation(): void {
    userLocation.clear()
    setRadius('all')
  }

  function toggleSaved(id: string): void {
    setSaved((current) =>
      current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id],
    )
  }

  function resetFilters(): void {
    setQuery('')
    setLocation('')
    setType('all')
    setSavedOnly(false)
    clearLocation()
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
      <div className="nearby-controls">
        <p>{nearby.privacy}</p>
        <div className="nearby-actions">
          <button
            type="button"
            className="button button-dark"
            onClick={userLocation.request}
            disabled={userLocation.status === 'loading'}
          >
            {userLocation.status === 'loading' ? nearby.loading : nearby.use}
          </button>
          {userLocation.coordinates && (
            <>
              <label>
                {nearby.radius}{' '}
                <select value={radius} onChange={(event) => setRadius(event.target.value)}>
                  <option value="all">{nearby.any}</option>
                  {[5, 10, 25, 50].map((km) => (
                    <option key={km} value={km}>
                      {km} km
                    </option>
                  ))}
                </select>
              </label>
              <button type="button" className="text-link" onClick={clearLocation}>
                {nearby.clear}
              </button>
            </>
          )}
        </div>
        <p role="status">{nearby[userLocation.status]}</p>
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
      <div className="map-controls">
        <button
          type="button"
          className="button button-dark"
          aria-expanded={showMap}
          aria-controls="opportunity-map"
          onClick={() => setShowMap((current) => !current)}
        >
          {showMap ? nearby.hideMap : nearby.showMap}
        </button>
        <p className="demo-note">{nearby.mapPrivacy}</p>
      </div>
      {showMap && (
        <div id="opportunity-map">
          <MapView markers={markers} label={nearby.mapLabel} loadingLabel={nearby.mapLoading} />
        </div>
      )}
      <div className="opportunity-grid">
        {visible.map((item) => (
          <OpportunityCard
            key={item.id}
            opportunity={item}
            language={language}
            saved={saved.includes(item.id)}
            distanceKm={item.distance}
            navigate={navigate}
            onToggleSave={() => toggleSaved(item.id)}
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
