import { Router } from 'express'
import { AuthController } from '../controllers'
import { AuthValidators, handleValidationErrors } from '../validators'
import { isAuth } from '../middlewares/isAuth'
import { withAuthHandler } from '@shared/api'

export const authRouter = Router()

/* router.post(
  "/sign-up",
  AuthValidators.signUp,
  handleValidationErrors,
  AuthController.signUp,
) */
authRouter.post(
  '/sign-in',
  AuthValidators.signIn,
  handleValidationErrors,
  AuthController.signIn,
)

authRouter.post('/logout', isAuth, withAuthHandler(AuthController.logout))

authRouter.get('/refresh-token', AuthController.refreshToken)
