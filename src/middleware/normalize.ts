import { Middleware, MiddlewareNextFunction, MiddlewareRequest, MiddlewareResponse } from "../protocols/middleware";

export const MiddlewareNormalize = new class MiddlewareNormalize implements Middleware {
  async handle(req: MiddlewareRequest, res: MiddlewareResponse, next: MiddlewareNextFunction) {
    const body = req.body
    const query = req.query
    const param = req.params

    next()
  }
}