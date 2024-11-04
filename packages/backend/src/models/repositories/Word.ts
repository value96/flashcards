import { WordMongo } from '../mongo'

export type WordType = WordMongo.IWord
class WordRepository {
  async getAllForUser(userId: string): Promise<WordType[] | null> {
    return await WordMongo.model.find({ userId: userId })
  }
  async getWordForUser(
    userId: string,
    vocabWordId: number,
  ): Promise<WordType[] | null> {
    return await WordMongo.model.find({
      userId: userId,
      vocabWordId: vocabWordId,
    })
  }
}

export const wordRepository = new WordRepository()
