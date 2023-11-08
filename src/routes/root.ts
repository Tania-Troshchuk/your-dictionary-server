import express from 'express'
import { asyncHandler } from '../middleware'

const router = express.Router()

router.use(
  '/',
  asyncHandler(async (req, res) => {
    return res.status(200).send('Welcome to Your Dictionaty api')
  })
)

export default router
