'use strict'

const getNextForm = require('../lib/get-next-form')
const pkg = require('../package.json')

module.exports.getNext = function (request, reply) {
  const payload = request.payload
  const yar = request.yar
  const nextForm = getNextForm({
    payload: payload,
    yar: yar
  })

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
