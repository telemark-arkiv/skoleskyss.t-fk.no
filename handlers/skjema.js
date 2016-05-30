'use strict'

const getNextForm = require('../lib/get-next-form')
const getSkipSteps = require('../lib/get-skip-steps')
const extractAdressToGeocode = require('../lib/extract-address-to-geocode')
const pkg = require('../package.json')

module.exports.getNext = function (request, reply) {
  const payload = request.payload
  const yar = request.yar
  if (payload) {
    yar.set(payload.stepName, payload)
    const skipSteps = getSkipSteps(yar._store)
    skipSteps.forEach(function (item) {
      yar.set(item, true)
    })
  }

  const nextForm = getNextForm(yar._store)

  reply.redirect('/' + nextForm)
}

module.exports.showSeOver = function showSeOver (request, reply) {
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url
  }

  reply.view('seover', viewOptions)
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
  const skoler = require('../lib/data/skoler.json')
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    skoler: skoler
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
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url
  }

  reply.view('velgklasse', viewOptions)
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

  reply.view('kvittering', viewOptions)
}
