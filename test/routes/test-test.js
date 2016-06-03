'use strict'

const tap = require('tap')
const routes = require('../../routes/test')

tap.equal(routes.length, 2, 'There are 2 test routes')
