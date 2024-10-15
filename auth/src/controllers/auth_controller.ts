import User from '../models/user_model'
import jwt from 'jsonwebtoken'
import pick from 'lodash/pick'

export const register = async (ctx) => {
  const { email, password } = ctx.request.body

  const existingUser = await User.exists({ email })
  ctx.assert(!existingUser, 400, 'Email already in use.')

  const user = await User.create({
    email,
    password
  })

  const userJwt = jwt.sign(
    {
      id: user._id,
      email: user.email
    },
    process.env.JWT_SECRET
  )
  ctx.body = pick(user, ['_id', 'email'])
  ctx.session = { jwt: userJwt }
  ctx.status = 201
}

export const login = async (ctx) => {
  const { email, password } = ctx.request.body
  const user = await User.findOne({ email })
  ctx.assert(user, 401, 'User not found.')
  ctx.assert(await user.authenticate(password), 401, 'Incorrect password')

  const userJwt = jwt.sign(
    {
      id: user._id,
      email: user.email
    },
    process.env.JWT_SECRET
  )
  ctx.session = { jwt: userJwt }
  ctx.body = pick(user, ['_id', 'email'])
}

export const logout = async (ctx) => {
  ctx.session = null
  ctx.body = {}
}

export const currentUser = (ctx) => {
  ctx.body = { currentUser: ctx.state.currentUser || null }
}
