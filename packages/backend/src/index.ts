import express, { NextFunction } from "express"
import cors from "cors"
/* import sequelize, { runDB } from "./database"
import userRoutes from "./routes/UserRoutes"
import wordRoutes from "./routes/WordRoutes"
import authRoutes from "./routes/AuthRoutes" */
import Fingerprint from "express-fingerprint"
import cookieParser from "cookie-parser"
import {
  useragent,
  acceptHeaders,
  geoip,
} from "express-fingerprint/lib/parameters"
import { config } from "./config"
//import JobsSheduler from "./jobs"

const app = express()

app.use(cookieParser())
app.use(express.json())
//app.use(cors())

app.use(cors({ credentials: true, origin: config.clientUrl }))
app.use(
  Fingerprint({
    parameters: [useragent, acceptHeaders, geoip],
  }),
)
//  // // // // // // // .. .. ..
app.get("/", (req, res) => {
  res.send("hello")
})

/* 
app.use("/auth", authRoutes)
app.use("/words", wordRoutes)
app.use("/users", userRoutes) */

const startServer = async () => {
  //await runDB()
  //JobsSheduler.start() //
  app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`)
  })
}

startServer()

/* const addAllWordsToDB = async (words: Word[]) => {
  const unsavedWords: Translations[] = []
  for (const word of words) {
    try {
      await addVocabWord(word.vocabWord.translate)
    } catch (err) {
      unsavedWords.push(word.vocabWord.translate)
    }
  }
  return unsavedWords
} */
