import { InferCreationAttributes } from "sequelize"
import User from "../sql/User"
import { v4 as uuidv4 } from "uuid"
import UserMongo from "../mongo/User"
import createHttpError from "http-errors"

interface UserCreationInterface {
  email: string
  username: string
  passwordHash: string
}

export class UserRepository {
  async create(userData: UserCreationInterface): Promise<User> {
    const userId = uuidv4()
    const userSql = await User.create({
      id: userId,
      ...userData,
    } as InferCreationAttributes<User>)

    try {
      const userMongo = new UserMongo({
        id: userId,
        email: userData.email,
        username: userData.username,
      })

      await userMongo.save()
    } catch (error) {
      await userSql.destroy()
      throw error
    }
    return userSql
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } })
  }
}

const userRepository = new UserRepository()

export default userRepository
