import { vocabWordModel, wordModel, vocabWordAudioModel } from '../models'
import {
  newWordInitialIntervalInHours,
  successRepeatMultiplier,
} from './word-schedule'

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

const forecastHorizonInDays = 14
const comfortableDailyReviewLimit = 60
const aggressiveDailyReviewLimit = 100

function startOfDay(date: Date) {
  const result = new Date(date)
  result.setHours(0, 0, 0, 0)
  return result
}

function addDays(date: Date, days: number) {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

function getDayIndex(date: Date, firstDay: Date) {
  return Math.floor(
    (startOfDay(date).getTime() - firstDay.getTime()) / (24 * 60 * 60 * 1000),
  )
}

function getExpectedNewWordReviewsByDay(
  now: Date,
  horizonInDays: number,
): number[] {
  const firstDay = startOfDay(now)
  const reviewsByDay = Array(horizonInDays).fill(0) as number[]
  let nextReviewTime = now
  let intervalInHours = newWordInitialIntervalInHours

  while (nextReviewTime < addDays(firstDay, horizonInDays)) {
    const dayIndex = getDayIndex(nextReviewTime, firstDay)
    if (dayIndex >= 0 && dayIndex < horizonInDays) reviewsByDay[dayIndex] += 1

    intervalInHours *= successRepeatMultiplier
    nextReviewTime = new Date(
      nextReviewTime.getTime() + intervalInHours * 60 * 60 * 1000,
    )
  }

  return reviewsByDay
}

function calculateAllowedNewWords(
  existingReviewsByDay: number[],
  newWordReviewsByDay: number[],
  dailyLimit: number,
) {
  return newWordReviewsByDay.reduce((allowed, newWordReviews, dayIndex) => {
    if (newWordReviews === 0) return allowed

    const capacity = dailyLimit - existingReviewsByDay[dayIndex]
    return Math.min(allowed, Math.max(0, Math.floor(capacity / newWordReviews)))
  }, Number.POSITIVE_INFINITY)
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
      lastShowTimeDelta: newWordInitialIntervalInHours,
      addedDate: new Date(),
    }))

    await wordRepository.addNewWords(newWords)
  }

  async removeWords(userId: string, wordIds: string[]) {
    const words = await wordRepository.findManyByIds(userId, wordIds)
    if (words.length !== wordIds.length)
      throw Error('not all words belong to the user')

    const vocabWordIds = words.map(word => word.vocabWordId)
    await wordRepository.removeWords(userId, wordIds)
    return vocabWordIds
  }

  async updateWordsStatus(
    userId: string,
    wordIds: string[],
    status: wordModel.WordStatus,
  ) {
    return await wordRepository.updateFieldForMany(
      userId,
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

  async isUserOwnerOfWords(userId: string, wordIds: string[]) {
    const words = await wordRepository.findManyByIds(userId, wordIds)
    return words.length === wordIds.length
  }

  async getWordsStatusIfOwner(
    userId: string,
    wordIds: string[],
  ): Promise<wordModel.WordStatus> {
    const words = await wordRepository.findManyByIds(userId, wordIds)
    if (words.length !== wordIds.length)
      throw Error('not all words belong to the user')
    const status = words[0].status
    if (!words.every(w => w.status === status))
      throw Error('all words must have the same status')
    return status
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
    conditions.push(['status', 'learning', 'eq'])
    if (from) conditions.push(['nextShowTime', from, 'gt'])
    if (to) conditions.push(['nextShowTime', to, 'lt'])

    return await wordRepository.countWordsWithCondition(conditions)
  }

  async getNewWordsForecast(userId: string) {
    const now = new Date()
    const firstDay = startOfDay(now)
    const existingReviewsByDay = await Promise.all(
      Array.from({ length: forecastHorizonInDays }, (_, index) =>
        this.getTrainingWordsForPeriod(
          userId,
          addDays(firstDay, index),
          addDays(firstDay, index + 1),
        ),
      ),
    )

    const newWordReviewsByDay = getExpectedNewWordReviewsByDay(
      now,
      forecastHorizonInDays,
    )

    return {
      horizonInDays: forecastHorizonInDays,
      dailyLimits: {
        comfortable: comfortableDailyReviewLimit,
        aggressive: aggressiveDailyReviewLimit,
      },
      suggestedNewWords: {
        comfortable: calculateAllowedNewWords(
          existingReviewsByDay,
          newWordReviewsByDay,
          comfortableDailyReviewLimit,
        ),
        aggressive: calculateAllowedNewWords(
          existingReviewsByDay,
          newWordReviewsByDay,
          aggressiveDailyReviewLimit,
        ),
      },
      existingReviewsByDay,
      expectedReviewsPerNewWordByDay: newWordReviewsByDay,
    }
  }
}

export const wordsService = new WordsService()
