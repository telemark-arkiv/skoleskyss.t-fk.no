'use strict'

module.exports = function prepareDataForDuplicates (data) {
  var duplicates = []

  duplicates.push(data.velgskole.skole)

  if (data.bosted.bosted === 'folkeregistrert' || data.bosted.bosted === 'delt') {
    const dsfData = data.dsfData
    if (dsfData.GARD) {
      duplicates.push(dsfData.KOMNR + '-' + dsfData.GARD + '/' + dsfData.BRUK)
    } else {
      duplicates.push(dsfData.ADR + dsfData.POSTN + dsfData.POSTS)
    }
  }

  if (data.bosted.bosted === 'delt') {
    const delt = data.bosteddelt
    if (delt.GARD) {
      duplicates.push(delt.KOMNR + '-' + delt.GARD + '/' + delt.BRUK)
    } else {
      duplicates.push(delt.ADR + delt.POSTN + delt.POSTS)
    }
  }

  if (data.bosted.bosted === 'hybel') {
    const hybel = data.bostedhybel
    if (hybel.GARD) {
      duplicates.push(hybel.KOMNR + '-' + hybel.GARD + '/' + hybel.BRUK)
    } else {
      duplicates.push(hybel.ADR + hybel.POSTN + hybel.POSTS)
    }
  }

  var duplicateData = duplicates.join('')

  duplicateData = duplicateData.toLocaleLowerCase()

  duplicateData = duplicateData.replace(/\s/g, '')

  return duplicateData
}
