'use strict'

const Handlers = require('../handlers/skjema')

const routes = [
  {
    method: 'GET',
    path: '/alternativtbosted',
    config: {
      handler: Handlers.showAlternativtBosted,
      description: 'Show the frontpage',
      auth: false
    }
  },
  {
    method: 'GET',
    path: '/velgskole',
    config: {
      handler: Handlers.showVelgSkole,
      description: 'Start here if logged in',
      auth: false
    }
  },
  {
    method: 'GET',
    path: '/seover',
    config: {
      handler: Handlers.showSeOver,
      description: 'Start here if manual',
      auth: false
    }
  },
  {
    method: 'POST',
    path: '/next',
    config: {
      handler: Handlers.getNext,
      description: 'Start here if manual',
      auth: false
    }
  }
]

module.exports = routes
