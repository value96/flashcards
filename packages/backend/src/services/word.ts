import { wordModel } from '../models'

const { wordRepository } = wordModel

function isMustBeHasLearned(
  learningHistory: wordModel.HistoryPoint[],
  intervalInDays: number,
) {
  if (learningHistory.length < 2) return false

  // проверяем есть ли среди двух рядом стоящих успешных HistoryPoint такая пара,
  // у которых интервал повторения больше чем заданный intervalInDays

  const intervalInMs = intervalInDays * 24 * 60 * 60 * 1000

  for (let i = 0; i < learningHistory.length - 1; i++) {
    if (
      learningHistory[i].isSuccessRepeated &&
      learningHistory[i + 1].isSuccessRepeated &&
      Math.abs(
        learningHistory[i].date.getTime() -
          learningHistory[i + 1].date.getTime(),
      ) > intervalInMs
    )
      return true
  }

  return false
}

class WordService {
  async removeWord(userId: string, wordId: string) {
    await wordRepository.removeWord(userId, wordId)
  }

  async getWord(wordId: string) {
    return await wordRepository.findOneById(wordId)
  }

  async successRepeat(userId: string, wordId: string) {
    const word = await wordRepository.findOneById(wordId)
    if (word && word.userId !== userId) throw Error('word does not belong to user')
    if (word) {
      // todo

      const newHistoryPoint: wordModel.HistoryPoint = {
        date: new Date(),
        showedTranslate: word.nextShowTranslate,
        isSuccessRepeated: true,
      }

      const updatedFields = {
        nextShowTime: new Date(
          Date.now() + 2 * word.lastShowTimeDelta * 60 * 60 * 1000,
        ),
        lastShowTimeDelta: word.lastShowTimeDelta * 2,
        learningHistory: [...word.learningHistory, newHistoryPoint],
        status:
          word.status === 'learning' &&
          isMustBeHasLearned([...word.learningHistory, newHistoryPoint], 80)
            ? 'hasLearned'
            : word.status,
        nextShowTranslate:
          word.nextShowTranslate === 'eng'
            ? ('rus' as const)
            : ('eng' as const),
      }
      await wordRepository.updateWord(userId, wordId, updatedFields)
    }
  }

  //cumulative
  // 0, 8h,  1d, 2d 8h,    5d, 10d 8h,    21 d, 42d 8h,     85d, 170d 8h,
  // 0, 8h, 16h, 1d 8h, 2d 16h, 5d 8h, 10d 16h, 21d 8h, 42d 16h, 85d 8h,   10 repeats пока выбран такой вариант

  // 0, 8h, 1d, 2d, 4d, 7d, 14d, 1month, 2 month, 4 month  10 repeats

  async failedRepeat(userId: string, wordId: string) {
    const word = await wordRepository.findOneById(wordId)
    if (word && word.userId !== userId) throw Error('word does not belong to user')

    if (word) {
      const newTimeDelta =
        word.lastShowTimeDelta / 2 <= 8
          ? 8
          : Math.round(word.lastShowTimeDelta / 2)

      const updatedFields = {
        nextShowTime: new Date(Date.now() + newTimeDelta * 60 * 60 * 1000),
        lastShowTimeDelta: newTimeDelta,
        learningHistory: [
          ...word.learningHistory,
          {
            date: new Date(),
            showedTranslate: word.nextShowTranslate,
            isSuccessRepeated: false,
          },
        ],
      }
      await wordRepository.updateWord(userId, wordId, updatedFields)
    }
    // nextShowTime = nextShowTime + lastShowTimeDelta/2
    // lastShowTimeDelta = lastShowTimeDelta / 2
    // learningHistory
    // поменять nextShowTranslate
  }
}

export const wordService = new WordService()
