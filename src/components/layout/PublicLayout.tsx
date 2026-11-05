import type { ReactElement, ReactNode } from 'react'
import type { BrowserNavigate } from '../../hooks/useBrowserPath'
import type { Language } from '../opportunities/opportunities'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'

type PublicLayoutProps = {
  language: Language
  onLanguageChange: (language: Language) => void
  pathname: string
  navigate: BrowserNavigate
  children: ReactNode
}

export default function PublicLayout({
  language,
  onLanguageChange,
  pathname,
  navigate,
  children,
}: PublicLayoutProps): ReactElement {
  return (
    <main>
      <SiteHeader
        key={pathname}
        language={language}
        onLanguageChange={onLanguageChange}
        pathname={pathname}
        navigate={navigate}
      />
      {children}
      <SiteFooter language={language} navigate={navigate} />
    </main>
  )
}
