Renders an individual clue, with its number. Makes use of CrosswordContext to know whether to render as "highlighted" or not, and uses the CrosswordSizeContext (TBD "theme"?) to provide the highlighting color.

```jsx
import {
  Clue,
  CrosswordContext,
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
    <Clue direction="across" number="1">
      This is a clue.
    </Clue>

    <Clue direction="across" number="2" highlight={true}>
      This is a highlighted clue.
    </Clue>
  </CrosswordContext.Provider>
</ThemeProvider>;
```
