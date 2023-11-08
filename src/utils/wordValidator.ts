import { CustomRequest, IWords } from '../types/types'

export const wordValidator = (
  req: CustomRequest<IWords>
): string | undefined => {
  if (!(req.body.word || req.body.translation)) {
    return 'Please send all required fields: word and translation'
  }

  if (req.body.examples?.length > 300) {
    return 'The examples should be less than 300 characters'
  }
}
