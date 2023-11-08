import express from 'express'
import { auth } from '../middleware/auth'
import { CustomRequest, IWords } from '../types/types'
import { objectIdHandler } from '../middleware/objectIdHandler'
import { asyncHandler } from '../middleware'
import { ErrorMessage, Word } from '../models'
import { wordValidator } from '../utils'

const router = express.Router()

router.get(
  '/',
  auth,
  asyncHandler(async (req, res) => {
    const words = await Word.find({ userId: req.user._id })
      .sort('-updatedAt')
      .select('_id word translation examples')

    return res.send(words)
  })
)

router.post(
  '/',
  auth,
  asyncHandler(async (req: CustomRequest<IWords>, res) => {
    const error = wordValidator(req)

    if (error) {
      return res.status(400).send(new ErrorMessage(error))
    }

    const word = await Word.create({
      word: req.body.word,
      translation: req.body.translation,
      examples: req.body.examples,
      userId: req.user._id,
    })

    return res.status(201).send({
      word: word.word,
      translation: word.translation,
      examples: word.examples,
    })
  })
)

router.delete(
  '/:id',
  [auth, objectIdHandler],
  asyncHandler(async (req, res) => {
    const word = await Word.findByIdAndDelete(req.params.id)

    if (!word) {
      return res
        .status(404)
        .send(new ErrorMessage('The word with the given Id was not found'))
    }

    res.send(word)
  })
)

router.put(
  '/:id',
  [auth, objectIdHandler],
  asyncHandler(async (req: CustomRequest<IWords>, res) => {
    const examples = req.body.examples
      ? { examples: req.body.examples }
      : { $unset: { examples: '' } }

    const word = await Word.findByIdAndUpdate(
      req.params.id,
      {
        word: req.body.word,
        translation: req.body.translation,
        ...examples,
      },
      { new: true }
    )

    if (!word) {
      return res
        .status(404)
        .send(new ErrorMessage('The word with the given Id was not found'))
    }

    res.send(word)
  })
)

export default router
