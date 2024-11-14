import { vocabWordModel, wordModel } from '../models'

const { wordRepository } = wordModel

class WordService {
  async removeWord(wordId: string) {
    await wordRepository.removeWord(wordId)
  }

  async getWord(wordId: string) {
    return await wordRepository.findOneById(wordId)
  }

  async successRepeat(wordId: string) {
    const word = await wordRepository.findOneById(wordId)
    if (word) {
      // todo
      // сделать проверку на то, можно ли считать слово hasLearned и менять его статус
      const updatedFields = {
        nextShowTime: new Date(
          word.nextShowTime.getTime() +
            2 * word.lastShowTimeDelta * 60 * 60 * 1000,
        ),
        lastShowTimeDelta: word.lastShowTimeDelta * 2,
        learningHistory: [
          ...word.learningHistory,
          {
            date: new Date(),
            showedTranslate: word.nextShowTranslate,
            isSuccessRepeated: true,
          },
        ],
        nextShowTranslate:
          word.nextShowTranslate === 'eng'
            ? ('rus' as const)
            : ('eng' as const),
      }
      await wordRepository.updateWord(wordId, updatedFields)
    }
  }

  async failedRepeat(wordId: string) {
    const word = await wordRepository.findOneById(wordId)

    if (word) {
      // todo
      // сделать проверку на то, можно ли считать слово hasLearned и менять его статус

      const newTimeDelta =
        word.lastShowTimeDelta / 2 <= 4
          ? 4
          : Math.round(word.lastShowTimeDelta / 2)

      const updatedFields = {
        nextShowTime: new Date(
          word.nextShowTime.getTime() + newTimeDelta * 60 * 60 * 1000,
        ),
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
      await wordRepository.updateWord(wordId, updatedFields)
    }
    // nextShowTime = nextShowTime + lastShowTimeDelta/2
    // lastShowTimeDelta = lastShowTimeDelta / 2
    // learningHistory
    // поменять nextShowTranslate
  }
}

export const wordService = new WordService()
