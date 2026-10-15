import { useEffect, useState } from 'react'
import type { Place } from '../domain/place'

type HoursState =
  | { status: 'loading' }
  | { status: 'unavailable' }
  | { status: 'ready'; openingHours: string }

function timezone(country: string): string {
  if (country === 'Brasil') return 'America/Sao_Paulo'
  if (country === 'Paraguay') return 'America/Asuncion'
  return 'America/Argentina/Cordoba'
}

export function OpeningHours({ place }: { place: Place }) {
  const [state, setState] = useState<HoursState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()
    const query = `[out:json][timeout:12];nwr(around:120,${place.latitude},${place.longitude})["name"="${place.name.replaceAll('"', '\\"')}"]["opening_hours"];out tags 1;`
    fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: new URLSearchParams({ data: query }),
      signal: controller.signal,
    })
      .then((response) => response.ok ? response.json() as Promise<{ elements: Array<{ tags?: { opening_hours?: string } }> }> : Promise.reject())
      .then((result) => {
        const openingHours = result.elements[0]?.tags?.opening_hours
        setState(openingHours ? { status: 'ready', openingHours } : { status: 'unavailable' })
      })
      .catch(() => {
        if (!controller.signal.aborted) setState({ status: 'unavailable' })
      })
    return () => controller.abort()
  }, [place])

  if (state.status === 'loading') return <p className="hours">Consultando horario comunitario...</p>
  if (state.status === 'unavailable') return <p className="hours">Horario no disponible en OpenStreetMap. Confirmalo con el lugar.</p>

  return (
    <p className="hours">
      <strong>Horario publicado:</strong> {state.openingHours} ({timezone(place.country)})
    </p>
  )
}
