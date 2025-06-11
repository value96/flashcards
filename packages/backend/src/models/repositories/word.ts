import { WordMongo } from '../mongo'
import { Model } from 'mongoose'

export type IWord = WordMongo.IWord
export type WordStatus = WordMongo.WordStatus
export type Language = WordMongo.Language
export type HistoryPoint = WordMongo.HistoryPoint

export type Op = 'eq' | 'gt' | 'lt'
export type Condition = [
  keyof IWord,
  number | string | Date /* IWord[keyof IWord] */,
  Op,
]

class WordRepository {
  private model: Model<IWord>

  constructor(model: Model<IWord>) {
    this.model = model
  }
  async getAllUserWords(userId: string) {
    return await this.model.find({ userId: userId }).lean()
  }

  async findOneById(id: string) {
    return await this.model.findById(id)
  }

  async findManyByIds(userId: string, ids: string[]) {
    return await this.model.find({ _id: { $in: ids }, userId })
  }

  async addNewWords(newWords: IWord[]) {
    return await this.model.insertMany(newWords, { ordered: true })
  }

  async removeWord(userId: string, wordId: string) {
    return await this.model.findOneAndDelete({ _id: wordId, userId })
  }

  async removeWords(userId: string, wordIds: string[]) {
    return await this.model.deleteMany({ _id: { $in: wordIds }, userId })
  }

  async updateWord(
    userId: string,
    wordId: string,
    updatedFields: {
      nextShowTime: Date
      lastShowTimeDelta: number
      nextShowTranslate?: WordMongo.Language
      status?: WordMongo.WordStatus
      learningHistory: WordMongo.HistoryPoint[]
    },
  ) {
    await this.model.updateOne(
      { _id: wordId, userId },
      { $set: updatedFields },
      { runValidators: true },
    )
  }

  // TODO вынести бизнес логику в сервис, здесь оставить только функцию модели

  async findOneByVocabWordIdForUser(userId: string, ids: number[]) {
    return await this.model.findOne({
      userId: userId,
      vocabWordId: { $in: ids },
    })
  }

  async updateFieldForMany(
    userId: string,
    ids: string[],
    field: string,
    value: string | number,
  ) {
    return await this.model.updateMany(
      { _id: { $in: ids }, userId },
      { [field]: value },
    )
  }

  //TODO вынести бизнесовую логику в серви, здесь оставить только подсчёт документов

  async findSomeWithPastShowTime(
    userId: string,
    status: WordMongo.WordStatus,
    count: number,
  ) {
    if (count === 0) return []
    const now = new Date()
    return await this.model
      .find({ userId: userId, status: status, nextShowTime: { $lt: now } })
      .sort({ nextShowTime: 1 })
      .limit(count)
  }

  async findWordsWithCondition(conditions: Condition[]) {
    const query: Record<string, any> = {}
    for (const [key, value, op] of conditions) {
      switch (op) {
        case 'eq':
          query[key] = value
          break
        case 'gt':
          query[key] = { ...(query[key] || {}), $gt: value }
          break
        case 'lt':
          query[key] = { ...(query[key] || {}), $lt: value }
          break
        default:
          throw new Error(`Unsupported operation: ${op}`)
      }
    }
    return await this.model.countDocuments(query)
  }
}

export const wordRepository = new WordRepository(WordMongo.model)
