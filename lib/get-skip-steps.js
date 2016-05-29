'use strict'

module.exports = function getSkipSteps (store) {
  const completedSteps = Object.keys(store)
  var skips = []
  
  if (completedSteps.indexOf('bosted') > -1) {
    console.log('Bosted')
    // What to skip if bosted exists
    if (store.bosted.bosted === 'folkeregistrert') {
      skips.push('bostedhybel')
      skips.push('bosteddelt')
    }
    if (store.bosted.bosted === 'hybel') {
      skips.push('bosteddelt')
    }
    if (store.bosted.bosted === 'delt') {
      skips.push('bostedhybel')
    }
  }

  if (completedSteps.indexOf('velgskole') > -1) {
    // What to skip if velgskole exists
    if (store.velgskole.skole !== '0000') {
      skips.push('skoleadresse')
    }
    if (store.velgskole.skole === '0000') {
      skips.push('busskort')
      skips.push('busskortnummer')
    }
  }

  if (completedSteps.indexOf('busskort') > -1) {
    // What to skip if busskort exists
    if (store.busskort.mottattBusskort !== 'ja') {
      skips.push('busskortnummer')
    }
  }

  if (completedSteps.indexOf('duplikatSoknad') > -1) {
    // What to skip if duplikatSoknad exists
    if (!store.duplikatSoknad) {
      skips.push('soknaduendret')
    }
  }

  if (completedSteps.indexOf('tidligereSoknad') > -1) {
    // What to skip if duplikatSoknad exists
    if (!store.tidligereSoknad) {
      skips.push('sokttidligere')
    }
  }

  return skips
}
