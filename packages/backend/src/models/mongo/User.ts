import mongoose, { Schema, Document } from "mongoose"

interface IUser extends Document {
  id: string
  email: string
  username: string
}

const UserSchema = new Schema<IUser>({
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
})

const User = mongoose.model<IUser>("User", UserSchema)
export default User
