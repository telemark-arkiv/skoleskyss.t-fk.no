'use strict'

const tap = require('tap')
const skjemaRoutes = require('../../routes/skjema')

tap.equal(skjemaRoutes.length, 17, 'There are 17 skjema routes')
