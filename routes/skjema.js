'use strict'

const Handlers = require('../handlers/skjema')

const routes = [
  {
    method: 'GET',
    path: '/personalia',
    config: {
      handler: Handlers.showPersonalia,
      description: 'Show the personal info pages',
      auth: false
    }
  },
  {
    method: 'GET',
    path: '/kontaktinformasjon',
    config: {
      handler: Handlers.showKontaktInformasjon,
      description: 'Show the contact info page',
      auth: false
    }
  },
  {
    method: 'GET',
    path: '/grunnlag',
    config: {
      handler: Handlers.showGrunnlag,
      description: 'Show the personal info pages',
      auth: false
    }
  },
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
    path: '/ikkefunnet',
    config: {
      handler: Handlers.showIkkeFunnet,
      description: 'Show the person not found page',
      auth: false
    }
  },
  {
    method: 'GET',
    path: '/busskort',
    config: {
      handler: Handlers.showBusskort,
      description: 'Show travel card page',
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
