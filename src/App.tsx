import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'
import { filterPlans, pickPlan } from './domain/plan'
import type { Plan, PlanFilters } from './domain/plan'
import { loadFavoriteIds, saveFavoriteIds } from './data/favorites'
import { createPlanRepository } from './data/planRepository'
import { localPlaces } from './data/places'
import { directionsUrl, filterPlaces, mapEmbedUrl } from './domain/place'
import type { Place, PlaceFilters } from './domain/place'
import { DatePlanner } from './components/DatePlanner'
import { OpeningHours } from './components/OpeningHours'

const repository = createPlanRepository()
const placeFavoritesStorageKey = 'plan-a-dos:place-favorites'

const initialFilters: PlanFilters = {
  mood: 'tranquilo',
  budget: 'bajo',
  duration: 'corto',
}

const labels = {
  mood: {
    tranquilo: 'Tranquilo',
    aventurero: 'Aventurero',
    romantico: 'Romantico',
    creativo: 'Creativo',
  },
  budget: { bajo: 'Bajo', medio: 'Medio', alto: 'Alto' },
  duration: { corto: 'Menos de 1 hora', medio: '1 a 3 horas', largo: 'Toda la tarde' },
}

function App() {
  const [filters, setFilters] = useState<PlanFilters>(initialFilters)
  const [plans, setPlans] = useState<Plan[]>([])
  const [recommendation, setRecommendation] = useState<Plan | null>(null)
  const [favoriteIds, setFavoriteIds] = useState<string[]>(loadFavoriteIds)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [attempt, setAttempt] = useState(0)
  const [hasSearched, setHasSearched] = useState(false)
  const [placeFilters, setPlaceFilters] = useState<PlaceFilters>({
    region: 'todas',
    category: 'todas',
    priceLevel: 'todas',
  })
  const [selectedPlace, setSelectedPlace] = useState<Place>(localPlaces[0])
  const [favoritePlaceIds, setFavoritePlaceIds] = useState<string[]>(() => loadFavoriteIds(placeFavoritesStorageKey))

  useEffect(() => {
    repository
      .list()
      .then((availablePlans) => {
        setPlans(availablePlans)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  const favorites = useMemo(
    () => plans.filter((plan) => favoriteIds.includes(plan.id)),
    [favoriteIds, plans],
  )
  const visiblePlaces = useMemo(() => filterPlaces(localPlaces, placeFilters), [placeFilters])

  function updateFilter<K extends keyof PlanFilters>(key: K, value: PlanFilters[K]) {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  function findPlan(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const matchingPlans = filterPlans(plans, filters)
    setRecommendation(pickPlan(matchingPlans, attempt))
    setAttempt((current) => current + 1)
    setHasSearched(true)
  }

  function showAnotherPlan() {
    const matchingPlans = filterPlans(plans, filters)
    setRecommendation(pickPlan(matchingPlans, attempt))
    setAttempt((current) => current + 1)
  }

  function toggleFavorite(id: string) {
    setFavoriteIds((current) => {
      const next = current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id]
      saveFavoriteIds(next)
      return next
    })
  }

  function togglePlaceFavorite(id: string) {
    setFavoritePlaceIds((current) => {
      const next = current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id]
      saveFavoriteIds(next, placeFavoritesStorageKey)
      return next
    })
  }

  return (
    <main>
      <header className="hero">
        <p className="eyebrow">PLAN A DOS</p>
        <h1>Una cita que encaje con ustedes.</h1>
        <p className="intro">
          Elijan como se sienten hoy y encuentren un plan simple para compartir.
        </p>
      </header>

      <section className="planner" aria-labelledby="planner-title">
        <div>
          <p className="section-label">EMPECEMOS</p>
          <h2 id="planner-title">¿Que les pinta hoy?</h2>
        </div>
        <form onSubmit={findPlan}>
          <label>
            Animo
            <select
              value={filters.mood}
              onChange={(event) => updateFilter('mood', event.target.value as PlanFilters['mood'])}
            >
              {Object.entries(labels.mood).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </label>
          <label>
            Presupuesto
            <select
              value={filters.budget}
              onChange={(event) => updateFilter('budget', event.target.value as PlanFilters['budget'])}
            >
              {Object.entries(labels.budget).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </label>
          <label>
            Tiempo
            <select
              value={filters.duration}
              onChange={(event) => updateFilter('duration', event.target.value as PlanFilters['duration'])}
            >
              {Object.entries(labels.duration).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </label>
          <button type="submit" disabled={status !== 'ready'}>Encontrar nuestro plan</button>
        </form>
      </section>

      <section className="result" aria-live="polite" aria-labelledby="result-title">
        {status === 'loading' && <p>Cargando ideas para ustedes...</p>}
        {status === 'error' && (
          <p role="alert">No pudimos cargar los planes. Intenten recargar la pagina.</p>
        )}
        {status === 'ready' && !recommendation && !hasSearched && (
          <div className="empty-result">
            <p className="section-label">SU MOMENTO</p>
            <h2 id="result-title">Su proxima cita empieza aca.</h2>
            <p>Completen las tres opciones y les proponemos una idea.</p>
          </div>
        )}
        {status === 'ready' && !recommendation && hasSearched && (
          <div className="empty-result">
            <p className="section-label">SIN COINCIDENCIAS</p>
            <h2 id="result-title">No encontramos un plan exacto.</h2>
            <p>Prueben cambiar el presupuesto, el animo o el tiempo disponible.</p>
          </div>
        )}
        {status === 'ready' && recommendation && (
          <article className="plan-card">
            <div className="plan-card__topline">
              <p className="section-label">SU PLAN DE HOY</p>
              <button
                className="favorite-button"
                type="button"
                aria-pressed={favoriteIds.includes(recommendation.id)}
                onClick={() => toggleFavorite(recommendation.id)}
              >
                {favoriteIds.includes(recommendation.id) ? 'Guardado' : 'Guardar'}
              </button>
            </div>
            <h2 id="result-title">{recommendation.title}</h2>
            <p className="plan-description">{recommendation.description}</p>
            <dl>
              <div><dt>Tiempo</dt><dd>{recommendation.durationLabel}</dd></div>
              <div><dt>Presupuesto</dt><dd>{recommendation.budgetLabel}</dd></div>
            </dl>
            <h3>Como hacerlo</h3>
            <ol>
              {recommendation.steps.map((step) => <li key={step}>{step}</li>)}
            </ol>
            <button className="secondary-button" type="button" onClick={showAnotherPlan}>
              Ver otra idea
            </button>
          </article>
        )}
      </section>

      <section className="places" aria-labelledby="places-title">
        <div className="places__heading">
          <div>
            <p className="section-label">PARA SALIR</p>
            <h2 id="places-title">Lugares para una cita cerca.</h2>
            <p>Ideas curadas en Buenos Aires y la Triple Frontera. Los precios son orientativos: confirmen siempre antes de salir.</p>
          </div>
          <div className="place-filters">
            <label>
              Destino
              <select value={placeFilters.region} onChange={(event) => setPlaceFilters((current) => ({ ...current, region: event.target.value as PlaceFilters['region'] }))}>
                <option value="todas">Todos los destinos</option>
                <option value="buenos-aires">Buenos Aires</option>
                <option value="iguazu">Puerto Iguazu y Cataratas</option>
                <option value="wanda">Wanda</option>
                <option value="foz">Foz do Iguacu</option>
                <option value="ciudad-del-este">Ciudad del Este</option>
              </select>
            </label>
            <label>
              Tipo
              <select value={placeFilters.category} onChange={(event) => setPlaceFilters((current) => ({ ...current, category: event.target.value as PlaceFilters['category'] }))}>
                <option value="todas">Todos</option>
                <option value="visitar">Visitar</option>
                <option value="comer">Comer y beber</option>
                <option value="compras">Compras</option>
              </select>
            </label>
            <label>
              Precio
              <select value={placeFilters.priceLevel} onChange={(event) => setPlaceFilters((current) => ({ ...current, priceLevel: event.target.value as PlaceFilters['priceLevel'] }))}>
                <option value="todas">Todos los rangos</option>
                <option value="gratis">Gratis</option>
                <option value="bajo">Bajo</option>
                <option value="medio">Medio</option>
                <option value="alto">Alto</option>
              </select>
            </label>
          </div>
        </div>
        <p className="places__count">{visiblePlaces.length} opciones encontradas</p>
        <div className="places__layout">
          <div className="place-list">
            {visiblePlaces.map((place) => (
              <article className="place-card" key={place.id}>
                <p className="place-card__meta">{place.locality} · {place.priceLabel}</p>
                <h3>{place.name}</h3>
                <p>{place.description}</p>
                <p className="place-card__recommendation"><strong>Para ustedes:</strong> {place.recommendation}</p>
                <p className="place-card__price"><strong>Precio:</strong> {place.priceNote}</p>
                <div className="place-card__actions">
                  <button type="button" onClick={() => setSelectedPlace(place)}>Ver en mapa</button>
                  <button type="button" aria-pressed={favoritePlaceIds.includes(place.id)} onClick={() => togglePlaceFavorite(place.id)}>
                    {favoritePlaceIds.includes(place.id) ? 'Guardado' : 'Guardar'}
                  </button>
                  <a href={directionsUrl(place)} target="_blank" rel="noreferrer">Como llegar</a>
                  {place.officialUrl && <a href={place.officialUrl} target="_blank" rel="noreferrer">Info oficial</a>}
                </div>
              </article>
            ))}
          </div>
          <aside className="map-panel" aria-label={`Mapa de ${selectedPlace.name}`}>
            <iframe src={mapEmbedUrl(selectedPlace)} title={`Mapa de ${selectedPlace.name}`} loading="lazy" />
            <div>
              <strong>{selectedPlace.name}</strong>
              <span>{selectedPlace.address}</span>
              <OpeningHours place={selectedPlace} />
              <a href={directionsUrl(selectedPlace)} target="_blank" rel="noreferrer">Abrir direcciones</a>
            </div>
          </aside>
        </div>
      </section>

      <DatePlanner places={localPlaces} />

      <section className="favorites" aria-labelledby="favorites-title">
        <p className="section-label">PARA DESPUES</p>
        <h2 id="favorites-title">Planes guardados</h2>
        {favorites.length === 0 ? (
          <p>Todavia no guardaron ningun plan.</p>
        ) : (
          <ul>
            {favorites.map((plan) => (
              <li key={plan.id}>
                <div><strong>{plan.title}</strong><span>{plan.durationLabel} · {plan.budgetLabel}</span></div>
                <button type="button" onClick={() => toggleFavorite(plan.id)}>Quitar</button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App
