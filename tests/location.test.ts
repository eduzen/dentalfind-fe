import assert from 'node:assert/strict'
import { test } from 'bun:test'
import { distanceKm } from '../src/services/location'
import { opportunities } from '../src/components/opportunities/opportunities'

const amsterdam = { latitude: 52.3676, longitude: 4.9041 }

test('identical coordinates have zero distance', () => {
  assert.equal(distanceKm(amsterdam, amsterdam), 0)
})

test('calculates symmetric distances in kilometers', () => {
  const utrecht = { latitude: 52.0907, longitude: 5.1214 }
  const distance = distanceKm(amsterdam, utrecht)
  assert.ok(distance > 33 && distance < 36)
  assert.equal(distance, distanceKm(utrecht, amsterdam))
})

test('handles the antimeridian and antipodal points', () => {
  assert.ok(distanceKm({ latitude: 0, longitude: 179.9 }, { latitude: 0, longitude: -179.9 }) < 23)
  const opposite = distanceKm({ latitude: 0, longitude: 0 }, { latitude: 0, longitude: 180 })
  assert.ok(Number.isFinite(opposite) && opposite > 20000)
})

test('demo practices have valid coordinates near Amsterdam', () => {
  for (const item of opportunities) {
    assert.ok(Math.abs(item.coordinates.latitude) <= 90)
    assert.ok(Math.abs(item.coordinates.longitude) <= 180)
    assert.ok(distanceKm(amsterdam, item.coordinates) < 10)
  }
})
