import { vocabWordModel, wordModel, vocabWordAudioModel } from '../models'

const { vocabWordRepository } = vocabWordModel
const { wordRepository } = wordModel
const { vocabWordAudioRepository } = vocabWordAudioModel
type IWord = wordModel.IWord
type VocabWord = vocabWordModel.VocabWord

type WordInfo = {
  _id: string
  status: wordModel.WordStatus
}

type AllWords = VocabWord & {
  word: WordInfo | null
}

class WordsService {
  async getAllWords(userId: string): Promise<AllWords[]> {
    const [vocabWords, userWords] = await Promise.all([
      vocabWordRepository.findAll(),
      wordRepository.getAllUserWords(userId),
    ])

    const userWordsMap = new Map<string, WordInfo>()
    if (userWords) {
      userWords.forEach(word => {
        userWordsMap.set(word.vocabWordId.toString(), {
          _id: String(word._id),
          status: word.status,
        })
      })
    }

    const resultWords: AllWords[] = []

    for (const key of Object.keys(vocabWords)) {
      const userWord = userWordsMap.get(key)
      if (userWord) {
        resultWords.push({
          ...vocabWords[key],
          word: { _id: String(userWord._id), status: userWord.status },
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
    const newWords: IWord[] = vocabWordsIds.map(vocabWordId => ({
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
    // получить n слов со статусом 'learning' у котороых nextShowTime < current Time
    const words = await wordRepository.findSomeWithPastShowTime(
      userId,
      'learning',
      count,
    )

    return Promise.all(
      words.map(async word => ({
        _id: String(word._id),
        nextShowTranslate: word.nextShowTranslate,
        vocabWord: await vocabWordRepository.findOneById(word.vocabWordId),
      })),
    ).then(d => d)
  }

  async getTrainingWordsForPeriod(
    userId: string,
    from: Date | null,
    to: Date | null,
  ) {
    const conditions: wordModel.Condition[] = []

    conditions.push(['userId', userId, 'eq'])
    if (from) conditions.push(['nextShowTime', from, 'gt'])
    if (to) conditions.push(['nextShowTime', to, 'lt'])

    return await wordRepository.findWordsWithCondition(conditions)
  }
}

export const wordsService = new WordsService()
