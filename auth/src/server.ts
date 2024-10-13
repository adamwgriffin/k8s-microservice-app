import app from './app'
import { connectToDatabase, disconnectDatabase } from './database'

const startServer = async (): Promise<void> => {
  try {
    const conn = await connectToDatabase()
    console.log(`MongoDB connected: ${conn.connection.host}`)
    const port = 3000
    app.listen(port, () => {
      console.log(`Server listening on port ${port} 🚀`)
    })
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

const handleExit = async (): Promise<void> => {
  console.log('Cleaning up before closing the server...')
  try {
    await disconnectDatabase()
    console.log('MongoDB disconnected')
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
  console.log('Cleanup complete. Closing the server...')
  process.exit(0)
}

process.on('SIGTERM', handleExit)

startServer()
