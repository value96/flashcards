import { vocabWordModel, wordModel } from 'models'

const { vocabWordRepository } = vocabWordModel
const { wordRepository } = wordModel
type WordType = wordModel.WordType
type VocabWordData = vocabWordModel.VocabWordData

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

  async addNewWords(userId: string, vocabWordsIds: string[]) {
    const newWords: wordModel.WordType[] = vocabWordsIds.map(vocabWordId => ({
      userId,
      status: 'learning',
      vocabWordId: parseInt(vocabWordId),
      nextShowTranslate: 'eng',
      learningHistory: [],
      nextShowTime: new Date(),
      lastShowTimeDelta: 8,
      addedDate: new Date(),
    }))

    await wordRepository.addNewWords(newWords)
  }

  async getSomeLearnableWords(n: number) {
    // получить n слов у котороых nextShowTime < current Time
  }
}

export const wordsService = new WordsService()
