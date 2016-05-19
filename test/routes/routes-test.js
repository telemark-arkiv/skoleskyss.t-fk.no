'use strict'

const tap = require('tap')
const routes = require('../../routes')

tap.equal(routes.length, 3, 'There are 3 standard routes')
