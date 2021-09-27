#! /usr/bin/env node

var quoter = require("./index.js");

var arg = process.argv[2];

if (arg == "--offline") quoter(false);
else quoter(true);
