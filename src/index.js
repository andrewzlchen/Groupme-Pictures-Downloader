#!/usr/bin/env node

const { main } = require("./cli")
const program = require("commander");

let subcommand 
program
  .arguments('<subcommand>')
  .usage('<subcommand>')
  .action(subcommand => {
    try {
      main(subcommand)
    }
    catch(err) {
      console.error(err);
    }
  })
  .parse(process.argv);


  