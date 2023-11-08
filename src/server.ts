import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { serverErrorHandler } from './middleware'
import { login, registration, root, tests, textToSpeech, words } from './routes'
import { corsOptions } from './data/corsOptions'

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use('/api/registration', registration)
app.use('/api/login', login)
app.use('/api/words', words)
app.use('/api/tests', tests)
app.use('/api/text-to-speech', textToSpeech)
app.use('/', root)
app.use(serverErrorHandler)

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Successful connected to mongoDB 🌿')
    app.listen(PORT, () => console.log(`App is listening on port: ${PORT} 🚀`))
  })
  .catch((error) => console.log('Can`t connect to mongoDB ❌', error))
