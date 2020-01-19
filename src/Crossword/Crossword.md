Renders a (square) crossword and clues based on the passed `data` puzzle information.

```jsx
import { Crossword } from 'react-crossword';

<Crossword data={{
  across: {
    1: {
      clue: 'Affirmative answer',
      answer: 'YES',
      row: 0,
      col: 0,
    },
  },
  down: {
    2: {
      clue: 'Negative answer',
      answer: 'NO',
      row: 1,
      col: 4,
    },    
  }
}} />
```
