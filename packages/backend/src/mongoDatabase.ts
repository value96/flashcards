import mongoose from 'mongoose'

export const connectToNoSqlDB = async (mongoUrl: string) => {
  try {
    await mongoose.connect(mongoUrl)
    console.log('Mongo DB connected')
  } catch (error) {
    console.error('Failed to connect Mongo DB:', error)
    process.exit(1)
  }
}

export async function disconnectFromNoSqlDB() {
  await mongoose.connection.close()
  console.log('Disconnected from MongoDB')
}

export async function clearNoSqlDB() {
  const collections = mongoose.connection.collections
  for (const key in collections) {
    await collections[key].deleteMany({})
  }
}
