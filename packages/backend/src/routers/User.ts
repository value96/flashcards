import { Router } from 'express'
import { UserController } from '../controllers'
import { isAuth } from '../middlewares'
import { withAuthHandler } from '../shared/api'

export const userRouter = Router()

userRouter.get('/', isAuth, withAuthHandler(UserController.getUsers))
//router.post("/", isAuth, UserController.createUser)
