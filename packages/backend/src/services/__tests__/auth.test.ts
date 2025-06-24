import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest'

process.env.ACCESS_TOKEN_SECRET = 'secret'
process.env.REFRESH_TOKEN_SECRET = 'refresh'
process.env.PORT = '3000'
process.env.CLIENT_URL = 'http://localhost'
process.env.MONGO_URL = 'mongodb://localhost'

vi.mock('../../models', () => {
  const userRepository = {
    findOneByEmail: vi.fn(),
    create: vi.fn(),
  }
  const refreshSessionRepository = {
    create: vi.fn(),
    findOne: vi.fn(),
    removeOne: vi.fn(),
  }
  Object.assign(globalThis, {
    userRepository,
    refreshSessionRepository,
  })
  return {
    userRepositoryModel: { userRepository },
    refreshSessionModel: { refreshSessionRepository },
  }
})

vi.mock('../token', () => {
  const tokenService = {
    generateAccessToken: vi.fn(),
    generateRefreshToken: vi.fn(),
    decodeRefreshToken: vi.fn(),
  }
  Object.assign(globalThis, { tokenService })
  return {
    default: tokenService,
    TokenService: vi.fn(),
  }
})

vi.mock('bcryptjs', () => {
  const bcrypt = {
    compare: vi.fn(),
    hash: vi.fn(),
  }
  Object.assign(globalThis, { bcrypt })
  return { default: bcrypt }
})

let authService: any
let userRepository: any
let refreshSessionRepository: any
let tokenService: any
let bcrypt: any

beforeAll(async () => {
  authService = (await import('../auth')).default
  userRepository = globalThis.userRepository
  refreshSessionRepository = globalThis.refreshSessionRepository
  tokenService = globalThis.tokenService
  bcrypt = globalThis.bcrypt
})

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const fingerprint = { hash: 'fp' } as any

  it('signUp success', async () => {
    userRepository.findOneByEmail.mockResolvedValue(null)
    bcrypt.hash.mockResolvedValue('hash')
    userRepository.create.mockResolvedValue({ id: 'u1', passwordHash: 'hash' })
    refreshSessionRepository.create.mockResolvedValue({ id: 's1', userId: 'u1', fingerprint: 'fp', expiresAt: new Date('2030-01-01') })
    tokenService.generateAccessToken.mockReturnValue('at')
    tokenService.generateRefreshToken.mockReturnValue('rt')

    const res = await authService.signUp('a@a.a', 'user', 'pass', fingerprint)
    expect(res.accessToken).toBe('at')
    expect(res.refreshToken).toBe('rt')
    expect(userRepository.create).toHaveBeenCalled()
  })

  it('signIn success', async () => {
    userRepository.findOneByEmail.mockResolvedValue({ id: 'u1', passwordHash: 'hash' })
    bcrypt.compare.mockResolvedValue(true)
    refreshSessionRepository.create.mockResolvedValue({ id: 's1', userId: 'u1', fingerprint: 'fp', expiresAt: new Date('2030-01-01') })
    tokenService.generateAccessToken.mockReturnValue('at')
    tokenService.generateRefreshToken.mockReturnValue('rt')

    const res = await authService.signIn('a@a.a', 'pass', fingerprint)
    expect(res.accessToken).toBe('at')
    expect(res.refreshToken).toBe('rt')
  })

  it('duplicate user error', async () => {
    userRepository.findOneByEmail.mockResolvedValue({ id: 'u1' })
    await expect(authService.signUp('a@a.a', 'user', 'pass', fingerprint)).rejects.toThrow('User with this email already exists')
  })

  it('invalid credentials', async () => {
    userRepository.findOneByEmail.mockResolvedValue({ id: 'u1', passwordHash: 'hash' })
    bcrypt.compare.mockResolvedValue(false)
    await expect(authService.signIn('a@a.a', 'wrong', fingerprint)).rejects.toThrow('Invalid credentials')
  })

  it('refresh token flow', async () => {
    tokenService.decodeRefreshToken.mockReturnValue({ userId: 'u1', sessionId: 'old' })
    refreshSessionRepository.findOne.mockResolvedValue({ id: 'old', userId: 'u1', fingerprint: 'fp', expiresAt: new Date('2030-01-01') })
    refreshSessionRepository.create.mockResolvedValue({ id: 'new', userId: 'u1', fingerprint: 'fp', expiresAt: new Date('2030-01-01') })
    tokenService.generateAccessToken.mockReturnValue('newAT')
    tokenService.generateRefreshToken.mockReturnValue('newRT')

    const res = await authService.refreshToken('token', fingerprint)
    expect(refreshSessionRepository.removeOne).toHaveBeenCalledWith('old')
    expect(res.accessToken).toBe('newAT')
    expect(res.refreshToken).toBe('newRT')
  })

  it('logout', async () => {
    refreshSessionRepository.findOne.mockResolvedValue({ id: 's1' })
    await authService.logout('s1')
    expect(refreshSessionRepository.removeOne).toHaveBeenCalledWith('s1')
  })
})
