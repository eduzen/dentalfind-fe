import { useEffect, useState, type MouseEvent, type ReactElement } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Heart,
  MapPin,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
} from 'lucide-react'
import './App.css'
import SignupPage from './components/signup/SignupPage'
import LoginPage from './components/login/LoginPage'
import OpportunitiesPage from './components/opportunities/OpportunitiesPage'
import HowItWorksPage from './components/how-it-works/HowItWorksPage'
import { useBrowserPath } from './hooks/useBrowserPath'
import {
  filterOpportunities,
  opportunityCopy,
  type Language,
  type Opportunity,
} from './components/opportunities/opportunities'

const opportunities: Opportunity[] = [
  {
    id: 'home-de-jordaan-hygienist',
    role: 'dentalHygienist',
    clinic: 'Tandartspraktijk De Jordaan',
    area: 'Amsterdam-West',
    coordinates: { latitude: 52.374, longitude: 4.881 },
    type: 'temporary',
    time: {
      nl: 'Morgen · 08:30 – 17:00',
      en: 'Tomorrow · 08:30 – 17:00',
      es: 'Mañana · 08:30 – 17:00',
    },
    rate: { nl: '€ 55 – 65 / uur', en: '€ 55 – 65 / hour', es: '€ 55 – 65 / hora' },
    color: 'mint',
    initials: 'DJ',
  },
  {
    id: 'home-studio-dental-assistant',
    role: 'dentalAssistant',
    clinic: 'Studio Dental Noord',
    area: 'Amsterdam-Noord',
    coordinates: { latitude: 52.401, longitude: 4.919 },
    type: 'permanent',
    time: {
      nl: '32 – 40 uur per week',
      en: '32 – 40 hours per week',
      es: '32 – 40 horas por semana',
    },
    rate: {
      nl: '€ 2.650 – 3.250 / mnd',
      en: '€ 2,650 – 3,250 / month',
      es: '€ 2.650 – 3.250 / mes',
    },
    color: 'peach',
    initials: 'SD',
  },
  {
    id: 'home-kleine-wetering-dentist',
    role: 'dentist',
    clinic: 'De Kleine Wetering',
    area: 'Amsterdam-Zuid',
    coordinates: { latitude: 52.353, longitude: 4.89 },
    type: 'temporary',
    time: {
      nl: 'Vrijdag · 09:00 – 18:00',
      en: 'Friday · 09:00 – 18:00',
      es: 'Viernes · 09:00 – 18:00',
    },
    rate: { nl: '€ 600 – 700 / dag', en: '€ 600 – 700 / day', es: '€ 600 – 700 / día' },
    color: 'lavender',
    initials: 'KW',
  },
]

type SearchMode = 'work' | 'staff'

const LANGUAGE_STORAGE_KEY = 'dentalfind-language-v2'

function getInitialLanguage(): Language {
  try {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    if (storedLanguage === 'nl' || storedLanguage === 'en' || storedLanguage === 'es') {
      return storedLanguage
    }
  } catch {
    // Fall back to English when browser storage is unavailable.
  }

  return 'en'
}
type Translation = {
  jobs: string
  how: string
  practices: string
  login: string
  join: string
  eyebrow: string
  headline1: string
  headline2: string
  headline3: string
  lead: string
  work: string
  staff: string
  next: string
  good: string
  all: string
  search: string
  popular: string
  new: string
  fitting: string
  socialProofCount: string
  socialProofCaption: string
  imageAlt: string
  photoTitle: string
  photoCaption: string
  opportunitiesTitle: string
  opportunitiesCaption: string
  matchTitle: string
  matchCaption: string
  workTab: string
  staffTab: string
  workAvailability: string
  staffAvailability: string
  roleSearchPlaceholder: string
  staffSearchPlaceholder: string
  locationLabel: string
  allOpportunities: string
  allRoles: string
  saveOpportunity: string
  removeSavedOpportunity: string
  viewOpportunity: string
  emptyState: string
  trustSafeTitle: string
  trustSafeDescription: string
  trustControlTitle: string
  trustControlDescription: string
  trustQuickTitle: string
  trustQuickDescription: string
  footerTagline: string
  homeLabel: string
  languageLabel: string
  menuLabel: string
}

