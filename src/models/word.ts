import { Schema, model } from 'mongoose'
import { IWords } from '../types/types'

interface WordsSchema extends IWords {
  userId: Schema.Types.ObjectId
}

const wordSchema = new Schema<WordsSchema>(
  {
    word: {
      type: String,
      required: true,
      trim: true,
    },
    translation: {
      type: String,
      required: true,
      trim: true,
    },
    examples: {
      type: String,
      maxlength: 300,
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const Word = model('Word', wordSchema)
