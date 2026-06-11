import { describe, it, expect } from 'vitest'
import { validationResult } from 'express-validator'
import { isQueryParametrISODate } from '../validate-query'

const run = async (req: any, validations: any[]) => {
  for (const validation of validations) {
    await validation.run(req)
  }
  return validationResult(req)
}

describe('isQueryParametrISODate', () => {
  it('accepts full ISO datetime', async () => {
    const req = { query: { date: '2025-07-08T12:00:00Z' } }
    const result = await run(req, isQueryParametrISODate('date'))
    expect(result.isEmpty()).toBe(true)
  })

  it('accepts YYYY-MM-DD', async () => {
    const req = { query: { date: '2025-07-08' } }
    const result = await run(req, isQueryParametrISODate('date'))
    expect(result.isEmpty()).toBe(true)
  })

  it('rejects invalid value', async () => {
    const req = { query: { date: 'bad-date' } }
    const result = await run(req, isQueryParametrISODate('date'))
    expect(result.isEmpty()).toBe(false)
  })
})
