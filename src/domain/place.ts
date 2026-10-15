export type Area = 'caba' | 'norte' | 'oeste' | 'sur'
export type PriceLevel = 'gratis' | 'bajo' | 'medio' | 'alto'

export interface Place {
  id: string
  name: string
  area: Area
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

export function filterPlaces(places: Place[], area: Area | 'todas'): Place[] {
  return area === 'todas' ? places : places.filter((place) => place.area === area)
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
