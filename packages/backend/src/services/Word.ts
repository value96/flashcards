class WordService {
  async changeWordStatus() {
    // принимает слово и состояние на которое нужно изменить, проверяет допустимость изменения и изменяет состояние вызывая соответствующие функции
  }

  async successRepeat() {
    // nextShowTime = nextShowTime + lastShowTimeDelta*2
    // lastShowTimeDelta = lastShowTimeDelta * 2
    // записать в learningHistory
  }

  async failedRepeat() {
    // nextShowTime = nextShowTime + lastShowTimeDelta/2
    // lastShowTimeDelta = lastShowTimeDelta / 2
    // learningHistory
  }
}

export const wordService = new WordService()
