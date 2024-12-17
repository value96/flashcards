import express from 'express'
import cors from 'cors'

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

app.use(cookieParser())
app.use(express.json())

app.use(cors({ credentials: true, origin: config.clientUrl }))
app.use(
  Fingerprint({
    parameters: [useragent, acceptHeaders, geoip],
  }),
)

app.use('/auth', authRouter)
app.use('/words', wordsRouter)

export default app
