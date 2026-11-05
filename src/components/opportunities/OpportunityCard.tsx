import { ArrowUpRight, CalendarDays, Heart, MapPin } from 'lucide-react'
import type { ReactElement } from 'react'
import type { BrowserNavigate } from '../../hooks/useBrowserPath'
import AppLink from '../layout/AppLink'
import { locationCopy } from './locationCopy'
import { opportunityCopy, type Language, type Opportunity } from './opportunities'

type OpportunityCardProps = {
  opportunity: Opportunity
  language: Language
  saved: boolean
  distanceKm?: number
  onToggleSave: () => void
  navigate: BrowserNavigate
  headingLevel?: 'h3' | 'h4'
  signupPath?: '/sign-up' | '/sign-up/work'
}

export default function OpportunityCard({
  opportunity,
  language,
  saved,
  onToggleSave,
  navigate,
  distanceKm,
  headingLevel: Heading = 'h3',
  signupPath = '/sign-up/work',
}: OpportunityCardProps): ReactElement {
  const t = opportunityCopy[language]
  const roleLabel = t.roles[opportunity.role]

  return (
    <article className="opportunity-card">
      <div className="card-top">
        <span className={`clinic-logo ${opportunity.color}`}>{opportunity.initials}</span>
        <button
          type="button"
          className={`save ${saved ? 'saved' : ''}`}
          aria-label={`${saved ? t.unsave : t.save}: ${roleLabel}, ${opportunity.clinic}`}
          aria-pressed={saved}
          onClick={onToggleSave}
        >
          <Heart size={18} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>
      <span className={`job-type ${opportunity.type === 'temporary' ? 'temp' : ''}`}>
        {t[opportunity.type]}
      </span>
      <Heading>{roleLabel}</Heading>
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
        <AppLink
          href={signupPath}
          navigate={navigate}
          aria-label={`${t.view}: ${roleLabel}, ${opportunity.clinic}`}
        >
          <ArrowUpRight size={17} />
        </AppLink>
      </div>
    </article>
  )
}
