const withDb = require('./withDb')
const sendResults = require('./sendResults')

const saveEditedFields = require('./saveEditedFields')
const saveNewFields = require('./saveNewFields')
const saveEditedRecords = require('./saveEditedRecords')
const saveNewRecords = require('./saveNewRecords')
const deleteRecords = require('./deleteRecords')

module.exports = exports = (conf) => {
  return (req, res, next) => {
    const config = {
      user: conf.get('mongoUser'),
      pass: conf.get('mongoPass'),
      hosts: conf.get('mongoHosts'),
      database: conf.get('mongoDatabase'),
      replicaSet: conf.get('mongoReplicaSet')
    }
    const changes = req.body
    console.log('Saving changes', config, changes)
    withDb(config, (db) => {
      return Promise.all([
        saveEditedFields(db, changes.editedFields),
        saveNewFields(db, changes.newFields)
      ])
        .then(() => {
          return Promise.all([
            saveEditedRecords(db, changes.edit),
            saveNewRecords(db, changes.add),
            deleteRecords(db, changes.remove)
          ])
        })
    })
      .then(sendResults(res), next)
  }
}
