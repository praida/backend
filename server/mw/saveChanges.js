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
    let ops = []
    if (!isEmpty(changes.editedFields)) {
      proms.push(saveEditedFields(conf, changes.editedFields))
    }
    if (!isEmpty(changes.newFields)) {
      proms.push(saveNewFields(conf, changes.newFields)
        .then((result) => {
          ops = result.ops
        }))
    }
    if (!isEmpty(changes.deletedFields)) {
      proms.push(deleteFields(conf, changes.deletedFields))
    }
    return Promise.all(proms)
      .then(() => {
        const proms = []
        if (changes.edit && Object.keys(changes.edit).length > 0) {
          const edit = Object.keys(changes.edit).reduce((acc, key) => {
            const item = changes.edit[key]
            if (item.newFields) {
              for (let i = 0, len = ops.length; i < len; i += 1) {
                item[ops[i]._id] = item.newFields[i]
              }
              delete item.newFields
            }
            acc[key] = item
            return acc
          }, {})
          proms.push(saveEditedRecords(conf, edit))
        }
        if (changes.add && changes.add.length > 0) {
          const add = changes.add.map((item) => {
            if (item.newFields) {
              for (let i = 0, len = ops.length; i < len; i += 1) {
                item[ops[i]._id] = item.newFields[i]
              }
              delete item.newFields
            }
            return item
          })
          proms.push(saveNewRecords(conf, add))
        }
        if (changes.remove && changes.remove.length > 0) {
          proms.push(deleteRecords(conf, changes.remove))
        }
        return Promise.all(proms)
      })
      .then(respond(res), next)
  }
}
