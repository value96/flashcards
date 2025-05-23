import { Router } from 'express'
import { wordsController } from '../controllers'
import { isAuth } from '../middlewares'
import { withAuthHandler } from '../shared/api'
import { WordsValidators, validationErrorHandler } from '../validators'

export const wordsRouter = Router()

wordsRouter.get(
  '/words-list',
  isAuth,
  withAuthHandler(wordsController.getAllWords),
)

wordsRouter.get(
  '/audio',
  isAuth,
  WordsValidators.isQueryParametrInt('id'),
  withAuthHandler(wordsController.getWordAudio),
)

//навесить валидаторы
wordsRouter.post(
  '/add-words',
  isAuth,
  WordsValidators.isArrayOfNumbers(),
  validationErrorHandler,
  withAuthHandler(wordsController.addNewWordsForLearning),
)

wordsRouter.post(
  '/remove-words',
  isAuth,
  WordsValidators.isArrayOfString(),
  validationErrorHandler,
  withAuthHandler(wordsController.removeWords),
)

wordsRouter.post(
  '/change-words-status',
  isAuth,
  WordsValidators.validateChangeStatusReq,
  validationErrorHandler,
  withAuthHandler(wordsController.changeWordsStatus),
)

wordsRouter.post(
  '/next-bunch-words',
  isAuth,
  WordsValidators.validateReqForLearnableWords,
  validationErrorHandler,
  withAuthHandler(wordsController.getNextBunchLearnableWords),
)
