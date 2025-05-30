import { Schema, Document, model as mongooseModel } from 'mongoose'

export interface RefreshSessionData {
  userId: string
  expiresAt: Date
  fingerprint: string
}

export interface RefreshSession extends RefreshSessionData {
  id: string
}
interface IRefreshSession extends Document, RefreshSessionData {}

const RefreshSessionSchema = new Schema<IRefreshSession>(
  {
    userId: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    fingerprint: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_, ret) {
        return {
          id: ret._id.toString(),
          userId: ret.userId,
          expiresAt: ret.expiresAt,
          fingerprint: ret.fingerprint,
        }
      },
    },
  },
)

export const model = mongooseModel<IRefreshSession>(
  'RefreshSession',
  RefreshSessionSchema,
)
