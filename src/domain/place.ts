export type Region = 'buenos-aires' | 'iguazu' | 'wanda' | 'foz' | 'ciudad-del-este'
export type PriceLevel = 'gratis' | 'bajo' | 'medio' | 'alto'
export type PlaceCategory = 'visitar' | 'comer' | 'compras'

export interface PlaceFilters {
  region: Region | 'todas'
  category: PlaceCategory | 'todas'
  priceLevel: PriceLevel | 'todas'
}

export interface Place {
  id: string
  name: string
  region: Region
  category: PlaceCategory
  country: string
  locality: string
  address: string
  description: string
  recommendation: string
  priceLevel: PriceLevel
  priceLabel: string
  priceNote: string
  latitude: number
  longitude: number
  officialUrl?: string
}

export function filterPlaces(places: Place[], filters: PlaceFilters): Place[] {
  return places.filter(
    (place) =>
      (filters.region === 'todas' || place.region === filters.region) &&
      (filters.category === 'todas' || place.category === filters.category) &&
      (filters.priceLevel === 'todas' || place.priceLevel === filters.priceLevel),
  )
}

export function mapEmbedUrl(place: Place): string {
  const offset = 0.008
  const bbox = [
    place.longitude - offset,
    place.latitude - offset,
    place.longitude + offset,
    place.latitude + offset,
  ].join(',')
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${place.latitude}%2C${place.longitude}`
}

export function directionsUrl(place: Place): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${place.latitude}%2C${place.longitude}`
}
