import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { config } from "../config"
import TokenService from "../services/Token"

interface AuthRequest extends Request {
  userId?: number
}

export const isAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1]
    if (!token) {
      return res.status(401).json({ error: "Access denied" })
    }

    const decoded = TokenService.checkAccessToken(token) as {
      userId: number
    }
    req.userId = decoded.userId
    next()
  } catch (error) {
    res.status(401).json({ error: "Access denied" })
  }
}
