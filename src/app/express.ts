import express, { Express } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { envs } from './envs'

class ExpressApp {
  private express: Express

  constructor() {
    this.express = express()
    this.configuration()

    this.express.get('/', (req, res) => {
      res.send('Hello World!')
    })

    this.express.post('/', (req, res) => {
      console.log({ body: req.body })
      res.send(JSON.stringify(req.body, null, 2))
    })
  }

  private configuration() {
    this.express.use(cors())
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(express.json())
    this.express.use(helmet())
  }

  public start() {
    this.express.listen(envs.PORT_APP, () => {
      console.log(`Example app listening at http://localhost:${envs.PORT_APP}`)
    })
  }
}

export default ExpressApp