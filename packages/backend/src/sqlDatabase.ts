import { Dialect, Sequelize } from 'sequelize'
import { config } from './config'

type dbConnectionParamsType = {
  host: string
  port: number
  dialect: Dialect
  dialectOptions?: any
}

const dbConnectionParams: dbConnectionParamsType = {
  host: config.POSTGRES_URL,
  port: 5432,
  dialect: 'postgres',
}
if (config.nodeEnv === 'production') {
  dbConnectionParams.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  }
}

const sequelize = new Sequelize(
  config.POSTGRES_DB_NAME,
  config.POSTGRES_USER,
  config.POSTGRES_PASS,
  dbConnectionParams,
)

export const connectToSqlDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection to SQL DB has been established successfully.')
    await sequelize.sync()
    console.log('SQL Database synced')
  } catch (error) {
    console.error('Failed to initialize SQL database:', error)
    process.exit(1)
  }
}

export default sequelize
