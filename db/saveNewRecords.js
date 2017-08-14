const withDb = require('./with')

module.exports = exports = (conf, newRecords) => {
  const config = {
    user: conf.get('mongoUser'),
    pass: conf.get('mongoPass'),
    hosts: conf.get('mongoHosts'),
    database: conf.get('mongoDatabase'),
    replicaSet: conf.get('mongoReplicaSet')
  }
  return withDb(config, (db) => {
    if (newRecords.length === 0) {
      return Promise.resolve()
    }

    return db.collection('records').insertMany(newRecords)
  })
}
