const test = require('tape')
const {
  escapeStringCell,
  toCSVString,
  escapeCSVContents,
  toCSVDataURI,
} = require('./index')

test('toCSVString', t => {
  t.equal(escapeStringCell('+++=-+c2+c8'), 'c2+c8')
  t.equal(escapeStringCell('5m'), '5m')
  t.equal(toCSVString([['a', 'b', 'c']]), '"a","b","c"')

  const fieldContentScenarios = [
    ['a', '"a"'],
    ['=c2+c8', '"c2+c8"'],
    ['  should trim  ', '"should trim"'],
    ['   47 mg', '"47 mg"'],
  ]

  for (const [input, output] of fieldContentScenarios) {
    t.deepEqual(
      escapeCSVContents([[input]]),
      [[output]],
      `${input} => ${output}`,
    )
  }

  t.equal(
    toCSVDataURI([['hi', 'there']]),
    'data:text/csv;charset=utf-8,%22hi%22%2C%22there%22',
  )

  t.end()
})
