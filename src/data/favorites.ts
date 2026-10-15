const storageKey = 'plan-a-dos:favorites'

export function loadFavoriteIds(key = storageKey): string[] {
  const stored = localStorage.getItem(key)
  if (!stored) return []
  const parsed: unknown = JSON.parse(stored)
  return Array.isArray(parsed) && parsed.every((value) => typeof value === 'string') ? parsed : []
}

export function saveFavoriteIds(ids: string[], key = storageKey): void {
  localStorage.setItem(key, JSON.stringify(ids))
}
