import { Router } from 'express'
import { AuthController } from '../controllers'
import { AuthValidators, validationErrorHandler } from '../validators'
import { isAuth } from '../middlewares'
import { withAuthHandler } from '../shared/api'

export const authRouter = Router()

authRouter.post(
  '/sign-up',
  AuthValidators.isSignUpCred,
  validationErrorHandler,
  AuthController.signUp,
)
authRouter.post(
  '/sign-in',
  AuthValidators.isSignInCred,
  validationErrorHandler,
  AuthController.signIn,
)

authRouter.post('/logout', isAuth, withAuthHandler(AuthController.logout))

authRouter.get('/refresh-token', AuthController.refreshToken)
