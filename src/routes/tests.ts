import express from 'express'
import { auth } from '../middleware/auth'
import { CustomRequest, ITest } from '../types/types'
import { objectIdHandler } from '../middleware/objectIdHandler'
import { asyncHandler } from '../middleware'
import { ErrorMessage, Test } from '../models'

const router = express.Router()

router.get(
  '/',
  auth,
  asyncHandler(async (req, res) => {
    const tests = await Test.find({ userId: req.user._id }).sort('-passingDate')

    res.send(tests)
  })
)

router.delete(
  '/:id',
  [auth, objectIdHandler],
  asyncHandler(async (req, res) => {
    const test = await Test.findByIdAndDelete(req.params.id)

    if (!test) {
      return res
        .status(404)
        .send(new ErrorMessage('The test with the given Id was not found'))
    }

    res.send(test)
  })
)

router.post(
  '/',
  auth,
  asyncHandler(async (req: CustomRequest<ITest>, res) => {
    const test = await Test.create({
      result: req.body.result,
      wrongWords: req.body.wrongWords,
      userId: req.user._id,
    })

    res.status(201).send(test)
  })
)

export default router
