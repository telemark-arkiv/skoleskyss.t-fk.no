'use strict'

module.exports = function korData (korData) {
  var info = ''

  if (korData.Mobiltelefonnummer) {
    info = 'Mobilnummer: ' + korData.Mobiltelefonnummer + '<br />'
  }

  if (korData.Epostadresse) {
    info += 'Epostadresse: ' + korData.Epostadresse
  }

  return info
}
