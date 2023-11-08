import { Model, Schema, model } from 'mongoose'
import jwt from 'jsonwebtoken'
import { IUser, IUserMethods } from '../types/types'

type UserModel = Model<IUser, object, IUserMethods>

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY)

  return token
}

export const User = model('User', userSchema)
