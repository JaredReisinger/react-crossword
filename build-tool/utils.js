const fs = require('fs');
const path = require('path');
const { DEFAULT_EXTENSIONS } = require('@babel/core');

async function getPackageInfo() {
  const { readPackageUpSync } = await import('read-pkg-up');

  const { packageJson: pkg, path: pkgPath } = readPackageUpSync({
    cwd: fs.realpathSync(process.cwd()),
  });

  const extensions = [...DEFAULT_EXTENSIONS, '.ts', '.tsx'];

  const appDirectory = path.dirname(pkgPath);
  const fromRoot = (...p) => path.join(appDirectory, ...p);

  return {
    pkg,
    fromRoot,
    extensions,
  };
}

module.exports = {
  // pkg,
  // fromRoot,
  // extensions,
  getPackageInfo,
};
