import { Request, Response } from "express"
import VocabWord from "../models/sql/VocabWord"
import User from "../models/sql/User"
import { Translations } from "@shared/lib"

export const getVWords = async (req: Request, res: Response) => {
  try {
    const vWords = await VocabWord.findAll({ include: User })
    res.json(vWords)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" })
  }
}

/* export const addVocabWord = async (req: Request<{}, {}, Translations>, res: Response) => {
  try {
    const { eng, rus } = req.body
    const word = await VocabWord.create({ eng, rus })
    res.status(201).json(word)
  } catch (error) {
    res.status(500).json({ error: "Failed to create VocabWord" })
  }
}
 */

export const addVocabWord = async (body: Translations) => {
  try {
    const { eng, rus } = body
    const word = await VocabWord.create({ eng, rus })
  } catch (error) {
    throw error
  }
}
