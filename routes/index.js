'use strict'

const Handlers = require('../handlers')

const routes = [
  {
    method: 'GET',
    path: '/',
    config: {
      handler: Handlers.getFrontpage,
      description: 'Show the frontpage'
    }
  },
  {
    method: 'GET',
    path: '/start',
    config: {
      handler: Handlers.start,
      description: 'Start here if logged in'
    }
  },
  {
    method: 'POST',
    path: '/start',
    config: {
      handler: Handlers.checkStart,
      description: 'Start here if logged in'
    }
  },
  {
    method: 'GET',
    path: '/manuell',
    config: {
      handler: Handlers.manuell,
      description: 'Start here if manual'
    }
  },
  {
    method: 'GET',
    path: '/hjelp',
    config: {
      handler: Handlers.hjelp,
      description: 'Show the help page'
    }
  },
  {
    method: 'GET',
    path: '/vilkar',
    config: {
      handler: Handlers.vilkar,
      description: 'Show the vilkar page'
    }
  },
  {
    method: 'GET',
    path: '/personvern',
    config: {
      handler: Handlers.personvern,
      description: 'Show the personvern page'
    }
  }
]

module.exports = routes
