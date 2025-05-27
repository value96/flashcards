import { query } from 'express-validator'

export const isQueryParametrInt = (paramName: string) => [
  query(paramName)
    .notEmpty()
    .withMessage(`${paramName} must not be empty`)
    .isInt()
    .withMessage(`${paramName} must be integer`),
]

export const isQueryParametrDate = (paramName: string) => [
  query(paramName)
    .optional()
    .isDate({
      format: 'YYYY-MM-DD',
      strictMode: true,
      delimiters: ['-'],
    })
    .withMessage(`${paramName} must be in YYYY-MM-DD format`),
]
