import { Language, VocabWordData } from '@shared/model'

export type WordsTraining = {
  _id: string
  nextShowTranslate: Language
  vocabWord: VocabWordData | null
}
