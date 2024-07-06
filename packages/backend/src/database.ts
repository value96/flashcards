import { Sequelize } from "sequelize"
import { mainDir } from "./utils/mainDir"
import path from "path"

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(mainDir, "..", "data", "flashcards.db"),
})

export const runDB = async () => {
  try {
    await sequelize.sync()
    console.log("Database synced")
  } catch (error) {
    console.error("Failed to initialize database:", error)
    process.exit(1)
  }
}

export default sequelize
