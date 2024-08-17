import { Request, Response, NextFunction } from "express"

import TokenService from "../services/Token"
import { errorHandler } from "../utils/handleErrors"
import createHttpError from "http-errors"

export interface AuthRequest extends Request {
  userId?: string
  sessionId?: string
}

export const isAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.accessToken
    //req.headers["authorization"]?.split(" ")[1]
    if (!token) {
      throw createHttpError(401, "Access denied")
    }

    const decoded = TokenService.decodeAccessToken(token) as {
      userId: string
      sessionId: string
    }
    req.userId = decoded.userId
    req.sessionId = decoded.sessionId
    next()
  } catch (error) {
    return errorHandler(error, req, res)
  }
}
