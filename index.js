const conf = require('nconf')
const defaultConf = require('./defaultConfig')

conf.argv()
  .env([
    'NODE_ENV',
  ])
  .defaults(defaultConf)

const server = require('./server')

server.start(conf)