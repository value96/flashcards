import { Request, Response } from 'express'
import { getMessage } from '../utils/handleErrors'

export const getAllWords = async (req: Request, res: Response) => {
  try {
  } catch (err) {
    const errMassage = getMessage(err)
    console.error(errMassage)
    res.status(500).json({
      message: ''.concat(errMassage),
    })
  }
}

export const changeWordsStatus = async (req: Request, res: Response) => {
  try {
  } catch (err) {
    const errMassage = getMessage(err)
    console.error(errMassage)
    res.status(500).json({
      message: ''.concat(errMassage),
    })
  }
}

export const changeWordComment = async (req: Request, res: Response) => {
  try {
  } catch (err) {
    const errMassage = getMessage(err)
    console.error(errMassage)
    res.status(500).json({
      message: ''.concat(errMassage),
    })
  }
}

export const getBunchLearnableWords = async (req: Request, res: Response) => {
  try {
  } catch (err) {
    const errMassage = getMessage(err)
    console.error(errMassage)
    res.status(500).json({
      message: ''.concat(errMassage),
    })
  }
}

export const acceptBunchLearnableWords = async (
  req: Request,
  res: Response,
) => {
  try {
  } catch (err) {
    const errMassage = getMessage(err)
    console.error(errMassage)
    res.status(500).json({
      message: ''.concat(errMassage),
    })
  }
}
