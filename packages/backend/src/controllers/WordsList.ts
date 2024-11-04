import { Request, Response } from 'express'

import { errorHandler } from '../utils/handleErrors'
import { AuthRequest } from '../middlewares/isAuth'
import { vocabWordRepository, wordRepository } from '../models'

export const getWords = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId as string
    const words = await wordRepository.getAllForUser(userId)
    const vocabWords = await vocabWordRepository.findAll()
  } catch (error) {
    return errorHandler(error, req, res)
  }
}

/* export const getVWords = async (req: Request, res: Response) => {
  try {
    const vWords = await VocabWord.findAll({ include: User })
    res.json(vWords)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" })
  }
}

export const addVocabWord = async (body: Translations) => {
  try {
    const { eng, rus } = body
    const word = await VocabWord.create({ eng, rus })
  } catch (error) {
    throw error
  }
}
 */
