import User from "../models/User"
import createError from "http-errors"
import bcrypt from "bcryptjs"
import TokenService from "./Token"
import RefreshSession from "../models/RefreshSession"
import { config } from "../config"
import { FingerprintResult } from "express-fingerprint"

export interface CreateRefreshSessionRes {
  accessToken: string
  refreshToken: string
  accessTokenExpiration: Date
  refreshTokenExpiration: Date
}

const getRefreshSessionByRefreshToken = async (
  refreshToken: string,
  fingerprint: FingerprintResult,
) => {
  const refreshTokenPayload = TokenService.decodeToken(
    refreshToken,
    "refresh",
  ) as {
    userId: number
    sessionId: number
  }

  const { userId, sessionId } = refreshTokenPayload

  const session = await RefreshSession.findOne({
    where: {
      id: sessionId,
      userId,
      fingerprint: fingerprint.hash,
    },
  })

  if (!session) throw createError(401, "Invalid refresh token")
  return session
}

class AuthService {
  static async createRefreshSession(
    userId: number,
    fingerprint: FingerprintResult,
    expiresAt: Date = new Date(Date.now() + config.REFRESH_TOKEN_EXPIRATION),
  ): Promise<CreateRefreshSessionRes> {
    /* const expiresIn = config.REFRESH_TOKEN_EXPIRATION
    const expiresAt = new Date(Date.now() + expiresIn) */

    const refreshSession = await RefreshSession.create({
      userId: userId,
      fingerprint: fingerprint.hash,
      expiresAt: expiresAt,
    })

    const accessToken = TokenService.generateAccessToken({
      userId,
      sessionId: refreshSession.id,
    })
    const refreshToken = TokenService.generateRefreshToken({
      userId,
      sessionId: refreshSession.id,
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

  static async signIn(
    email: string,
    password: string,
    fingerprint: FingerprintResult,
  ): Promise<CreateRefreshSessionRes> {
    const user = await User.findOne({ where: { email } })
    if (!user) throw createError(401, "Invalid credentials")

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
    if (!isPasswordValid) throw createError(401, "Invalid credentials")

    return await this.createRefreshSession(user.id, fingerprint)
  }
  static async signUp(
    email: string,
    username: string,
    password: string,
    fingerprint: FingerprintResult,
  ): Promise<CreateRefreshSessionRes> {
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser)
      throw createError(409, "User with this email already exists")
    const passwordHash = await bcrypt.hash(password, 10)

    const user = await User.create({
      email,
      username,
      passwordHash,
    })

    return await this.createRefreshSession(user.id, fingerprint)
  }

  static async refreshToken(
    refreshToken: string,
    fingerprint: FingerprintResult,
  ): Promise<CreateRefreshSessionRes> {
    const session = await getRefreshSessionByRefreshToken(
      refreshToken,
      fingerprint,
    )

    const expiresAt = session.expiresAt
    await session.destroy()

    if (new Date() > expiresAt) {
      throw createError(401, "Invalid refresh token")
    }

    return await this.createRefreshSession(
      session.userId,
      fingerprint,
      expiresAt,
    )
  }

  static async logout(sessionId: number, fingerprint: FingerprintResult) {
    const session = await RefreshSession.findOne({
      where: {
        id: sessionId,
        fingerprint: fingerprint.hash,
      },
    })

    if (!session) throw createError(401, "Session not found")
    await session.destroy()
  }
}

export default AuthService
