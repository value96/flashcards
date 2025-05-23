import { Response } from 'express'
import { wordService } from '@services/Word'
import { wordsService } from '@services/Words'
import { AuthRequest } from '@shared/api'
import { getMessage } from '@utils'

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
    // это должен быть пост запрос !!!
    // здесь мы принимаем повторённые слова из предыдущего обращения к getNextBunchLearnableWords со стороны фронтенда
    // если это первый запрос за сессию, то массив слов в теле запроса может быть пустым
    // проверить состояния всех поступивших слов
    // состояния всех слов которые приходят, должны быть learning, смена состояния в этом контроллере возможа только на hasLearned
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
