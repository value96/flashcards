import { wordModel } from '@models/repositories'
import { wordService } from '@services/word'
import { wordsService } from '@services/ords'
import { AuthRequest } from '@shared/api'
import { getMessage } from '@utils'
import { Response } from 'express'

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
      await wordsService.updateWordsStatus(wordIds, status)
      return res.status(204).json({})
    }
    if (currentStatus === 'hasLearned' && status === 'learning') {
      const vocabWordIds = await wordsService.removeWords(wordIds)
      await wordsService.addNewWords(userId, vocabWordIds)
      return res.status(204).json({})
    }
    if (currentStatus === 'learning' && status === 'suspended') {
      await wordsService.updateWordsStatus(wordIds, status)
      return res.status(204).json({})
    }
    if (currentStatus === 'suspended' && status === 'learning') {
      await wordsService.updateWordsStatus(wordIds, status)
      return res.status(204).json({})
    }
    if (currentStatus === 'suspended' && status === 'hasLearned') {
      await wordsService.updateWordsStatus(wordIds, status)
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
