const withDb = require('./with')

module.exports = exports = (conf, req) => {
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
      if (req.query.f) {
        Object.keys(req.query.f)
          .forEach((key) => {
            const filter = { $regex: req.query.f[key], $options: 'ix' }
            query[key] = filter
          })
      }

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