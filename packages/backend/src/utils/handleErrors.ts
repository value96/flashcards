import { Request, Response, NextFunction } from "express"
import createError from "http-errors"

export const errorHandler = (err: any, req: Request, res: Response) => {
  if (createError.isHttpError(err)) {
    return res.status(err.status).json({ error: err.message })
  } else {
    return res.status(500).json({ error: "Internal Server Error" })
  }
}

export const getMessage = (err: any) => {
  return (err as { message?: string })?.message ?? "unknown error"
}
