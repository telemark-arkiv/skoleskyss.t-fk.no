'use strict'

const getWaypoints = require('tfk-saksbehandling-skoleskyss-waypoints')
const config = require('../config')
const getNextForm = require('../lib/get-next-form')
const getSkipSteps = require('../lib/get-skip-steps')
const extractAdressToGeocode = require('../lib/extract-address-to-geocode')
const unwrapGeocoded = require('../lib/unwrap-geocoded')
const getSkoleFromId = require('../lib/get-skole-from-id')
const generateGrunnlagListe = require('../lib/generate-grunnlag-liste')
const generateLinjeListe = require('../lib/generate-studieretning-liste')
const prepareDataForSubmit = require('../lib/prepare-data-for-submit')
const prepareDuplicateData = require('../lib/prepare-data-for-duplicates')
const pkg = require('../package.json')

module.exports.getNext = function (request, reply) {
  const payload = request.payload
  const yar = request.yar
  if (payload) {
    var completedSteps = yar.get('completedSteps') || []
    completedSteps.push(payload.stepName)
    yar.set(payload.stepName, payload)
    yar.set('completedSteps', completedSteps)
    const skipSteps = getSkipSteps(yar._store)
    skipSteps.forEach(function (item) {
      yar.set(item, false)
    })
  }

  const nextForm = getNextForm(yar._store)
  if (payload && payload.stepName === 'velgklasse') {
    prepareDataForSubmit(request, function (error, document) {
      if (error) {
        reply(error)
      } else {
        const dsfData = yar.get('dsfData')
        const fodselsNummer = dsfData.FODT.toString() + dsfData.PERS.toString()
        const duplicateData = prepareDuplicateData(document)
        request.seneca.act({role: 'duplicate', cmd: 'check', duplicateId: fodselsNummer, duplicateData: duplicateData}, function checkDuplicated (error, data) {
          if (error) {
            reply(error)
          } else {
            if (data.duplicate || yar.get('duplikatSoknad')) {
              request.yar.set('duplikatSoknad', true)
              reply.redirect('/soknaduendret')
            } else {
              request.yar.set('duplikatSoknad', false)
              reply.redirect('/' + nextForm)
            }
          }
        })
      }
    })
  } else {
    reply.redirect('/' + nextForm)
  }
}

module.exports.getPreviousStep = function (request, reply) {
  const yar = request.yar
  var completedSteps = yar.get('completedSteps')
  if (completedSteps) {
    const previousStep = completedSteps.pop()
    yar.set('completedSteps', completedSteps)

    if (previousStep === 'skole') {
      yar.clear('velgskole')
      yar.clear('velgklasse')
      yar.clear('skoleadresse')
    }

    if (previousStep === 'grunnlag') {
      yar.clear('grunnlag')
    }

    if (previousStep === 'bosted') {
      yar.clear('bosted')
      yar.clear('bosteddelt')
      yar.clear('bostedhybel')
    }

    if (previousStep === 'busskort') {
      yar.clear('busskort')
      yar.clear('busskortnummer')
    }

    reply.redirect('/' + previousStep)
  } else {
    reply.redirect('/')
  }
}

module.exports.showSeOver = function showSeOver (request, reply) {
  const yar = request.yar
  const korData = yar.get('korData')
  const logoutUrl = korData.logoutUrl || config.SKOLESKYSS_AUTH_URL_LOGOUT
  var viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl
  }

  prepareDataForSubmit(request, function (error, document) {
    if (error) {
      console.error(error)
    } else {
      viewOptions.document = document
    }
    reply.view('seover', viewOptions)
  })
}

module.exports.showBosted = function showBosted (request, reply) {
  const yar = request.yar
  const sessionId = request.yar.id
  const dsfData = yar.get('dsfData')
  const korData = yar.get('korData')
  const logoutUrl = korData.logoutUrl || config.SKOLESKYSS_AUTH_URL_LOGOUT
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl,
    dsfData: dsfData
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
  const yar = request.yar
  const korData = yar.get('korData')
  const logoutUrl = korData.logoutUrl || config.SKOLESKYSS_AUTH_URL_LOGOUT
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl
  }

  reply.view('bostedhybel', viewOptions)
}

module.exports.showBostedDelt = function showBostedDelt (request, reply) {
  const yar = request.yar
  const korData = yar.get('korData')
  const logoutUrl = korData.logoutUrl || config.SKOLESKYSS_AUTH_URL_LOGOUT
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl
  }

  reply.view('bosteddelt', viewOptions)
}

