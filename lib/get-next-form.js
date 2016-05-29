'use strict'

const steps = [
  'kvittering',
  'soknaduendret',
  'seover',
  'busskortnummer',
  'busskort',
  'grunnlag',
  'velgklasse',
  'velgskole',
  'bosteddelt',
  'bostedhybel',
  'bosted',
  'sokttidligere'
]

module.exports = function getNextForm (store) {
  const completedSteps = Object.keys(store)
  var nextForm = 'seover'
  console.log(completedSteps)
  console.log(store)

  steps.forEach(function (step) {
    if (completedSteps.indexOf(step) === -1) {
      nextForm = step
    }
  })

  if (store.previousApplicationDetected) {
    nextForm = 'sokttidligere'
  }

  if (store.duplicateApplicationDetected) {
    nextForm = 'soknaduendret'
  }

  if (store.dsfError) {
    nextForm = 'ikkefunnet'
  }

  if (store.korError) {
    nextForm = 'ikkefunnet'
  }

  return nextForm
}
