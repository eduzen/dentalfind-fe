import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import type { BrowserNavigate } from '../../hooks/useBrowserPath'
import type { Language } from '../opportunities/opportunities'
import HowItWorksSteps from './HowItWorksSteps'
import { howItWorksCopy } from './howItWorksCopy'
import '../public-pages.css'

export default function HowItWorksPage({
  language,
  navigate,
}: {
  language: Language
  navigate: BrowserNavigate
}) {
  const [audience, setAudience] = useState<'professional' | 'practice'>('professional')
  const t = howItWorksCopy[language]

  return (
    <section className="container public-page" aria-labelledby="how-title">
      <div className="public-page-heading">
        <span className="eyebrow">{t.eyebrow}</span>
        <h1 id="how-title">{t.title}</h1>
        <p>{t.intro}</p>
      </div>
      <div className="how-audience" role="group" aria-label={t.title}>
        <button
          className={`button ${audience === 'professional' ? 'button-dark' : 'button-light'}`}
          aria-pressed={audience === 'professional'}
          onClick={() => setAudience('professional')}
        >
          {t.professional}
        </button>
        <button
          className={`button ${audience === 'practice' ? 'button-dark' : 'button-light'}`}
          aria-pressed={audience === 'practice'}
          onClick={() => setAudience('practice')}
        >
          {t.practice}
        </button>
      </div>
      <HowItWorksSteps
        steps={audience === 'professional' ? t.professionalSteps : t.practiceSteps}
      />
      <div className="how-cta">
        <div>
          <h2>{t.cta}</h2>
          <p>{t.ctaText}</p>
        </div>
        <div className="hero-ctas">
          <a
            href={audience === 'professional' ? '/sign-up/work' : '/sign-up/practice'}
            className="button button-dark"
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
              navigate(audience === 'professional' ? '/sign-up/work' : '/sign-up/practice')
            }}
          >
            {t.join}
            <ArrowRight size={17} />
          </a>
          <a
            href="/opportunities"
            className="text-link"
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
              navigate('/opportunities')
            }}
          >
            {t.browse}
            <ArrowRight size={17} />
          </a>
        </div>
      </div>
      <p className="demo-note">{t.note}</p>
    </section>
  )
}
