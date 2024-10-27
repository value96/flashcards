import { RefreshSessionSql } from "../sql"

interface SessionDataInit {
  userId: string
  fingerprint: string
  expiresAt: Date
}
interface SessionData {
  id: string
  userId?: string
  fingerprint?: string
}

class RefreshSession {
  async create(sessionData: SessionDataInit) {
    return await RefreshSessionSql.create(sessionData)
  }
  async findOne(sessionData: SessionData) {
    return await RefreshSessionSql.findOne({
      where: { ...sessionData },
    })
  }
}

export const refreshSession = new RefreshSession()
