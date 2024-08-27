import { Schema, Document, model } from "mongoose"

export enum WordStatus {
  study = "study",
  learned = "learned",
  suspend = "suspend",
}

export type SuccessRating = "-3" | "-2" | "-1" | "0" | "1"

export interface IWord extends Document {
  userId: string
  vocabWordId: number
  status: WordStatus
  successRating: SuccessRating
  addedDate: Date
  repeatHistory: Array<{ repeatDate: Date; isSuccess: boolean }>
  nextRepeat: Date
}

const repeatHistorySchema = new Schema({
  repeatDate: { type: Date, required: true },
  isSuccess: { type: Boolean, required: true },
})

const wordSchema = new Schema<IWord>(
  {
    userId: { type: String, required: true },
    vocabWordId: { type: Number, required: true },
    status: { type: String, enum: Object.values(WordStatus), required: true },
    successRating: {
      type: String,
      enum: ["-3", "-2", "-1", "0", "1"],
      required: true,
    },
    addedDate: { type: Date, required: true },
    repeatHistory: [repeatHistorySchema],
    nextRepeat: { type: Date, required: true },
  },
  { timestamps: true },
)

wordSchema.index({ userId: 1 })
wordSchema.index({ userId: 1, nextRepeat: 1 })

export default model<IWord>("Word", wordSchema)
