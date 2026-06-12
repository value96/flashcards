import { Response } from 'express'
import { AuthRequest } from '../../shared/api'
import { wordsService } from '../../services/words'
import { getMessage } from '../../utils'

export const getNewWordsForecast = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const forecast = await wordsService.getNewWordsForecast(req.userId)
    res.status(200).json(forecast)
  } catch (err) {
    const errMassage = getMessage(err)
    console.error(errMassage)
    res.status(500).json({
      message: ''.concat(errMassage),
    })
  }
}
