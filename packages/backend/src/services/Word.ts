import { vocabWordModel, wordModel } from 'models'

const { vocabWordRepository } = vocabWordModel
const { wordRepository } = wordModel

class WordService {
  async addNewWord(userId: string, vocabWordId: string) {
    const vocabWord = await vocabWordRepository.findOneById(
      parseInt(vocabWordId),
    )
    if (vocabWord) {
      const newWord: wordModel.WordType = {
        userId,
        status: 'learning',
        vocabWordId: parseInt(vocabWordId),
        nextShowTranslate: 'eng',
        learningHistory: [],
        nextShowTime: new Date(),
        lastShowTimeDelta: 8,
        addedDate: new Date(),
      }
      await wordRepository.addNewWord(newWord)
    }
  }

  async removeWord(wordId: string) {
    await wordRepository.removeWord(wordId)
  }

  async setWordStatus(wordId: string, status: wordModel.WordStatus) {}

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
