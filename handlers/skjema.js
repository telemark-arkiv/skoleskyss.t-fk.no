'use strict'

const getNextForm = require('../lib/get-next-form')
const getSkipSteps = require('../lib/get-skip-steps')
const extractAdressToGeocode = require('../lib/extract-address-to-geocode')
const unwrapGeocoded = require('../lib/unwrap-geocoded')
const getSkoleFromId = require('../lib/get-skole-from-id')
const prepareDataForSubmit = require('../lib/prepare-data-for-submit')
const prepareDuplicateData = require('../lib/prepare-data-for-duplicates')
const pkg = require('../package.json')

module.exports.getNext = function (request, reply) {
  const payload = request.payload
  const yar = request.yar
  if (payload) {
    yar.set(payload.stepName, payload)
    const skipSteps = getSkipSteps(yar._store)
    skipSteps.forEach(function (item) {
      yar.set(item, false)
    })
  }

  const nextForm = getNextForm(yar._store)

  reply.redirect('/' + nextForm)
}

module.exports.showSeOver = function showSeOver (request, reply) {
  var viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url
  }

  prepareDataForSubmit(request, function (error, document) {
    if (error) {
      console.error(error)
    } else {
      viewOptions.document = JSON.stringify(document, null, 2)
    }
    reply.view('seover', viewOptions)
  })
}

module.exports.showBosted = function showBosted (request, reply) {
  const yar = request.yar
  const sessionId = request.yar.id
  const dsfData = yar.get('dsfData')
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    folkeregistrertAdresse: dsfData.ADR + ', ' + dsfData.POSTN + ' ' + dsfData.POSTS
  }

  request.seneca.act({
    role: 'lookup',
    cmd: 'seeiendom',
    sessionId: sessionId,
    key: 'see-dsf',
    address: extractAdressToGeocode(dsfData)
  })

  reply.view('bosted', viewOptions)
}

module.exports.showBostedHybel = function showBostedHybel (request, reply) {
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url
  }

  reply.view('bostedhybel', viewOptions)
}

module.exports.showBostedDelt = function showBostedDelt (request, reply) {
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url
  }

  reply.view('bosteddelt', viewOptions)
}

module.exports.showPersonalia = function showPersonalia (request, reply) {
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url
  }

  reply.view('personalia', viewOptions)
}

module.exports.showKontaktInformasjon = function showKontaktInformasjon (request, reply) {
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url
  }

  reply.view('kontaktinformasjon', viewOptions)
}

module.exports.showGrunnlag = function showGrunnlag (request, reply) {
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url
  }

  reply.view('grunnlag', viewOptions)
}

module.exports.showBusskort = function showBusskort (request, reply) {
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url
  }

  reply.view('busskort', viewOptions)
}

module.exports.showBusskortNummer = function showBusskortNummer (request, reply) {
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url
  }

  reply.view('busskortnummer', viewOptions)
}

module.exports.showIkkeFunnet = function showIkkeFunnet (request, reply) {
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url
  }

  reply.view('ikkefunnet', viewOptions)
}

module.exports.showVelgSkole = function showVelgSkole (request, reply) {
  const yar = request.yar
  const sessionId = request.yar.id
  const hybel = yar.get('bostedhybel')
  const delt = yar.get('bosteddelt')
  const skoler = require('../lib/data/skoler.json')
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    skoler: skoler
  }

  if (hybel || delt) {
    const key = hybel ? 'see-hybel' : 'see-delt'
    const data = hybel || delt
    request.seneca.act({
      role: 'lookup',
      cmd: 'seeiendom',
      sessionId: sessionId,
      key: key,
      address: extractAdressToGeocode(data)
    })
  }

  reply.view('velgskole', viewOptions)
}

module.exports.showSkoleAdresse = function showSkoleAdresse (request, reply) {
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url
  }

  reply.view('skoleadresse', viewOptions)
}

module.exports.showVelgKlasse = function showVelgKlasse (request, reply) {
  const yar = request.yar
  const sessionId = request.yar.id
  const valgtskole = yar.get('velgskole')
  const skole = getSkoleFromId(valgtskole.skole)
  const destination = unwrapGeocoded(skole)
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url
  }

  request.seneca.act({role: 'session', cmd: 'get', sessionId: sessionId}, function (error, data) {
    if (error) {
      console.error(error)
    } else {
      data.forEach(function (item) {
        if (/^see/.test(item.key)) {
          request.seneca.act({
            role: 'lookup',
            cmd: 'distance',
            key: 'distance-' + item.key,
            sessionId: sessionId,
            origin: unwrapGeocoded(item.data),
            destination: destination
          })
        }
      })
    }

    reply.view('velgklasse', viewOptions)
  })
}

module.exports.showSoktTidligere = function showSoktTidligere (request, reply) {
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url
  }

  reply.view('sokttidligere', viewOptions)
}

module.exports.showSoknadUendret = function showSoknadUendret (request, reply) {
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url
  }

  reply.view('soknaduendret', viewOptions)
}

module.exports.showKvittering = function showKvittering (request, reply) {
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url
  }

  request.cookieAuth.clear()

  reply.view('kvittering', viewOptions)
}

module.exports.doSubmit = function doSubmit (request, reply) {
  const yar = request.yar
  const sessionId = yar.id
  const dsfData = yar.get('dsfData')
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url
  }
  const fodselsNummer = dsfData.FODT.toString() + dsfData.PERS.toString()

  prepareDataForSubmit(request, function (error, document) {
    if (error) {
      console.error(error)
    } else {
      const duplicateData = prepareDuplicateData(document)
      request.seneca.act({role: 'queue', cmd: 'add', data: document})
      request.seneca.act({role: 'duplicate', cmd: 'set', duplicateId: fodselsNummer, data: duplicateData})
      request.seneca.act({role: 'session', cmd: 'clear', sessionId: sessionId})
      reply.redirect('/kvittering', viewOptions)
    }
  })
}

module.exports.showUriktigeOpplysninger = function showUriktigeOpplysninger (request, reply) {
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url
  }

  request.cookieAuth.clear()

  reply.view('uriktigeopplysninger', viewOptions)
}

module.exports.showConfirm = function showConfirm (request, reply) {
  const yar = request.yar
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    dsfData: yar.get('dsfData'),
    korData: yar.get('korData')
  }

  reply.view('confirm', viewOptions)
}

module.exports.checkConfirm = function checkConfirm (request, reply) {
  const yar = request.yar
  const dsfData = yar.get('dsfData')
  const payload = request.payload
  const fodselsNummer = dsfData.FODT.toString() + dsfData.PERS.toString()

  if (payload.confirmed === 'ja') {
    request.seneca.act({role: 'duplicate', cmd: 'check', duplicateId: fodselsNummer}, function checkDuplicated (error, data) {
      if (error) {
        reply(error)
      } else {
        if (data.duplicate || yar.get('tidligereSoknad')) {
          request.yar.set('tidligereSoknad', true)
          reply.redirect('/sokttidligere')
        } else {
          reply.redirect('/next')
        }
      }
    })
  } else {
    reply.redirect('/uriktigeopplysninger')
  }
}
