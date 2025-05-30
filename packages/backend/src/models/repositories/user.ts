import { UserMongo } from '../mongo'

class UserRepository {
  async create(userData: UserMongo.UserData) {
    const userMongo = await UserMongo.model.create(userData)
    const user = userMongo.toJSON() as UserMongo.User
    /* console.log(JSON.stringify(user, null, 2)) */
    return user
  }

  async findOneByEmail(email: string): Promise<UserMongo.User | null> {
    const user = (await UserMongo.model.findOne({
      email: email,
    })) as UserMongo.User
    /* console.log(JSON.stringify(user, null, 2)) */
    return user
  }
}

export const userRepository = new UserRepository()
