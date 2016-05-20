'use strict'

const pkg = require('../package.json')

module.exports.getNext = function (request, reply) {
  const payload = request.payload

  if (payload.alternativtBosted) {
    reply.redirect('/alternativtbosted')
  } else if (payload.velgSkole) {
    reply.redirect('/velgskole')
  } else {
    reply.redirect('/seover')
  }

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

module.exports.showAlternativtBosted = function showAlternativtBosted (request, reply) {
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url
  }

  reply.view('alternativtbosted', viewOptions)
}

module.exports.showVelgSkole = function showVelgSkole (request, reply) {
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url
  }

  reply.view('velgskole', viewOptions)
}
