'use strict'

const pkg = require('../package.json')

module.exports.getFrontpage = function getFrontpage (request, reply) {
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url
  }

  reply.view('index', viewOptions)
}

module.exports.start = function start (request, reply) {
  const yar = request.yar
  const introOk = yar.get('introOk')
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url
  }

  if (introOk) {
    reply.redirect('confirm')
  } else {
    reply.view('index', viewOptions)
  }
}

module.exports.checkStart = function (request, reply) {
  const yar = request.yar
  const dsfError = yar.get('dsfError')
  const korError = yar.get('korError')

  yar.set('introOk', true)

  if (dsfError || korError) {
    reply.redirect('/ikkefunnet')
  } else {
    reply.redirect('/confirm')
  }
}

module.exports.manuell = function start (request, reply) {
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url
  }

  reply.view('index', viewOptions)
}

module.exports.hjelp = function hjelp (request, reply) {
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url
  }

  reply.view('hjelp', viewOptions)
}

module.exports.vilkar = function vilkar (request, reply) {
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url
  }

  reply.view('vilkar', viewOptions)
}

module.exports.personvern = function vilkar (request, reply) {
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url
  }

  reply.view('personvern', viewOptions)
}
