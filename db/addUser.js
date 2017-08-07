const withDb = require('./with')

module.exports = exports = (conf) => {
  const config = {
    user: conf.get('mongoAdminUser'),
    pass: conf.get('mongoAdminPass'),
    hosts: conf.get('mongoHosts'),
    database: conf.get('mongoDatabase'),
    replicaSet: conf.get('mongoReplicaSet')
  }
  return withDb(config, (db) => {
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

}