'use strict'

const tap = require('tap')
const skjemaRoutes = require('../../routes/skjema')

tap.equal(skjemaRoutes.length, 12, 'There are 12 skjema routes')
