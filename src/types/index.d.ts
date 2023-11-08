import { IUserDecoder } from './types'

declare global {
  namespace Express {
    interface Request {
      user?: IUserDecoder
    }
  }
}
