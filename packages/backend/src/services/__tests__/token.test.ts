import { describe, it, expect, vi, afterEach } from 'vitest'
import jwt from 'jsonwebtoken'

vi.mock('../../config', () => ({
  config: {
    accessTokenSecret: 'access-secret',
    refreshTokenSecret: 'refresh-secret',
  },
}))

import tokenService from '../token'

describe('tokenService', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('generates and decodes access token', () => {
    const payload = { id: '123' }
    const token = tokenService.generateAccessToken(payload)
    expect(token.split('.').length).toBe(3)
    const decoded = tokenService.decodeAccessToken(token) as any
    expect(decoded).toEqual(expect.objectContaining(payload))
  })

  it('generates and decodes refresh token', () => {
    const payload = { id: 'abc' }
    const token = tokenService.generateRefreshToken(payload)
    expect(token.split('.').length).toBe(3)
    const decoded = tokenService.decodeRefreshToken(token) as any
    expect(decoded).toEqual(expect.objectContaining(payload))
  })

  it('throws for invalid access token', () => {
    expect(() => tokenService.decodeAccessToken('bad.token')).toThrow('Invalid access token')
  })

  it('throws for invalid refresh token', () => {
    expect(() => tokenService.decodeRefreshToken('bad.token')).toThrow('Invalid refresh token')
  })

  it('throws for expired access token', () => {
    const payload = { id: '1' }
    const expired = jwt.sign(payload, 'access-secret', { expiresIn: -1 })
    expect(() => tokenService.decodeAccessToken(expired)).toThrow('Invalid access token')
  })

  it('throws for expired refresh token', () => {
    const payload = { id: '1' }
    const expired = jwt.sign(payload, 'refresh-secret', { expiresIn: -1 })
    expect(() => tokenService.decodeRefreshToken(expired)).toThrow('Invalid refresh token')
  })
})
