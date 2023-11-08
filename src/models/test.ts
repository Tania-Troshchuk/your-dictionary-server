import { Schema, model } from 'mongoose'
import { ITest } from '../types/types'

interface TestSchema extends ITest {
  userId: Schema.Types.ObjectId
}

const testSchema = new Schema<TestSchema>({
  result: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  wrongWords: [String],
  passingDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
})

export const Test = model('Test', testSchema)
