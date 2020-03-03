```jsx
import { Cell } from '@jaredreisinger/react-crossword';

// as calculated in Crossword...
const cellSize = 10;
const cellPadding = 0.125;
const cellInner = cellSize - cellPadding * 2;
const cellHalf = cellSize / 2;
const fontSize = cellInner * 0.7;

const renderContext = {
  gridBackground: 'black',
  cellBackground: 'white',
  cellBorder: 'black',
  textColor: 'black',
  numberColor: 'rgba(0,0,0, 0.4)',
  focusBackground: 'rgba(255,0,0, 0.5)',
  highlightBackground: 'rgba(255,0,0, 0.125)',
  cellSize,
  cellPadding,
  cellInner,
  cellHalf,
  fontSize,
};

function handleClick() {
  alert('GOT CLICK!');
}

<svg viewBox="0 0 100 30" width="50%">
  <Cell
    renderContext={renderContext}
    cellData={{ row: 0, col: 0, guess: 'Y', number: '1' }}
  />
  <Cell
    renderContext={renderContext}
    cellData={{ row: 0, col: 1, guess: 'E' }}
  />
  <Cell
    renderContext={renderContext}
    cellData={{ row: 0, col: 2, guess: 'S' }}
  />

  <Cell
    renderContext={renderContext}
    cellData={{ row: 1, col: 4, guess: 'N', number: '2' }}
    focus={true}
    highlight={true}
  />
  <Cell
    renderContext={renderContext}
    cellData={{ row: 2, col: 4, guess: 'O' }}
    highlight={true}
  />

  <Cell
    renderContext={renderContext}
    cellData={{ row: 0, col: 6, guess: 'X' }}
    onClick={handleClick}
  />
</svg>;
```
