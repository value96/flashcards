import { Schema, Document, model as mongooseModel } from 'mongoose'

export interface VocabWordData {
  eng: string
  rus: string
}

export interface VocabWord extends VocabWordData {
  id: number
}

interface IVocabWord extends Document, VocabWordData {}

const VocabWordSchema = new Schema<IVocabWord>(
  {
    _id: { type: Number, required: true },
    eng: { type: String, required: true },
    rus: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_, ret) {
        return {
          id: ret._id,
          eng: ret.eng,
          rus: ret.rus,
        }
      },
    },
  },
)

export const model = mongooseModel<IVocabWord>(
  'vocab-word',
  VocabWordSchema,
  'vocab-words',
)
