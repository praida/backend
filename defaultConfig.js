const cloneDeep = require('lodash.clonedeep')
const merge = require('lodash.merge')

const common = {
  port: 3333
}

const dev = cloneDeep(common)

merge(dev, {
  mongoAdminUser: process.env.PRAIDA_DEV_MONGO_ADMIN_USER,
  mongoAdminPass: process.env.PRAIDA_DEV_MONGO_ADMIN_PASS,
  mongoUser: '',
  mongoPass: '',
  mongoHosts: [
    'localhost:27017',
    'localhost:27018',
    'localhost:27019'
  ].join(','),
  mongoDatabase: 'praida',
  mongoReplicaSet: 'rs0'
})

const production = cloneDeep(common)

merge(production, {
  mongoAdminUser: process.env.PRAIDA_PROD_MONGO_ADMIN_USER,
  mongoAdminPass: process.env.PRAIDA_PROD_MONGO_ADMIN_PASS,
  mongoUser: process.env.PRAIDA_PROD_MONGO_USER,
  mongoPass: process.env.PRAIDA_PROD_MONGO_PASS,
  mongoDatabase: process.env.PRAIDA_PROD_MONGO_DATABASE,
  mongoHosts: process.env.PRAIDA_PROD_MONGO_HOSTS,
  mongoReplicaSet: process.env.PRAIDA_PROD_MONGO_REPLICA_SET
})

module.exports = exports = { dev, production }
