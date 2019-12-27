const path = require('path');
const {
  createConfig,
  babel,
  css,
  sass,
  match,
  file,
} = require('webpack-blocks');

const pkg = require('./package.json');

module.exports = {
  title: `${pkg.name} v${pkg.version}`,
  styleguideDir: 'docs',
  components: 'src/**/[A-Z]*.{js,jsx}',
  moduleAliases: {
    [pkg.name]: path.resolve(__dirname, 'src'),
  },
  webpackConfig: createConfig([
    babel(),
    css(),
    match(['*.gif', '*.jpg', '*.jpeg', '*.png', '*.svg', '*.webp'], [file()]),
  ]),
};
