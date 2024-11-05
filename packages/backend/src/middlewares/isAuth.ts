import { Request, Response, NextFunction } from 'express'

import TokenService from '../services/Token'
import { errorHandler } from '../utils/handleErrors'
import createHttpError from 'http-errors'
import { AuthRequest } from '@shared/api'

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.accessToken
    //req.headers["authorization"]?.split(" ")[1]
    if (!token) {
      throw createHttpError(401, 'Access denied')
    }

    const decoded = TokenService.decodeAccessToken(token) as {
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
