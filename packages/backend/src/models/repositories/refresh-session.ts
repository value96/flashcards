import { RefreshSessionMongo } from '../mongo'

type RefreshSessionData = RefreshSessionMongo.RefreshSessionData
type RefreshSession = RefreshSessionMongo.RefreshSession

class RefreshSessionRepository {
  async create(sessionData: RefreshSessionData): Promise<RefreshSession> {
    const refreshSessionMongo =
      await RefreshSessionMongo.model.create(sessionData)
    const refreshSession =
      refreshSessionMongo.toJSON() as unknown as RefreshSession

    return refreshSession
  }
  async findOne(sessionData: {
    id: string
    userId?: string
    fingerprint?: string
  }): Promise<RefreshSession | null> {
    const queryParams: Record<string, any> = {
      _id: sessionData.id,
    }
    if (sessionData.userId) {
      queryParams.userId = sessionData.userId
    }

    if (sessionData.fingerprint) {
      queryParams.fingerprint = sessionData.fingerprint
    }

    const refreshSessionMongo =
      await RefreshSessionMongo.model.findOne(queryParams)
    if (refreshSessionMongo) {
      const refreshSession =
        refreshSessionMongo.toJSON() as unknown as RefreshSession
      return refreshSession
    } else return null
  }
  async removeOne(id: string) {
    await RefreshSessionMongo.model.deleteOne({ _id: id })
  }
  async removeExpired(date: Date) {
    const result = await RefreshSessionMongo.model.deleteMany({
      expiresAt: { $lt: date },
    })
    return result.deletedCount
  }
}

export const refreshSessionRepository = new RefreshSessionRepository()
