import express from 'express'
import bcrypt from 'bcrypt'
import { CustomRequest, IUser } from '../types/types'
import { asyncHandler } from '../middleware'
import { ErrorMessage, User } from '../models'
import { userValidator } from '../utils'

const router = express.Router()

router.post(
  '/',
  asyncHandler(async (req: CustomRequest<IUser>, res) => {
    const error = userValidator(req)

    if (error) {
      return res.status(400).send(new ErrorMessage(error))
    }

    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res.status(400).send(new ErrorMessage('Invalid email or password'))
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    )

    if (!isValidPassword) {
      return res.status(400).send(new ErrorMessage('Invalid email or password'))
    }

    const token = user.generateAuthToken()
    res.send({ token: token })
  })
)

export default router
