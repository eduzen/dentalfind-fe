import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Clock3,
  Heart,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
} from 'lucide-react'
import type { ReactElement } from 'react'
import type { BrowserNavigate } from '../../hooks/useBrowserPath'
import AppLink from '../layout/AppLink'
import OpportunityCard from '../opportunities/OpportunityCard'
import { filterOpportunities, opportunityCopy, type Language } from '../opportunities/opportunities'
import { homeCopy } from './homeCopy'
import { homeOpportunities } from './homeOpportunities'
import { useHomePageState } from './useHomePageState'

type HomePageProps = {
  language: Language
  navigate: BrowserNavigate
}

export default function HomePage({ language, navigate }: HomePageProps): ReactElement {
  const t = homeCopy[language]
  const opportunityText = opportunityCopy[language]
  const { mode, setMode, query, setQuery, location, setLocation, saved, toggleSaved } =
    useHomePageState()
  const visibleOpportunities = filterOpportunities(homeOpportunities, query, '', 'all', language)

  function scrollToResults(): void {
    document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <>
      <section className="hero container" id="top">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="pulse" /> {t.eyebrow}
          </div>
          <h1>
            {t.headline1}
            <br />
            <em>{t.headline2}</em>
            <br />
            {t.headline3}
          </h1>
          <p className="hero-lede">{t.lead}</p>
          <div className="hero-ctas">
            <AppLink navigate={navigate} href="/opportunities" className="button button-dark">
              {t.work} <ArrowRight size={17} />
            </AppLink>
            <AppLink navigate={navigate} href="/sign-up" className="button button-light">
              {t.staff} <ArrowUpRight size={17} />
            </AppLink>
          </div>
          <div className="social-proof">
            <div className="avatar-stack">
              <span>J</span>
              <span>M</span>
              <span>S</span>
              <span>+</span>
            </div>
            <div>
              <strong>{t.socialProofCount}</strong>
              <small>{t.socialProofCaption}</small>
            </div>
            <div className="proof-stars">★★★★★</div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-photo">
            <img
              src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1100&q=85"
              alt={t.imageAlt}
            />
            <div className="photo-label">
              <span className="label-icon">
                <Sparkles size={15} />
              </span>
              <span>
                <b>{t.photoTitle}</b>
                <small>{t.photoCaption}</small>
              </span>
            </div>
          </div>
          <div className="floating-card availability">
            <span className="available-icon">
              <Check size={15} />
            </span>
            <span>
              <b>{t.opportunitiesTitle}</b>
              <small>{t.opportunitiesCaption}</small>
            </span>
            <ArrowUpRight size={17} />
          </div>
          <div className="floating-card match">
            <div className="match-icon">
              <Heart size={16} fill="currentColor" />
            </div>
            <div>
              <b>{t.matchTitle}</b>
              <small>{t.matchCaption}</small>
            </div>
          </div>
          <div className="hero-scribble">✳</div>
        </div>
      </section>

      <section className="search-section container" id="opportunities">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{t.next}</span>
            <h2>{t.good}</h2>
          </div>
          <AppLink navigate={navigate} className="text-link" href="/opportunities">
            {t.all} <ArrowRight size={16} />
          </AppLink>
        </div>
        <div className="marketplace">
          <div className="market-top">
            <div className="tabs">
              <button className={mode === 'work' ? 'active' : ''} onClick={() => setMode('work')}>
                <BriefcaseBusiness size={16} /> {t.workTab}
              </button>
              <button className={mode === 'staff' ? 'active' : ''} onClick={() => setMode('staff')}>
                <UsersRound size={16} /> {t.staffTab}
              </button>
            </div>
            <span className="market-note">
              <span className="green-dot" />{' '}
              {mode === 'work' ? t.workAvailability : t.staffAvailability}
            </span>
          </div>
          <div className="search-bar">
            <label className="search-field">
              <Search size={19} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={mode === 'work' ? t.roleSearchPlaceholder : t.staffSearchPlaceholder}
              />
            </label>
            <span className="search-divider" />
            <label className="location-field">
              <MapPin size={18} />
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                aria-label={t.locationLabel}
              />
              <ChevronDown size={16} />
            </label>
            <button className="button button-dark search-button" onClick={scrollToResults}>
              {t.search} <ArrowRight size={16} />
            </button>
          </div>
          <div className="filters">
            <span>{t.popular}</span>
            <button onClick={() => setQuery(opportunityText.roles.dentalHygienist)}>
              {opportunityText.roles.dentalHygienist}
            </button>
            <button onClick={() => setQuery(opportunityText.roles.dentalAssistant)}>
              {opportunityText.roles.dentalAssistant}
            </button>
            <button onClick={() => setQuery(opportunityText.temporary)}>
              {opportunityText.temporary}
            </button>
            <button onClick={() => setQuery('')}>
              {t.allOpportunities} <X size={12} />
            </button>
          </div>
        </div>
        <div className="listing-heading" id="results">
          <div>
            <span className="eyebrow">{t.new}</span>
            <h3>{t.fitting}</h3>
          </div>
          <button className="filter-button">
            <span>{t.allRoles}</span>
            <ChevronDown size={15} />
          </button>
        </div>
        <div className="opportunity-grid">
          {visibleOpportunities.length > 0 ? (
            visibleOpportunities.map((item) => (
              <OpportunityCard
                key={item.id}
                opportunity={item}
                language={language}
                saved={saved.includes(item.id)}
                onToggleSave={() => toggleSaved(item.id)}
                navigate={navigate}
                headingLevel="h4"
                signupPath="/sign-up"
              />
            ))
          ) : (
            <div className="empty-state">{t.emptyState}</div>
          )}
        </div>
        <div className="trust-strip">
          <div>
            <ShieldCheck />
            <span>
              <b>{t.trustSafeTitle}</b>
              <small>{t.trustSafeDescription}</small>
            </span>
          </div>
          <div>
            <BadgeCheck />
            <span>
              <b>{t.trustControlTitle}</b>
              <small>{t.trustControlDescription}</small>
            </span>
          </div>
          <div>
            <Clock3 />
            <span>
              <b>{t.trustQuickTitle}</b>
              <small>{t.trustQuickDescription}</small>
            </span>
          </div>
        </div>
      </section>
    </>
  )
}
