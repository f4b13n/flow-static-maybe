import curry from 'ramda/src/curry'
import prepend from 'ramda/src/prepend'


export function nothing() {
  return null
}

export function just(a) {
  return a
}

export function fromNullable(a) {
  return a === undefined ? null : a
}

export function isNothing(fa) {
  return fa === null
}

export function isJust(fa) {
  return fa !== null
}

export const map = curry(function _map(f, fa) {
  return fa !== null ? f(fa) : fa
})

export const ap = curry(function _ap(fab, fa) {
  return fa !== null ? map(f => f(fa), fab) : fa
})

export const chain = curry(function _chain(f, fa) {
  return fa !== null ? f(fa) : fa
})

export const fold = curry(function _fold({ Nothing, Just }, fa) {
  return fa !== null ? Just(fa) : Nothing()
})

export const getOrElse = curry(function _getOrElse(a, fa) {
 return fa !== null ? fa : a
})

export function get(fa) {
  if (fa === null) {
    throw new TypeError('Can\'t extract the value of a Nothing')
  }
  return fa
}

export function all(arr) {
  return arr.reduceRight((acc, it) => ap(map(prepend, it), acc), [])
}
