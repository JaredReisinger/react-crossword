Renders a (square) crossword and clues based on the passed `data` puzzle information.

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

<Crossword data={data} />;
```
