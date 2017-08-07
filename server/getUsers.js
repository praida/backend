module.exports = exports = () => {
  const users = {}
  users[process.env.PRAIDA_PROD_USER] = process.env.PRAIDA_PROD_PASS
  return { users }
}