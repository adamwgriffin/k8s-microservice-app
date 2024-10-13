import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import session from 'koa-session'
import logger from 'koa-logger'
import router from './routes/router'

const app = new Koa()

// We need to set this because we will be proxying traffic to this service via Nginx
app.proxy = true
// we aren't encrypting the cookie with { signed: true } because we're only putting a JWT token inside, which is already
// encrypted.
app.use(
  session(
    {
      signed: false,
      secure: !['development', 'test'].includes(process.env.NODE_ENV)
    },
    app
  )
)
app.use(bodyParser())
app.use(logger())
app.use(router.routes())

export default app
