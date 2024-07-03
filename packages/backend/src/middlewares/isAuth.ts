import { Request, Response, NextFunction } from "express"

import TokenService from "../services/Token"

export interface AuthRequest extends Request {
  userId?: number
  sessionId?: number
}

export const isAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.accessToken
    //req.headers["authorization"]?.split(" ")[1]
    if (!token) {
      return res.status(401).json({ error: "Access denied" })
    }

    const decoded = TokenService.checkAccessToken(token) as {
      userId: number
      sessionId: number
    }
    req.userId = decoded.userId
    req.sessionId = decoded.sessionId
    next()
  } catch (error) {
    res.status(401).json({ error: "Access denied" })
  }
}
