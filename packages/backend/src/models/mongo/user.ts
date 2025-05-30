import { Schema, Document, model as mongooseModel } from 'mongoose'

export interface UserData {
  email: string
  username: string
  passwordHash: string
}

export interface User extends UserData {
  id: string
}
interface IUser extends Document, UserData {}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_, ret) {
        return {
          id: ret._id.toString(),
          email: ret.email,
          username: ret.username,
          passwordHash: ret.passwordHash,
        }
      },
    },
  },
)

export const model = mongooseModel<IUser>('User', UserSchema)
