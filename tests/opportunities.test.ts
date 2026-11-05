import assert from 'node:assert/strict'
import { test } from 'bun:test'
import { filterOpportunities, opportunities } from '../src/components/opportunities/opportunities'

test('returns all opportunities when filters are empty', () => {
  assert.deepEqual(filterOpportunities(opportunities, '', '', 'all'), opportunities)
})

test('search ignores case, surrounding whitespace and accents', () => {
  assert.deepEqual(
    filterOpportunities(opportunities, '  MONDHYGIENIST ', '', 'all').map((item) => item.id),
    ['de-jordaan-hygienist'],
  )
})

test('search matches practice names', () => {
  assert.equal(
    filterOpportunities(opportunities, 'Studio Dental', '', 'all')[0]?.id,
    'studio-dental-assistant',
  )
})

test('combines keyword, location and employment filters', () => {
  assert.equal(filterOpportunities(opportunities, 'Tandarts', 'noord', 'permanent').length, 1)
  assert.equal(filterOpportunities(opportunities, 'Tandarts', 'noord', 'temporary').length, 0)
})

test('supports city and district filtering', () => {
  assert.equal(filterOpportunities(opportunities, '', 'amsterdam', 'all').length, 3)
  assert.equal(filterOpportunities(opportunities, '', 'zuid', 'all').length, 1)
})

test('returns no results for unmatched search terms', () => {
  assert.deepEqual(filterOpportunities(opportunities, 'no-such-practice', '', 'all'), [])
})

test('opportunities have unique stable identifiers for saving filtered results', () => {
  assert.equal(new Set(opportunities.map((item) => item.id)).size, opportunities.length)
})
