const withDb = require('./with')
const mongodb = require('mongodb')
const cloneDeep = require('lodash.clonedeep')

const ObjectID = mongodb.ObjectID

module.exports = exports = (conf, editedFields) => {
  const config = {
    user: conf.get('mongoUser'),
    pass: conf.get('mongoPass'),
    hosts: conf.get('mongoHosts'),
    database: conf.get('mongoDatabase'),
    replicaSet: conf.get('mongoReplicaSet')
  }
  return withDb(config, (db) => {
    const ids = Object.keys(editedFields)
    if (ids.length === 0) {
      return Promise.resolve()
    }

    const items = ids.map((id) => {
      const editedField = cloneDeep(editedFields[id])
      delete editedField._id
      return {
        updateOne: {
          filter: { _id: new ObjectID(id) },
          update: { $set: editedField }
        }
      }
    })

    return db.collection('fields')
      .bulkWrite(items)
      .then((response) => {
        return response.toJSON()
      })
  })
}
