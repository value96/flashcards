import { deleteExpiredSessions } from './cleanup-refresh-sessions'
import cron from 'node-cron'

class JobsSheduler {
  static start() {
    cron.schedule('0 3 * * *', async () => {
      console.log('Running cleanup job...')
      await deleteExpiredSessions()
    })
  }
}

export default JobsSheduler
