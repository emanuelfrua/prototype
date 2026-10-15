import type { Plan, PlanFilters } from '../domain/plan'
import { filterPlans } from '../domain/plan'
import { localPlans } from './plans'

export interface PlanRepository {
  list(filters?: PlanFilters): Promise<Plan[]>
}

class LocalPlanRepository implements PlanRepository {
  async list(filters?: PlanFilters): Promise<Plan[]> {
    return filters ? filterPlans(localPlans, filters) : localPlans
  }
}

class HttpPlanRepository implements PlanRepository {
  private readonly baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async list(filters?: PlanFilters): Promise<Plan[]> {
    const url = new URL('/api/plans', this.baseUrl)
    if (filters) {
      url.search = new URLSearchParams({
        mood: filters.mood,
        budget: filters.budget,
        duration: filters.duration,
      }).toString()
    }
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`No se pudieron obtener los planes: ${response.status}`)
    }
    return response.json() as Promise<Plan[]>
  }
}

export function createPlanRepository(apiBaseUrl = import.meta.env.VITE_API_BASE_URL): PlanRepository {
  return apiBaseUrl ? new HttpPlanRepository(apiBaseUrl) : new LocalPlanRepository()
}
