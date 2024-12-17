import { RequestHandler, Request, Response, NextFunction } from 'express'

export interface AuthRequest<
  P = {},
  ResBody = any,
  ReqBody = any,
  ReqQuery = {},
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  userId: string
  sessionId: string
}

type AuthRequestHandler<P = {}, ResBody = any, ReqBody = any, ReqQuery = {}> = (
  req: AuthRequest<P, ResBody, ReqBody, ReqQuery>,
  res: Response,
  next: NextFunction,
) => any

export function withAuthHandler<
  P = {},
  ResBody = any,
  ReqBody = any,
  ReqQuery = {},
>(handler: AuthRequestHandler<P, ResBody, ReqBody, ReqQuery>): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    return handler(req as AuthRequest<P, ResBody, ReqBody, ReqQuery>, res, next)
  }
}
