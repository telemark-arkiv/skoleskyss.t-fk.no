'use strict'

const Handlers = require('../handlers/test')

const routes = [
  {
    method: 'GET',
    path: '/test',
    config: {
      handler: Handlers.showTest,
      description: 'Show the testpage',
      auth: false
    }
  },
  {
    method: 'POST',
    path: '/test',
    config: {
      handler: Handlers.setupTest,
      description: 'Setup test environment',
      auth: false
    }
  }
]

module.exports = routes
