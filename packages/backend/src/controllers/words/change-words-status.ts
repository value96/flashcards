import { Response } from 'express'
import { AuthRequest } from '../../shared/api'
import { wordModel } from '../../models'
import { wordsService } from '../../services/words'
import { wordService } from '../../services/word'
import { getMessage } from '../../utils'

export const changeWordsStatus = async (
  req: AuthRequest<{}, {}, { wordIds: string[]; status: wordModel.WordStatus }>,
  res: Response,
) => {
  try {
    const userId = req.userId
    const wordIds = req.body.wordIds
    const status = req.body.status

    const statusOfFirstWord = await wordsService.getWordsStatusIfOwner(
      userId,
      wordIds,
    )

    const currentStatus: wordModel.WordStatus = statusOfFirstWord

    if (currentStatus === 'learning' && status === 'hasLearned') {
      await wordsService.updateWordsStatus(userId, wordIds, status)
      return res.status(204).json({})
    }
    if (currentStatus === 'hasLearned' && status === 'learning') {
      const vocabWordIds = await wordsService.removeWords(userId, wordIds)
      await wordsService.addNewWords(userId, vocabWordIds)
      return res.status(204).json({})
    }
    if (currentStatus === 'learning' && status === 'suspended') {
      await wordsService.updateWordsStatus(userId, wordIds, status)
      return res.status(204).json({})
    }
    if (currentStatus === 'suspended' && status === 'learning') {
      await wordsService.updateWordsStatus(userId, wordIds, status)
      return res.status(204).json({})
    }
    if (currentStatus === 'suspended' && status === 'hasLearned') {
      await wordsService.updateWordsStatus(userId, wordIds, status)
      return res.status(204).json({})
    }

    throw Error(`changing status ${currentStatus} to ${status} is impossible`)
  } catch (err) {
    const errMassage = getMessage(err)
    console.error(errMassage)
    res.status(500).json({
      message: ''.concat(errMassage),
    })
  }
}
