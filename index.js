const conf = require('nconf')
const defaultConf = require('./defaultConfig')
console.log('process.env.NODE_ENV', process.env.NODE_ENV)
conf.argv()
  .env([
    'NODE_ENV',
  ])
  .defaults(defaultConf[process.env.NODE_ENV])

const server = require('./server')
console.log('conf.get()', conf.get())
server.start(conf)