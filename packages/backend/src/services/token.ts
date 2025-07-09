import * as jwt from 'jsonwebtoken'
import { config } from '../config'
import createHttpError from 'http-errors'

export class TokenService {
  private accessTokenSecret: string
  private refreshTokenSecret: string

  constructor(accessTokenSecret: string, refreshTokenSecret: string) {
    this.accessTokenSecret = accessTokenSecret
    this.refreshTokenSecret = refreshTokenSecret
  }

  generateAccessToken(payload: any) {
    return jwt.sign(payload, this.accessTokenSecret, {
      expiresIn: '30m',
    })
  }
  generateRefreshToken(payload: any) {
    return jwt.sign(payload, this.refreshTokenSecret, {
      expiresIn: '15d',
    })
  }
  decodeAccessToken(token: string): any {
    try {
      return jwt.verify(token, this.accessTokenSecret)
    } catch (error) {
      throw createHttpError(401, 'Invalid access token')
    }
  }
  decodeRefreshToken(token: string): any {
    try {
      return jwt.verify(token, this.refreshTokenSecret)
    } catch (error) {
      throw createHttpError(401, 'Invalid refresh token')
    }
  }

  /*   decodeToken(token: string, tokenType: "refresh" | "access"): any {
    try {
      if (tokenType === "access") {
        return this.checkAccessToken(token)
      }
      if (tokenType === "refresh") {
        return this.checkRefreshToken(token)
      }
    } catch (error) {
      throw createHttpError(401, `Invalid ${tokenType} token`)
    }
  } */
}

const tokenService = new TokenService(
  config.accessTokenSecret,
  config.refreshTokenSecret,
)

export default tokenService
