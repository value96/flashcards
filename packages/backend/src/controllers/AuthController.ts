import { Request, Response, NextFunction } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User"
import { config, refreshTokenCookieParams } from "../config"
import AuthService from "../services/Auth"
import { errorHandler } from "../utils/handleErrors"

interface RegisterRequest {
  email: string
  username: string
  password: string
}

interface LoginRequest {
  email: string
  password: string
}

export const signUp = async (
  req: Request<{}, {}, RegisterRequest>,
  res: Response,
) => {
  try {
    console.log("signUp controller")
    const { email, username, password } = req.body
    const { fingerprint } = req
    if (!fingerprint) return res.status(500).send("Fingerprint not generated")

    const {
      accessToken,
      refreshToken,
      accessTokenExpiration,
      refreshTokenExpiration,
    } = await AuthService.signUp(email, username, password, fingerprint)

    res.cookie(
      "refreshToken",
      refreshToken,
      refreshTokenCookieParams(refreshTokenExpiration),
    )
    res.status(200).json({ accessToken, accessTokenExpiration })
  } catch (error) {
    return errorHandler(error, req, res)
  }
}

export const signIn = async (
  req: Request<{}, {}, LoginRequest>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body
    const { fingerprint } = req
    if (!fingerprint) return res.status(500).send("Fingerprint not generated")

    const {
      accessToken,
      refreshToken,
      accessTokenExpiration,
      refreshTokenExpiration,
    } = await AuthService.signIn(email, password, fingerprint)

    res.cookie(
      "refreshToken",
      refreshToken,
      refreshTokenCookieParams(refreshTokenExpiration),
    )

    res.status(200).json({ accessToken, accessTokenExpiration })
  } catch (error) {
    return errorHandler(error, req, res)
  }
}

export const refreshToken = async (req: Request<{}, {}, {}>, res: Response) => {
  try {
    const oldRefreshToken = req.cookies.refreshToken
    if (!oldRefreshToken) return res.status(401).send("Refresh token not found")
    const { fingerprint } = req
    if (!fingerprint) return res.status(500).send("Fingerprint not generated")

    const {
      accessToken,
      refreshToken,
      accessTokenExpiration,
      refreshTokenExpiration,
    } = await AuthService.refreshToken(oldRefreshToken, fingerprint)

    res.cookie(
      "refreshToken",
      refreshToken,
      refreshTokenCookieParams(refreshTokenExpiration),
    )
    res.status(200).json({ accessToken, accessTokenExpiration })
  } catch (error) {
    return errorHandler(error, req, res)
  }
}

export const logout = async (req: Request<{}, {}, {}>, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.status(401).send("Refresh token not found")
    const { fingerprint } = req
    if (!fingerprint) return res.status(500).send("Fingerprint not generated")

    await AuthService.logout(refreshToken, fingerprint)

    res.cookie("refreshToken", "", refreshTokenCookieParams(new Date(0)))
  } catch (error) {
    return errorHandler(error, req, res)
  }
}
