import L from 'leaflet'
import { useEffect, useRef, type ReactElement } from 'react'
import type { MapViewProps } from './MapView'
import 'leaflet/dist/leaflet.css'

export default function OpenStreetMapProvider({ markers, label }: MapViewProps): ReactElement {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!container.current) return
    const map = L.map(container.current, { scrollWheelZoom: false })
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map)
    const points = markers.map(({ position, label: markerLabel }) => {
      const point = L.latLng(position.latitude, position.longitude)
      const popup = document.createElement('span')
      popup.textContent = markerLabel
      L.circleMarker(point, { radius: 10, color: '#19332f', fillColor: '#8ec5a4', fillOpacity: 1 })
        .bindPopup(popup)
        .addTo(map)
      return point
    })
    if (points.length > 0) {
      map.fitBounds(L.latLngBounds(points), { padding: [40, 40], maxZoom: 13 })
    } else {
      map.setView([52.3676, 4.9041], 11)
    }
    const observer = new ResizeObserver(() => map.invalidateSize())
    observer.observe(container.current)
    return () => {
      observer.disconnect()
      map.remove()
    }
  }, [markers])

  return <div ref={container} className="opportunities-map" role="region" aria-label={label} />
}
