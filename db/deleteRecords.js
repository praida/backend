const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectID
const withDb = require('./with')

module.exports = exports = (conf, ids) => {
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
        $in: ids.map((id) => {
          return new ObjectId(id)
        })
      }
    }
    console.log('\n\nQuery', query)
    return db.collection('records').remove(query)
  })
}
