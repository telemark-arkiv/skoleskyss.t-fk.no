'use strict'

const tap = require('tap')
const skjemaHandlers = require('../../handlers/skjema')

tap.equal(Object.keys(skjemaHandlers).length, 9, 'There are 9 standard handlers')

tap.ok(skjemaHandlers.getNext, 'Handler has method getNext')

tap.ok(skjemaHandlers.showSeOver, 'Handler has method showSeOver')

tap.ok(skjemaHandlers.showPersonalia, 'Handler has method showPersonalia')

tap.ok(skjemaHandlers.showKontaktInformasjon, 'Handler has method showKontaktInformasjon')

tap.ok(skjemaHandlers.showGrunnlag, 'Handler has method showGrunnlag')

tap.ok(skjemaHandlers.showBusskort, 'Handler has method showBusskort')

tap.ok(skjemaHandlers.showIkkeFunnet, 'Handler has method showIkkeFunnet')

tap.ok(skjemaHandlers.showVelgSkole, 'Handler has method showVelgSkole')

tap.ok(skjemaHandlers.showSoktTidligere, 'Handler has method showSoktTidligere')
