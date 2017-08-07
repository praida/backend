const getFields = require('../../db/getFields')
const respond = require('../respond')

module.exports = exports = (conf) => {
  return (req, res, next) => {
    getFields(conf)
      .then(respond(res), next)
  }
}
