const withDb = require('./with')

module.exports = exports = (conf, records) => {
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
        $in: Object.keys(records).map((field) => {
          return field._id
        })
      }
    }
    return db.collection('records').remove(query)
  })
}