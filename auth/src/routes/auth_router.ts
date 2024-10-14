import Router from '@koa/router'
import { register, login, logout, currentUser } from '../controllers/auth_controller'
import { runValidation } from '../middleware/validation_middleware'
import { userLoginValidator } from '../validators/auth_validator'
import { addCurrentUser } from '../middleware/current_user_middleware'

export default new Router()
  // not using validation middleware for register because it seems that Mongoose's own validation works just as well
  .post('/register', register)
  .post('/login', runValidation(userLoginValidator), login)
  .post('/logout', logout)
  .get('/current_user', addCurrentUser, currentUser)
