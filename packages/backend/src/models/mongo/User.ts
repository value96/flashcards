import { Schema, Document, model } from "mongoose"

interface IUser extends Document {
  id: string
  email: string
  username: string
  passwordHash: string
}

const UserSchema = new Schema<IUser>(
  {
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true },
)

UserSchema.index({ id: 1 }, { unique: true })
UserSchema.index({ email: 1 }, { unique: true })

export default model<IUser>("User", UserSchema)
