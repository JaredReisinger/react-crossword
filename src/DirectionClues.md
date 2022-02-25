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
  down: {},
};

<CrosswordProvider data={data}>
  <DirectionClues direction="across" />
</CrosswordProvider>;
```

### Alternate label

If you don't want the default heading label (of either "ACROSS" or "DOWN"), you can provide your own:

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
  down: {},
};

<CrosswordProvider data={data}>
  <DirectionClues direction="across" label="Lefty-righty" />
</CrosswordProvider>;
```
