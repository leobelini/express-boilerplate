import express, { Express } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { envs } from './envs'

import '../start/routes'
import { Route } from './route'
import { Middleware } from '../protocols/middleware'
import { config } from '../start/config'

class ExpressApp {
  private express: Express

  constructor() {
    this.express = express()
    this.configuration()
  }

  private configuration() {
    this.express.use(cors())
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(express.json())
    this.express.use(helmet())
  }

  public setRoutes() {
    for (const route of Route.routes) {
      let middleware: Middleware[] = config.defaultsMiddleware

      let middlewareHandle = middleware.map(a => a.handle)
      if (route.middleware)
        route.middleware.map(i => middlewareHandle.push(i.handle))

      this.express[route.method](route.path, ...middlewareHandle, async (req, resp) => {
        const retHandle = await route.handle(req)
        resp.status(retHandle.statusCode)
        resp.send(retHandle.body)
      })
    }
  }

  public start() {
    this.setRoutes()
    this.express.listen(envs.PORT_APP, () => {
      console.log(`App listening at http://localhost:${envs.PORT_APP}`)
    })
  }
}

export default ExpressApp