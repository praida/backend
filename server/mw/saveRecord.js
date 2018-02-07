const isEmpty = require('lodash.isempty')
const respond = require('../respond')

const saveNewRecords = require('../../db/saveNewRecords')

module.exports = exports = (conf) => {
  return (req, res, next) => {
    const values = req.body
    console.log('values', values)
    return saveNewRecords(conf, [values])
      .then(respond(res), next)
  }
}
