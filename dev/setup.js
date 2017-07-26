const withDb = require('../withDb')

module.exports = exports = (conf) => {
  return (req, res, next) => {
    const config = {
      user: conf.get('mongoAdminUser'),
      pass: conf.get('mongoAdminPass'),
      hosts: conf.get('mongoHosts'),
      database: conf.get('mongoDatabase'),
      replicaSet: conf.get('mongoReplicaSet')
    }
    withDb(config, (db) => {
      const user = conf.get('mongoUser')
      const pass = conf.get('mongoPass')
      return db.addUser(user, pass)
        .then((err, results) => {
          if (err) {
            console.error(err)
            return reject(err)
          }

          console.log(results)
          return resolve(results)
        })
    })
    .catch(next)
  }
}
