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
    }

    if (from && !to) {
      //преобразовать дату
      // вывести слова от from для userId
    }

    if (!from && to) {
      //преобразовать дату
      // вывести слова до to для userId
    }

    if (from && to) {
      //преобразовать дату
      if (from < to) {
        // вывести слова от from до to для userId
      } else {
        // выбросить ошибку
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
