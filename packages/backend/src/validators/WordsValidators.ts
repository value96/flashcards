import { body, query } from 'express-validator'

export const isArrayOfString = (path = '') => [
  body(path)
    .isArray({ min: 1 })
    .withMessage(
      `${path || 'Body of request'} must be an array and cannot be empty`,
    ),
  body(path ? `${path}.*` : '*')
    .isString()
    .withMessage(`Each element in ${path || 'body'} must be a string`),
]

export const isArrayOfNumbers = (path = '') => [
  body(path)
    .isArray({ min: 1 })
    .withMessage(
      `${path || 'Body of request'} must be an array and cannot be empty`,
    ),
  body(path ? `${path}.*` : '*')
    .isNumeric()
    .withMessage(`Each element in ${path || 'body'} must be a Numeric`),
]

export const isString = (path = '') => [
  body(path)
    .isString()
    .withMessage('Body must be the string')
    .notEmpty()
    .withMessage('Body must be not empty string'),
]

export const isBoolean = (path = '') => [
  body(path)
    .isBoolean()
    .withMessage('Value must be a boolean')
    .notEmpty()
    .withMessage('Value must not be empty'),
]

export const isQueryParametrInt = (paramName: string) => [
  query(paramName)
    .notEmpty()
    .withMessage(`${paramName} must not be empty`)
    .isInt()
    .withMessage(`${paramName} must be integer`),
]

export const validateChangeStatusReq = [
  ...isArrayOfString('wordIds'),
  ...isString('status'),
]

export const isNumeric = (
  path = '',
  { minValue, maxValue }: { minValue?: number; maxValue?: number } = {},
) => [
  body(path)
    .isNumeric()
    .withMessage(`${path || 'Body of request'} must be a numeric`)
    .notEmpty()
    .withMessage(`${path || 'Body of request'} must not be empty`)
    .bail()
    .custom(value => {
      const numValue = Number(value)
      if (minValue !== undefined && numValue < minValue) {
        throw new Error(`Value must be greater than or equal to ${minValue}`)
      }
      if (maxValue !== undefined && numValue > maxValue) {
        throw new Error(`Value must be less than or equal to ${maxValue}`)
      }
      return true
    }),
]

export const isArrayOfWordData = (path = '') => [
  body(path)
    .isArray()
    .withMessage(`${path || 'Body of request'} must be array`)
    .bail(),
  body(`${path}.*.wordId`)
    .if((_, { req }) => req.body[path]?.length > 0)
    .isString()
    .withMessage('Each wordData object must have a string wordId')
    .notEmpty()
    .withMessage('wordId must not be empty'),

  body(`${path}.*.isSuccessRepeated`)
    .if((_, { req }) => req.body[path]?.length > 0)
    .isBoolean()
    .withMessage('Each wordData object must have a boolean isSuccessRepeated'),
]

export const validateReqForLearnableWords = [
  ...isNumeric('count', { minValue: 0, maxValue: 10 }),
  ...isArrayOfWordData('wordsData'),
]
