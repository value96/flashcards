import { VocabWord } from "models/sql"

export type VocabWordData = {
  id: number
  eng: string
  rus: string
}

class VocabWordRepository {
  private vocabMap: Map<number, VocabWordData>
  private isFullCached: boolean

  constructor() {
    this.vocabMap = new Map<number, VocabWordData>()
    this.isFullCached = false
  }

  async findOneById(id: number): Promise<VocabWordData | null> {
    let vocabWord: VocabWordData | undefined | null = this.vocabMap.get(id)

    if (!vocabWord) {
      const result = await VocabWord.findOne({ where: { id } })

      if (result) {
        vocabWord = {
          id: result.id,
          eng: result.eng,
          rus: result.rus,
        }

        this.vocabMap.set(id, vocabWord)
      } else {
        vocabWord = null
      }
    }

    return vocabWord
  }

  async findAll(): Promise<{ [key: string]: VocabWordData }> {
    if (this.isFullCached) {
      const result: { [key: string]: VocabWordData } = {}
      this.vocabMap.forEach((value, key) => {
        result[key.toString()] = value
      })
      return result
    } else {
      const allWordsFromDb = await VocabWord.findAll()
      const allWordsFromDbData = allWordsFromDb.reduce(
        (allWords, word) => {
          allWords[word.id.toString()] = {
            id: word.id,
            eng: word.eng,
            rus: word.rus,
          }
          return allWords
        },
        {} as { [key: string]: VocabWordData },
      )

      allWordsFromDb.forEach(word => this.vocabMap.set(word.id, word))

      this.isFullCached = true
      return allWordsFromDbData
    }
  }
}

export default new VocabWordRepository()
