import { Op } from 'sequelize'
import { VocabWordSql } from '../sql'

export type VocabWordData = {
  id: number
  eng: string
  rus: string
}

class VocabWordRepository {
  private vocabMap: Map<string, VocabWordData>
  private isFullCached: boolean

  constructor() {
    this.vocabMap = new Map<string, VocabWordData>()
    this.isFullCached = false
  }

  async findOneById(id: number): Promise<VocabWordData | null> {
    let vocabWord = this.vocabMap.get(id.toString()) ?? null

    if (!vocabWord) {
      const result = await VocabWordSql.findOne({ where: { id } })

      if (result) {
        vocabWord = {
          id: result.id,
          eng: result.eng,
          rus: result.rus,
        }

        this.vocabMap.set(id.toString(), vocabWord)
      }
    }

    return vocabWord
  }

  async isAllElementsExistent(ids: Number[]) {
    const count = await VocabWordSql.count({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    })
    return count === ids.length
  }

  async findAll(): Promise<Record<string, VocabWordData>> {
    if (this.isFullCached) {
      const result: Record<string, VocabWordData> = {}

      this.vocabMap.forEach((value, key) => {
        result[key.toString()] = value
      })
      return result
    } else {
      const allWordsFromDb = await VocabWordSql.findAll()

      allWordsFromDb.forEach(word =>
        this.vocabMap.set(word.id.toString(), {
          id: word.id,
          eng: word.eng,
          rus: word.rus,
        }),
      )
      const allWordsFromDbData = allWordsFromDb.reduce(
        (allWords, word) => {
          allWords[word.id.toString()] = {
            id: word.id,
            eng: word.eng,
            rus: word.rus,
          }
          return allWords
        },
        {} as Record<string, VocabWordData>,
      )

      this.isFullCached = true
      return allWordsFromDbData
    }
  }
}
export const vocabWordRepository = new VocabWordRepository()
