'use strict'

const jwt = require('jsonwebtoken')
const config = require('../config')
const pkg = require('../package.json')

module.exports.showTest = function showTest (request, reply) {
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url
  }

  reply.view('test', viewOptions)
}

module.exports.setupTest = function setupTest (request, reply) {
  const payload = request.payload
  const dsfData = {
    NAVN: payload.NAVN,
    'NAVN-S': payload['NAVN-S'],
    'NAVN-M': payload['NAVN-M'],
    'NAVN-F': payload['NAVN-F'],
    FODT: payload.FODT,
    PERS: payload.PERS,
    ADR: payload.ADR,
    POSTN: payload.POSTN,
    POSTS: payload.POSTS,
    GARD: payload.GARD,
    KOMNR: payload.KOMNR,
    BRUK: payload.BRUK
  }
  const korData = {
    Mobiltelefonnummer: payload.Mobiltelefonnummer,
    Epostadresse: payload.Epostadresse
  }

  if (payload.resetSession) {
    console.log('Testsettings =======> session reset')
    request.yar.reset()
  }

  if (payload.dsfError) {
    console.log('Testsettings =======> applies dsfError')
    request.yar.set('dsfError', true)
  }

  if (payload.korError) {
    console.log('Testsettings =======> applies korError')
    request.yar.set('korError', true)
  }

  request.yar.set('tidligereSoknad', payload.personAlreadyApplied || false)

  request.yar.set('duplikatSoknad', payload.duplicateApplication || false)

  const tokenOptions = {
    expiresIn: '1h',
    issuer: 'https://auth.t-fk.no'
  }

  const data = {
    dsfData: dsfData,
    korData: korData
  }

  const token = jwt.sign(data, config.SKOLESKYSS_JWT_SECRET, tokenOptions)

  request.yar.set('dsfData', data.dsfData)
  request.yar.set('korData', data.korData)

  request.cookieAuth.set({
    token: token,
    isAuthenticated: true,
    data: data
  })

  reply.redirect('/next')
}
