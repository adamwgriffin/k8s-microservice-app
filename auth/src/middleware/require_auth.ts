export const requireAuth = async (ctx, next) => {
  ctx.assert(ctx.state.currentUser, 401, 'Not authorized')
  await next()
}
