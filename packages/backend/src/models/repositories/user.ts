import { UserMongo } from '../mongo'

class UserRepository {
  async create(userData: UserMongo.UserData) {
    const userMongo = await UserMongo.model.create(userData)
    const user = userMongo.toJSON() as unknown as UserMongo.User
    /* console.log(JSON.stringify(user, null, 2)) */
    return user
  }

  async findOneByEmail(email: string): Promise<UserMongo.User | null> {
    const userMongo = await UserMongo.model.findOne({
      email: email,
    })
    const user = userMongo?.toJSON() as UserMongo.User | undefined
    /* console.log(JSON.stringify(user, null, 2)) */
    return user ?? null
  }
}

export const userRepository = new UserRepository()
