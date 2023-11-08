import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { IUserDecoder } from '../types/types'
import { ErrorMessage } from '../models'

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1]

  if (!token)
    return res
      .status(401)
      .send(new ErrorMessage('Access denied. No token provided'))

  try {
    const decodedPayload = jwt.verify(
      token,
      process.env.JWT_PRIVATE_KEY
    ) as IUserDecoder

    req.user = decodedPayload

    next()
  } catch (err) {
    res.status(400).send(new ErrorMessage(err.message))
  }
}
