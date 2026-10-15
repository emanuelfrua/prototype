import { describe, expect, it } from 'vitest'
import { filterPlans, pickPlan } from './plan'
import { localPlans } from '../data/plans'

describe('plan selection', () => {
  it('only returns plans matching every selected filter', () => {
    const results = filterPlans(localPlans, {
      mood: 'tranquilo',
      budget: 'bajo',
      duration: 'corto',
    })

    expect(results.map((plan) => plan.id)).toEqual(
      expect.arrayContaining(['cafe-y-cartas', 'noche-de-quiz', 'desayuno-lento']),
    )
  })

  it('cycles deterministically through matching plans', () => {
    const plans = filterPlans(localPlans, {
      mood: 'tranquilo',
      budget: 'bajo',
      duration: 'corto',
    })

    expect(pickPlan(plans, 0)).toBe(plans[0])
    expect(pickPlan(plans, plans.length)).toBe(plans[0])
  })

  it('returns no recommendation when there are no matches', () => {
    expect(pickPlan([], 0)).toBeNull()
  })
})
