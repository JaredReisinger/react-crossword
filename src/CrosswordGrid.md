Provides the answer grid itself, along with the functionality for passing typed input to the managing `CrosswordProvider` component.

```jsx
import {
  CrosswordProvider,
  CrosswordGrid,
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
  <div style={{ width: '10em' }}>
    <CrosswordGrid />
  </div>
</CrosswordProvider>;
```
