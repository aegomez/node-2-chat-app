// @ts-check
const shell = require('shelljs');

shell.cp('-r', 'src/public/*.html', 'dist/public');