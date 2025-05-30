import { Router } from 'express'
import { isAuth } from '../middlewares'
import { withAuthHandler } from '../shared/api'
import { wordsController } from '../controllers'
import { isQueryParametrInt } from '../shared/validators'
import { validationErrorHandler, wordsValidators } from '../validators'

export const wordsRouter = Router()

wordsRouter.get(
  '/words-list',
  isAuth,
  withAuthHandler(wordsController.getAllWords),
)

wordsRouter.get(
  '/audio',
  isAuth,
  isQueryParametrInt('id'),
  withAuthHandler(wordsController.getWordAudio),
)

wordsRouter.get(
  '/get-count-words-within-period',
  isAuth,
  ...wordsValidators.validateDatesInQueryParams(['from', 'to']),
  validationErrorHandler,
  withAuthHandler(wordsController.getCountWordsWithinPeriod),
)

wordsRouter.post(
  '/add-words',
  isAuth,
  wordsValidators.isArrayOfNumbers(),
  validationErrorHandler,
  withAuthHandler(wordsController.addNewWordsForLearning),
)

wordsRouter.post(
  '/remove-words',
  isAuth,
  wordsValidators.isArrayOfString(),
  validationErrorHandler,
  withAuthHandler(wordsController.removeWords),
)

wordsRouter.post(
  '/change-words-status',
  isAuth,
  wordsValidators.validateChangeStatusReq,
  validationErrorHandler,
  withAuthHandler(wordsController.changeWordsStatus),
)

wordsRouter.post(
  '/next-bunch-words',
  isAuth,
  wordsValidators.validateReqForLearnableWords,
  validationErrorHandler,
  withAuthHandler(wordsController.getNextBunchLearnableWords),
)
