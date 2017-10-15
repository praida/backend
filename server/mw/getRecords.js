const getRecords = require('../../db/getRecords')
const respond = require('../respond')

module.exports = exports = (conf) => {
  return (req, res, next) => {
    getRecords(conf, req)
      .then(respond(res), next)
  }
}
