import { Sequelize } from "sequelize"
import { mainDir } from "./utils/mainDir"
import path from "path"
import { config } from "./config"

/* const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(mainDir, "..", "data", "flashcards.db"),
}) */

const sequelize = new Sequelize(
  config.POSTGRES_DB_NAME,
  config.POSTGRES_USER,
  config.POSTGRES_PASS,
  {
    host: config.POSTGRES_URL,
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
  },
)

export const runDB = async () => {
  try {
    await sequelize.authenticate()
    console.log("Connection has been established successfully.")
    await sequelize.sync()
    console.log("Database synced")
  } catch (error) {
    console.error("Failed to initialize database:", error)
    process.exit(1)
  }
}

export default sequelize
