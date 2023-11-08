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
    const error = userValidator(req, true)

    if (error) {
      return res.status(400).send(new ErrorMessage(error))
    }

    const existUser = await User.findOne({ email: req.body.email })

    if (existUser) {
      return res
        .status(400)
        .send(new ErrorMessage('User with this email already exist'))
    }

    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    })

    const token = user.generateAuthToken()

    return res.status(201).send({ token: token })
  })
)

export default router
