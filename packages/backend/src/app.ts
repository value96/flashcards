import express from "express"
import cors from "cors"
import userRoutes from "./routes/UserRoutes"
import wordRoutes from "./routes/WordRoutes"
import authRoutes from "./routes/AuthRoutes"
import Fingerprint from "express-fingerprint"
import cookieParser from "cookie-parser"
import {
  useragent,
  acceptHeaders,
  geoip,
} from "express-fingerprint/lib/parameters"
import { config } from "./config"

const app = express()

app.use(cookieParser())
app.use(express.json())

app.use(cors({ credentials: true, origin: config.clientUrl }))
app.use(
  Fingerprint({
    parameters: [useragent, acceptHeaders, geoip],
  }),
)

app.use("/auth", authRoutes)
app.use("/words", wordRoutes)
app.use("/users", userRoutes)

export default app
