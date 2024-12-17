import { connectToSqlDB } from './sqlDatabase'
import { connectToNoSqlDB } from './mongoDatabase'
import { config } from './config'
import JobsSheduler from './jobs'
import app from './app'

const startServer = async () => {
  await connectToSqlDB()
  await connectToNoSqlDB(config.MONGO_URL)
  JobsSheduler.start()
  app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`)
  })
}

export default startServer

/* const addAllWordsToDB = async (words: Word[]) => {
  const unsavedWords: Translations[] = []
  for (const word of words) {
    try {
      await addVocabWord(word.vocabWord.translate)
    } catch (err) {
      unsavedWords.push(word.vocabWord.translate) ////////////
    }
  }
  return unsavedWords
} */
