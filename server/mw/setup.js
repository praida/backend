const addUser = require('../../db/addUser')
const respond = require('../respond')

module.exports = exports = (conf) => {
  return (req, res, next) => {
    addUser(conf)
      .then(respond(res), next)
  }
}