const copy: Record<Language, Translation> = {
  nl: {
    jobs: 'Vacatures',
    how: 'Hoe het werkt',
    practices: 'Voor praktijken',
    login: 'Inloggen',
    join: 'Gratis aanmelden',
    eyebrow: 'HET PLATFORM VOOR MONDZORG',
    headline1: 'De juiste match.',
    headline2: 'Een gezonde',
    headline3: 'glimlach verder.',
    lead: 'Vind werk dat bij je past, of de professional die jouw praktijk compleet maakt. De mondzorg begint hier.',
    work: 'Bekijk vacatures',
    staff: 'Personeel zoeken',
    next: 'Jouw volgende stap',
    good: 'Goed werk voelt goed.',
    all: 'Bekijk alle kansen',
    search: 'Zoek kansen',
    popular: 'Populair:',
    new: 'NIEUW OP DENTALFIND',
    fitting: 'Kansen die bij je passen',
    socialProofCount: '1.200+ mondzorgprofessionals',
    socialProofCaption: 'vinden hun plek via Dentalfind',
    imageAlt: 'Tandarts en patiënt in een moderne praktijk',
    photoTitle: 'Werk met een glimlach',
    photoCaption: 'Jouw volgende stap begint hier',
    opportunitiesTitle: 'Nieuwe kansen',
    opportunitiesCaption: 'Elke dag vers aanbod',
    matchTitle: 'Een match die klopt',
    matchCaption: 'Voor jou én de praktijk',
    workTab: 'Ik zoek werk',
    staffTab: 'Ik zoek personeel',
    workAvailability: '38 actuele kansen',
    staffAvailability: '124 professionals beschikbaar',
    roleSearchPlaceholder: 'Functie, praktijk of trefwoord',
    staffSearchPlaceholder: 'Zoek op functie of specialisme',
    locationLabel: 'Locatie',
    allOpportunities: 'Alle kansen',
    allRoles: 'Alle functies',
    saveOpportunity: 'Bewaar vacature',
    removeSavedOpportunity: 'Verwijder bewaarde vacature',
    viewOpportunity: 'Bekijk deze kans',
    emptyState: 'Geen kansen gevonden. Probeer een andere zoekterm.',
    trustSafeTitle: 'Veilig & betrouwbaar',
    trustSafeDescription: 'Geverifieerde praktijken',
    trustControlTitle: 'Jij houdt de regie',
    trustControlDescription: 'Transparant van begin tot eind',
    trustQuickTitle: 'Snel geregeld',
    trustQuickDescription: 'In een paar minuten aangemeld',
    footerTagline: 'Een plek voor iedereen in de mondzorg.',
    homeLabel: 'Dentalfind startpagina',
    languageLabel: 'Taal',
    menuLabel: 'Menu',
  },
  en: {
    jobs: 'Opportunities',
    how: 'How it works',
    practices: 'For practices',
    login: 'Log in',
    join: 'Join for free',
    eyebrow: 'THE DENTAL CARE PLATFORM',
    headline1: 'The right match.',
    headline2: 'A brighter',
    headline3: 'smile starts here.',
    lead: 'Find work that fits you, or the professional who completes your practice. Your next step in dental care starts here.',
    work: 'Browse jobs',
    staff: 'Find staff',
    next: 'YOUR NEXT STEP',
    good: 'Good work feels good.',
    all: 'Explore all opportunities',
    search: 'Search opportunities',
    popular: 'Popular:',
    new: 'NEW ON DENTALFIND',
    fitting: 'Opportunities picked for you',
    socialProofCount: '1,200+ dental professionals',
    socialProofCaption: 'find their place through Dentalfind',
    imageAlt: 'Dentist and patient in a modern practice',
    photoTitle: 'Work with a smile',
    photoCaption: 'Your next step starts here',
    opportunitiesTitle: 'New opportunities',
    opportunitiesCaption: 'Fresh opportunities every day',
    matchTitle: 'A match that feels right',
    matchCaption: 'For you and your practice',
    workTab: 'I’m looking for work',
    staffTab: 'I’m looking for staff',
    workAvailability: '38 current opportunities',
    staffAvailability: '124 professionals available',
    roleSearchPlaceholder: 'Role, practice or keyword',
    staffSearchPlaceholder: 'Search by role or specialty',
    locationLabel: 'Location',
    allOpportunities: 'All opportunities',
    allRoles: 'All roles',
    saveOpportunity: 'Save opportunity',
    removeSavedOpportunity: 'Remove saved opportunity',
    viewOpportunity: 'View this opportunity',
    emptyState: 'No opportunities found. Try another search.',
    trustSafeTitle: 'Safe and trusted',
    trustSafeDescription: 'Verified practices',
    trustControlTitle: 'You stay in control',
    trustControlDescription: 'Clear from start to finish',
    trustQuickTitle: 'Quick and easy',
    trustQuickDescription: 'Sign up in just a few minutes',
    footerTagline: 'A place for everyone in dental care.',
    homeLabel: 'Dentalfind home',
    languageLabel: 'Language',
    menuLabel: 'Menu',
  },
  es: {
    jobs: 'Oportunidades',
    how: 'Cómo funciona',
    practices: 'Para clínicas',
    login: 'Iniciar sesión',
    join: 'Regístrate gratis',
    eyebrow: 'LA PLATAFORMA DE SALUD DENTAL',
    headline1: 'La conexión ideal.',
    headline2: 'Una sonrisa',
    headline3: 'empieza aquí.',
    lead: 'Encuentra un trabajo a tu medida o al profesional que completa tu clínica. Tu próximo paso en salud dental empieza aquí.',
    work: 'Ver ofertas',
    staff: 'Buscar personal',
    next: 'TU PRÓXIMO PASO',
    good: 'Un buen trabajo sienta bien.',
    all: 'Ver oportunidades',
    search: 'Buscar oportunidades',
    popular: 'Popular:',
    new: 'NOVEDADES EN DENTALFIND',
    fitting: 'Oportunidades para ti',
    socialProofCount: 'Más de 1.200 profesionales dentales',
    socialProofCaption: 'encuentran su sitio en Dentalfind',
    imageAlt: 'Dentista y paciente en una clínica moderna',
    photoTitle: 'Trabaja con una sonrisa',
    photoCaption: 'Tu próximo paso empieza aquí',
    opportunitiesTitle: 'Nuevas oportunidades',
    opportunitiesCaption: 'Ofertas nuevas cada día',
    matchTitle: 'Una conexión ideal',
    matchCaption: 'Para ti y tu clínica',
    workTab: 'Busco trabajo',
    staffTab: 'Busco personal',
    workAvailability: '38 oportunidades activas',
    staffAvailability: '124 profesionales disponibles',
    roleSearchPlaceholder: 'Puesto, clínica o palabra clave',
    staffSearchPlaceholder: 'Busca por puesto o especialidad',
    locationLabel: 'Ubicación',
    allOpportunities: 'Todas las oportunidades',
    allRoles: 'Todos los puestos',
    saveOpportunity: 'Guardar oferta',
    removeSavedOpportunity: 'Eliminar oferta guardada',
    viewOpportunity: 'Ver esta oportunidad',
    emptyState: 'No hay oportunidades. Prueba otra búsqueda.',
    trustSafeTitle: 'Seguro y confiable',
    trustSafeDescription: 'Clínicas verificadas',
    trustControlTitle: 'Tú tienes el control',
    trustControlDescription: 'Claridad de principio a fin',
    trustQuickTitle: 'Listo en un momento',
    trustQuickDescription: 'Regístrate en solo unos minutos',
    footerTagline: 'Un lugar para todos los profesionales de la salud dental.',
    homeLabel: 'Inicio de Dentalfind',
    languageLabel: 'Idioma',
    menuLabel: 'Menú',
  },
}

