import { describe, expect, test } from 'bun:test'
import { homeOpportunities } from '../src/components/home/homeOpportunities'
import { filterOpportunities } from '../src/components/opportunities/opportunities'
import { toggleSavedOpportunity } from '../src/hooks/useSavedOpportunities'

describe('saved opportunity identity', () => {
  test('saving and removing an opportunity does not mutate previous state', () => {
    const previous = [homeOpportunities[0].id]
    const next = toggleSavedOpportunity(previous, homeOpportunities[1].id)

    expect(previous).toEqual([homeOpportunities[0].id])
    expect(next).toEqual([homeOpportunities[0].id, homeOpportunities[1].id])
    expect(toggleSavedOpportunity(next, homeOpportunities[0].id)).toEqual([homeOpportunities[1].id])
  })

  test('filtering does not transfer a saved state to another card at the same index', () => {
    const saved = toggleSavedOpportunity([], homeOpportunities[0].id)
    const filtered = filterOpportunities(homeOpportunities, 'Studio Dental', '', 'all', 'en')

    expect(filtered).toHaveLength(1)
    expect(saved.includes(filtered[0].id)).toBe(false)

    const restored = filterOpportunities(homeOpportunities, '', '', 'all', 'en')
    expect(restored.filter((item) => saved.includes(item.id)).map((item) => item.id)).toEqual([
      homeOpportunities[0].id,
    ])
  })

  test('reordering results does not change which opportunity is saved', () => {
    const id = homeOpportunities[1].id
    const saved = toggleSavedOpportunity([], id)
    const reordered = [...homeOpportunities].reverse()

    expect(reordered.filter((item) => saved.includes(item.id)).map((item) => item.id)).toEqual([id])
  })
})
