import { useEffect, useRef, useState } from 'react'
import type { Coordinates } from '../services/location'

export type LocationStatus = 'idle' | 'loading' | 'ready' | 'denied' | 'unavailable' | 'timeout'

type UserLocation = {
  coordinates: Coordinates | null
  status: LocationStatus
  request: () => void
  clear: () => void
}

export function useUserLocation(): UserLocation {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null)
  const [status, setStatus] = useState<LocationStatus>('idle')
  const requestId = useRef(0)

  useEffect(
    () => () => {
      requestId.current += 1
    },
    [],
  )

  function clear(): void {
    requestId.current += 1
    setCoordinates(null)
    setStatus('idle')
  }

  function request(): void {
    const id = ++requestId.current
    if (!navigator.geolocation) {
      setStatus('unavailable')
      return
    }
    setStatus('loading')
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        if (id !== requestId.current) return
        setCoordinates({ latitude: coords.latitude, longitude: coords.longitude })
        setStatus('ready')
      },
      (error) => {
        if (id !== requestId.current) return
        switch (error.code) {
          case 1:
            setStatus('denied')
            break
          case 3:
            setStatus('timeout')
            break
          default:
            setStatus('unavailable')
        }
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 },
    )
  }

  return { coordinates, status, request, clear }
}
