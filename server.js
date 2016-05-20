'use strict'

const Hapi = require('hapi')
const Hoek = require('hoek')
const server = new Hapi.Server()
const config = require('./config')
const skoleskyssService = require('./index')
const validate = require('./lib/validate-jwt')
const validateAPI = require('./lib/validate-api')
const goodOptions = {
  ops: {
    interval: 900000
  },
  reporters: {
    console: [{
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{ log: '*', ops: '*', error: '*' }]
    }, {
      module: 'good-console'
    }, 'stdout']
  }
}
const yarOptions = {
  storeBlank: false,
  cookieOptions: {
    password: config.SKOLESKYSS_YAR_SECRET,
    isSecure: false
  }
}

server.connection({
  port: config.SKOLESKYSS_SERVER_PORT_WEB
})

server.register(require('vision'), function (err) {
  Hoek.assert(!err, err)

  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'views',
    helpersPath: 'views/helpers',
    partialsPath: 'views/partials',
    layoutPath: 'views/layouts',
    layout: true,
    compileMode: 'sync'
  })
})

server.register(require('inert'), function (err) {
  if (err) {
    throw err
  }
  server.route({
    method: 'GET',
    path: '/public/{param*}',
    handler: {
      directory: {
        path: 'public'
      }
    },
    config: {
      auth: false
    }
  })
})

server.register(require('hapi-auth-cookie'), function (err) {
  if (err) {
    console.error('Failed to load a plugin: ', err)
  }

  server.auth.strategy('session', 'cookie', {
    password: config.SKOLESKYSS_COOKIE_SECRET,
    cookie: 'skoleskyss-session',
    validateFunc: validate,
    redirectTo: '/login',
    isSecure: false
  })

  server.auth.default('session')
})

server.register(require('hapi-auth-jwt2'), function (err) {
  if (err) {
    console.log(err)
  }

  server.auth.strategy('jwt', 'jwt',
    { key: config.SKOLESKYSS_JWT_SECRET,          // Never Share your secret key
      validateFunc: validateAPI,            // validate function defined above
      verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
    })
})

server.register({
  register: require('yar'),
  options: yarOptions
}, function (err) {
  if (err) {
    console.error('Failed to load a plugin:', err)
  }
})

server.register({
  register: require('good'),
  options: goodOptions
}, function (err) {
  if (err) {
    console.error(err)
  }
})

server.register([
  {
    register: skoleskyssService,
    options: {}
  }
], function (err) {
  if (err) {
    console.error('Failed to load a plugin:', err)
  }
})

function startServer () {
  server.start(function () {
    console.log('Server running at:', server.info.uri)
  })
}

function stopServer () {
  server.stop(function () {
    console.log('Server stopped')
  })
}

module.exports.start = startServer

module.exports.stop = stopServer
