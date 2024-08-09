declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string
    NODE_ENV: "development" | "production"
    CLIENT_URL: string
    ACCESS_TOKEN_SECRET: string
    REFRESH_TOKEN_SECRET: string
    POSTGRES_DB_NAME: string
    POSTGRES_USER: string
    POSTGRES_PASS: string
    POSTGRES_URL: string
    MONGO_URL: string
  }
}
