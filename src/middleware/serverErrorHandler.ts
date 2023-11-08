import { ErrorRequestHandler } from 'express'
import { ErrorMessage } from '../models'

export const serverErrorHandler: ErrorRequestHandler = (err, req, res) => {
  console.log(err)
  res.status(500).send(new ErrorMessage(err.message))
}
