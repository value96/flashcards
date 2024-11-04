export const languageEnum = {
  rus: 'rus',
  eng: 'eng',
} as const

export type Language = keyof typeof languageEnum

export type Translations = {
  [key in Language]: string
}

export type VocabWord = {
  id: string
  translate: Translations
}
