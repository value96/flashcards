import { IWord, WordMongo } from "../mongo"

class WordRepository {
  async getAllForUser(userId: string): Promise<IWord[] | null> {
    return await WordMongo.find({ userId: userId })
  }
}

export const wordRepository = new WordRepository()
