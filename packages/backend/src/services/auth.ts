import createHttpError from 'http-errors'
import bcrypt from 'bcryptjs'
import tokenService, { TokenService } from './token'
import { FingerprintResult } from 'express-fingerprint'
import { refreshSessionModel, userRepositoryModel } from '../models'
import { config } from '../config'

const userRepository = userRepositoryModel.userRepository
const refreshSessionRepository = refreshSessionModel.refreshSessionRepository

export interface CreateRefreshSessionRes {
  accessToken: string
  refreshToken: string
  accessTokenExpiration: Date
  refreshTokenExpiration: Date
}

class AuthService {
  private tokenService: TokenService

  constructor(tokenService: TokenService) {
    this.tokenService = tokenService
  }

  async getRefreshSessionByRefreshToken(
    refreshToken: string,
    fingerprint: FingerprintResult,
  ) {
    const refreshTokenPayload = this.tokenService.decodeRefreshToken(
      refreshToken,
    ) as {
      userId: string
      sessionId: string
    }

    const { userId, sessionId } = refreshTokenPayload
    /* console.log(
      JSON.stringify(
        {
          id: sessionId,
          userId,
          fingerprint: fingerprint.hash,
        },
        null,
        2,
      ),
    ) */
    const session = await refreshSessionRepository.findOne({
      id: sessionId,
      userId,
      fingerprint: fingerprint.hash,
    })

    if (!session) throw createHttpError(404, 'Refresh session not found')
    return session
  }

  async createRefreshSession(
    userId: string,
    fingerprint: FingerprintResult,
    expiresAt: Date = new Date(Date.now() + config.REFRESH_TOKEN_EXPIRATION),
  ): Promise<CreateRefreshSessionRes> {
    console.log('start create refresh session')
    const session = await refreshSessionRepository.create({
      userId: userId,
      fingerprint: fingerprint.hash,
      expiresAt: expiresAt,
    })
    console.log('created refresh session')

    const accessToken = this.tokenService.generateAccessToken({
      userId,
      sessionId: session.id,
    })
    const refreshToken = this.tokenService.generateRefreshToken({
      userId,
      sessionId: session.id,
    })

    return {
      accessToken,
      refreshToken,
      accessTokenExpiration: new Date(
        Date.now() + config.ACCESS_TOKEN_EXPIRATION,
      ),
      refreshTokenExpiration: expiresAt,
    }
  }

  async signIn(
    email: string,
    password: string,
    fingerprint: FingerprintResult,
  ): Promise<CreateRefreshSessionRes> {
    const user = await userRepository.findOneByEmail(email)
    if (!user) throw createHttpError(401, 'Invalid credentials')

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
    if (!isPasswordValid) throw createHttpError(401, 'Invalid credentials')

    return await this.createRefreshSession(user.id, fingerprint)
  }

  async signUp(
    email: string,
    username: string,
    password: string,
    fingerprint: FingerprintResult,
  ): Promise<CreateRefreshSessionRes> {
    const existingUser = await userRepository.findOneByEmail(email)
    if (existingUser)
      throw createHttpError(409, 'User with this email already exists')
    const passwordHash = await bcrypt.hash(password, 10)

    const user = await userRepository.create({
      email,
      username,
      passwordHash,
    })

    return await this.createRefreshSession(user.id, fingerprint)
  }

  async refreshToken(
    refreshToken: string,
    fingerprint: FingerprintResult,
  ): Promise<CreateRefreshSessionRes> {
    const session = await this.getRefreshSessionByRefreshToken(
      refreshToken,
      fingerprint,
    )

    const expiresAt = session.expiresAt
    await refreshSessionRepository.removeOne(session.id)

    if (new Date() > expiresAt) {
      throw createHttpError(401, 'Invalid refresh token')
    }

    return await this.createRefreshSession(
      session.userId,
      fingerprint,
      expiresAt,
    )
  }

  async logout(sessionId: string) {
    const session = await refreshSessionRepository.findOne({
      id: sessionId,
    })

    if (!session) throw createHttpError(401, 'Session not found')
    await refreshSessionRepository.removeOne(session.id)
  }
}

const authService = new AuthService(tokenService)

export default authService
