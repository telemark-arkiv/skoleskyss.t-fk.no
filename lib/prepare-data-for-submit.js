'use strict'

module.exports = function prepareDataForSubmit (request, callback) {
  const yar = request.yar
  const sessionId = yar.id
  const store = yar._store
  const storeKeys = Object.keys(store)
  var document = {}

  storeKeys.forEach(function (key) {
    document[key] = store[key]
  })

  request.seneca.act({role: 'session', cmd: 'get', sessionId: sessionId}, function (error, data) {
    if (error) {
      callback(error, null)
    } else {
      data.forEach(function (item) {
        document[item.key] = item
      })
      callback(null, document)
    }
  })
}
