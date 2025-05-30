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
