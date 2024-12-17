import { VocabWordMongo } from '../mongo'

export type VocabWord = VocabWordMongo.VocabWord

class VocabWordRepository {
  async findOneById(id: number): Promise<VocabWord | null> {
    const vocabWordMongo = await VocabWordMongo.model.findOne({ _id: id })
    if (vocabWordMongo) return vocabWordMongo.toJSON() as VocabWord
    else return null
  }

  async isAllElementsExistent(ids: Number[]) {
    if (!ids || ids.length === 0) return true

    const count = await VocabWordMongo.model
      .countDocuments({ _id: { $in: ids } })
      .exec()

    return count === ids.length
  }

  async findAll(): Promise<Record<string, VocabWord>> {
    const allWordsMongo = await VocabWordMongo.model.find()
    const allWords: Record<string, VocabWord> = {}

    allWordsMongo.forEach(doc => {
      const word = doc.toJSON() as VocabWord
      allWords[word.id.toString()] = {
        ...word,
      }
    })
    return allWords
  }
}
export const vocabWordRepository = new VocabWordRepository()
