const express = require('express')
const basicAuth = require('express-basic-auth')

const auth = basicAuth({
  users: {
    'guest': 'guest'
  }
})

const Server = {
  start: (conf) => {
    const server = express()

    server.use('/versions', auth, (req, res) => {
      res.status(200).json({
        mongodb: 'coming soon'
      })
    })
    server.use((req, res) => {
      console.log('req.originalUrl', req.originalUrl)
      res.status(200).send('OK')
    })

    this.handle = server.listen(conf.get('port'), () => {
      console.log(`Listening on port ${this.handle.address().port}`)
    })
  }
}

module.exports = exports = Server
