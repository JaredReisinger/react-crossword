Provides the list of clues for one direction (either "across" or "down").

```jsx
import {
  DirectionClues,
  CrosswordContext,
  CrosswordSizeContext,
  ThemeProvider,
} from '@jaredreisinger/react-crossword';

<ThemeProvider
  theme={{
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
</ThemeProvider>;
```
