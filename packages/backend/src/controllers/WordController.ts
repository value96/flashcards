import { Word } from "@flashcards/types"
import data from "../../data/vocabular.json"
import { Request, Response } from "express"
import { getMessage } from "../utils/handleErrors"

export const words: Word[] = data.map((word, index) => ({
  id: index.toString(),
  vocabWord: word,
  lastShowDate: new Date().toISOString(),
  futureShowDate: new Date().toISOString(),
  spaceShowSec: 86400,
}))

let curIndex = 0

export const getSome = async (req: Request, res: Response) => {
  try {
    const count = Number(req.params.count)
    const doc: Word[] = []
    for (let i = curIndex; i < curIndex + count; i++) doc.push(words[i])
    curIndex = (curIndex + count) % words.length
    res.json(doc)
  } catch (err) {
    const errMassage = getMessage(err)
    console.error(errMassage)
    res.status(500).json({
      message: "failed to get words->".concat(errMassage),
    })
  }
}

export const acceptForgottenWord = async (req: Request, res: Response) => {
  try {
  } catch (err) {
    const errMassage = getMessage(err)
    console.error(errMassage)
    res.status(500).json({
      message: "failed to accept ForgottenWord->".concat(errMassage),
    })
  }
}

export const acceptRepeatedWord = async (req: Request, res: Response) => {
  try {
  } catch (err) {
    const errMassage = getMessage(err)
    console.error(errMassage)
    res.status(500).json({
      message: "failed to accept RepeatedWord->".concat(errMassage),
    })
  }
}
