import { Word, VocabWord } from '@shared/lib'

import { Request, Response } from 'express'
import { getMessage } from '../utils/handleErrors'

const data: VocabWord[] = [
  {
    id: 'sjdsid',
    translate: {
      eng: 'arouse',
      rus: 'вызывать, пробуждать',
    },
  },
  {
    id: 'sjdfk',
    translate: {
      eng: 'pretty',
      rus: 'довольно-таки',
    },
  },
  {
    id: 'sdfkdo',
    translate: {
      eng: 'grand',
      rus: 'большой, великий',
    },
  },
]

export const words: Word[] = data.map((word, index) => ({
  id: index.toString(),
  vocabWord: word,
  learningHistory: [],
  nextShowTime: new Date().toISOString(),
  lastShowTimeDelta: 86400,
  state: 'learning',
}))

let curIndex = 0

export const getSome = async (req: Request, res: Response) => {
  try {
    const count = Number(req.params.count)
    const doc: Word[] = []
    /* for (let i = curIndex; i < curIndex + count; i++) doc.push(words[i])
    curIndex = (curIndex + count) % words.length
    res.json(doc) */
    res.json(words)
  } catch (err) {
    const errMassage = getMessage(err)
    console.error(errMassage)
    res.status(500).json({
      message: 'failed to get words->'.concat(errMassage),
    })
  }
}

export const acceptForgottenWord = async (req: Request, res: Response) => {
  try {
    res.status(200).json({})
  } catch (err) {
    const errMassage = getMessage(err)
    console.error(errMassage)
    res.status(500).json({
      message: 'failed to accept ForgottenWord->'.concat(errMassage),
    })
  }
}

export const acceptRepeatedWord = async (req: Request, res: Response) => {
  try {
    res.status(200).json({})
  } catch (err) {
    const errMassage = getMessage(err)
    console.error(errMassage)
    res.status(500).json({
      message: 'failed to accept RepeatedWord->'.concat(errMassage),
    })
  }
}
