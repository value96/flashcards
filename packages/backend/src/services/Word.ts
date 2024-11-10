import { vocabWordModel, wordModel } from '../models'

const { wordRepository } = wordModel

class WordService {
  async removeWord(wordId: string) {
    await wordRepository.removeWord(wordId)
  }

  async getWord(wordId: string) {
    return await wordRepository.findOneById(wordId)
  }

  async successRepeat() {
    // nextShowTime = nextShowTime + lastShowTimeDelta*2
    // lastShowTimeDelta = lastShowTimeDelta * 2
    // записать в learningHistory
    // поменять nextShowTranslate
  }

  async failedRepeat() {
    // nextShowTime = nextShowTime + lastShowTimeDelta/2
    // lastShowTimeDelta = lastShowTimeDelta / 2
    // learningHistory
    // поменять nextShowTranslate
  }
}

export const wordService = new WordService()
