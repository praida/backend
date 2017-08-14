const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const basicAuth = require('express-basic-auth')

const pkg = require('../package')

const getFields = require('./mw/getFields')
const getRecords = require('./mw/getRecords')
const setup = require('./mw/setup')
const saveChanges = require('./mw/saveChanges')

const handleErr = require('./mw/handleErr')

const getUsers = require('./getUsers')

const users = getUsers()

const auth = basicAuth(users)

const Server = {
  start: (conf) => {
    const server = express()

    server.use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE'] }));

    server.use(bodyParser.json());

    server.use((req, res, next) => {
      console.log('\n\n\nreq.originalUrl', req.originalUrl)
      return next()
    })

    server.get('/package.json', (req, res) => {
      res.status(200).json(pkg)
    })

    server.use('/testCredentials', auth, (req, res) => {
      res.status(200).send('OK')
    })

    server.use('/setup', auth, setup(conf), handleErr)

    server.get('/getFields', auth, getFields(conf), handleErr)

    server.get('/getRecords', auth, getRecords(conf), handleErr)

    server.post('/saveChanges', auth, saveChanges(conf), handleErr)

    server.use((req, res) => {
      console.log('req.originalUrl', req.originalUrl)
      res.status(404).send('NOT FOUND')
    })

    this.handle = server.listen(conf.get('port'), () => {
      console.log(`Listening on port ${this.handle.address().port}`)
    })
  }
}

module.exports = exports = Server
