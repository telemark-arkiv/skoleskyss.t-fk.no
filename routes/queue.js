'use strict'

const Handlers = require('../handlers/queue')

const routes = [
  {
    method: 'get',
    path: '/queue/next',
    config: {
      handler: Handlers.getNextFromQueue,
      description: 'Get next job from queue',
      auth: 'jwt'
    }
  },
  {
    method: 'delete',
    path: '/queue/{queueId}',
    config: {
      handler: Handlers.deleteFromQueue,
      description: 'Delete job from queue',
      auth: 'jwt'
    }
  }
]

module.exports = routes
