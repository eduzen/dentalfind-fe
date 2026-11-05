import type { ReactElement } from 'react'
import type { BrowserNavigate } from '../../hooks/useBrowserPath'
import type { Language } from '../opportunities/opportunities'
import AppLink from './AppLink'
import { siteCopy } from './siteCopy'

type SiteFooterProps = {
  language: Language
  navigate: BrowserNavigate
}

export default function SiteFooter({ language, navigate }: SiteFooterProps): ReactElement {
  const t = siteCopy[language]

  return (
    <footer className="container footer">
      <AppLink className="brand" href="/" navigate={navigate} aria-label={t.homeLabel}>
        <span className="brand-mark">
          <span />
        </span>
        dentalfind<span className="brand-dot">.</span>
      </AppLink>
      <span>{t.footerTagline}</span>
      <span>© 2025 Dentalfind</span>
    </footer>
  )
}
