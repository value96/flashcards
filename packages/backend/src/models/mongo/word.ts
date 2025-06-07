import { Schema, model as mongooseModel } from 'mongoose'

const wordStatusEnum = {
  learning: 'learning',
  hasLearned: 'hasLearned',
  suspended: 'suspended',
} as const

export type WordStatus = keyof typeof wordStatusEnum

const languageEnum = {
  rus: 'rus',
  eng: 'eng',
} as const

export type Language = keyof typeof languageEnum

export type HistoryPoint = {
  date: Date
  showedTranslate: Language
  isSuccessRepeated: boolean
}

export interface IWord {
  userId: string
  status: WordStatus
  vocabWordId: number

  nextShowTranslate: Language
  learningHistory: HistoryPoint[]
  nextShowTime: Date
  lastShowTimeDelta: number // in hours
  addedDate: Date
}

const historyPointSchema = new Schema({
  date: { type: Date, required: true },
  showedTranslate: {
    type: String,
    enum: Object.values(languageEnum),
    required: true,
  },
  isSuccessRepeated: { type: Boolean, required: true },
})

const wordSchema = new Schema<IWord>(
  {
    userId: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(wordStatusEnum),
      required: true,
    },
    vocabWordId: { type: Number, required: true },
    nextShowTranslate: {
      type: String,
      enum: Object.values(languageEnum),
      required: true,
    },
    learningHistory: [historyPointSchema],
    nextShowTime: { type: Date, required: true },
    lastShowTimeDelta: { type: Number, required: true },
    addedDate: { type: Date, required: true },
  },
  { timestamps: true },
)

wordSchema.index({ userId: 1, status: 1, nextShowTime: 1 })

export const model = mongooseModel<IWord>('Word', wordSchema)
