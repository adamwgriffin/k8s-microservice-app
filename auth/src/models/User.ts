const mongoose = require('mongoose')

// Define the schema
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    emailVerified: Boolean,
    image: String
  },
  { collection: 'User' }
)

const User = mongoose.model('User', userSchema)

export default User
