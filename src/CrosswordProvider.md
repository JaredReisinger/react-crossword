_**NOTE:** Due to a shortcoming in react-docgen, the methods exposed via `useImperativeHandle()` are not currently getting documented. Here’s the missing documentation that should be in “Props & Methods” above:_

| Method name            | Parameters | Description                                                                                         |
| ---------------------- | ---------- | --------------------------------------------------------------------------------------------------- |
| `focus()`              | _(none)_   | Sets focus to the crossword component.                                                              |
| `reset()`              | _(none)_   | Resets the entire crossword; clearing all answers in the grid and also any persisted data.          |
| `fillAllAnswers()`     | _(none)_   | Fills all the answers in the grid and calls the `onLoadedCorrect` callback with _**every**_ answer. |
| `isCrosswordCorrect()` | _(none)_   | Returns whether the crossword is entirely correct or not.                                           |

```jsx
import {
  CrosswordProvider,
  CrosswordGrid,
  DirectionClues,
} from '@jaredreisinger/react-crossword';

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

<CrosswordProvider data={data}>
  <div style={{ display: 'flex', gap: '2em' }}>
    <DirectionClues direction="across" />
    <div style={{ width: '10em' }}>
      <CrosswordGrid />
    </div>
    <DirectionClues direction="down" />
  </div>
</CrosswordProvider>;
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

### Custom storage / multiple crosswords per-page

If you have more than one crossword at a given URL, you can use the `storageKey` property to provide a specific key under which to save the player's progress. (Just make sure to _not_ set `useStorage` to `false`!)
