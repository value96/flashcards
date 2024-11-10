import { Router } from 'express'
import { WordsController } from '../controllers'
import { isAuth } from '../middlewares'
import { withAuthHandler } from '../shared/api'
import { WordsValidators, validationErrorHandler } from '../validators'

export const wordsRouter = Router()

wordsRouter.get(
  '/words-list',
  isAuth,
  withAuthHandler(WordsController.getAllWords),
)
//навесить валидаторы
wordsRouter.post(
  '/add-words',
  isAuth,
  WordsValidators.isArrayOfNumbers(),
  validationErrorHandler,
  withAuthHandler(WordsController.addNewWordsForLearning),
)

wordsRouter.post(
  '/remove-words',
  isAuth,
  WordsValidators.isArrayOfString(),
  validationErrorHandler,
  withAuthHandler(WordsController.removeWords),
)

wordsRouter.post(
  '/change-words-status',
  isAuth,
  WordsValidators.validateChangeStatusReq,
  validationErrorHandler,
  withAuthHandler(WordsController.changeWordsStatus),
)
