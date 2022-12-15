const path = require('path');
const docgen = require('react-docgen-typescript');

const { name: title, version } = require('./package.json');

const componentsGlob = 'src/**/[A-Z]*.{js,jsx,ts,tsx}';

module.exports = {
  title,
  version,

  styleguideDir: 'styleguide',
  components: componentsGlob,
  moduleAliases: {
    [title]: path.resolve(__dirname, 'src'),
  },

  propsParser: docgen.withCustomConfig('./tsconfig.json', {
    savePropValueAsString: true,
  }).parse,

  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
        },
      ],
    },
  },

  theme: {
    sidebarWidth: '20em',
  },

  styles: (theme) => ({
    // somehow the <th> cells for tables didn't get the expected styleguide
    // theming,so we force the same font information into the body
    StyleGuide: {
      '@global body': { fontFamily: theme.fontFamily.base },
    },
    // Similarly, table cells looks like they're styled to vertical-align: top,
    // but it doesn't actually happen unless we force the issue!
    Table: {
      cellHeading: {
        textAlign: 'left',
        paddingBottom: theme.space[1],
        paddingRight: theme.space[2],
        fontWeight: 'bold',
      },
      cell: {
        verticalAlign: 'top',
        borderTop: [[1, theme.color.border, 'solid']],
        paddingTop: theme.space[1],
        paddingBottom: theme.space[1],
        paddingRight: theme.space[2],

        '&:last-child': {
          verticalAlign: 'top',
          borderTop: [[1, theme.color.border, 'solid']],
          paddingTop: theme.space[1],
          paddingBottom: theme.space[1],
          paddingRight: 0,
        },

        '& p:last-child': {
          marginBottom: 0,
        },
      },
    },

    // Why does styleguidist make these smaller by default?
    Name: {
      name: {
        fontSize: theme.fontSize.text, // not base?
      },
    },
    Type: {
      type: {
        fontSize: theme.fontSize.text, // not base?
      },
    },
  }),

  pagePerSection: true,
  sections: [
    {
      name: 'Simple usage',
      description:
        'For the easiest usage, the `Crossword` component is a simple drop-in component that provides a basic layout and the vast majority of the functionality.',
      components: 'src/Crossword.tsx',
      // usageMode: 'expand',
      // exampleMode: 'expand',
    },
    {
      name: 'Configuration and customization',
      sections: [
        { name: 'Clue input format', content: 'docs/ClueInputFormat.md' },
        { name: 'IPUZ support', content: 'docs/IPUZ.md' },
        { name: 'Styling and theming', content: 'docs/Styling.md' },
      ],
    },
    {
      name: 'Complex layouts',
      description:
        'For more-complex layouts, use the `CrosswordProvider` to drive the crossword logic, and `CrosswordGrid` and `DirectionClues` to render the UI as desired.',
      components: [
        'src/CrosswordProvider.tsx',
        'src/CrosswordGrid.tsx',
        'src/DirectionClues.tsx',
      ],
    },
    {
      name: 'All other components',
      description:
        'You should not typically need to use these components; they are documented here for completeness.',
      components: componentsGlob,
      ignore:
        'src/{Crossword,CrosswordProvider,CrosswordGrid,DirectionClues}.tsx',
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
