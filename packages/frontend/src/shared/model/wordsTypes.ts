const languageEnum = {
  rus: 'rus',
  eng: 'eng',
} as const

export type Language = keyof typeof languageEnum
//export type LanguageValue = (typeof languageEnum)[Language]

const wordStatusEnum = {
  learning: 'learning',
  hasLearned: 'hasLearned',
  suspended: 'suspended',
} as const

export type WordStatus = keyof typeof wordStatusEnum

export type HistoryPoint = {
  date: Date
  showedTranslate: Language
  isSuccessRepeated: boolean
}

export type Word = {
  _id: string
  userId: string
  status: WordStatus
  vocabWordId: number

  nextShowTranslate: Language
  learningHistory: HistoryPoint[]
  nextShowTime: Date
  lastShowTimeDelta: number // in hours
  addedDate: Date
}
