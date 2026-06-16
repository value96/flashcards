import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import Fingerprint from 'express-fingerprint'
import cookieParser from 'cookie-parser'
import {
  useragent,
  acceptHeaders,
  geoip,
} from 'express-fingerprint/lib/parameters'
import { config } from './config'
import { authRouter, wordsRouter } from './routers'

const app = express()

app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
)
app.use(cors({ credentials: true, origin: config.clientUrl }))
app.use(cookieParser())
app.use(express.json({ limit: '100kb' }))
app.use(
  Fingerprint({
    parameters: [useragent, acceptHeaders, geoip],
  }),
)

app.get('/ping', (_req, res) => {
  res.status(200).json({ ok: true })
})

app.use('/auth', authRouter)
app.use('/words', wordsRouter)

export default app
