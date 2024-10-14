import Router from '@koa/router'
import { addCurrentUser } from '../middleware/current_user_middleware'
import { requireAuth } from '../middleware/require_auth'
import { secret, protection } from '../controllers/protected_controller'

export default new Router()
  .get('/secret', addCurrentUser, requireAuth, secret)
  .get('/protected', addCurrentUser, requireAuth, protection)
