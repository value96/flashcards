import { Router } from 'express'
import { authController } from '../controllers'
import { AuthValidators, validationErrorHandler } from '../validators'
import { isAuth } from '../middlewares'
import { withAuthHandler } from '../shared/api'

export const authRouter = Router()

authRouter.post(
  '/sign-up',
  AuthValidators.isSignUpCred,
  validationErrorHandler,
  authController.signUp,
)
authRouter.post(
  '/sign-in',
  AuthValidators.isSignInCred,
  validationErrorHandler,
  authController.signIn,
)

authRouter.post('/logout', isAuth, withAuthHandler(authController.logout))

authRouter.get('/refresh-token', authController.refreshToken)
