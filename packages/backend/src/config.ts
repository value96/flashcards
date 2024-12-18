import dotenv from 'dotenv'
import { CookieOptions } from 'express'

dotenv.config()

const nodeEnv: 'development' | 'production' = (process.env.NODE_ENV ||
  'production') as 'development' | 'production'

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
if (!accessTokenSecret) throw Error(`access Secret not found`)
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
if (!refreshTokenSecret) throw Error(`refresh Secret not found`)

const port: number = parseInt(process.env.PORT, 10)

if (!port) throw Error(`port is ${port}`)

const clientUrl = process.env.CLIENT_URL

if (!clientUrl) throw Error(`clientUrl is ${clientUrl}`)

/* const POSTGRES_DB_NAME = process.env.POSTGRES_DB_NAME
if (!POSTGRES_DB_NAME) throw Error(`POSTGRES_DB_NAME is ${POSTGRES_DB_NAME}`)

const POSTGRES_USER = process.env.POSTGRES_USER
if (!POSTGRES_USER) throw Error(`POSTGRES_USER is ${POSTGRES_USER}`)

const POSTGRES_PASS = process.env.POSTGRES_PASS
if (!POSTGRES_PASS) throw Error(`POSTGRES_PASS not found`)

const POSTGRES_URL = process.env.POSTGRES_URL
if (!POSTGRES_URL) throw Error(`POSTGRES_URL is ${POSTGRES_URL}`)
 */
const MONGO_URL = process.env.MONGO_URL
if (!MONGO_URL) throw Error(`MONGO_URL not found`)

/* const MONGO_TEST_URL = process.env.MONGO_TEST_URL
if (!MONGO_TEST_URL) throw Error(`MONGO_TEST_URL not found`) */

console.log(`nodeEnv: ${nodeEnv}`)

export const config = {
  port,
  nodeEnv: nodeEnv,
  clientUrl,
  accessTokenSecret,
  refreshTokenSecret,
  ACCESS_TOKEN_EXPIRATION: 18e5, // 1800*1000 (30 mins)
  REFRESH_TOKEN_EXPIRATION: 1296e6, // 15*24*3600*1000 (15days)
  /*   POSTGRES_DB_NAME: POSTGRES_DB_NAME,
  POSTGRES_USER: POSTGRES_USER,
  POSTGRES_PASS: POSTGRES_PASS,
  POSTGRES_URL: POSTGRES_URL, */
  MONGO_URL: MONGO_URL,
}

export const accessTokenCookieParams = (expires: Date): CookieOptions => ({
  httpOnly: true,
  secure: nodeEnv == 'production' ? true : false,
  path: '/',
  sameSite: nodeEnv == 'production' ? 'none' : 'strict',
  expires: expires,
})

export const refreshTokenCookieParams = (expires: Date): CookieOptions => ({
  httpOnly: true,
  secure: nodeEnv == 'production' ? true : false,
  path: '/auth/refresh-token',
  sameSite: nodeEnv == 'production' ? 'none' : 'strict',
  expires: expires,
})
