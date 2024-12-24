import { vocabWordModel, wordModel, vocabWordAudioModel } from '../models'

const { vocabWordRepository } = vocabWordModel
const { wordRepository } = wordModel
const { vocabWordAudioRepository } = vocabWordAudioModel
type WordType = wordModel.WordType
type VocabWord = vocabWordModel.VocabWord

type AllWords = VocabWord & {
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

    for (const key of Object.keys(vocabWords)) {
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

  async getAudio(vocabWordId: string) {
    return await vocabWordAudioRepository.findOneById(vocabWordId)
  }

  async addNewWords(userId: string, vocabWordsIds: number[]) {
    const newWords: wordModel.WordType[] = vocabWordsIds.map(vocabWordId => ({
      userId,
      status: 'learning',
      vocabWordId: vocabWordId,
      nextShowTranslate: 'eng',
      learningHistory: [],
      nextShowTime: new Date(),
      lastShowTimeDelta: 4,
      addedDate: new Date(),
    }))

    await wordRepository.addNewWords(newWords)
  }

  async removeWords(wordIds: string[]) {
    // перед удалением получить ids vocabWords
    const vocabWordIds = (await wordRepository.findManyByIds(wordIds)).map(
      word => word.vocabWordId,
    )
    await wordRepository.removeWords(wordIds)
    return vocabWordIds
  }

  async updateWordsStatus(wordIds: string[], status: wordModel.WordStatus) {
    return await wordRepository.updateFieldForMany(wordIds, 'status', status)
  }

  async isAllThisWordsHaveSameStatus(
    wordIds: string[],
    status: wordModel.WordStatus,
  ) {
    return await wordRepository.checkIfAllElementsHaveFieldWithValue(
      wordIds,
      'status',
      status,
    )
  }

  async isAllVocabWordsExistent(wordIds: number[]) {
    return await vocabWordRepository.isAllElementsExistent(wordIds)
  }

  async isUserHasAnyVocabWordFromThisList(
    userId: string,
    vocabWordIds: number[],
  ) {
    return (await wordRepository.findOneByVocabWordIdForUser(
      userId,
      vocabWordIds,
    ))
      ? true
      : false
  }

  async isAllWordsExistent(wordIds: string[]) {
    return await wordRepository.isAllElementsExistent(wordIds)
  }
  async getNextBunchLearnableWords(userId: string, count: number) {
    // получить n слов у котороых nextShowTime < current Time
    const words = await wordRepository.findAllWithPastShowTime(userId, count)

    return Promise.all(
      words.map(async word => ({
        _id: String(word._id),
        nextShowTranslate: word.nextShowTranslate,
        vocabWord: await vocabWordRepository.findOneById(word.vocabWordId),
      })),
    ).then(d => d)
  }
}

export const wordsService = new WordsService()
