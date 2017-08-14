const withDb = require('./with')

module.exports = exports = (conf) => {
  const config = {
    user: conf.get('mongoUser'),
    pass: conf.get('mongoPass'),
    hosts: conf.get('mongoHosts'),
    database: conf.get('mongoDatabase'),
    replicaSet: conf.get('mongoReplicaSet')
  }
  return withDb(config, (db) => {
    return new Promise((resolve, reject) => {
      const query = {}

      db.collection('records')
        .find(query)
        .toArray((err, docs) => {
          if (err) {
            return reject(err)
          }

          return resolve(docs)
        })
    })
  })
}