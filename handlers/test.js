'use strict'

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

  console.log(payload)

  if (payload.resetSession) {
    console.log('session reset')
    request.yar.reset()
  }

  if (payload.personNotFound) {
    console.log('applies not found variable')
    request.yar.set('dsfNotFound', true)
  }

  if (payload.personAlreadyApplied) {
    console.log('applies previous application detected')
    request.yar.set('previousApplicationDetected', true)
  }

  if (payload.duplicateApplication) {
    console.log('applies duplicate application detected')
    request.yar.set('duplicateApplicationDetected', true)
  }

  reply.redirect('/next')
}
