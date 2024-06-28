import { Op } from "sequelize"
import RefreshSession from "../models/RefreshSession"

export const deleteExpiredSessions = async () => {
  try {
    const result = await RefreshSession.destroy({
      where: {
        expiresAt: {
          [Op.lt]: new Date(),
        },
      },
    })
    console.log(`Deleted ${result} expired sessions`)
  } catch (error) {
    console.error("Error deleting expired sessions:", error)
  }
}
