import { Language, Word } from '@shared/model'

export type VocabWord = {
  id: number
  word: Word
} & {
  [key in Language]: string
}
