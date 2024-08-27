import { VocabWordData } from "models"
import { IWord, SuccessRating, WordStatus } from "models/mongo"

interface WordDTO {
  id: number
  eng: string
  rus: string
  status?: WordStatus
  successRating?: SuccessRating
}

class WordsList {
  formatWords = (
    words: IWord[],
    vocabWords: { [key: string]: VocabWordData },
  ) => {
    const modifiedWords: { [key: string]: WordDTO } = {}
    words.forEach(word => {
      if (String(word.vocabWordId) in vocabWords) {
      }
    })
  }
}

export default new WordsList()
