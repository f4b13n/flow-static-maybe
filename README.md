# Flow Static Maybe

A simple [Opaque Type Alias](https://flow.org/en/docs/types/opaque-types/) as an alternative to _Flow_ [Maybe Types](https://flow.org/en/docs/types/maybe/).

```js
opaque type Maybe<A> = null | A
```

## Benefits of using an opaque type

> Opaque type aliases are type aliases that do not allow access to their underlying type outside of the file in which they are defined.

This guarantees that a value of `Maybe` type can be created and manipulated only by using the provided functions.

```js
// @flow
import type { Maybe } from 'flow-static-maybe'
import { just, nothing } from 'flow-static-maybe'

const a: Maybe<string> = null        // null This type is incompatible with Maybe
const b: Maybe<string> = 'foo'       // string This type is incompatible with Maybe
const c: Maybe<string> = just('foo') // yay !
const d: Maybe<string> = nothing()   // yay !
```

## API

`nothing :: () -> Maybe a`

```js
// @flow
import type { Maybe } from 'flow-static-maybe'
import { nothing } from 'flow-static-maybe'

const a: Maybe<string> = nothing() // null
```

`just :: a -> Maybe a`

```js
// @flow
import type { Maybe } from 'flow-static-maybe'
import { just } from 'flow-static-maybe'

const a: Maybe<string> = just('foo') // "foo"
```

`fromNullable :: a | null | undefined -> Maybe a`

```js
// @flow
import { fromNullable } from 'flow-static-maybe'

const a: Maybe<string> = fromNullable(null)      // null
const b: Maybe<string> = fromNullable(undefined) // null
const c: Maybe<string> = fromNullable('foo')     // "foo"
```

`all :: [Maybe a] -> Maybe [a]`

```js
// @flow
import { all, just, nothing } from 'flow-static-maybe'

all([just('foo'), just('bar')]) // ["foo", "bar"]
all([just('foo'), nothing()])   // null
```

`isNothing :: Maybe a -> Boolean`

```js
// @flow
import { isNothing, just, nothing } from 'flow-static-maybe'

isNothing(just('foo')) // false
isNothing(nothing())   // true
```

`isJust :: Maybe a -> Boolean`

```js
// @flow
import { isJust, just, nothing } from 'flow-static-maybe'

isJust(just('foo')) // true
isJust(nothing())   // false
```

`map :: (a -> b) -> Maybe a -> Maybe b` (supports currying)

```js
// @flow
import { just, map, nothing } from 'flow-static-maybe'

const toUpperCase = (s: string) => x.toUpperCase()

map(toUpperCase, just('foo')) // "FOO"
map(toUpperCase, nothing())   // null
```

`ap :: Maybe (a -> b) -> Maybe a -> Maybe b` (supports currying)

```js
// @flow
import { ap, just, nothing } from 'flow-static-maybe'

ap(just(x => x + 2), just(2))   // 4
ap(just(x => x + 2), nothing()) // null
ap(nothing(), just(2))          // null
ap(nothing(), nothing())        // null
```

`chain :: (a -> Maybe b) -> Maybe a -> Maybe b` (supports currying)

```js
import { chain, fromNullable, just, nothing } from 'flow-static-maybe'

const list = [{ id: 1 }, { id: 2 }, { id: 3 }]
const find = (id: number) => fromNullable(list.find(it => it.id === id))

chain(find, just(2))   // { id: 2 }
chain(find, just(5))   // null
chain(find, nothing()) // null
```

`getOrElse :: a -> Maybe a -> a` (supports currying)

```js
// @flow
import { getOrElse, just, nothing } from 'flow-static-maybe'

getOrElse('bar', just('foo')) // "foo"
getOrElse('bar', nothing())   // "bar"
```

`fold :: { Nothing: () -> b, Just: a -> b } -> Maybe a -> b` (supports currying)

```js
// @flow
import { fold, just, nothing } from 'flow-static-maybe'

const square = (n: number) => n * n

fold({ Nothing: () => -1, Just: square }, just(2))   // 4
fold({ Nothing: () => -1, Just: square }, nothing()) // -1
```

:warning: `get :: Maybe a -> a`

```js
// @flow
import { get, just, nothing } from 'flow-static-maybe'

get(just(2))   // 2
get(nothing()) // throws an error
```

## Inspirations

* [static-land](https://github.com/rpominov/static-land)
* [flow-static-land](https://github.com/gcanti/flow-static-land)
* [Hiding Implementation Details With Flow’s New Opaque Type Aliases Feature](https://medium.com/flow-type/hiding-implementation-details-with-flows-new-opaque-type-aliases-feature-40e188c2a3f9)
