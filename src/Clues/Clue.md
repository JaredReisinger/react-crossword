Renders an individual clue, with it's number. Makes use of CrosswordContext to know whether to render as "highlighted" or not, and uses the CrosswordRenderContext (TBD "theme"?) to provide the highlighting color.

```jsx
import {
  Clue,
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
    <Clue direction="across" number="1">
      This is a clue.
    </Clue>

    <Clue direction="across" number="2" highlight={true}>
      This is a highlighted clue.
    </Clue>
  </CrosswordContext.Provider>
</CrosswordRenderContext.Provider>;
```
