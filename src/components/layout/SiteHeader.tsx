import { useState, type ReactElement } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import type { BrowserNavigate } from '../../hooks/useBrowserPath'
import type { Language } from '../opportunities/opportunities'
import AppLink from './AppLink'
import { siteCopy } from './siteCopy'

type SiteHeaderProps = {
  language: Language
  onLanguageChange: (language: Language) => void
  pathname: string
  navigate: BrowserNavigate
}

export default function SiteHeader({
  language,
  onLanguageChange,
  pathname,
  navigate,
}: SiteHeaderProps): ReactElement {
  const [menuOpen, setMenuOpen] = useState(false)
  const t = siteCopy[language]

  function closeMenu(): void {
    setMenuOpen(false)
  }

  return (
    <header className="nav-wrap">
      <nav className="nav container">
        <AppLink
          className="brand"
          href="/"
          navigate={navigate}
          onNavigate={closeMenu}
          aria-label={t.homeLabel}
        >
          <span className="brand-mark">
            <span />
          </span>
          dentalfind<span className="brand-dot">.</span>
        </AppLink>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <AppLink
            href="/opportunities"
            navigate={navigate}
            onNavigate={closeMenu}
            aria-current={pathname === '/opportunities' ? 'page' : undefined}
          >
            {t.jobs}
          </AppLink>
          <AppLink
            href="/how-it-works"
            navigate={navigate}
            onNavigate={closeMenu}
            aria-current={pathname === '/how-it-works' ? 'page' : undefined}
          >
            {t.how}
          </AppLink>
          <AppLink href="/sign-up/practice" navigate={navigate} onNavigate={closeMenu}>
            {t.practices}
          </AppLink>
        </div>
        <div className="nav-actions">
          <select
            className="language-select"
            aria-label={t.languageLabel}
            value={language}
            onChange={(event) => onLanguageChange(event.target.value as Language)}
          >
            <option value="nl">NL</option>
            <option value="en">EN</option>
            <option value="es">ES</option>
          </select>
          <button className="login" onClick={() => navigate('/login')}>
            {t.login}
          </button>
          <AppLink
            className="button button-dark nav-cta"
            href="/sign-up"
            navigate={navigate}
            onNavigate={closeMenu}
          >
            {t.join} <ArrowRight size={16} />
          </AppLink>
          <button
            className="menu-toggle"
            aria-label={t.menuLabel}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
    </header>
  )
}
