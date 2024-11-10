import { WordMongo } from '../mongo'

export type WordType = WordMongo.WordType
export type WordStatus = WordMongo.WordStatus
class WordRepository {
  async getAllForUser(userId: string) {
    return await WordMongo.model.find({ userId: userId })
  }

  async findOneById(id: string) {
    return await WordMongo.model.findById(id)
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

  async removeWords(wordIds: string[]) {
    return await WordMongo.model.deleteMany({ _id: { $in: wordIds } })
  }

  async checkIfAllElementsHaveFieldWithValue(
    ids: string[],
    field: string,
    value: string | number,
  ) {
    const elements = await WordMongo.model.find({
      _id: { $in: ids },
      [field]: value,
    })
    if (elements?.length === ids.length) return true
    else return false
  }

  async findOneByVocabWordIdForUser(userId: string, ids: number[]) {
    return await WordMongo.model.findOne({
      userId: userId,
      vocabWordId: { $in: ids },
    })
  }

  async updateFieldForMany(
    ids: string[],
    field: string,
    value: string | number,
  ) {
    return await WordMongo.model.updateMany(
      { _id: { $in: ids } },
      { [field]: value },
    )
  }

  async isAllElementsExistent(ids: string[]) {
    const count = await WordMongo.model.countDocuments({ _id: { $in: ids } })
    return count === ids.length
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
