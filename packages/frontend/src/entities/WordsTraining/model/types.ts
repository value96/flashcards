import { Language, VocabWordData } from '@shared/model'

export type WordsTraining = {
  _id: string
  nextShowTranslate: Language
  vocabWord: VocabWordData
}

export type WordAudio = {
  audio: Blob
  vocabWordId: number
}
