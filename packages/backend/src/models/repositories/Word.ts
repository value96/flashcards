import { IWord, WordMongo } from "models/mongo"

class WordRepository {
  async getAllForUser(userId: string): Promise<IWord[] | null> {
    return await WordMongo.find({ userId: userId })
  }
}

export default new WordRepository()
