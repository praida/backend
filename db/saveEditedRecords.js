const withDb = require('./with')
const mongodb = require('mongodb')
const cloneDeep = require('lodash.clonedeep')

const ObjectID = mongodb.ObjectID

module.exports = exports = (conf, editedRecords) => {
  const config = {
    user: conf.get('mongoUser'),
    pass: conf.get('mongoPass'),
    hosts: conf.get('mongoHosts'),
    database: conf.get('mongoDatabase'),
    replicaSet: conf.get('mongoReplicaSet')
  }
  return withDb(config, (db) => {
    const ids = Object.keys(editedRecords)
    if (ids.length === 0) {
      return Promise.resolve()
    }

    const items = ids.map((id) => {
      const editedRecord = cloneDeep(editedRecords[id])
      delete editedRecord._id
      return {
        updateOne: {
          filter: { _id: new ObjectID(id) },
          update: { $set: editedRecord }
        }
      }
    })

    return db.collection('records')
      .bulkWrite(items)
      .then((response) => {
        return response.toJSON()
      })
  })
}