function App(): ReactElement {
  const [language, setLanguage] = useState<Language>(getInitialLanguage)
  const { pathname, navigate } = useBrowserPath()
  const t = copy[language]
  const opportunityText = opportunityCopy[language]
  const [mode, setMode] = useState<SearchMode>('work')
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('Amsterdam')
  const [menuOpen, setMenuOpen] = useState(false)
  const [saved, setSaved] = useState<number[]>([])
  const visible = filterOpportunities(opportunities, query, '', 'all', language)

  useEffect(() => {
    document.documentElement.lang = language
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
    } catch {
      // Keep the selected language for this session if browser storage is unavailable.
    }
  }, [language])

  useEffect(() => {
    const targetId = window.location.hash.slice(1)
    if (targetId)
      window.requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView())
  }, [pathname])

  function navigateToSignup(event: MouseEvent<HTMLAnchorElement>) {
    navigateToPage(event)
  }

  function navigateToPage(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return
    event.preventDefault()
    setMenuOpen(false)
    navigate(event.currentTarget.pathname)
  }

  const isOpportunitiesPage = pathname === '/opportunities'
  const isHowItWorksPage = pathname === '/how-it-works'

  if (pathname === '/login') {
    return <LoginPage language={language} onLanguageChange={setLanguage} navigate={navigate} />
  }

  if (pathname === '/sign-up' || pathname.startsWith('/sign-up/')) {
    return (
      <SignupPage
        language={language}
        onLanguageChange={setLanguage}
        pathname={pathname}
        navigate={navigate}
      />
    )
  }

  return (
    <main>
      <header className="nav-wrap">
        <nav className="nav container">
          <a className="brand" href="/" onClick={navigateToPage} aria-label={t.homeLabel}>
            <span className="brand-mark">
              <span />
            </span>
            dentalfind<span className="brand-dot">.</span>
          </a>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a
              href="/opportunities"
              onClick={navigateToPage}
              aria-current={isOpportunitiesPage ? 'page' : undefined}
            >
              {t.jobs}
            </a>
            <a
              href="/how-it-works"
              onClick={navigateToPage}
              aria-current={isHowItWorksPage ? 'page' : undefined}
            >
              {t.how}
            </a>
            <a href="/sign-up/practice" onClick={navigateToPage}>
              {t.practices}
            </a>
          </div>
          <div className="nav-actions">
            <select
              className="language-select"
              aria-label={t.languageLabel}
              value={language}
              onChange={(event) => setLanguage(event.target.value as Language)}
            >
              <option value="nl">NL</option>
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>
            <button className="login" onClick={() => navigate('/login')}>
              {t.login}
            </button>
            <a className="button button-dark nav-cta" href="/sign-up" onClick={navigateToSignup}>
              {t.join} <ArrowRight size={16} />
            </a>
            <button
              className="menu-toggle"
              aria-label={t.menuLabel}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
      </header>

      {isOpportunitiesPage ? (
        <OpportunitiesPage language={language} navigate={navigate} />
      ) : isHowItWorksPage ? (
        <HowItWorksPage language={language} navigate={navigate} />
      ) : (
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
                <a href="/opportunities" onClick={navigateToPage} className="button button-dark">
                  {t.work} <ArrowRight size={17} />
                </a>
                <a href="/sign-up" onClick={navigateToSignup} className="button button-light">
                  {t.staff} <ArrowUpRight size={17} />
                </a>
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
              <a className="text-link" href="/opportunities" onClick={navigateToPage}>
                {t.all} <ArrowRight size={16} />
              </a>
            </div>
            <div className="marketplace">
              <div className="market-top">
                <div className="tabs">
                  <button
                    className={mode === 'work' ? 'active' : ''}
                    onClick={() => setMode('work')}
                  >
                    <BriefcaseBusiness size={16} /> {t.workTab}
                  </button>
                  <button
                    className={mode === 'staff' ? 'active' : ''}
                    onClick={() => setMode('staff')}
                  >
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
                    placeholder={
                      mode === 'work' ? t.roleSearchPlaceholder : t.staffSearchPlaceholder
                    }
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
                <button
                  className="button button-dark search-button"
                  onClick={() =>
                    document
                      .getElementById('results')
                      ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  }
                >
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
              {visible.length ? (
                visible.map((item, index) => (
                  <article className="opportunity-card" key={item.clinic}>
                    <div className="card-top">
                      <span className={`clinic-logo ${item.color}`}>{item.initials}</span>
                      <button
                        className={`save ${saved.includes(index) ? 'saved' : ''}`}
                        aria-label={`${saved.includes(index) ? t.removeSavedOpportunity : t.saveOpportunity}: ${opportunityText.roles[item.role]}, ${item.clinic}`}
                        onClick={() =>
                          setSaved(
                            saved.includes(index)
                              ? saved.filter((n) => n !== index)
                              : [...saved, index],
                          )
                        }
                      >
                        <Heart size={18} fill={saved.includes(index) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                    <span className={`job-type ${item.type === 'temporary' ? 'temp' : ''}`}>
                      {opportunityText[item.type]}
                    </span>
                    <h4>{opportunityText.roles[item.role]}</h4>
                    <p className="clinic-name">{item.clinic}</p>
                    <div className="job-meta">
                      <span>
                        <MapPin size={14} />
                        {item.area}
                      </span>
                      <span>
                        <CalendarDays size={14} />
                        {item.time[language]}
                      </span>
                    </div>
                    <div className="card-bottom">
                      <b>{item.rate[language]}</b>
                      <a
                        href="/sign-up"
                        onClick={navigateToSignup}
                        aria-label={`${t.viewOpportunity}: ${opportunityText.roles[item.role]}, ${item.clinic}`}
                      >
                        <ArrowUpRight size={17} />
                      </a>
                    </div>
                  </article>
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
      )}

      <footer className="container footer">
        <a className="brand" href="/" onClick={navigateToPage} aria-label={t.homeLabel}>
          <span className="brand-mark">
            <span />
          </span>
          dentalfind<span className="brand-dot">.</span>
        </a>
        <span>{t.footerTagline}</span>
        <span>© 2025 Dentalfind</span>
      </footer>
    </main>
  )
}

export default App
