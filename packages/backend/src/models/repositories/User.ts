import { InferCreationAttributes } from "sequelize"
import { UserSql } from "../sql"
import { v4 as uuidv4 } from "uuid"
import { UserMongo } from "../mongo"

interface UserData {
  email: string
  username: string
  passwordHash: string
}

class UserRepository {
  async create(userData: UserData): Promise<UserSql> {
    const userId = uuidv4()
    const userSql = await UserSql.create({
      id: userId,
      ...userData,
    } as InferCreationAttributes<UserSql>)

    try {
      const userMongo = new UserMongo({
        id: userId,
        ...userData,
      })

      await userMongo.save()
    } catch (error) {
      await userSql.destroy()
      throw error
    }
    return userSql
  }

  async findOneByEmail(email: string): Promise<UserSql | null> {
    return await UserSql.findOne({ where: { email } })
  }
  async findAll() {
    return await UserSql.findAll()
  }
}

export const userRepository = new UserRepository()
