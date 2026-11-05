export type Coordinates = { latitude: number; longitude: number }

/** Straight-line distance; deliberately independent of any map or routing vendor. */
export function distanceKm(from: Coordinates, to: Coordinates): number {
  function radians(degrees: number): number {
    return (degrees * Math.PI) / 180
  }
  const latDelta = radians(to.latitude - from.latitude)
  const lonDelta = radians(to.longitude - from.longitude)
  const a =
    Math.sin(latDelta / 2) ** 2 +
    Math.cos(radians(from.latitude)) * Math.cos(radians(to.latitude)) * Math.sin(lonDelta / 2) ** 2
  return 6371 * 2 * Math.asin(Math.sqrt(Math.min(1, a)))
}
