import dotenv from 'dotenv'
import { CookieOptions } from 'express'

dotenv.config()

const nodeEnv: 'development' | 'production' = (process.env.NODE_ENV ||
  'production') as 'development' | 'production'

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
if (!accessTokenSecret) throw Error(`access Secret not found`)
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
if (!refreshTokenSecret) throw Error(`refresh Secret not found`)

const portStr = process.env.PORT
if (!portStr) {
  throw Error(`port is ${portStr}`)
}
const port: number = parseInt(portStr, 10)

const clientUrl = process.env.CLIENT_URL

if (!clientUrl) throw Error(`clientUrl is ${clientUrl}`)

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
