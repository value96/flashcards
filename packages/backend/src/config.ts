import dotenv from "dotenv"
import { CookieOptions } from "express"

dotenv.config()

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
if (!accessTokenSecret) throw Error(`access Secret is ${accessTokenSecret}`)
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
if (!refreshTokenSecret) throw Error(`refresh Secret is ${refreshTokenSecret}`)

const port = process.env.PORT
if (!port) throw Error(`port is ${port}`)

const clientUrl = process.env.CLIENT_URL
if (!clientUrl) throw Error(`clientUrl is ${clientUrl}`)

export const config = {
  port,
  clientUrl,
  accessTokenSecret,
  refreshTokenSecret,
  COOKIE_SETTINGS: {
    REFRESH_TOKEN: {
      httpOnly: true,
      maxAge: 1296e6, // 15*24*3600*1000 (15days)
    },
  },
  ACCESS_TOKEN_EXPIRATION: 18e5, // 1800*1000 (30 mins)
  REFRESH_TOKEN_EXPIRATION: 1296e6, // 15*24*3600*1000 (15days)
}

export const refreshTokenCookieParams = (expires: Date): CookieOptions => ({
  httpOnly: true,
  //secure: true,
  sameSite: "strict",
  expires: expires,
})
