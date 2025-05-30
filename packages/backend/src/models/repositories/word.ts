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
    return await this.model.find({ userId: userId })
  }

  async findOneById(id: string) {
    return await this.model.findById(id)
  }

  async findManyByIds(ids: string[]) {
    return await this.model.find({ _id: { $in: ids } })
  }

  async addNewWords(newWords: IWord[]) {
    return await this.model.insertMany(newWords, { ordered: true })
  }

  async removeWord(wordId: string) {
    return await this.model.findByIdAndDelete(wordId)
  }

  async removeWords(wordIds: string[]) {
    return await this.model.deleteMany({ _id: { $in: wordIds } })
  }

  async updateWord(
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
      { _id: wordId },
      { $set: updatedFields },
      { runValidators: true },
    )
  }

  // TODO вынести бизнес логику в сервис, здесь оставить только функцию модели
  async checkIfAllElementsHaveFieldWithValue(
    ids: string[],
    field: string,
    value: string | number,
  ) {
    const elements = await this.model.find({
      _id: { $in: ids },
      [field]: value,
    })
    if (elements?.length === ids.length) return true
    else return false
  }

  async findOneByVocabWordIdForUser(userId: string, ids: number[]) {
    return await this.model.findOne({
      userId: userId,
      vocabWordId: { $in: ids },
    })
  }

  async updateFieldForMany(
    ids: string[],
    field: string,
    value: string | number,
  ) {
    return await this.model.updateMany(
      { _id: { $in: ids } },
      { [field]: value },
    )
  }

  //TODO вынести бизнесовую логику в серви, здесь оставить только подсчёт документов
  async isAllElementsExistent(ids: string[]) {
    const count = await this.model.countDocuments({ _id: { $in: ids } })
    return count === ids.length
  }

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
    return this.model.find(query).lean().exec()
  }
}

export const wordRepository = new WordRepository(WordMongo.model)
