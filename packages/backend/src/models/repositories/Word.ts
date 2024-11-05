import { WordMongo } from '../mongo'

export type WordType = WordMongo.WordType
export type WordStatus = WordMongo.WordStatus
class WordRepository {
  async getAllForUser(userId: string) {
    return await WordMongo.model.find({ userId: userId })
  }

  async addNewWord(newWord: WordType) {
    return await WordMongo.model.create(newWord)
  }

  async addNewWords(newWords: WordType[]) {
    return await WordMongo.model.insertMany(newWords, { ordered: true })
  }

  async removeWord(wordId: string) {
    return await WordMongo.model.findByIdAndDelete(wordId)
  }

  async updateWordStatus(wordId: string, status: WordStatus) {
    return await WordMongo.model.findByIdAndUpdate(wordId, { status })
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
