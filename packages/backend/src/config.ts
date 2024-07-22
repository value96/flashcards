import dotenv from "dotenv"
import { CookieOptions } from "express"

dotenv.config()

const nodeEnv: "development" | "production" = (process.env.NODE_ENV ||
  "production") as "development" | "production"

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
if (!accessTokenSecret) throw Error(`access Secret is ${accessTokenSecret}`)
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
if (!refreshTokenSecret) throw Error(`refresh Secret is ${refreshTokenSecret}`)

const port: number = parseInt(process.env.PORT, 10)

if (!port) throw Error(`port is ${port}`)

const clientUrl = process.env.CLIENT_URL

if (!clientUrl) throw Error(`clientUrl is ${clientUrl}`)

console.log(`clientUrl: ${clientUrl}`)
console.log(JSON.stringify(process.env, null, 2))

export const config = {
  port,
  clientUrl,
  accessTokenSecret,
  refreshTokenSecret,
  ACCESS_TOKEN_EXPIRATION: 18e5, // 1800*1000 (30 mins)
  REFRESH_TOKEN_EXPIRATION: 1296e6, // 15*24*3600*1000 (15days)
}

export const accessTokenCookieParams = (expires: Date): CookieOptions => ({
  httpOnly: true,
  secure: nodeEnv == "production" ? true : false,
  path: "/",
  sameSite: "strict",
  expires: expires,
})

export const refreshTokenCookieParams = (expires: Date): CookieOptions => ({
  httpOnly: true,
  secure: nodeEnv == "production" ? true : false,
  path: "/auth/refresh-token",
  sameSite: "strict",
  expires: expires,
})
