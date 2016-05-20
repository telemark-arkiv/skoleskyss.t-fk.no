'use strict'

module.exports = function getNextForm (options) {
  const payload = options.payload
  // const yar = options.yar
  var nextForm = 'seover'

  if (payload.alternativtBosted) {
    nextForm = 'alternativtbosted'
  } else if (payload.velgSkole) {
    nextForm = 'velgskole'
  }

  return nextForm
}
