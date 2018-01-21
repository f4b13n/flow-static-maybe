// @flow
import tape from 'tape'
import * as M from '../src/Maybe'


const toUpperCase = (s: string) => s.toUpperCase()


tape('Maybe#nothing', t => {
  t.is(M.nothing(), null)
  t.end()
})

tape('Maybe#just', t => {
  t.is(M.just('foo'), 'foo')
  t.end()
})

tape('Maybe#fromNullable', t => {
  t.is(M.fromNullable(null), M.nothing())
  t.is(M.fromNullable(undefined), M.nothing())
  t.is(M.fromNullable('foo'), M.just('foo'))
  t.end()
})

tape('Maybe#isNothing', t => {
  t.ok(M.isNothing(M.nothing()))
  t.notOk(M.isNothing(M.just('foo')))
  t.end()
})

tape('Maybe#isJust', t => {
  t.notOk(M.isJust(M.nothing()))
  t.ok(M.isJust(M.just('foo')))
  t.end()
})

tape('Maybe#map', t => {
  t.is(M.map(toUpperCase, M.nothing()), M.nothing())
  t.is(M.map(toUpperCase, M.just('foo')), M.just('FOO'))
  t.end()
})

tape('Maybe#ap', t => {
  t.is(M.ap(M.nothing(), M.nothing()), M.nothing())
  t.is(M.ap(M.nothing(), M.just(2)), M.nothing())
  t.is(M.ap(M.just(toUpperCase), M.nothing()), M.nothing())
  t.is(M.ap(M.just(toUpperCase), M.just('foo')), M.just('FOO'))
  t.end()
})

tape('Maybe#chain', t => {
  t.is(M.chain(x => M.nothing(), M.nothing()), M.nothing())
  t.is(M.chain(x => M.just(toUpperCase(x)), M.nothing()), M.nothing())
  t.is(M.chain(x => M.just(toUpperCase(x)), M.just('foo')), M.just('FOO'))
  t.end()
})

tape('Maybe#fold', t => {
  t.is(M.fold({ Nothing: () => 'bar', Just: toUpperCase }, M.nothing()), 'bar')
  t.is(M.fold({ Nothing: () => 'bar', Just: toUpperCase }, M.just('foo')), 'FOO')
  t.end()
})

tape('Maybe#get', t => {
  try {
    M.get(M.nothing())
    t.fail('should throw an error')
  } catch (e) {
    t.pass('should throw an error')
  }
  t.is(M.get(M.just('foo')), 'foo')
  t.end()
})

tape('Maybe#getOrElse', t => {
  t.is(M.getOrElse('bar', M.nothing()), 'bar')
  t.is(M.getOrElse('bar', M.just('foo')), 'foo')
  t.end()
})

tape('Maybe#all', t => {
  t.is(M.all([M.nothing(), M.nothing()]), M.nothing())
  t.is(M.all([M.just('foo'), M.nothing()]), M.nothing())
  t.is(M.all([M.nothing(), M.just('foo')]), M.nothing())
  t.same(M.all([M.just('foo'), M.just('bar')]), M.just(['foo', 'bar']))
  t.end()
})