module.exports.showGrunnlag = function showGrunnlag (request, reply) {
  const yar = request.yar
  const korData = yar.get('korData')
  const logoutUrl = korData.logoutUrl || config.SKOLESKYSS_AUTH_URL_LOGOUT
  const grunnlagListe = generateGrunnlagListe(yar._store)
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    grunnlagListe: grunnlagListe,
    logoutUrl: logoutUrl
  }

  reply.view('grunnlag', viewOptions)
}

module.exports.showBusskort = function showBusskort (request, reply) {
  const yar = request.yar
  const korData = yar.get('korData')
  const logoutUrl = korData.logoutUrl || config.SKOLESKYSS_AUTH_URL_LOGOUT
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl
  }

  reply.view('busskort', viewOptions)
}

module.exports.showBusskortNummer = function showBusskortNummer (request, reply) {
  const yar = request.yar
  const korData = yar.get('korData')
  const logoutUrl = korData.logoutUrl || config.SKOLESKYSS_AUTH_URL_LOGOUT
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl
  }

  reply.view('busskortnummer', viewOptions)
}

module.exports.showIkkeFunnet = function showIkkeFunnet (request, reply) {
  const yar = request.yar
  const korData = yar.get('korData')
  const logoutUrl = korData.logoutUrl || config.SKOLESKYSS_AUTH_URL_LOGOUT
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl
  }

  reply.view('ikkefunnet', viewOptions)
}

module.exports.showVelgSkole = function showVelgSkole (request, reply) {
  const yar = request.yar
  const korData = yar.get('korData')
  const logoutUrl = korData.logoutUrl || config.SKOLESKYSS_AUTH_URL_LOGOUT
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
    logoutUrl: logoutUrl,
    skoler: skoler
  }

  if (hybel || delt) {
    const key = hybel ? 'see-hybel' : 'see-delt'
    const data = hybel || delt
    const address = extractAdressToGeocode(data)
    request.seneca.act({
      role: 'lookup',
      cmd: 'seeiendom',
      sessionId: sessionId,
      key: key,
      address: address
    })
  }

  reply.view('velgskole', viewOptions)
}

module.exports.showSkoleAdresse = function showSkoleAdresse (request, reply) {
  const yar = request.yar
  const korData = yar.get('korData')
  const logoutUrl = korData.logoutUrl || config.SKOLESKYSS_AUTH_URL_LOGOUT
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl
  }

  reply.view('skoleadresse', viewOptions)
}

module.exports.showVelgKlasse = function showVelgKlasse (request, reply) {
  const yar = request.yar
  const korData = yar.get('korData')
  const logoutUrl = korData.logoutUrl || config.SKOLESKYSS_AUTH_URL_LOGOUT
  const sessionId = request.yar.id
  const valgtskole = yar.get('velgskole')
  const hybel = yar.get('bostedhybel')
  const delt = yar.get('bosteddelt')
  const dsf = yar.get('dsfData')
  const skole = getSkoleFromId(valgtskole.skole)
  const destination = unwrapGeocoded(skole)

  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl
  }

  if (valgtskole.skole !== '0000') {
    request.seneca.act({role: 'session', cmd: 'get', sessionId: sessionId}, function (error, data) {
      if (error) {
        console.error(error)
      } else {
        data.forEach(function (item) {
          if (/^see/.test(item.key)) {
            var lookup = {
              role: 'lookup',
              cmd: 'distance',
              key: 'distance-' + item.key,
              sessionId: sessionId,
              origin: unwrapGeocoded(item.data),
              destination: destination
            }
            var wp = {}

            if (item.key === 'see-dsf') {
              wp = dsf
            }

            if (item.key === 'see-delt') {
              wp = delt
            }

            if (item.key === 'see-hybel') {
              wp = hybel
            }

            wp.skole = valgtskole.skole
            const waypoints = getWaypoints(wp)

            if (waypoints.length > 0) {
              lookup.waypoints = waypoints
            }

            request.seneca.act(lookup)
          }
        })
      }

      reply.view('velgklasse', viewOptions)
    })
  } else {
    reply.view('velgklasse', viewOptions)
  }
}

