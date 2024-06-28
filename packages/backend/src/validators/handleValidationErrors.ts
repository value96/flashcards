import { validationResult } from "express-validator"
import { Request, Response, NextFunction } from "express"

export default (req: Request, res: Response, next: NextFunction) => {
  console.log("validators")
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array())
  }

  next()
}
