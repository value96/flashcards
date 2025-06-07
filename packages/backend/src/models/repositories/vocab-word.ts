import { VocabWordMongo } from '../mongo'

export type VocabWord = VocabWordMongo.VocabWord

class VocabWordRepository {
  private cache = new Map<number, VocabWord>()
  private isCacheFilled = false

  async findOneById(id: number): Promise<VocabWord | null> {
    const cached = this.cache.get(id)
    if (cached) return cached

    const vocabWordMongo = await VocabWordMongo.model.findOne({ _id: id })
    if (vocabWordMongo) {
      const word = vocabWordMongo.toJSON() as VocabWord
      this.cache.set(id, word)
      return word
    } else return null
  }

  async isAllElementsExistent(ids: Number[]) {
    if (!ids || ids.length === 0) return true

    const count = await VocabWordMongo.model
      .countDocuments({ _id: { $in: ids } })
      .exec()

    return count === ids.length
  }

  async findAll(): Promise<Record<string, VocabWord>> {
    if (this.isCacheFilled) {
      const allWords: Record<string, VocabWord> = {}
      this.cache.forEach((word, id) => {
        allWords[id.toString()] = word
      })
      return allWords
    }

    const allWordsMongo = await VocabWordMongo.model.find()
    const allWords: Record<string, VocabWord> = {}

    allWordsMongo.forEach(doc => {
      const word = doc.toJSON() as VocabWord
      allWords[word.id.toString()] = {
        ...word,
      }
      this.cache.set(word.id, word)
    })
    this.isCacheFilled = true
    return allWords
  }
}
export const vocabWordRepository = new VocabWordRepository()
