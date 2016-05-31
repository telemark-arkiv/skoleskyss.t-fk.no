'use strict'

const steps = [
  'seover',
  'soknaduendret',
  'busskortnummer',
  'busskort',
  'grunnlag',
  'velgklasse',
  'skoleadresse',
  'velgskole',
  'bosteddelt',
  'bostedhybel',
  'bosted'
]

module.exports = function getNextForm (store) {
  const completedSteps = Object.keys(store)
  var nextForm = 'seover'

  steps.forEach(function (step) {
    if (completedSteps.indexOf(step) === -1) {
      nextForm = step
    }
  })

  if (store.dsfError) {
    nextForm = 'ikkefunnet'
  }

  if (store.korError) {
    nextForm = 'ikkefunnet'
  }

  return nextForm
}
