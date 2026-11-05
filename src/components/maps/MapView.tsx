import { lazy, Suspense, type ReactElement } from 'react'
import type { Coordinates } from '../../services/location'

export type MapMarker = { id: string; position: Coordinates; label: string }
export type MapViewProps = { markers: MapMarker[]; label: string; loadingLabel: string }

// Vendor selection lives here; callers only supply domain coordinates and labels.
const Provider = lazy(() => import('./OpenStreetMapProvider'))

export default function MapView(props: MapViewProps): ReactElement {
  return (
    <Suspense fallback={<p role="status">{props.loadingLabel}</p>}>
      <Provider {...props} />
    </Suspense>
  )
}
