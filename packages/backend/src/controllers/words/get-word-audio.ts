import { Response } from 'express'
import { wordsService } from '@services/words'
import { AuthRequest } from '@shared/api'
import { getMessage } from '@utils'

export const getWordAudio = async (
  req: AuthRequest<{}, {}, {}, { id: string }>,
  res: Response,
) => {
  try {
    const vocabWordId = req.query.id
    const Mp3File = await wordsService.getAudio(vocabWordId)
    if (Mp3File) {
      res.setHeader('Content-Type', 'audio/mpeg')
      res.status(200).send(Mp3File.data)
    } else res.status(410).json('not found audio file for this id')
  } catch (err) {
    const errMassage = getMessage(err)
    console.error(errMassage)
    res.status(500).json({
      message: ''.concat(errMassage),
    })
  }
}
