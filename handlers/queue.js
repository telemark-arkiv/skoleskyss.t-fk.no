'use strict'

module.exports.getNextFromQueue = function getNextFromQueue (request, reply) {
  request.seneca.act({role: 'queue', cmd: 'next'}, function getNext (error, data) {
    reply(error || data)
  })
}

module.exports.deleteFromQueue = function deleteFromQueue (request, reply) {
  const queueId = request.params.queueId
  request.seneca.act({role: 'queue', cmd: 'delete', queueId: queueId}, function deleteJob (error, data) {
    if (error) {
      reply(error)
    } else {
      request.seneca.act({role: 'counter', cmd: 'subtract', key: 'skoleskyss/queue'})
      reply(data)
    }
  })
}
