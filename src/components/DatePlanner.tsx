import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import type { Place } from '../domain/place'
import type { PlannedDate } from '../domain/plannedDate'
import { directionsUrl } from '../domain/place'
import { loadPlannedDates, savePlannedDates } from '../data/plannedDates'

interface DatePlannerProps {
  places: Place[]
}

const today = new Date().toISOString().slice(0, 10)

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('es-AR', { dateStyle: 'full' }).format(
    new Date(`${value}T12:00:00`),
  )
}

export function DatePlanner({ places }: DatePlannerProps) {
  const [dates, setDates] = useState<PlannedDate[]>(loadPlannedDates)
  const [placeId, setPlaceId] = useState(places[0]?.id ?? '')
  const [date, setDate] = useState(today)
  const [budget, setBudget] = useState('')
  const [note, setNote] = useState('')
  const placeById = useMemo(() => new Map(places.map((place) => [place.id, place])), [places])

  function createDate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const next = [{
      id: crypto.randomUUID(),
      placeId,
      date,
      budget: budget.trim(),
      note: note.trim(),
    }, ...dates]
    setDates(next)
    savePlannedDates(next)
    setBudget('')
    setNote('')
  }

  function removeDate(id: string) {
    const next = dates.filter((plannedDate) => plannedDate.id !== id)
    setDates(next)
    savePlannedDates(next)
  }

  return (
    <section className="date-planner" aria-labelledby="date-planner-title">
      <div>
        <p className="section-label">ARMEN EL PLAN</p>
        <h2 id="date-planner-title">Su proxima cita, agendada.</h2>
        <p>Guarden fecha, lugar y presupuesto en este dispositivo.</p>
      </div>
      <form onSubmit={createDate}>
        <label>
          Lugar
          <select value={placeId} onChange={(event) => setPlaceId(event.target.value)}>
            {places.map((place) => <option key={place.id} value={place.id}>{place.name}</option>)}
          </select>
        </label>
        <label>
          Fecha
          <input type="date" min={today} value={date} onChange={(event) => setDate(event.target.value)} required />
        </label>
        <label>
          Presupuesto total
          <input value={budget} maxLength={40} onChange={(event) => setBudget(event.target.value)} placeholder="Ej.: hasta $40.000" />
        </label>
        <label className="date-planner__note">
          Nota o mision
          <input value={note} maxLength={140} onChange={(event) => setNote(event.target.value)} placeholder="Ej.: elegir un libro para el otro" />
        </label>
        <button type="submit">Agendar cita</button>
      </form>
      {dates.length > 0 && (
        <ul className="planned-dates">
          {dates.map((plannedDate) => {
            const place = placeById.get(plannedDate.placeId)
            if (!place) return null
            return (
              <li key={plannedDate.id}>
                <div>
                  <strong>{place.name}</strong>
                  <span>{formatDate(plannedDate.date)}{plannedDate.budget && ` · ${plannedDate.budget}`}</span>
                  {plannedDate.note && <small>{plannedDate.note}</small>}
                </div>
                <div>
                  <a href={directionsUrl(place)} target="_blank" rel="noreferrer">Como llegar</a>
                  <button type="button" onClick={() => removeDate(plannedDate.id)}>Quitar</button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
