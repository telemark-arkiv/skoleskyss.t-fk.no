'use strict'

const tap = require('tap')
const handlers = require('../../handlers')

tap.equal(Object.keys(handlers).length, 6, 'There are 6 standard handlers')

tap.ok(handlers.getFrontpage, 'Handler has method getFrontpage')

tap.ok(handlers.start, 'Handler has method start')

tap.ok(handlers.manuell, 'Handler has method manuell')

tap.ok(handlers.hjelp, 'Handler has method hjelp')

tap.ok(handlers.vilkar, 'Handler has method vilkar')

tap.ok(handlers.personvern, 'Handler has method personvern')
