_**NOTE:** Due to a short-coming in react-docgen, the methods exposed via `useImperativeHandle()` are not currently getting documented. Here's the missing documentation that should be in "Props & Methods" above:_

| Method name            | Parameters | Description                                                                                         |
| ---------------------- | ---------- | --------------------------------------------------------------------------------------------------- |
| `focus()`              | _(none)_   | Sets focus to the crossword component.                                                              |
| `reset()`              | _(none)_   | Resets the entire crossword; clearing all answers in the grid and also any persisted data.          |
| `fillAllAnswers()`     | _(none)_   | Fills all the answers in the grid and calls the `onLoadedCorrect` callback with _**every**_ answer. |
| `isCrosswordCorrect()` | _(none)_   | Returns whether the crossword is entirely correct or not.                                           |

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
      clue: 'three minus two',
      answer: 'ONE',
      row: 0,
      col: 2,
    },
  },
};

<div style={{ width: '50%' }}>
  <Crossword data={data} />
</div>;
```

### Clue/data format

To make crosswords as easy to create as possible, with the least amount of extraneous and boilerplate typing, the clue/answer format is structured as a set of nested objects:

```javascript static
{
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
      clue: 'three minus two',
      answer: 'ONE',
      row: 0,
      col: 2,
    },
  },
}
```

At the top level, the `across` and `down` properties group together the clues/answers for their respective directions. Each of those objects is a map, keyed by the answer number rather than an array. (This is done so that the creator has control over the numbering/labelling of the clues/answers.) Each item contains a `clue` and `answer` property, as well as `row` and `col` for the starting position.

The `Crossword` component calculates the needed grid size from the data itself, so you don't need to pass an overall size to the component.

### Styling

One other major difference (and advantage) to this crossword component is that it is very "stylable"... as many of the styling properties as possible are exposed so that you can create any look you want for the crossword. The `Crossword` component makes use of [styled-components' `ThemeProvider`](https://styled-components.com/docs/advanced#theming) and offers the following properties to control colors and layout:

| theme property        | default               | description                                                                                                                                                                 |
| --------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `columnBreakpoint`    | `'768px'`             | browser-width at which the clues go from showing beneath the grid to showing beside the grid.                                                                               |
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
      clue: 'three minus two',
      answer: 'ONE',
      row: 0,
      col: 2,
    },
  },
};

<div style={{ width: '30%' }}>
  <ThemeProvider
    theme={{
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
      clue: 'three minus two',
      answer: 'ONE',
      row: 0,
      col: 2,
    },
  },
};

<div style={{ width: '30%' }}>
  <Crossword
    data={data}
    theme={{
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

### Player progress events

In addition to providing properties for styling, there are some properties to help your application "understand" the player's progress:

| property             | description                                                                                                                                                                                                                                                |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `onCorrect`          | callback function that fires when a player answers a clue correctly; called with `(direction, number, answer)` arguments, where `direction` is `'across'` or `'down'`, `number` is the clue number as text (like `'1'`), and `answer` is the answer itself |
| `onLoadedCorrect`    | callback function that's called when a crossword is loaded, to batch up correct answers loaded from storage; passed an array of the same values that `onCorrect` would recieve                                                                             |
| `onCrosswordCorrect` | callback function that's called when the overall crossword is completely correct (or not)                                                                                                                                                                  |
| `onCellChange`       | callback function called when a cell changes (e.g. when the user types a letter); passed the row and column and the character typed                                                                                                                        |

### Imperative methods

The following imperative methods can be called on a "ref" handle to the component:

| method name            | parameters | description                                                                                         |
| ---------------------- | ---------- | --------------------------------------------------------------------------------------------------- |
| `focus()`              | _(none)_   | Sets focus to the crossword component.                                                              |
| `reset()`              | _(none)_   | Resets the entire crossword; clearing all answers in the grid and also any persisted data.          |
| `fillAllAnswers()`     | _(none)_   | Fills all the answers in the grid and calls the `onLoadedCorrect` callback with _**every**_ answer. |
| `isCrosswordCorrect()` | _(none)_   | Returns whether the crossword is entirely correct or not.                                           |

### Another example

Purely to show the grid rendering...

```jsx
import Crossword from '@jaredreisinger/react-crossword';

const clue = '';

const data = {
  across: {
    1: { clue: 'This', answer: 'XXX', row: 0, col: 0 },
    4: { clue: 'is', answer: 'XXX', row: 0, col: 4 },
    7: { clue: 'not', answer: 'XXX', row: 1, col: 0 },
    8: { clue: 'a', answer: 'XXXX', row: 1, col: 4 },
    10: { clue: 'real', answer: 'XX', row: 2, col: 0 },
    11: { clue: 'crossword,', answer: 'XX', row: 2, col: 3 },
    12: { clue: 'it', answer: 'XX', row: 2, col: 6 },
    13: { clue: 'is', answer: 'XXXXXX', row: 3, col: 0 },
    16: { clue: 'only', answer: 'XXXXXX', row: 4, col: 2 },
    19: { clue: 'showing', answer: 'XX', row: 5, col: 0 },
    21: { clue: 'the', answer: 'XX', row: 5, col: 3 },
    22: { clue: 'kind', answer: 'XX', row: 5, col: 6 },
    23: { clue: 'of', answer: 'XXXX', row: 6, col: 0 },
    25: { clue: 'thing', answer: 'XXX', row: 6, col: 5 },
    26: { clue: 'you', answer: 'XXX', row: 7, col: 1 },
    27: { clue: 'can', answer: 'XXX', row: 7, col: 5 },
  },
  down: {
    1: { clue: 'create.', answer: 'XXXX', row: 0, col: 0 },
    2: { clue: 'All', answer: 'XXXX', row: 0, col: 1 },
    3: { clue: 'of', answer: 'XX', row: 0, col: 2 },
    4: { clue: 'the', answer: 'XXXXXX', row: 0, col: 4 },
    5: { clue: 'answers', answer: 'XX', row: 0, col: 5 },
    6: { clue: 'are', answer: 'XXX', row: 0, col: 6 },
    9: { clue: '"X"', answer: 'XX', row: 1, col: 7 },
    11: { clue, answer: 'XXXXXX', row: 2, col: 3 },
    14: { clue, answer: 'XX', row: 3, col: 2 },
    15: { clue, answer: 'XX', row: 3, col: 5 },
    17: { clue, answer: 'XXXX', row: 4, col: 6 },
    18: { clue, answer: 'XXXX', row: 4, col: 7 },
    19: { clue, answer: 'XX', row: 5, col: 0 },
    20: { clue, answer: 'XXX', row: 5, col: 1 },
    24: { clue, answer: 'XX', row: 6, col: 2 },
    25: { clue, answer: 'XX', row: 6, col: 5 },
  },
};

<div style={{ width: '100%' }}>
  <Crossword data={data} useStorage={false} />
</div>;
```
