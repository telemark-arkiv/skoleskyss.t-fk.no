'use strict'

const tap = require('tap')
const skjemaRoutes = require('../../routes/skjema')

tap.equal(skjemaRoutes.length, 18, 'There are 18 skjema routes')
