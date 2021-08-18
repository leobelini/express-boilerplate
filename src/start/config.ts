import { MiddlewareNormalize } from "../middleware/normalize"
import { Middleware } from "../protocols/middleware"

const defaultsMiddleware: Middleware[] = [
  MiddlewareNormalize
]

export const config = {
  defaultsMiddleware
}