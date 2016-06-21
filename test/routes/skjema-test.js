'use strict'

const tap = require('tap')
const skjemaRoutes = require('../../routes/skjema')

tap.equal(skjemaRoutes.length, 26, 'There are 26 skjema routes')
