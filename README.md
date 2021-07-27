# Preview

This library helps showing snippets of large or small objects. It is
particularly useful when trying to render snippets of very large
objects.

## Install

```bash
$ yarn add https://github.com/multiprocessio/preview
```

## Examples

While this library is a huge improvement on naive implementations like
`JSON.stringify(x).slice(0, 1000)` for large objects (say 70,000
elements), it's easier to show a small object in an example. So we'll
display a small object but overwrite `preview`'s default number of
results to show.

```javascript
import preview from 'preview';

// The default is 20, so we make it smaller.
const startingNumber = 2;

console.log(preview([
  { a: 1, b: 3, c: 5 },
  { a: 12, b: 8, c: 5 },
  { a: 13, b: 3, c: 9 },
], startingNumber));
```

Once it reaches the starting number of keys, it stops printing
elements. As it recurses into inner objects, the number of keys
shrinks each time as well.

Here is the output of the above script:

```json
[
  { "a": 1, ... },
  { "a": 12, ... },
  ...
]
```

Ellipsis are literally printed. They are only printed if elements have
been skipped by the preview.

### Another example

Here is another example of a more complex object:

```
import preview from 'preview';

const startingNumber = 4;
console.log(preview(
  { a: 12, b: [1, 3, 4], c: null, d: { n: 'foo', m: 19, l: [12] } },
  startingNumber,
))
```

And the result:

```json
{
  "a": 12,
  "b": [ 1, 3, ... ],
  "c": null,
  "d": { "l": [ 12 ], "m": 19, ... }
}
```

Here, ellipsis only show up in the inner objects and not the outer
object because no keys in the outer object were skipped. There were
only four keys and the starting number of keys was four.

## Still confused?

For more details, check out this [blog
post](https://datastation.multiprocess.io/blog/2021-07-15-writing-an-efficient-javascript-object-previewer.html).

## Where did this come from?

This library is used by
[DataStation](https://github.com/multiprocessio/datastation), an
open-source data IDE, to show previews of objects of arbitrary size.

## License

Apache-2.0, see [./LICENSE.md](./LICENSE.md).
