'use strict'

const Chairo = require('chairo')
const Seneca = require('seneca')()
const Hapi = require('hapi')
const Hoek = require('hoek')
const hapiAuthCookie = require('hapi-auth-cookie')
const hapiAuthJwt2 = require('hapi-auth-jwt2')
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
    isSecure: false,
    isSameSite: 'Lax'
  }
}

const authPlugins = [
  {
    register: hapiAuthCookie,
    options: {}
  },
  {
    register: hapiAuthJwt2,
    options: {}
  }
]

const plugins = [
  {register: Chairo, options: {seneca: Seneca}}
]

function endIfError (error) {
  if (error) {
    console.error(error)
    process.exit(1)
  }
}

server.register(plugins, function (error) {
  endIfError(error)
})

server.connection({
  port: config.SKOLESKYSS_SERVER_PORT_WEB
})

server.register(authPlugins, function (error) {
  endIfError(error)

  server.auth.strategy('session', 'cookie', {
    password: config.SKOLESKYSS_COOKIE_SECRET,
    cookie: 'skoleskyss-session',
    validateFunc: validate,
    redirectTo: config.SKOLESKYSS_AUTH_URL_LOGIN,
    isSecure: false,
    isSameSite: 'Lax'
  })

  server.auth.default('session')

  server.auth.strategy('jwt', 'jwt', {
    key: config.SKOLESKYSS_JWT_SECRET,          // Never Share your secret key
    validateFunc: validateAPI,            // validate function defined above
    verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
  })

  registerRoutes()
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

function registerRoutes () {
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
}

const seneca = server.seneca

seneca.use('mesh', {auto: true})

seneca.log.info('hapi', server.info)

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
