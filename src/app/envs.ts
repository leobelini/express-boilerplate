import * as dotenv from 'dotenv'

dotenv.config()

export const envs = {
  PORT_APP: Number(process.env.PORT_APP)
}