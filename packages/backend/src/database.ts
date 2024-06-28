import { Sequelize } from "sequelize"
import { mainDir } from "./utils/mainDir"
import path from "path"

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(mainDir, "..", "data", "flashcards.db"),
})

export default sequelize
