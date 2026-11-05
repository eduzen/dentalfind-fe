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

const opportunities = [
  {
    role: 'Mondhygiënist',
    clinic: 'Tandartspraktijk De Jordaan',
    area: 'Amsterdam-West',
    type: 'Waarneming',
    time: 'Morgen · 08:30 – 17:00',
    rate: '€ 55 – 65 / uur',
    color: 'mint',
    initials: 'DJ',
  },
  {
    role: 'Tandartsassistent',
    clinic: 'Studio Dental Noord',
    area: 'Amsterdam-Noord',
    type: 'Vaste baan',
    time: '32 – 40 uur per week',
    rate: '€ 2.650 – 3.250 / mnd',
    color: 'peach',
    initials: 'SD',
  },
  {
    role: 'Tandarts',
    clinic: 'De Kleine Wetering',
    area: 'Amsterdam-Zuid',
    type: 'Waarneming',
    time: 'Vrijdag · 09:00 – 18:00',
    rate: '€ 600 – 700 / dag',
    color: 'lavender',
    initials: 'KW',
  },
]

type Language = 'nl' | 'en' | 'es'
type UserMode = 'werk' | 'personeel'

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
  },
}

function App(): ReactElement {
  const [language, setLanguage] = useState<Language>(getInitialLanguage)
  const { pathname, navigate } = useBrowserPath()
  const t = copy[language]
  const [mode, setMode] = useState<UserMode>('werk')
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('Amsterdam')
  const [menuOpen, setMenuOpen] = useState(false)
  const [saved, setSaved] = useState<number[]>([])
  const visible = opportunities.filter((item) =>
    `${item.role} ${item.clinic} ${item.area}`.toLowerCase().includes(query.toLowerCase()),
  )

  useEffect(() => {
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
    } catch {
      // Keep the selected language for this session if browser storage is unavailable.
    }
  }, [language])

  useEffect(() => {
    if (pathname === '/inloggen') {
      navigate('/login', { replace: true })
      return
    }
    if (pathname === '/' && window.location.hash === '#aanmelden') {
      navigate('/sign-up', { replace: true })
      return
    }
    const targetId = window.location.hash.slice(1)
    if (targetId)
      window.requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView())
  }, [navigate, pathname])

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

  if (pathname === '/login' || pathname === '/inloggen') {
    return <LoginPage language={language} onLanguageChange={setLanguage} navigate={navigate} />
  }

  if (
    pathname === '/sign-up' ||
    pathname.startsWith('/sign-up/') ||
    pathname === '/aanmelden' ||
    pathname.startsWith('/aanmelden/')
  ) {
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
          <a className="brand" href="/" onClick={navigateToPage} aria-label="Dentalfind home">
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
              aria-label="Language"
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
              aria-label="Menu"
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
                  <strong>1.200+ mondzorgprofessionals</strong>
                  <small>vinden hun plek via Dentalfind</small>
                </div>
                <div className="proof-stars">★★★★★</div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-photo">
                <img
                  src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1100&q=85"
                  alt="Tandarts en patiënt in een moderne praktijk"
                />
                <div className="photo-label">
                  <span className="label-icon">
                    <Sparkles size={15} />
                  </span>
                  <span>
                    <b>Werk met een glimlach</b>
                    <small>Jouw volgende stap begint hier</small>
                  </span>
                </div>
              </div>
              <div className="floating-card availability">
                <span className="available-icon">
                  <Check size={15} />
                </span>
                <span>
                  <b>Nieuwe kansen</b>
                  <small>Elke dag vers aanbod</small>
                </span>
                <ArrowUpRight size={17} />
              </div>
              <div className="floating-card match">
                <div className="match-icon">
                  <Heart size={16} fill="currentColor" />
                </div>
                <div>
                  <b>Een match die klopt</b>
                  <small>Voor jou én de praktijk</small>
                </div>
              </div>
              <div className="hero-scribble">✳</div>
            </div>
          </section>

          <section className="search-section container" id="kansen">
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
                    className={mode === 'werk' ? 'active' : ''}
                    onClick={() => setMode('werk')}
                  >
                    <BriefcaseBusiness size={16} /> Ik zoek werk
                  </button>
                  <button
                    className={mode === 'personeel' ? 'active' : ''}
                    onClick={() => setMode('personeel')}
                  >
                    <UsersRound size={16} /> Ik zoek personeel
                  </button>
                </div>
                <span className="market-note">
                  <span className="green-dot" />{' '}
                  {mode === 'werk' ? '38 actuele kansen' : '124 professionals beschikbaar'}
                </span>
              </div>
              <div className="search-bar">
                <label className="search-field">
                  <Search size={19} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={
                      mode === 'werk'
                        ? 'Functie, praktijk of trefwoord'
                        : 'Zoek op functie of specialisme'
                    }
                  />
                </label>
                <span className="search-divider" />
                <label className="location-field">
                  <MapPin size={18} />
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    aria-label="Locatie"
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
                <button onClick={() => setQuery('Mondhygiënist')}>Mondhygiënist</button>
                <button onClick={() => setQuery('Tandartsassistent')}>Tandartsassistent</button>
                <button onClick={() => setQuery('Waarneming')}>Waarneming</button>
                <button onClick={() => setQuery('')}>
                  Alle kansen <X size={12} />
                </button>
              </div>
            </div>
            <div className="listing-heading" id="results">
              <div>
                <span className="eyebrow">{t.new}</span>
                <h3>{t.fitting}</h3>
              </div>
              <button className="filter-button">
                <span>Alle functies</span>
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
                        aria-label="Bewaar vacature"
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
                    <span className={`job-type ${item.type === 'Waarneming' ? 'temp' : ''}`}>
                      {item.type}
                    </span>
                    <h4>{item.role}</h4>
                    <p className="clinic-name">{item.clinic}</p>
                    <div className="job-meta">
                      <span>
                        <MapPin size={14} />
                        {item.area}
                      </span>
                      <span>
                        <CalendarDays size={14} />
                        {item.time}
                      </span>
                    </div>
                    <div className="card-bottom">
                      <b>{item.rate}</b>
                      <a
                        href="/sign-up"
                        onClick={navigateToSignup}
                        aria-label={`Bekijk ${item.role}`}
                      >
                        <ArrowUpRight size={17} />
                      </a>
                    </div>
                  </article>
                ))
              ) : (
                <div className="empty-state">
                  Geen kansen gevonden. Probeer een andere zoekterm.
                </div>
              )}
            </div>
            <div className="trust-strip">
              <div>
                <ShieldCheck />
                <span>
                  <b>Veilig & betrouwbaar</b>
                  <small>Geverifieerde praktijken</small>
                </span>
              </div>
              <div>
                <BadgeCheck />
                <span>
                  <b>Jij houdt de regie</b>
                  <small>Transparant van begin tot eind</small>
                </span>
              </div>
              <div>
                <Clock3 />
                <span>
                  <b>Snel geregeld</b>
                  <small>In een paar minuten aangemeld</small>
                </span>
              </div>
            </div>
          </section>
        </>
      )}

      <footer className="container footer">
        <a className="brand" href="/" onClick={navigateToPage}>
          <span className="brand-mark">
            <span />
          </span>
          dentalfind<span className="brand-dot">.</span>
        </a>
        <span>Een plek voor iedereen in de mondzorg.</span>
        <span>© 2025 Dentalfind</span>
      </footer>
    </main>
  )
}

export default App
