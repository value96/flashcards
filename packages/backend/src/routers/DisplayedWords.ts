import { Router } from 'express'
import { DisplayedWordsController } from '../controllers'
import { isAuth } from '../middlewares/isAuth'

export const displayedWordsRouter = Router()

displayedWordsRouter.get('/:count', isAuth, DisplayedWordsController.getSome)
displayedWordsRouter.post(
  '/forgotten-word',
  isAuth,
  DisplayedWordsController.acceptForgottenWord,
)
displayedWordsRouter.post(
  '/repeated-word',
  isAuth,
  DisplayedWordsController.acceptRepeatedWord,
)
