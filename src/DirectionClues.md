Provides the list of clues for one direction (either "across" or "down").

```jsx
import {
  DirectionClues,
  CrosswordContext,
  CrosswordRenderContext,
} from '@jaredreisinger/react-crossword';

<CrosswordRenderContext.Provider
  value={{
    highlightBackground: 'rgb(255,255,204)',
  }}
>
  <CrosswordContext.Provider
    value={{
      focused: true,
      selectedDirection: 'across',
      selectedNumber: '2',
    }}
  >
    <DirectionClues
      direction="across"
      clues={[
        { number: '1', clue: 'This is a clue.' },
        { number: '2', clue: 'This is another (highlighted) clue.' },
      ]}
    />
  </CrosswordContext.Provider>
</CrosswordRenderContext.Provider>;
```
