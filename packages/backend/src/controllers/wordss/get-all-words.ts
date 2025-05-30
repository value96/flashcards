import { Response } from 'express'
import { wordsService } from '@services/Words'
import { AuthRequest } from '@shared/api'
import { getMessage } from '@utils'

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
