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
  },
  {
    method: 'GET',
    path: '/hjelp',
    config: {
      handler: Handlers.hjelp,
      description: 'Show the help page',
      auth: false
    }
  },
  {
    method: 'GET',
    path: '/vilkar',
    config: {
      handler: Handlers.vilkar,
      description: 'Show the vilkar page',
      auth: false
    }
  },
  {
    method: 'GET',
    path: '/personvern',
    config: {
      handler: Handlers.personvern,
      description: 'Show the personvern page',
      auth: false
    }
  }
]

module.exports = routes
