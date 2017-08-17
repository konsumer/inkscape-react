#!/usr/bin/env node

var svgtojsx = require('svg-to-jsx')
var readFile = require('fs').readFileSync
var basename = require('path').basename
var indentString = require('indent-string')
var inflection = require('inflection')

var args = require('yargs')
  .usage('Usage: $0 <SVG_FILE>')
  .help()
  .alias('h', 'help')
  .version()
  .alias('v', 'version')

  .demand(1, 'SVG_FILE is required.')
  .argv

svgtojsx(readFile(args._[0])).then(function (jsx) {
  var name = inflection.classify(basename(args._[0], '.svg'))
  if (name.slice(0, 13) === 'InkExtXxxxxx.') {
    name = inflection.classify(name.slice(13))
  }
  console.log([
    'export const ' + name + ' = () => (',
    indentString(jsx, 2),
    ')',
    'export default ' + name
  ].join('\n'))
})
.catch(function (err) {
  console.error(err)
  process.exit(1)
})
