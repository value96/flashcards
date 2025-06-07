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

export type VocabWordData = {
  id: number
  eng: string
  rus: string
}

export type Word = {
  _id: string
  status: WordStatus
  // trimmed fields for words settings
}
