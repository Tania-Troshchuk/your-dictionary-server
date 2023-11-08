import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import { ErrorMessage } from '../models'

export const objectIdHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send(new ErrorMessage('Invalid Id'))
  }

  next()
}
