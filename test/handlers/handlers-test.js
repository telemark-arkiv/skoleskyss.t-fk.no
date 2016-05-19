'use strict'

const tap = require('tap')
const handlers = require('../../handlers')

tap.equal(Object.keys(handlers).length, 3, 'There are 3 standard handlers')

tap.ok(handlers.getFrontpage, 'Handler has method getFrontpage')

tap.ok(handlers.start, 'Handler has method start')

tap.ok(handlers.manuell, 'Handler has method manuell')
