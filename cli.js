#!/usr/bin/env node

var svgtojsx = require('svg-to-jsx')
var readFile = require('fs').readFileSync

var args = require('yargs')
  .usage('Usage: $0 <SVG_FILE>')
  .help()
  .alias('h', 'help')
  .version()
  .alias('v', 'version')

  .demand(1, 'SVG_FILE is required.')
  .argv

svgtojsx(readFile(args._[0])).then(function (jsx) {
  console.log(jsx)
})
