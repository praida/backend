const withDb = require('./with')

module.exports = exports = (conf, newFields) => {
  const config = {
    user: conf.get('mongoUser'),
    pass: conf.get('mongoPass'),
    hosts: conf.get('mongoHosts'),
    database: conf.get('mongoDatabase'),
    replicaSet: conf.get('mongoReplicaSet')
  }
  return withDb(config, (db) => {
    if (newFields.length === 0) {
      return Promise.resolve()
    }
    const items = newFields.map((newField) => {
      return { name: newField }
    })

    return db.collection('fields').insertMany(items)
  })
}
