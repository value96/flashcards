import { check, body } from 'express-validator'

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

export const validateChangeStatusReq = [
  ...isArrayOfString('wordIds'),
  ...isString('status'),
]
