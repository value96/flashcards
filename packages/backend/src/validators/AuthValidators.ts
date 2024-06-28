import { body } from "express-validator"

export const signIn = [
  body("email", "wrong email format").isEmail(),
  body("password", "password must has at least 5 characters").isLength({
    min: 5,
  }),
]

export const signUp = [
  body("email", "wrong email format").isEmail(),
  body("password", "password must has at least 5 characters").isLength({
    min: 5,
  }),
  body("username", "specify username").isLength({ min: 3 }),
]

export const logout = []
