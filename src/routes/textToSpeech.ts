import express from 'express'
import { auth } from '../middleware/auth'
import { TextToSpeechClient, protos } from '@google-cloud/text-to-speech'
import { auth as GoogleAuth } from 'google-auth-library'
import { asyncHandler } from '../middleware'
import { decryptFile } from '../utils'

type GoogleSpeechRequest =
  protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest
type GoogleSpeechResponse =
  protos.google.cloud.texttospeech.v1.ISynthesizeSpeechResponse

const router = express.Router()

router.post(
  '/',
  auth,
  asyncHandler(async (req, res) => {
    const text = req.body.text
    const jsonStr = await decryptFile('googleKey.json.secure')
    const authClient = GoogleAuth.fromJSON(JSON.parse(jsonStr))
    const client = new TextToSpeechClient({ authClient })

    async function convertToSpeech() {
      const request: GoogleSpeechRequest = {
        input: { text: text },
        voice: { languageCode: 'en-US', ssmlGender: 'MALE' },
        audioConfig: { audioEncoding: 'LINEAR16' },
      }

      const [response] = await client.synthesizeSpeech(request)
      return response
    }

    const speechResponse: GoogleSpeechResponse = await convertToSpeech()
    const audioBuffer = speechResponse.audioContent

    res.setHeader('Content-Type', 'audio/wav')
    res.setHeader('Content-Disposition', 'attachment; filename=audio.wav')
    res.send(audioBuffer)
  })
)

export default router
