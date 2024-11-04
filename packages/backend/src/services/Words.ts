import { vocabWordRepository, wordModel, type VocabWordData } from 'models'
/*import { type Word } from '@shared/lib' */

const { wordRepository } = wordModel
type WordType = wordModel.WordType

type AllWords = VocabWordData & {
  word: WordType | null
}

class WordsService {
  async getAllWords(userId: string): Promise<AllWords[]> {
    const vocabWords = await vocabWordRepository.findAll()
    const userWords = await wordRepository.getAllForUser(userId)

    const userWordsMap = new Map<string, WordType>()
    if (userWords) {
      userWords.forEach(word => {
        userWordsMap.set(word.vocabWordId.toString(), word)
      })
    }

    const resultWords: AllWords[] = []

    for (const key in Object.keys(vocabWords)) {
      const userWord = userWordsMap.get(key)
      if (userWord) {
        resultWords.push({
          ...vocabWords[key],
          word: userWord,
        })
      } else {
        resultWords.push({
          ...vocabWords[key],
          word: null,
        })
      }
    }

    return resultWords
  }

  async getSomeLearnableWords(n: number) {
    // получить n слов у котороых nextShowTime < current Time
  }

  async acceptSomeLearnableWords(n: number) {
    // получить n слов у котороых nextShowTime < current Time
  }
}

export const wordsService = new WordsService()
