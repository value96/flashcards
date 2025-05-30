import { Request, Response } from 'express'
import authService, { CreateRefreshSessionRes } from '../services/auth'
import { accessTokenCookieParams, refreshTokenCookieParams } from '../config'
import { errorHandler } from '../utils'
import { AuthRequest } from '../shared/api'

interface RegisterRequest {
  email: string
  username: string
  password: string
}

interface LoginRequest {
  email: string
  password: string
}

const setTokens = (res: Response, data: CreateRefreshSessionRes) => {
  const {
    accessToken,
    refreshToken,
    accessTokenExpiration,
    refreshTokenExpiration,
  } = data
  res.cookie(
    'refreshToken',
    refreshToken,
    refreshTokenCookieParams(refreshTokenExpiration),
  )
  res.cookie(
    'accessToken',
    accessToken,
    accessTokenCookieParams(accessTokenExpiration),
  )
  return { refreshTokenExpiration, accessTokenExpiration }
}

export const signUp = async (
  req: Request<{}, {}, RegisterRequest>,
  res: Response,
) => {
  try {
    const { email, username, password } = req.body
    const { fingerprint } = req
    if (!fingerprint) return res.status(500).send('Fingerprint not generated')

    const result = await authService.signUp(
      email,
      username,
      password,
      fingerprint,
    )
    const { refreshTokenExpiration, accessTokenExpiration } = setTokens(
      res,
      result,
    )

    res.status(200).json({ refreshTokenExpiration, accessTokenExpiration })
  } catch (error) {
    return errorHandler(error, req, res)
  }
}

export const signIn = async (
  req: Request<{}, {}, LoginRequest>,
  res: Response,
) => {
  try {
    const { email, password } = req.body
    const { fingerprint } = req
    if (!fingerprint) return res.status(500).send('Fingerprint not generated')

    const result = await authService.signIn(email, password, fingerprint)
    const { refreshTokenExpiration, accessTokenExpiration } = setTokens(
      res,
      result,
    )

    res.status(200).json({ refreshTokenExpiration, accessTokenExpiration })
  } catch (error) {
    return errorHandler(error, req, res)
  }
}

export const refreshToken = async (req: Request<{}, {}, {}>, res: Response) => {
  try {
    const oldRefreshToken = req.cookies.refreshToken
    if (!oldRefreshToken) return res.status(401).send('Refresh token not found')
    const { fingerprint } = req
    if (!fingerprint) return res.status(500).send('Fingerprint not generated')

    const result = await authService.refreshToken(oldRefreshToken, fingerprint)

    const { refreshTokenExpiration, accessTokenExpiration } = setTokens(
      res,
      result,
    )
    res.status(200).json({ refreshTokenExpiration, accessTokenExpiration })
  } catch (error) {
    //res.cookie('refreshToken', '', refreshTokenCookieParams(new Date(0)))
    return errorHandler(error, req, res)
  }
}

export const logout = async (req: AuthRequest, res: Response) => {
  try {
    const sessionId = req.sessionId
    if (!sessionId)
      return res.status(401).send('SessionId not found in access token')
    /* const { fingerprint } = req
    if (!fingerprint) return res.status(500).send("Fingerprint not generated") */

    await authService.logout(sessionId /* , fingerprint */)

    res.cookie('refreshToken', '', refreshTokenCookieParams(new Date(0)))
    res.cookie('accessToken', '', accessTokenCookieParams(new Date(0)))
    res.status(204).json({})
  } catch (error) {
    return errorHandler(error, req, res)
  }
}
