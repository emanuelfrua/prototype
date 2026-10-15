export type Mood = 'tranquilo' | 'aventurero' | 'romantico' | 'creativo'
export type Budget = 'bajo' | 'medio' | 'alto'
export type Duration = 'corto' | 'medio' | 'largo'

export interface PlanFilters {
  mood: Mood
  budget: Budget
  duration: Duration
}

export interface Plan {
  id: string
  title: string
  description: string
  moods: Mood[]
  budgets: Budget[]
  durations: Duration[]
  durationLabel: string
  budgetLabel: string
  steps: string[]
}

export function filterPlans(plans: Plan[], filters: PlanFilters): Plan[] {
  return plans.filter(
    (plan) =>
      plan.moods.includes(filters.mood) &&
      plan.budgets.includes(filters.budget) &&
      plan.durations.includes(filters.duration),
  )
}

export function pickPlan(plans: Plan[], attempt: number): Plan | null {
  if (plans.length === 0) return null
  return plans[attempt % plans.length]
}
