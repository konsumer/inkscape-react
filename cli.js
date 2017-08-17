#!/usr/bin/env node

var svgtojsx = require('svg-to-jsx')
var readFile = require('fs').readFileSync
var basename = require('path').basename
var indentString = require('indent-string')
var classify = require('inflection').classify
var parseString = new (require('xml2js')).Parser().parseString

var args = require('yargs')
  .usage('Usage: $0 <SVG_FILE>')
  .help()
  .alias('h', 'help')
  .version()
  .alias('v', 'version')

  .demand(1, 'SVG_FILE is required.')
  .argv

var svg = readFile(args._[0]).toString()

parseString(svg, function (err, result) {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  var fname = result['svg']['$']['sodipodi:docname']
  if (!fname) {
    fname = basename(args._[0], '.svg')
  }
  var name = classify(basename(fname, '.jsx'))
  svgtojsx(svg)
    .then(function (jsx) {
      console.log([
        "import React from 'react'",
        '',
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
})
