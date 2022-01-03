Provides the list of clues for one direction (either “across” or “down”).

```jsx
import {
  CrosswordProvider,
  DirectionClues,
} from '@jaredreisinger/react-crossword';

const data = {
  across: {
    1: {
      clue: 'This is a clue.',
      answer: 'ANSWER',
      row: 0,
      col: 0,
    },
    2: {
      clue: 'This is another clue.',
      answer: 'ANOTHER',
      row: 1,
      col: 0,
    },
  },
  down: {
  },
};

<CrosswordProvider data={data}>
  <DirectionClues direction="across" />
</CrosswordContext.Provider>;
```
