import type { PlannedDate } from '../domain/plannedDate'

const storageKey = 'plan-a-dos:planned-dates'

function isPlannedDate(value: unknown): value is PlannedDate {
  if (typeof value !== 'object' || value === null) return false
  const date = value as Record<string, unknown>
  return ['id', 'placeId', 'date', 'budget', 'note'].every((key) => typeof date[key] === 'string')
}

export function loadPlannedDates(): PlannedDate[] {
  const stored = localStorage.getItem(storageKey)
  if (!stored) return []
  const parsed: unknown = JSON.parse(stored)
  return Array.isArray(parsed) && parsed.every(isPlannedDate) ? parsed : []
}

export function savePlannedDates(dates: PlannedDate[]): void {
  localStorage.setItem(storageKey, JSON.stringify(dates))
}
