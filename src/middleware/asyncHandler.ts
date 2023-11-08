import { NextFunction, Request, RequestHandler, Response } from 'express'

interface MiddlewareFunction {
  (req: Request, res: Response): Promise<Response | void>
}

export const asyncHandler = (handler: MiddlewareFunction): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res)
    } catch (error) {
      next(error)
    }
  }
}
