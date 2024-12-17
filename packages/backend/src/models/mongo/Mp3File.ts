import { Schema, Document, model as mongooseModel } from 'mongoose'

export interface IMp3FIle extends Document {
  filename: string
  data: Buffer
}

const Mp3FileSchema: Schema = new Schema(
  {
    _id: { type: Number, required: true },
    filename: { type: String, required: true },
    data: { type: Buffer, required: true },
  },
  {
    collection: 'audio',
  },
)

export type Mp3FileType = Omit<IMp3FIle, keyof Document>

export const model = mongooseModel<IMp3FIle>('audio', Mp3FileSchema)
