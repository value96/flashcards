import jwt from "jsonwebtoken"
import { config } from "../config"
import createHttpError from "http-errors"

class TokenService {
  static generateAccessToken(payload: any) {
    return jwt.sign(payload, config.accessTokenSecret, {
      expiresIn: "20s",
    })
  }
  static generateRefreshToken(payload: any) {
    return jwt.sign(payload, config.refreshTokenSecret, {
      expiresIn: "1m",
    })
  }
  static checkAccessToken(token: string): any {
    return jwt.verify(token, config.accessTokenSecret)
  }
  static checkRefreshToken(token: string): any {
    return jwt.verify(token, config.refreshTokenSecret)
  }

  static decodeToken(token: string, tokenType: "refresh" | "access"): any {
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
  }
}

export default TokenService
