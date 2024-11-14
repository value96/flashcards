import { Response } from 'express'
import { getMessage } from '../utils/handleErrors'

import { AuthRequest } from '@shared/api'
import { wordModel } from 'models'
import { wordsService } from '../services/Words'
import { wordService } from '../services/Word'

// для фронтенда будет выглядеть что для слова есть 4 состояния, и 10 переходов между состояния
// idle - начальное состояние слова, когда оно не было ещё добавлено в коллекцию юзера,
// оно существует только как vocabularWord в общем списке слов для всех юзеров
// learning - слово изучается, выдаётся в выборке getNextBunchLearnableWords
// hasLearn - изучено, на фронтенде помечается успешным цветом, не выдаётся в выборке getNextBunchLearnableWords
// suspended - приостановлено в изучении, не выдаётся в выборке getNextBunchLearnableWords

// переходы между состояниями:

// idle -> learning; реализуется вызовом addNewWordsForLearning
// idle -> hasLearn; реализуется вызовом addNewWordsForLearning + changeWordsStatus(hasLeanred)
// learning or hasLearn or suspended -> edle; реализуется вызовом removeWords

// learning -> hasLearn; changeStatus
// hasLearn -> learning; changeStatus
// learning -> suspended; changeStatus
// suspended -> learning; changeStatus
// suspended -> hasLearn; changeStatus

//протестировано!
export const getAllWords = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId
    const words = await wordsService.getAllWords(userId)
    res.status(200).json(words)
  } catch (err) {
    const errMassage = getMessage(err)
    console.error(errMassage)
    res.status(500).json({
      message: ''.concat(errMassage),
    })
  }
}

// протестировано
export const addNewWordsForLearning = async (
  req: AuthRequest<{}, {}, number[]>,
  res: Response,
) => {
  try {
    const newVocabWordsIds = req.body
    const userId = req.userId
    // 1ч [done] проверить существование всех слов с newVocabWordsIds,
    // если хотя бы одного слова нет -> ошибка
    if (!(await wordsService.isAllVocabWordsExistent(newVocabWordsIds)))
      throw Error('not all vocab words are existed')

    // 1ч [done] проверить что для данного юзера в базе данных нет ещё ни одного слова с vocabWordId из newVocabWordsIds,
    // в противном случае -> ошибка

    if (
      await wordsService.isUserHasAnyVocabWordFromThisList(
        userId,
        newVocabWordsIds,
      )
    )
      throw Error('some of this words was already added')

    await wordsService.addNewWords(userId, newVocabWordsIds)
    res.status(204).json({})
  } catch (err) {
    const errMassage = getMessage(err)
    console.error(errMassage)
    res.status(500).json({
      message: 'addNewWordsForLearning->'.concat(errMassage),
    })
  }
}

//протестировано
export const removeWords = async (
  req: AuthRequest<{}, {}, string[]>,
  res: Response,
) => {
  try {
    // переводим группу слов на начальную стадию, до того как они были отмечены как изучаемые
    const wordIds = req.body
    await wordsService.removeWords(wordIds)
    res.status(204).json({})
  } catch (err) {
    const errMassage = getMessage(err)
    console.error(errMassage)
    res.status(500).json({
      message: ''.concat(errMassage),
    })
  }
}

