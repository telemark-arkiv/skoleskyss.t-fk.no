'use strict'

const tap = require('tap')
const handlers = require('../../handlers/test')

tap.equal(Object.keys(handlers).length, 2, 'There are 2 test handlers')

tap.ok(handlers.showTest, 'Handler has method showTest')

tap.ok(handlers.setupTest, 'Handler has method setupTest')
