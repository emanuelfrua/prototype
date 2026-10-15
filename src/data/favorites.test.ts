import { beforeEach, describe, expect, it } from 'vitest'
import { loadFavoriteIds, saveFavoriteIds } from './favorites'

describe('favorites storage', () => {
  beforeEach(() => localStorage.clear())

  it('persists and restores favorite IDs', () => {
    saveFavoriteIds(['cafe-y-cartas', 'desayuno-lento'])

    expect(loadFavoriteIds()).toEqual(['cafe-y-cartas', 'desayuno-lento'])
  })
})
