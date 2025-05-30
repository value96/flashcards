import { wordsService } from '@services/ords'
import { AuthRequest } from '@shared/api'
import { getMessage } from '@utils'
import { Response } from 'express'

export const addNewWordsForLearning = async (
  req: AuthRequest<{}, {}, number[]>,
  res: Response,
) => {
  try {
    const newVocabWordsIds = req.body
    const userId = req.userId

    if (!(await wordsService.isAllVocabWordsExistent(newVocabWordsIds)))
      throw Error('not all vocab words are existed')

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
