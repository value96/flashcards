import { wordsService } from '@services/words'
import { AuthRequest } from '@shared/api'
import { getMessage } from '@utils'
import { Response } from 'express'

export const getCountWordsWithinPeriod = async (
  req: AuthRequest<{}, {}, {}, { from?: string; to?: string }>,
  res: Response,
) => {
  try {
    const userId = req.userId
    const from = req.query.from
    const to = req.query.to

    if (!from && !to) {
      // вывести все слова из обучающей выборке для userId
      const words = await wordsService.getTrainingWordsForPeriod(
        userId,
        null,
        null,
      )
      return res.status(200).json(words)
    }

    if (from && !to) {
      // вывести слова от from для userId
      const words = await wordsService.getTrainingWordsForPeriod(
        userId,
        new Date(from),
        null,
      )
      return res.status(200).json(words)
    }

    if (!from && to) {
      //преобразовать дату
      // вывести слова до to для userId
      const words = await wordsService.getTrainingWordsForPeriod(
        userId,
        null,
        new Date(to),
      )
      return res.status(200).json(words)
    }

    if (from && to) {
      //преобразовать дату
      const fromDate = new Date(from)
      const toDate = new Date(to)
      if (fromDate < toDate) {
        // вывести слова от from до to для userId
        const words = await wordsService.getTrainingWordsForPeriod(
          userId,
          fromDate,
          toDate,
        )
        return res.status(200).json(words)
      } else {
        return res.status(416).send('parametr "from" must be less than "to"')
      }
    }
  } catch (err) {
    const errMassage = getMessage(err)
    console.error(errMassage)
    res.status(500).json({
      message: ''.concat(errMassage),
    })
  }
}
