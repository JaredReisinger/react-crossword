One other major difference (and advantage) to this crossword component is that it is very "stylable"... as many of the styling properties as possible are exposed so that you can create any look you want for the crossword. The `Crossword` component makes use of [styled-components' `ThemeProvider`](https://styled-components.com/docs/advanced#theming) and offers the following properties to control colors and layout:

| theme property        | default               | description                                                                                                                                                                 |
| --------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `allowNonSquare`      | `false`               | allows crossword rendering to be non-square (i.e. a different number of rows and columns)                                                                                   |
| `columnBreakpoint`    | `'768px'`             | browser-width at which the clues go from showing beneath the grid to showing beside the grid                                                                                |
| `gridBackground`      | `'rgb(0,0,0)'`        | overall background color (fill) for the crossword grid. Can be `'transparent'` to show through a page background image.                                                     |
| `cellBackground`      | `'rgb(255,255,255)'`  | background for an answer cell                                                                                                                                               |
| `cellBorder`          | `'rgb(0,0,0)'`        | border for an answer cell                                                                                                                                                   |
| `textColor`           | `'rgb(0,0,0)'`        | color for answer text (entered by the player)                                                                                                                               |
| `numberColor`         | `'rgba(0,0,0, 0.25)'` | color for the across/down numbers in the grid                                                                                                                               |
| `focusBackground`     | `'rgb(255,255,0)'`    | background color for the cell with focus, the one that the player is typing into                                                                                            |
| `highlightBackground` | `'rgb(255,255,204)'`  | background color for the cells in the answer the player is working on, helps indicate in which direction focus will be moving; also used as a background on the active clue |

Note that these values can be provided either via `ThemeProvider`, or directly as a `theme` property on the `Crossword` component itself. (And further, if you're not using styled-components, but want to make use of `ThemeProvider`, this library re-exports `ThemeProvider` so you can pull it from here.)

#### Using `ThemeProvider`

```jsx
import Crossword, { ThemeProvider } from '@jaredreisinger/react-crossword';

const data = {
  across: {
    1: {
      clue: 'one plus one',
      answer: 'TWO',
      row: 0,
      col: 0,
    },
  },
  down: {
    2: {
      clue: 'opposite of "off"',
      answer: 'ON',
      row: 0,
      col: 2,
    },
  },
};

<div style={{ width: '30%' }}>
  <ThemeProvider
    theme={{
      allowNonSquare: true,
      columnBreakpoint: '9999px',
      gridBackground: '#acf',
      cellBackground: '#ffe',
      cellBorder: '#fca',
      textColor: '#fff',
      numberColor: '#9f9',
      focusBackground: '#f00',
      highlightBackground: '#f99',
    }}
  >
    <Crossword data={data} />
  </ThemeProvider>
</div>;
```

#### Using `theme` property

```jsx
import Crossword from '@jaredreisinger/react-crossword';

const data = {
  across: {
    1: {
      clue: 'one plus one',
      answer: 'TWO',
      row: 0,
      col: 0,
    },
  },
  down: {
    2: {
      clue: 'opposite of "off"',
      answer: 'ON',
      row: 0,
      col: 2,
    },
  },
};

<div style={{ width: '30%' }}>
  <Crossword
    data={data}
    theme={{
      allowNonSquare: true,
      columnBreakpoint: '9999px',
      gridBackground: '#acf',
      cellBackground: '#ffe',
      cellBorder: '#fca',
      textColor: '#fff',
      numberColor: '#9f9',
      focusBackground: '#f00',
      highlightBackground: '#f99',
    }}
  />
</div>;
```

Also, several class names are applied to elements in the crossword, in case you want to apply styles that way:

| element                                                              | class name  |
| -------------------------------------------------------------------- | ----------- |
| entire crossword component; encompassing grid and clues              | `crossword` |
| entire crossword is correct (on same element as `crossword`)         | `correct`   |
| answer grid                                                          | `grid`      |
| all of the clues                                                     | `clues`     |
| header and clues for one direction                                   | `direction` |
| direction header ('across' or 'down')                                | `header`    |
| an individual clue                                                   | `clue`      |
| an individual clue with a correct answer (on same element as `clue`) | `correct`   |

(No class names are currently applied within the grid, as the SVG layout is _**very**_ layout-sensitive.)
