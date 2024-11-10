import { Router } from 'express'
import { DisplayedWordsController } from '../controllers'
import { isAuth } from '../middlewares'
import { withAuthHandler } from '../shared/api'
export const displayedWordsRouter = Router()

//displayedWordsRouter.get('/:count', isAuth, DisplayedWordsController.getSome)
displayedWordsRouter.post(
  '/forgotten-word',
  isAuth,
  withAuthHandler(DisplayedWordsController.acceptForgottenWord),
)
displayedWordsRouter.post(
  '/repeated-word',
  isAuth,
  withAuthHandler(DisplayedWordsController.acceptRepeatedWord),
)
