import User from "../models/User"

interface UserView {
  id: number
  email: string
  username: string
}

export const formatUser = (user: User): UserView => {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
  }
}

export const formatUsers = (users: User[]): UserView[] => {
  return users.map(formatUser)
}
