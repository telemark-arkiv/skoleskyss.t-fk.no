'use strict'

const Handlers = require('../handlers')

const routes = [
  {
    method: 'GET',
    path: '/',
    config: {
      handler: Handlers.getFrontpage,
      description: 'Show the frontpage',
      auth: false
    }
  },
  {
    method: 'GET',
    path: '/start',
    config: {
      handler: Handlers.start,
      description: 'Start here if logged in',
      auth: false
    }
  },
  {
    method: 'GET',
    path: '/manuell',
    config: {
      handler: Handlers.manuell,
      description: 'Start here if manual',
      auth: false
    }
  }
]

module.exports = routes
