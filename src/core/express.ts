import express, { Express } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { envs } from './envs'

import '../start/routes'
import { Route } from './route'

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
    console.log(Route.routes)

    for (const route of Route.routes) {
      this.express[route.method](route.path,async (req,res)=> res.send(await route.handle(req)))
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