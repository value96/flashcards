import { UserSql } from "../models"

interface UserOutput {
  id: string
  email: string
  username: string
}

class User {
  formatUser = (user: UserSql): UserOutput => {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
    }
  }
  formatUsers = (users: UserSql[]): UserOutput[] => {
    return users.map(this.formatUser)
  }
}

export default new User()
