const fs = require('fs');
const path = require('path');
const readPkgUp = require('read-pkg-up');
const { DEFAULT_EXTENSIONS } = require('@babel/core');

const { packageJson: pkg, path: pkgPath } = readPkgUp.sync({
	cwd: fs.realpathSync(process.cwd()),
});

const extensions = [...DEFAULT_EXTENSIONS, '.ts', '.tsx'];

const appDirectory = path.dirname(pkgPath);
const fromRoot = (...p) => path.join(appDirectory, ...p);

module.exports = {
	pkg,
	fromRoot,
	extensions,
};
