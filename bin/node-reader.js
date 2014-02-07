#!/usr/bin/env node
/*
*** node-reader --- command-line RSS reader
*** Developer: Oleksii Kulikov
*** Email: yeexel@gmail.com
*/
var argv = require('optimist').argv;
var path = require('path');
var Reader = require(path.join(__dirname, '../lib/reader' ));

if ( argv.add ) { Reader.add(); }
else if ( argv.purge ) { Reader.purge(); }
else if ( argv.list ) { Reader.list(); }
else if ( argv.read ) { Reader.read(); }
else if ( argv.help ) { Reader.help(); }
else { Reader.help(); }
