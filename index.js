const conf = require('nconf')
const defaultConf = require('./defaultConfig')
console.log('process.env.NODE_ENV', process.env.NODE_ENV)
conf.argv()
  .env([
    'NODE_ENV',
    'PRAIDA_PROD_USER',
    'PRAIDA_PROD_PASS',
    'PRAIDA_PROD_MONGO_ADMIN_USER',
    'PRAIDA_PROD_MONGO_ADMIN_PASS',
    'PRAIDA_PROD_MONGO_USER',
    'PRAIDA_PROD_MONGO_PASS',
    'PRAIDA_PROD_MONGO_HOSTS',
    'PRAIDA_PROD_MONGO_DATABASE',
    'PRAIDA_PROD_MONGO_REPLICA_SET'
  ])
  .defaults(defaultConf[process.env.NODE_ENV])

const server = require('./server')
server.start(conf)