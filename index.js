'use strict'

const routes = require('./routes')
const skjemaRoutes = require('./routes/skjema')

exports.register = function (server, options, next) {
  server.route(routes)
  server.route(skjemaRoutes)
  next()
}

exports.register.attributes = {
  pkg: require('./package.json')
}