module.exports.showVelgStudieretning = function showVelgStudieretning (request, reply) {
  const yar = request.yar
  const korData = yar.get('korData')
  const logoutUrl = korData.logoutUrl || config.SKOLESKYSS_AUTH_URL_LOGOUT
  const valgtskole = yar.get('velgskole')
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl,
    linjeListe: generateLinjeListe(valgtskole.skole)
  }

  reply.view('velgstudieretning', viewOptions)
}

module.exports.showSoktTidligere = function showSoktTidligere (request, reply) {
  const yar = request.yar
  const korData = yar.get('korData')
  const logoutUrl = korData.logoutUrl || config.SKOLESKYSS_AUTH_URL_LOGOUT
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl
  }

  reply.view('sokttidligere', viewOptions)
}

module.exports.showSoknadUendret = function showSoknadUendret (request, reply) {
  const yar = request.yar
  const korData = yar.get('korData')
  const logoutUrl = korData.logoutUrl || config.SKOLESKYSS_AUTH_URL_LOGOUT
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl
  }

  reply.view('soknaduendret', viewOptions)
}

module.exports.showKvittering = function showKvittering (request, reply) {
  const yar = request.yar
  const korData = yar.get('korData')
  const logoutUrl = korData.logoutUrl || config.SKOLESKYSS_AUTH_URL_LOGOUT
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl,
    document: yar.get('submittedData')
  }

  yar.reset()
  request.cookieAuth.clear()
  reply.view('kvittering', viewOptions)
}

module.exports.doSubmit = function doSubmit (request, reply) {
  const yar = request.yar
  const sessionId = yar.id
  const dsfData = yar.get('dsfData')
  const korData = yar.get('korData')
  const fodselsNummer = dsfData.FODT.toString() + dsfData.PERS.toString()

  prepareDataForSubmit(request, function (error, document) {
    if (error) {
      console.error(error)
    } else {
      yar.set('submittedData', document)
      const duplicateData = prepareDuplicateData(document)
      request.seneca.act({role: 'queue', cmd: 'add', data: document})
      request.seneca.act({role: 'counter', cmd: 'add', key: 'skoleskyss/queue'})
      request.seneca.act({role: 'info', info: 'skoleskyss', data: document})
      request.seneca.act({role: 'duplicate', cmd: 'set', duplicateId: fodselsNummer, data: duplicateData})
      request.seneca.act({role: 'session', cmd: 'clear', sessionId: sessionId})
      if (korData.MobilePhone !== '') {
        request.seneca.act({role: 'message', cmd: 'sms', phone: korData.MobilePhone})
      }
      reply.redirect('/kvittering')
    }
  })
}

module.exports.showUriktigeOpplysninger = function showUriktigeOpplysninger (request, reply) {
  const yar = request.yar
  const korData = yar.get('korData')
  const logoutUrl = korData.logoutUrl || config.SKOLESKYSS_AUTH_URL_LOGOUT
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl
  }

  yar.reset()
  request.cookieAuth.clear()

  reply.view('uriktigeopplysninger', viewOptions)
}

module.exports.showConfirm = function showConfirm (request, reply) {
  const yar = request.yar
  const korData = yar.get('korData')
  const logoutUrl = korData.logoutUrl || config.SKOLESKYSS_AUTH_URL_LOGOUT
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl,
    dsfData: yar.get('dsfData'),
    korData: korData
  }

  reply.view('confirm', viewOptions)
}

module.exports.checkConfirm = function checkConfirm (request, reply) {
  const yar = request.yar
  const dsfData = yar.get('dsfData')
  const payload = request.payload
  const fodselsNummer = dsfData.FODT.toString() + dsfData.PERS.toString()

  if (payload.confirmed === 'ja') {
    var completedSteps = yar.get('completedSteps') || []
    completedSteps.push('confirm')
    yar.set('completedSteps', completedSteps)
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

module.exports.setupChanges = function setupChanges (request, reply) {
  const yar = request.yar
  const type = request.query.type

  if (type === 'skole') {
    yar.clear('velgskole')
    yar.clear('velgklasse')
    yar.clear('skoleadresse')
  }

  if (type === 'grunnlag') {
    yar.clear('grunnlag')
  }

  if (type === 'bosted') {
    yar.clear('bosted')
    yar.clear('bosteddelt')
    yar.clear('bostedhybel')
  }

  if (type === 'busskort') {
    yar.clear('busskort')
    yar.clear('busskortnummer')
  }

  reply.redirect('/next')
}
