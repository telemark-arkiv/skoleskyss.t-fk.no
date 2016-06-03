'use strict'

const routes = require('./routes')
const skjemaRoutes = require('./routes/skjema')
const testRoutes = require('./routes/test')
const queueRoutes = require('./routes/queue')

exports.register = function (server, options, next) {
  server.route(routes)
  server.route(skjemaRoutes)
  server.route(testRoutes)
  server.route(queueRoutes)
  next()
}

exports.register.attributes = {
  pkg: require('./package.json')
}
