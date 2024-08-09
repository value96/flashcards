import { config } from "./config"
import mongoose from "mongoose"

export const runNoSqlDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URL)
    console.log("Mongo DB connected")
  } catch (error) {
    console.error("Failed to connect Mongo DB:", error)
    process.exit(1)
  }
}
