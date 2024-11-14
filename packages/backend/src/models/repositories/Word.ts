import { WordMongo } from '../mongo'

export type WordType = WordMongo.WordType
export type WordStatus = WordMongo.WordStatus
type HistoryPoint = WordMongo.HistoryPoint
class WordRepository {
  async getAllForUser(userId: string) {
    return await WordMongo.model.find({ userId: userId })
  }

  async findOneById(id: string) {
    return await WordMongo.model.findById(id)
  }

  async findManyByIds(ids: string[]) {
    return await WordMongo.model.find({ _id: { $in: ids } })
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

  async updateWord(
    wordId: string,
    updatedFields: {
      nextShowTime: Date
      lastShowTimeDelta: number
      nextShowTranslate?: WordMongo.Language
      learningHistory: WordMongo.HistoryPoint[]
    },
  ) {
    await WordMongo.model.updateOne(
      { _id: wordId },
      { $set: updatedFields },
      { runValidators: true },
    )
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

  async findAllWithPastShowTime(userId: string, count: number) {
    if (count === 0) return []
    const now = new Date()
    return await WordMongo.model
      .find({ userId: userId, nextShowTime: { $lt: now } })
      .sort({ nextShowTime: 1 })
      .limit(count)
  }
}

export const wordRepository = new WordRepository()
