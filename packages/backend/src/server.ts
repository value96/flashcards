import { connectToNoSqlDB } from './mongo-db'
import { config } from './config'
import JobsSheduler from './jobs'
import app from './app'

const startServer = async () => {
  await connectToNoSqlDB(config.MONGO_URL)
  JobsSheduler.start()
  app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`)
  })
}

export default startServer
