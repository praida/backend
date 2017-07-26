const withDb = require('./withDb')
const sendResults = require('./sendResults')

module.exports = exports = (conf) => {
  return (req, res, next) => {
    const config = {
      user: conf.get('mongoUser'),
      pass: conf.get('mongoPass'),
      hosts: conf.get('mongoHosts'),
      database: conf.get('mongoDatabase'),
      replicaSet: conf.get('mongoReplicaSet')
    }
    withDb(config, (db) => {
      return new Promise((resolve, reject) => {
        const query = {}
        console.log('query', query)

        db.collection('fields')
          .find(query)
          .toArray((err, docs) => {
            if (err) {
              return reject(err)
            }

            console.log('Found docs', docs)
            return resolve(docs)
          })
      })
    })
      .then(sendResults(res), next)
  }
}
