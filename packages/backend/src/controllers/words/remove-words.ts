import { Response } from 'express'
import { AuthRequest } from '../../shared/api'
import { wordsService } from '../../services/words'
import { getMessage } from '../../utils'

export const removeWords = async (
  req: AuthRequest<{}, {}, string[]>,
  res: Response,
) => {
  try {
    // переводим группу слов на начальную стадию, до того как они были отмечены как изучаемые
    const userId = req.userId
    const wordIds = req.body

    const isOwner = await wordsService.isUserOwnerOfWords(userId, wordIds)
    if (!isOwner) throw Error('not all words belong to the user')

    await wordsService.removeWords(userId, wordIds)
    res.status(204).json({})
  } catch (err) {
    const errMassage = getMessage(err)
    console.error(errMassage)
    res.status(500).json({
      message: ''.concat(errMassage),
    })
  }
}
