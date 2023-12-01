# escaped-csv

Just needed a tiny, no-dependencies CSV generator that works in node and the browser.

It takes an array of array of strings, numbers, and or Date objects and then spits out a CSV string with any string values escaped and thereby protected (hopefully) from any type of CSV injection attack (see: https://owasp.org/www-community/attacks/CSV_Injection and: http://georgemauer.net/2017/10/07/csv-injection.html).

## installation

```
npm install escaped-csv
```

## example

```js
const { toCSVString, toCSVDataURI } = require('escaped-csv')

const data = [
  // row one
  ['a', new Date(), 4.75],
  // row two, etc.,
]

const csvString = toCSVString(data)
console.log(csvString)
// "a","2020-01-01T00:00:00.000Z","4.75"

const csvDataURI = toCSVDataURI([['hi', 'there']])
console.log(csvDataURI)
// 'data:text/csv;charset=utf-8,%22hi%22%2C%22there%22'
```

If you want to generate CSV clientside in JS, you can use the `toCSVDataURI` function to generate a data URI that you can then use to download the CSV file.

```js
const encodedUri = toCSVDataURI(DATA)
const link = document.createElement('a')
link.setAttribute('href', encodedUri)
link.setAttribute('download', 'my_data.csv')
link.click()
```

## Running tests

```
npm test
```

## Change log

- `1.0.0`: First published release

## license

[MIT](http://mit.joreteg.com/)
