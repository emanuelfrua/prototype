import type { Place, PlaceCategory, Region } from '../domain/place'

interface OSMElement {
  id: number
  lat?: number
  lon?: number
  center?: { lat: number; lon: number }
  tags?: Record<string, string>
}

interface OSMResponse {
  elements: OSMElement[]
}

const query = `[out:json][timeout:25];(
  nwr["tourism"~"attraction|museum|viewpoint|zoo|theme_park|gallery"](around:70000,-25.596,-54.58);
  nwr["leisure"~"park|nature_reserve"](around:70000,-25.596,-54.58);
  nwr["amenity"~"restaurant|cafe|bar|fast_food"](around:70000,-25.596,-54.58);
  nwr["shop"](around:25000,-25.51,-54.61);
);out center 180;`

function locationFor(latitude: number, longitude: number): { region: Region; country: string; locality: string } {
  if (longitude > -54.59) return { region: 'ciudad-del-este', country: 'Paraguay', locality: 'Ciudad del Este y alrededores' }
  if (latitude > -25.8) return { region: 'wanda', country: 'Argentina', locality: 'Wanda y alrededores' }
  if (longitude > -54.53) return { region: 'foz', country: 'Brasil', locality: 'Foz do Iguaçu' }
  return { region: 'iguazu', country: 'Argentina', locality: 'Puerto Iguazu y Cataratas' }
}

function categoryFor(tags: Record<string, string>): PlaceCategory {
  if (tags.shop) return 'compras'
  if (tags.amenity) return 'comer'
  return 'visitar'
}

export async function loadTripleFrontierPlaces(): Promise<Place[]> {
  const response = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    body: new URLSearchParams({ data: query }),
  })
  if (!response.ok) throw new Error(`OpenStreetMap unavailable: ${response.status}`)
  const data = await response.json() as OSMResponse
  const seen = new Set<string>()
  return data.elements.flatMap((element) => {
    const tags = element.tags
    const latitude = element.lat ?? element.center?.lat
    const longitude = element.lon ?? element.center?.lon
    const name = tags?.name
    if (!tags || latitude === undefined || longitude === undefined || !name || seen.has(name)) return []
    seen.add(name)
    const location = locationFor(latitude, longitude)
    const category = categoryFor(tags)
    return [{
      id: `osm-${element.id}`,
      name,
      ...location,
      category,
      address: tags['addr:street'] ?? location.locality,
      description: tags.description ?? `Lugar registrado por la comunidad de OpenStreetMap en ${location.locality}.`,
      recommendation: 'Revisen horarios y condiciones antes de salir.',
      priceLevel: 'medio' as const,
      priceLabel: 'Costo a confirmar',
      priceNote: 'Dato comunitario de OpenStreetMap; el precio puede no estar informado.',
      latitude,
      longitude,
      officialUrl: tags.website,
    }]
  })
}
