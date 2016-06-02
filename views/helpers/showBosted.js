'use strict'

const showDsfBosted = require('./showDsfBosted')

module.exports = function showBosted (data) {
  var outputs = []

  if (data.bosted.bosted === 'folkeregistrert') {
    outputs.push('Hjemme, på folkeregistrert bosted')
    outputs.push(showDsfBosted(data.dsfData))
    if (data['distance-see-dsf']) {
      outputs.push('Foreløpig beregnet avstand til skole: ' + data['distance-see-dsf'].data.distance)
    }
  }

  if (data.bosted.bosted === 'delt') {
    outputs.push('Delt bosted')
    outputs.push('Folkeregistrert bosted')
    outputs.push(showDsfBosted(data.dsfData))
    if (data['distance-see-dsf']) {
      outputs.push('Foreløpig beregnet avstand til skole: ' + data['distance-see-dsf'].data.distance)
    }
    outputs.push('')
    outputs.push('Bosted nummer to')
    outputs.push(showDsfBosted(data.bosteddelt))
    if (data['distance-see-delt']) {
      outputs.push('Foreløpig beregnet avstand til skole: ' + data['distance-see-delt'].data.distance)
    }
  }

  if (data.bosted.bosted === 'hybel') {
    outputs.push('Hybel')
    outputs.push(showDsfBosted(data.bostedhybel))
    if (data['distance-see-hybel']) {
      outputs.push('Foreløpig beregnet avstand til skole: ' + data['distance-see-hybel'].data.distance)
    }
  }
  return outputs.join('<br />')
}
