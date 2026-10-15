const storageKey = 'plan-a-dos:favorites'

export function loadFavoriteIds(): string[] {
  const stored = localStorage.getItem(storageKey)
  if (!stored) return []
  const parsed: unknown = JSON.parse(stored)
  return Array.isArray(parsed) && parsed.every((value) => typeof value === 'string') ? parsed : []
}

export function saveFavoriteIds(ids: string[]): void {
  localStorage.setItem(storageKey, JSON.stringify(ids))
}
