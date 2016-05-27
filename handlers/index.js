'use strict'

const jwt = require('jsonwebtoken')
const config = require('../config')
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
  const token = request.header.Authorization
  const decoded = jwt.decode(token, config.SKOLESKYSS_JWT_SECRET)
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url
  }
  request.yar.set('dsfData', decoded.data.dsfData)
  request.yar.set('kontaktOgReservasjonsData', decoded.data.kontaktOgReservasjonsData)

  request.cookieAuth.set({
    token: token,
    isAuthenticated: true,
    data: decoded.data
  })
  
  reply.view('index', viewOptions)
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
