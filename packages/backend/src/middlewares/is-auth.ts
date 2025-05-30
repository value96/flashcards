import { Request, Response, NextFunction } from 'express'
import createHttpError from 'http-errors'
import tokenService from '../services/token'
import { AuthRequest } from '../shared/api'
import { errorHandler } from '../utils'

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.accessToken
    //req.headers["authorization"]?.split(" ")[1]
    if (!token) {
      throw createHttpError(401, 'Access denied')
    }

    const decoded = tokenService.decodeAccessToken(token) as {
      userId: string
      sessionId: string
    }

    ;(req as AuthRequest).userId = decoded.userId
    ;(req as AuthRequest).sessionId = decoded.sessionId

    next()
  } catch (error) {
    return errorHandler(error, req, res)
  }
}
