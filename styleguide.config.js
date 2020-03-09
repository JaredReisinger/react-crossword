const path = require('path');
const {
  createConfig,
  babel,
  css,
  // sass,
  match,
  file,
} = require('webpack-blocks');

const { name: title, version } = require('./package.json');

const componentsGlob = 'src/**/[A-Z]*.{js,jsx}';

module.exports = {
  title,
  version,

  styleguideDir: 'styleguide',
  // components: componentsGlob,
  moduleAliases: {
    [title]: path.resolve(__dirname, 'src'),
  },

  webpackConfig: createConfig([
    babel(),
    css(),
    match(['*.gif', '*.jpg', '*.jpeg', '*.png', '*.svg', '*.webp'], [file()]),
  ]),

  theme: {
    sidebarWidth: '20em',
  },

  // somehow the <th> cells for tables didn't get the expected styleguide
  // theming,so we force the same font information into the body
  styles: theme => ({
    StyleGuide: {
      '@global body': { fontFamily: theme.fontFamily.base },
    },
  }),

  pagePerSection: true,
  sections: [
    {
      name: 'Default component',
      description:
        'By and large you should only ever care about the default export from this library, the `Crossword` component itself.',
      components: 'src/Crossword/Crossword.js',
      // usageMode: 'expand',
      exampleMode: 'expand',
    },
    {
      name: 'All components',
      components: componentsGlob,
      // ignore: 'src/Crossword/Crossword.{js,jsx}',
    },
    {
      name: 'Installable package (npm)',
      href: 'https://www.npmjs.com/package/@jaredreisinger/react-crossword',
    },
    {
      name: 'Source code (GitHub)',
      href: 'https://github.com/JaredReisinger/react-crossword',
    },
  ],
};
