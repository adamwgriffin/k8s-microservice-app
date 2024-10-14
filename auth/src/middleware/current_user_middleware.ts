import jwt from 'jsonwebtoken'

export const addCurrentUser = async (ctx, next) => {
  ctx.assert(process.env.JWT_SECRET, 'JWT_SECRET is not present')
  if (!ctx.session?.jwt) {
    return next()
  }
  try {
    ctx.state.currentUser = jwt.verify(ctx.session.jwt, process.env.JWT_SECRET)
  } catch (err) {
    console.error('Error verifying JWT:', err)
  }
  await next()
}
