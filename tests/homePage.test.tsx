import { describe, expect, test } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import HomePage from '../src/components/home/HomePage'
import { HomePageStateProvider } from '../src/components/home/HomePageStateProvider'
import OpportunityCard from '../src/components/opportunities/OpportunityCard'
import { homeOpportunities } from '../src/components/home/homeOpportunities'
import { homeCopy } from '../src/components/home/homeCopy'
import type { Language } from '../src/components/opportunities/opportunities'

const navigate = () => {}

describe('homepage composition', () => {
  for (const language of ['en', 'nl', 'es'] satisfies Language[]) {
    test(`renders localized homepage and preview cards in ${language}`, () => {
      const html = renderToStaticMarkup(
        <HomePageStateProvider>
          <HomePage language={language} navigate={navigate} />
        </HomePageStateProvider>,
      )

      expect(html).toContain(homeCopy[language].headline1)
      expect(html).toContain(homeCopy[language].trustQuickTitle)
      expect(html.match(/class="opportunity-card"/g)).toHaveLength(homeOpportunities.length)
      expect(html.match(/<h4>/g)).toHaveLength(homeOpportunities.length)
      expect(html.match(/aria-pressed="false"/g)).toHaveLength(homeOpportunities.length)
      expect(html).toContain('href="/opportunities"')
      expect(html).not.toContain('href="/sign-up/work"')
    })
  }

  test('shared cards retain their default heading and signup destination', () => {
    const html = renderToStaticMarkup(
      <OpportunityCard
        opportunity={homeOpportunities[0]}
        language="en"
        saved
        onToggleSave={() => {}}
        navigate={navigate}
      />,
    )

    expect(html).toContain('<h3>Dental hygienist</h3>')
    expect(html).toContain('href="/sign-up/work"')
    expect(html).toContain('aria-pressed="true"')
  })
})
