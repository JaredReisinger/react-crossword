_**NOTE:** Due to a shortcoming in react-docgen, the methods exposed via `useImperativeHandle()` are not currently getting documented. Here’s the missing documentation that should be in “Props & Methods” above:_

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

<div style={{ width: '25em', display: 'flex' }}>
  <Crossword data={data} />
</div>;
```

See [Clue input format](#/Configuration%20and%20customization/Clue%20input%20format) for more details.

### Player progress events

In addition to providing properties for styling, there are some properties to help your application “understand” the player’s progress:

| property             | description                                                                                                                                                                                                                                                |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `onCorrect`          | callback function that fires when a player answers a clue correctly; called with `(direction, number, answer)` arguments, where `direction` is `'across'` or `'down'`, `number` is the clue number as text (like `'1'`), and `answer` is the answer itself |
| `onLoadedCorrect`    | callback function that’s called when a crossword is loaded, to batch up correct answers loaded from storage; passed an array of the same values that `onCorrect` would recieve                                                                             |
| `onCrosswordCorrect` | callback function that’s called when the overall crossword is completely correct (or not)                                                                                                                                                                  |
| `onCellChange`       | callback function called when a cell changes (e.g. when the user types a letter); passed the row and column and the character typed                                                                                                                        |
| `onClueSelected`     | callback function called when a clue is selected; passed the direction and the “number”                                                                                                                                                                    |

### Imperative methods

The following imperative methods can be called on a "ref" handle to the component:

| method name                 | parameters                                  | description                                                                                         |
| --------------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `focus()`                   | _(none)_                                    | Sets focus to the crossword component.                                                              |
| `reset()`                   | _(none)_                                    | Resets the entire crossword; clearing all answers in the grid and also any persisted data.          |
| `fillAllAnswers()`          | _(none)_                                    | Fills all the answers in the grid and calls the `onLoadedCorrect` callback with _**every**_ answer. |
| `isCrosswordCorrect()`      | _(none)_                                    | Returns whether the crossword is entirely correct or not.                                           |
| `setGuess(row, col, guess)` | `(row: number, col: number, guess: string)` | Sets the “guess” value for a specific grid position.                                                |

### Clue direction labels

Providing the `acrossLabel` and/or `downLabel` properties will override the default "ACROSS" and "DOWN" used for the clues.

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

<div style={{ width: '25em', display: 'flex' }}>
  <Crossword data={data} acrossLabel="Lefty-righty" downLabel="Upsie-downsie" />
</div>;
```

### Custom storage / multiple crosswords per-page

If you have more than one crossword at a given URL, you can use the `storageKey` property to provide a specific key under which to save the player's progress. (Just make sure to _not_ set `useStorage` to `false`!)

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

<div style={{ width: '30em', display: 'flex' }}>
  <Crossword data={data} useStorage={false} />
</div>;
```
