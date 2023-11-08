import { Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'

export interface ITest {
  result: number
  wrongWords: string[]
  passingDate?: Date
}

export interface IUser {
  username: string
  email: string
  password: string
}

export interface IWords {
  word: string
  translation: string
  examples?: string
}

export interface IUserMethods {
  generateAuthToken(): string
}

export interface CustomRequest<T> extends Request {
  body: T
}

export interface IUserDecoder extends JwtPayload {
  _id: string
}
