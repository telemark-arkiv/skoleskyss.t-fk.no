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
    console.log('resetter session')
    request.yar.reset()
  }

  reply.redirect('/next')
}
