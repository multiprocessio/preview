const { preview } = require('./preview');

test('preview', () => {
  expect(preview([{ foo: 1, bar: [2], blub: null }])).toBe(
    '[\n  { "bar": [ 2 ], "blub": null, "foo": 1 }\n]'
  );

  expect(preview('foo')).toBe('foo');

  expect(
    preview(
      [
        { a: 1, b: 3, c: 5 },
        { a: 12, b: 8, c: 5 },
        { a: 13, b: 3, c: 9 },
      ],
      2
    )
  ).toBe('[\n  { "a": 1, ... },\n  { "a": 12, ... },\n  ...\n]');

  expect(
    preview(
      { a: 12, b: [1, 3, 4], c: null, d: { n: 'foo', m: 19, l: [12] } },
      4
    )
  ).toBe(
    '{\n  "a": 12,\n  "b": [ 1, 3, ... ],\n  "c": null,\n  "d": { "l": [ 12 ], "m": 19, ... }\n}'
  );
});
