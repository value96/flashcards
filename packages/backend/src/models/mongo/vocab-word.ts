import { Schema, model as mongooseModel } from 'mongoose'

export interface VocabWordData {
  eng: string
  rus: string
}

export interface VocabWord extends VocabWordData {
  id: number
}

interface IVocabWord extends VocabWordData {
  _id: number
}

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
