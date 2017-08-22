const hash = require('quick-hash')

module.exports = exports = () => {
  const users = {}
  users[process.env.PRAIDA_PROD_USER] = process.env.PRAIDA_PROD_PASS
  console.log('users', hash(JSON.stringify(users), 1))
  return { users }
}