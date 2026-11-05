import { describe, expect, test } from 'bun:test'
import { filterOpportunities, opportunities } from '../src/components/opportunities/opportunities'

describe('localized opportunity search', () => {
  test('matches role names in the active language', () => {
    expect(
      filterOpportunities(opportunities, 'Mondhygiënist', '', 'all', 'nl').map((item) => item.id),
    ).toEqual(['de-jordaan-hygienist'])
    expect(
      filterOpportunities(opportunities, 'Dental hygienist', '', 'all', 'en').map(
        (item) => item.id,
      ),
    ).toEqual(['de-jordaan-hygienist'])
    expect(
      filterOpportunities(opportunities, 'Higienista dental', '', 'all', 'es').map(
        (item) => item.id,
      ),
    ).toEqual(['de-jordaan-hygienist'])
  })

  test('matches temporary employment labels in the active language', () => {
    expect(
      filterOpportunities(opportunities, 'Waarneming', '', 'all', 'nl').map((item) => item.id),
    ).toEqual(['de-jordaan-hygienist', 'kleine-wetering-dentist'])
    expect(
      filterOpportunities(opportunities, 'Temporary', '', 'all', 'en').map((item) => item.id),
    ).toEqual(['de-jordaan-hygienist', 'kleine-wetering-dentist'])
    expect(
      filterOpportunities(opportunities, 'Temporal', '', 'all', 'es').map((item) => item.id),
    ).toEqual(['de-jordaan-hygienist', 'kleine-wetering-dentist'])
  })
})
