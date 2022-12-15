Support for IPUZ crosswords has been added by means of a `useIpuz()` hook which converts IPUZ-formatted crossword data into the `react-crossword`-native format.  This was implmented as a hook for two reasons:

1. To reinforce that this is a simple crossword component, not a general-purpose IPUZ implementation.

2. To provide an example data-conversion model that other formats could use.

There is nothing in the `useIpuz()` hook implementation that relies on any `react-crossword` internals.  Any `react-crossword` consumer could have written a hook like this to provide IPUZ support.

```jsx
import Crossword, { useIpuz } from '@jaredreisinger/react-crossword';

const data = useIpuz({
  version: 'http://ipuz.org/v2',
  kind: ['http://ipuz.org/crossword#1'],
  dimensions: { width: 3, height: 3 },
  puzzle: [
    [{ cell: 1, style: { shapebg: 'circle' } }, 2, '#'],
    [3, { style: { shapebg: 'circle' } }, 4],
    [null, 5, { style: { shapebg: 'circle' } }],
  ],
  solution: [
    ['C', 'A', '#'],
    ['B', 'O', 'T'],
    [null, 'L', 'O'],
  ],
  clues: {
    Across: [
      [1, 'OR neighbor'],
      [3, 'Droid'],
      [5, 'Behold!'],
    ],
    Down: [
      [1, "Trucker's radio"],
      [2, 'MSN competitor'],
      [4, 'A preposition'],
    ],
  },
});

<div style={{ width: '25em', display: 'flex' }}>
  <Crossword data={data} />
</div>;
```
