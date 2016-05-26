'use strict'

const steps = [
  'bosted',
  'alternativtbosted',
  'busskort',
  'grunnlag',
  'kontaktinformasjon',
  'personalia',
  'velgskole',
  'velgklasse'
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

  if (store.dsfNotFound) {
    nextForm = 'ikkefunnet'
  }

  if (store.previousApplicationDetected) {
    nextForm = 'sokttidligere'
  }

  if (store.duplicateApplicationDetected) {
    nextForm = 'soknaduendret'
  }
  return nextForm
}
