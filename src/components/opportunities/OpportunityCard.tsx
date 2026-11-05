import { ArrowUpRight, CalendarDays, Heart, MapPin } from 'lucide-react'
import type { ReactElement } from 'react'
import type { BrowserNavigate } from '../../hooks/useBrowserPath'
import { locationCopy } from './locationCopy'
import { opportunityCopy, type Language, type Opportunity } from './opportunities'

type OpportunityCardProps = {
  opportunity: Opportunity
  language: Language
  saved: boolean
  distanceKm?: number
  onToggleSave: () => void
  navigate: BrowserNavigate
}

export default function OpportunityCard({
  opportunity,
  language,
  saved,
  onToggleSave,
  navigate,
  distanceKm,
}: OpportunityCardProps): ReactElement {
  const t = opportunityCopy[language]

  return (
    <article className="opportunity-card">
      <div className="card-top">
        <span className={`clinic-logo ${opportunity.color}`}>{opportunity.initials}</span>
        <button
          type="button"
          className={`save ${saved ? 'saved' : ''}`}
          aria-label={`${saved ? t.unsave : t.save}: ${t.roles[opportunity.role]}, ${opportunity.clinic}`}
          aria-pressed={saved}
          onClick={onToggleSave}
        >
          <Heart size={18} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>
      <span className={`job-type ${opportunity.type === 'temporary' ? 'temp' : ''}`}>
        {t[opportunity.type]}
      </span>
      <h3>{t.roles[opportunity.role]}</h3>
      <p className="clinic-name">{opportunity.clinic}</p>
      <div className="job-meta">
        <span>
          <MapPin size={14} />
          {opportunity.area}
        </span>
        <span>
          <CalendarDays size={14} />
          {opportunity.time[language]}
        </span>
      </div>
      {distanceKm !== undefined && (
        <p className="distance-note">
          {new Intl.NumberFormat(language, { maximumFractionDigits: 1 }).format(distanceKm)}{' '}
          {locationCopy[language].distance}
        </p>
      )}
      <div className="card-bottom">
        <b>{opportunity.rate[language]}</b>
        <a
          href="/sign-up/work"
          aria-label={`${t.view}: ${t.roles[opportunity.role]}, ${opportunity.clinic}`}
          onClick={(event) => {
            if (
              event.button !== 0 ||
              event.metaKey ||
              event.ctrlKey ||
              event.shiftKey ||
              event.altKey
            )
              return
            event.preventDefault()
            navigate('/sign-up/work')
          }}
        >
          <ArrowUpRight size={17} />
        </a>
      </div>
    </article>
  )
}
