'use strict'

const Handlers = require('../handlers/skjema')

const routes = [
  {
    method: 'GET',
    path: '/personalia',
    config: {
      handler: Handlers.showPersonalia,
      description: 'Show the personal info pages'
    }
  },
  {
    method: 'GET',
    path: '/bosted',
    config: {
      handler: Handlers.showBosted,
      description: 'Show the bosted pages'
    }
  },
  {
    method: 'GET',
    path: '/bostedhybel',
    config: {
      handler: Handlers.showBostedHybel,
      description: 'Show the hybel page'
    }
  },
  {
    method: 'GET',
    path: '/bosteddelt',
    config: {
      handler: Handlers.showBostedDelt,
      description: 'Show the hybel page'
    }
  },
  {
    method: 'GET',
    path: '/kontaktinformasjon',
    config: {
      handler: Handlers.showKontaktInformasjon,
      description: 'Show the contact info page'
    }
  },
  {
    method: 'GET',
    path: '/grunnlag',
    config: {
      handler: Handlers.showGrunnlag,
      description: 'Show the personal info pages'
    }
  },
  {
    method: 'GET',
    path: '/velgskole',
    config: {
      handler: Handlers.showVelgSkole,
      description: 'Start here if logged in'
    }
  },
  {
    method: 'GET',
    path: '/velgklasse',
    config: {
      handler: Handlers.showVelgKlasse,
      description: 'Show velg klasse form'
    }
  },
  {
    method: 'GET',
    path: '/ikkefunnet',
    config: {
      handler: Handlers.showIkkeFunnet,
      description: 'Show the person not found page'
    }
  },
  {
    method: 'GET',
    path: '/busskort',
    config: {
      handler: Handlers.showBusskort,
      description: 'Show travel card page'
    }
  },
  {
    method: 'GET',
    path: '/busskortnummer',
    config: {
      handler: Handlers.showBusskortNummer,
      description: 'Show travel card number page'
    }
  },
  {
    method: 'GET',
    path: '/seover',
    config: {
      handler: Handlers.showSeOver,
      description: 'Start here if manual'
    }
  },
  {
    method: 'GET',
    path: '/sokttidligere',
    config: {
      handler: Handlers.showSoktTidligere,
      description: 'Start here if manual'
    }
  },
  {
    method: 'GET',
    path: '/soknaduendret',
    config: {
      handler: Handlers.showSoknadUendret,
      description: 'Start here if manual'
    }
  },
  {
    method: 'POST',
    path: '/next',
    config: {
      handler: Handlers.getNext,
      description: 'Start here if manual'
    }
  },
  {
    method: 'GET',
    path: '/next',
    config: {
      handler: Handlers.getNext,
      description: 'Start here if manual'
    }
  }
]

module.exports = routes
