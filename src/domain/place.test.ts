import { describe, expect, it } from 'vitest'
import { directionsUrl, filterPlaces, mapEmbedUrl } from './place'
import { localPlaces } from '../data/places'

describe('place explorer', () => {
  it('filters recommendations by area', () => {
    expect(filterPlaces(localPlaces, {
      region: 'buenos-aires',
      category: 'todas',
      priceLevel: 'todas',
    }).every((place) => place.region === 'buenos-aires')).toBe(true)
  })

  it('builds map and directions URLs from a place location', () => {
    const place = localPlaces[0]

    expect(mapEmbedUrl(place)).toContain('openstreetmap.org')
    expect(directionsUrl(place)).toContain(`${place.latitude}%2C${place.longitude}`)
  })
})
