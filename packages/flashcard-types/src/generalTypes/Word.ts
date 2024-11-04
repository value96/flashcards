import { type Language, VocabWord } from './VocabWord'

export type HistoryPoint = {
  date: string
  showedTranslate: Language
  isSuccessRepeated: boolean
}

export const wordStatusEnum = {
  learning: 'learning',
  hasLearned: 'hasLearned',
  suspended: 'suspended',
}

export type WordStatus = keyof typeof wordStatusEnum

export type Word = {
  id: string
  status: WordStatus
  vocabWord: VocabWord

  learningHistory: HistoryPoint[]
  /** date of future showing word */
  nextShowTime: string
  /** time interval in hours between last time of word showing and next time of word showing */
  lastShowTimeDelta: number
  addedDate: string
}
