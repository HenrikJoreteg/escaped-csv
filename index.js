// @ts-check
/**
 * @typedef {string | number | Date} CellInput
 * @typedef {CellInput[]} RowInput
 * @typedef {string | number} CellOutput
 * @typedef {CellOutput[]} RowOutput
 */

/**
 * Potentially risky characters =+-@ (and Tab and Carriage Return) no cells
 * should begin with these.
 *
 * We replace all the risky characters with empty string and then trim the
 * string which eliminates the Tab and Carriage Return.
 *
 * More info: https://owasp.org/www-community/attacks/CSV_Injection and:
 * http://georgemauer.net/2017/10/07/csv-injection.html
 *
 * @param {string} str
 * @returns {string}
 */
const escapeStringCell = str => str.replace(/^[=+\-@]+/, '').trim()

/**
 *
 * @param {RowInput[]} rows
 * @returns {RowOutput[]}
 */
const escapeCSVContents = rows =>
  rows.map(row =>
    row.map(cellValue => {
      // if it's a string, that is not already escaped we escape it
      if (typeof cellValue === 'string') {
        let value = escapeStringCell(cellValue)
        const isAlreadyEscaped = value.startsWith('"') && value.endsWith('"')
        if (!isAlreadyEscaped) {
          // in CSV
          // strings containing commas cause issues unless you
          // wrap cell in quotes.
          // A " within a cell can be escaped by replacing it with ""
          return `"${value.replace(/"/g, '""')}"`
        }
      } else if (typeof cellValue === 'number') {
        return isNaN(cellValue) ? '' : cellValue
      } else if (cellValue instanceof Date) {
        try {
          return cellValue.toISOString()
        } catch (err) {
          return null
        }
      }
      return ''
    }),
  )

const CSVDataURIPrefix = 'data:text/csv;charset=utf-8,'

const toCSVString = (rows, separator = ',') =>
  escapeCSVContents(rows)
    .map(row => row.join(separator))
    .join('\n')

const toCSVDataURI = rows =>
  `${CSVDataURIPrefix}${encodeURIComponent(toCSVString(rows))}`

module.exports = {
  escapeStringCell,
  escapeCSVContents,
  toCSVString,
  toCSVDataURI,
}
