#!/usr/bin/env node

const { program } = require('commander');
const pkg = require('../package.json');
const checkNode = require('../lib/checkNode');
const startServer = require('../lib/start/startServer')
const buildServer = require('../lib/build/buildServer')

const MIN_NODE_VERSION = '8.9.0';

try {
  if (!checkNode(MIN_NODE_VERSION)) {
    throw new Error('Please upgrade your node version to v' + MIN_NODE_VERSION);
  }

  program.version(pkg.version)

  program
    .command('start')
    .description('start server by cli-build ')
    .allowUnknownOption()
    .action(startServer)

    program
    .command('build')
    .description('build project by cli-build')
    .allowUnknownOption()
    .action(buildServer)

  program.parse(process.argv)
} catch (e) {
  console.log(e.message);
}
