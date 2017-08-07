const mongodb = require('mongodb')
const ObjectID = mongodb.ObjectID
const withDb = require('./with')

module.exports = exports = (conf, fields) => {
  const config = {
    user: conf.get('mongoUser'),
    pass: conf.get('mongoPass'),
    hosts: conf.get('mongoHosts'),
    database: conf.get('mongoDatabase'),
    replicaSet: conf.get('mongoReplicaSet')
  }
  return withDb(config, (db) => {
    const query = {
      _id: {
        $in: Object.keys(fields).map((item) => {
          return new ObjectID(item)
        })
      }
    }
    return db.collection('fields').remove(query)
      .then(() => {
        return true // drop response
      })
      .catch((reason) => {
        console.log('reason', reason)
      })
  })
}