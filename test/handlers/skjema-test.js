'use strict'

const tap = require('tap')
const skjemaHandlers = require('../../handlers/skjema')

tap.equal(Object.keys(skjemaHandlers).length, 16, 'There are 16 skjema handlers')

tap.ok(skjemaHandlers.getNext, 'Handler has method getNext')

tap.ok(skjemaHandlers.showSeOver, 'Handler has method showSeOver')

tap.ok(skjemaHandlers.showBosted, 'Handler has method showBosted')

tap.ok(skjemaHandlers.showBostedHybel, 'Handler has method showBostedHybel')

tap.ok(skjemaHandlers.showBostedDelt, 'Handler has method showBostedDelt')

tap.ok(skjemaHandlers.showPersonalia, 'Handler has method showPersonalia')

tap.ok(skjemaHandlers.showKontaktInformasjon, 'Handler has method showKontaktInformasjon')

tap.ok(skjemaHandlers.showGrunnlag, 'Handler has method showGrunnlag')

tap.ok(skjemaHandlers.showBusskort, 'Handler has method showBusskort')

tap.ok(skjemaHandlers.showBusskortNummer, 'Handler has method showBusskortNummer')

tap.ok(skjemaHandlers.showIkkeFunnet, 'Handler has method showIkkeFunnet')

tap.ok(skjemaHandlers.showVelgSkole, 'Handler has method showVelgSkole')

tap.ok(skjemaHandlers.showVelgKlasse, 'Handler has method showVelgKlasse')

tap.ok(skjemaHandlers.showSoktTidligere, 'Handler has method showSoktTidligere')

tap.ok(skjemaHandlers.showSoknadUendret, 'Handler has method showSoknadUendret')

tap.ok(skjemaHandlers.showKvittering, 'Handler has method showKvittering')
