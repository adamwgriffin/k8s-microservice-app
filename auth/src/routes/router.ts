import Router from '@koa/router'
import diagnosticsRouter from './diagnostics_router'
import authRouter from './auth_router'
import protectedRouter from './protected_router'

const router = new Router({
  prefix: '/api/users'
})

export default router
  .use(diagnosticsRouter.routes())
  .use(authRouter.routes())
  .use(protectedRouter.routes())
