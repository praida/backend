const isEmpty = require('lodash.isempty')
const respond = require('../respond')

const saveEditedFields = require('../../db/saveEditedFields')
const saveNewFields = require('../../db/saveNewFields')
const deleteFields = require('../../db/deleteFields')
const saveEditedRecords = require('../../db/saveEditedRecords')
const saveNewRecords = require('../../db/saveNewRecords')
const deleteRecords = require('../../db/deleteRecords')

module.exports = exports = (conf) => {
  return (req, res, next) => {
    const changes = req.body
    console.log('changes', changes)
    const proms = []
    if (!isEmpty(changes.editedFields)) {
      proms.push(saveEditedFields(conf, changes.editedFields))
    }
    if (!isEmpty(changes.newFields)) {
      proms.push(saveNewFields(conf, changes.newFields))
    }
    if (!isEmpty(changes.deletedFields)) {
      proms.push(deleteFields(conf, changes.deletedFields))
    }
    return Promise.all(proms)
      .then(() => {
        const proms = []
        if (changes.edit) {
          proms.push(saveEditedRecords(conf, changes.edit))
        }
        if (changes.add) {
          proms.push(saveNewRecords(conf, changes.add))
        }
        if (changes.remove) {
          proms.push(deleteRecords(conf, changes.remove))
        }
        return Promise.all(proms)
      })
      .then(respond(res), next)
  }
}
