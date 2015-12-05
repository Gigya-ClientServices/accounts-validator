#!/usr/bin/env node

// Dependencies
var
  _           = require('lodash')
  , async       = require('async')
  , fs          = require('fs')
  , JSONStream  = require('JSONStream')
;

var filename = process.argv[2];
var stream;
var recordCount = 0;
var lastUID = '';

_.isUnset = function (obj) {
  return (_.isNull(obj) || _.isUndefined(obj));
}
_.isSet = function(obj) {
  return !(_.isUnset(obj));
}


function main() {
  try {
    if (process.argv.length < 3) {
      console.log("Usage:");
      console.log("" + process.argv[1] + " <JSON File to Read>");
      return;
    }

    console.error("\nValidating " + process.argv[2]);
    console.error("============" + new Array(_.size(process.argv[2])).join("=") + "\n");

    stream = fs.createReadStream(filename, {flags: 'r', encoding: 'utf-8'});
    stream.pipe(JSONStream.parse('accounts.*'))
      .on('data', function(d) {
        recordCount = recordCount + 1;
        lastUID = d.UID;
      })
      .on('error', function(err) {
        fs.close();
        console.error(err);
      })
      .on('end', function() {
        console.error("Records Read: " + recordCount);
        console.error("Last Record Read: " + lastUID);
      })
    ;
  } catch(err) {
    console.error(err);
    console.error("Records Read: " + recordCount);
    console.error("Last Record Read: " + lastUID);
  }
}

main();
