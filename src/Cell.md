```jsx
import {
  Cell,
  CrosswordSizeContext,
  ThemeProvider,
} from '@jaredreisinger/react-crossword';

// as calculated in Crossword...
const cellSize = 10;
const cellPadding = 0.125;
const cellInner = cellSize - cellPadding * 2;
const cellHalf = cellSize / 2;
const fontSize = cellInner * 0.7;

const themeContext = {
  cellBackground: 'rgb(255,255,255)',
  cellBorder: 'rgb(0,0,0)',
  textColor: 'rgb(0,0,0)',
  numberColor: 'rgba(0,0,0, 0.25)',
  focusBackground: 'rgb(255,255,0)',
  highlightBackground: 'rgb(255,255,204)',
};

const sizeContext = {
  cellSize,
  cellPadding,
  cellInner,
  cellHalf,
  fontSize,
};

function handleClick() {
  alert('GOT CLICK!');
}

<ThemeProvider theme={themeContext}>
  <CrosswordSizeContext.Provider value={sizeContext}>
    <svg viewBox="0 0 100 30" width="50%">
      <Cell cellData={{ row: 0, col: 0, guess: 'Y', number: '1' }} />
      <Cell cellData={{ row: 0, col: 1, guess: 'E' }} />
      <Cell cellData={{ row: 0, col: 2, guess: 'S' }} />

      <Cell
        cellData={{ row: 1, col: 4, guess: 'N', number: '2' }}
        focus={true}
        highlight={true}
      />
      <Cell cellData={{ row: 2, col: 4, guess: 'O' }} highlight={true} />

      <Cell cellData={{ row: 0, col: 6, guess: 'X' }} onClick={handleClick} />
    </svg>
  </CrosswordSizeContext.Provider>
</ThemeProvider>;
```
