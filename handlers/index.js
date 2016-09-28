'use strict'

const jwt = require('jsonwebtoken')
const config = require('../config')
const encryptorKey = config.SKOLESKYSS_ENCRYPTOR_KEY
const encryptor = require('simple-encryptor')(encryptorKey)
const pkg = require('../package.json')

module.exports.getFrontpage = function getFrontpage (request, reply) {
  const yar = request.yar
  const korData = yar.get('korData')
  const logoutUrl = config.SKOLESKYSS_AUTH_URL_LOGOUT
  const dsfError = yar.get('dsfError')
  const korError = yar.get('korError')
  var completedSteps = yar.get('completedSteps') || []
  completedSteps.push('')
  yar.set('completedSteps', completedSteps)

  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl
  }

  if (dsfError || korError) {
    request.cookieAuth.clear()
    reply.redirect('/ikkefunnet')
  } else {
    reply.view('index', viewOptions)
  }
}

module.exports.start = function start (request, reply) {
  const yar = request.yar
  const receivedToken = request.query.jwt
  const jwtDecrypted = jwt.verify(receivedToken, config.SKOLESKYSS_JWT_SECRET)
  const data = encryptor.decrypt(jwtDecrypted.data)

  const tokenOptions = {
    expiresIn: '1h',
    issuer: 'https://auth.t-fk.no'
  }

  const token = jwt.sign(data, config.SKOLESKYSS_JWT_SECRET, tokenOptions)

  yar.reset()
  yar.set('dsfData', data.dsfData)
  yar.set('korData', data.korData)
  yar.set('skjemaUtfyllingStart', new Date().getTime())

  const dsfError = data.dsfError
  const korError = data.korError

  if (dsfError || korError) {
    if (dsfError && dsfError.CODE === '4') {
      reply.redirect('/failwhale')
    } else {
      reply.redirect('/ikkefunnet')
    }
  } else {
    request.cookieAuth.set({
      token: token,
      isAuthenticated: true,
      data: data
    })

    reply.redirect('/')
  }
}

module.exports.checkStart = function (request, reply) {
  const yar = request.yar
  const dsfError = yar.get('dsfError')
  const korError = yar.get('korError')

  yar.set('introOk', true)

  if (dsfError || korError) {
    request.cookieAuth.clear()
    reply.redirect('/ikkefunnet')
  } else {
    reply.redirect('/confirm')
  }
}

module.exports.hjelp = function hjelp (request, reply) {
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

  reply.view('hjelp', viewOptions)
}

module.exports.vilkar = function vilkar (request, reply) {
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

  reply.view('vilkar', viewOptions)
}

module.exports.personvern = function vilkar (request, reply) {
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

  reply.view('personvern', viewOptions)
}

module.exports.loggAv = function start (request, reply) {
  const yar = request.yar
  const logoutUrl = config.SKOLESKYSS_AUTH_URL_LOGOUT

  request.cookieAuth.clear()
  yar.reset()

  reply.redirect(logoutUrl)
}