// протестировали
export const changeWordsStatus = async (
  req: AuthRequest<{}, {}, { wordIds: string[]; status: wordModel.WordStatus }>,
  res: Response,
) => {
  try {
    const userId = req.userId
    const wordIds = req.body.wordIds
    const status = req.body.status

    const isAllWordsExistent = await wordsService.isAllWordsExistent(wordIds)
    if (!isAllWordsExistent)
      throw Error('not all words from given ids list are existed')

    const statusOfFirstWord = (await wordService.getWord(wordIds[0]))!.status
    // 1ч [done] проверить что все слова с wordIds существуют в дб, иначе ошибка
    // 1ч [done] проверить что все они имеют одинаковый статус, иначе ошибка

    const isAllThisWordsHasSameStatus =
      await wordsService.isAllThisWordsHaveSameStatus(
        wordIds,
        statusOfFirstWord,
      )
    if (!isAllThisWordsHasSameStatus)
      throw Error(
        'all words must have the same status for changing to another one',
      )

    const currentStatus: wordModel.WordStatus = statusOfFirstWord

    if (currentStatus === 'learning' && status === 'hasLearned') {
      wordsService.updateWordsStatus(wordIds, status)
      return res.status(204).json({})
    }
    if (currentStatus === 'hasLearned' && status === 'learning') {
      const vocabWordIds = await wordsService.removeWords(wordIds)
      await wordsService.addNewWords(userId, vocabWordIds)
      return res.status(204).json({})
    }
    if (currentStatus === 'learning' && status === 'suspended') {
      wordsService.updateWordsStatus(wordIds, status)
      return res.status(204).json({})
    }
    if (currentStatus === 'suspended' && status === 'learning') {
      wordsService.updateWordsStatus(wordIds, status)
      return res.status(204).json({})
    }
    if (currentStatus === 'suspended' && status === 'hasLearned') {
      wordsService.updateWordsStatus(wordIds, status)
      return res.status(204).json({})
    }

    throw Error(`changing status ${currentStatus} to ${status} is impossible`)
    // learning -> hasLearned
    // hasLearned -> learning // флоу: удалить слова из коллекции юзера и добавить их по новой
    // learning -> suspended
    // suspended -> learning
    // suspended -> hasLearned

    // 2ч [done] проверить допустимость смены текущего статуса на новый, иначе ошибка
    // 30м [done] обновить статус всем словам wordIds
  } catch (err) {
    const errMassage = getMessage(err)
    console.error(errMassage)
    res.status(500).json({
      message: ''.concat(errMassage),
    })
  }
}

// протестированно
export const getNextBunchLearnableWords = async (
  req: AuthRequest<
    {},
    {},
    {
      count: number
      wordsData: { wordId: string; isSuccessRepeated: boolean }[]
    }
  >,
  res: Response,
) => {
  try {
    // 2ч
    // это должен быть пост запрос !!!
    // здесь мы принимаем повторённые слова из предыдущего обращения к getNextBunchLearnableWords со стороны фронтенда
    // если это первый запрос за сессию, то массив слов в теле запроса может быть пустым
    // проверить состояния всех поступивших слов
    // состояния всех слов которые приходят, должны быть learning, смена состояния в этом контроллере возможа только на hasLearn
    // применяем логику для обновления learningHistory, nextShowTime, lastShowTimeDelta, status если слово было повторено достаточное
    // количество раз, чтобы считаться hasLearned
    // возвращаем следующую партию слов для повторения

    const userId = req.userId
    const count = req.body.count
    const wordsData = req.body.wordsData
    const wordIds = wordsData.map(d => d.wordId)

    if (wordsData.length > 0) {
      const isAllWordsExistent = await wordsService.isAllWordsExistent(wordIds)
      if (!isAllWordsExistent)
        throw Error('not all words from given ids list are existed')

      const statusOfFirstWord = (await wordService.getWord(wordIds[0]))!.status

      if (statusOfFirstWord !== 'learning')
        throw Error(
          'all words must have the same status for changing to another one',
        )

      const isAllThisWordsHasSameStatus =
        await wordsService.isAllThisWordsHaveSameStatus(
          wordIds,
          statusOfFirstWord,
        )
      if (!isAllThisWordsHasSameStatus)
        throw Error(
          'all words must have the same status for changing to another one',
        )

      for (const wData of wordsData) {
        if (wData.isSuccessRepeated)
          await wordService.successRepeat(wData.wordId)
        if (!wData.isSuccessRepeated)
          await wordService.failedRepeat(wData.wordId)
      }
    }

    const nextBunchOfWords = await wordsService.getNextBunchLearnableWords(
      userId,
      count,
    )

    res.status(200).json(nextBunchOfWords)
  } catch (err) {
    const errMassage = getMessage(err)
    console.error(errMassage)
    res.status(500).json({
      message: ''.concat(errMassage),
    })
  }
}

// additional functional to do later
export const changeWordComment = async (req: AuthRequest, res: Response) => {
  try {
  } catch (err) {
    const errMassage = getMessage(err)
    console.error(errMassage)
    res.status(500).json({
      message: ''.concat(errMassage),
    })
  }
}
