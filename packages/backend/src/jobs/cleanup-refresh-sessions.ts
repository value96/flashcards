import { refreshSessionModel } from '../models'

export const deleteExpiredSessions = async () => {
  try {
    const deletedCount =
      await refreshSessionModel.refreshSessionRepository.removeExpired(
        new Date(),
      )
    console.log(`Deleted ${deletedCount} expired sessions`)
  } catch (error) {
    console.error('Error deleting expired sessions:', error)
  }
}
