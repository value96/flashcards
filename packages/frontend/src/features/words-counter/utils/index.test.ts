import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getTomorrowUTCString, getNowISOString } from './index'

describe('getTomorrowUTCString', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns the next UTC date for a typical day', () => {
    const fixedDate = new Date('2025-05-15T12:00:00Z')
    vi.setSystemTime(fixedDate)
    expect(getTomorrowUTCString()).toBe('2025-05-16')
  })

  it('handles year change at end of December', () => {
    const fixedDate = new Date('2024-12-31T23:59:00Z')
    vi.setSystemTime(fixedDate)
    expect(getTomorrowUTCString()).toBe('2025-01-01')
  })
})

describe('getNowISOString', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns current UTC date-time in ISO format', () => {
    const fixedDate = new Date('2025-05-15T12:00:00Z')
    vi.setSystemTime(fixedDate)
    expect(getNowISOString()).toBe('2025-05-15T12:00:00.000Z')
  })
})
