// @ts-check
const shell = require('shelljs');

shell.cp('-r', 'src/public/*.html', 'dist/public');
shell.cp('-r', 'src/public/css', 'dist/public');
shell.cp('-r', 'src/public/js/lib', 'dist/public/js');