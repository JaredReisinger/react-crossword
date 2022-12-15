# ![react-crossword: A flexible, responsive, and easy-to-use crossword component for React apps.](./docs/react-crossword.png)

[![npm version](https://img.shields.io/npm/v/@jaredreisinger/react-crossword.svg)](https://www.npmjs.com/package/@jaredreisinger/react-crossword)
[![build status](https://img.shields.io/github/actions/workflow/status/JaredReisinger/react-crossword/build.yml?branch=main)](https://github.com/JaredReisinger/react-crossword/actions/workflows/build.yml)
[![code coverage](https://img.shields.io/codecov/c/gh/JaredReisinger/react-crossword.svg)](https://codecov.io/gh/JaredReisinger/react-crossword)<br />
[![known vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/JaredReisinger/react-crossword.svg)](https://snyk.io/test/github/JaredReisinger/react-crossword?targetFile=package.json)
[![dependencies](https://img.shields.io/librariesio/release/npm/@jaredreisinger/react-crossword)](https://libraries.io/npm/@jaredreisinger%2Freact-crossword)<br />
[![license](https://img.shields.io/github/license/JaredReisinger/react-crossword.svg)](./LICENSE)
![more badges](https://img.shields.io/badge/badges-%F0%9F%91%8D%20are%20fun-orange)
[![commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![contributors](https://img.shields.io/badge/contributors-10-orange.svg)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

Please see the [complete docs](https://react-crossword.jaredreisinger.com) for in-depth details.

- [Install](#install)
- [Usage](#usage)
  - [Clue/data format](#cluedata-format)
- [Styling](#styling)
- [Player progress events](#player-progress-events)
  - [Imperative methods](#imperative-methods)
- [Background](#background)
- [Contributors ✨](#contributors-)

---

## Install

```sh
npm install --save @jaredreisinger/react-crossword
  # or #
yarn add @jaredreisinger/react-crossword
```

## Usage

```javascript
import React from 'react';

import Crossword from '@jaredreisinger/react-crossword';

const data = {
  /* ... puzzle data (see below) ... */
};

export default function MyPage() {
  return <Crossword data={data} />;
}
```

### Clue/data format

To make crosswords as easy to create as possible, with the least amount of extraneous and boilerplate typing, the clue/answer format is structured as a set of nested objects:

```javascript
{
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
}
```

At the top level, the `across` and `down` properties group together the clues/answers for their respective directions. Each of those objects is a map, keyed by the answer number rather than an array. (This is done so that the creator has control over the numbering/labelling of the clues/answers.) Each item contains a `clue` and `answer` property, as well as `row` and `col` for the starting position.

The `Crossword` component calculates the needed grid size from the data itself, so you don't need to pass an overall size to the component.

## Styling

One other major difference (and advantage) to this crossword component is that it is very "stylable"... as many of the styling properties as possible are exposed so that you can create any look you want for the crossword. The `Crossword` component makes use of [styled-components' `ThemeProvider`](https://styled-components.com/docs/advanced#theming) and offers the following properties to control colors and layout:

| theme property        | default               | description                                                                                                                                                                 |
| --------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `columnBreakpoint`    | `'768px'`             | browser-width at which the clues go from showing beneath the grid to showing beside the grid.                                                                               |
| `gridBackground`      | `'rgb(0,0,0)'`        | overall background color (fill) for the crossword grid. Can be `'transparent'` to show through a page background image.                                                     |
| `cellBackground`      | `'rgb(255,255,255)'`  | background for an answer cell                                                                                                                                               |
| `cellBorder`          | `'rgb(0,0,0)'`        | border for an answer cell                                                                                                                                                   |
| `textColor`           | `'rgb(0,0,0)'`        | color for answer text (entered by the player)                                                                                                                               |
| `numberColor`         | `'rgba(0,0,0, 0.25)'` | color for the across/down numbers in the grid                                                                                                                               |
| `focusBackground`     | `'rgb(255,255,0)'`    | background color for the cell with focus, the one that the player is typing into                                                                                            |
| `highlightBackground` | `'rgb(255,255,204)'`  | background color for the cells in the answer the player is working on, helps indicate in which direction focus will be moving; also used as a background on the active clue |

Note that these values can be provided either via `ThemeProvider`, or directly as a `theme` property on the `Crossword` component itself. (And further, if you're not using styled-components, but want to make use of `ThemeProvider`, this library re-exports `ThemeProvider` so you can pull it from here.)

Also, several class names are applied to elements in the crossword, in case you want to apply styles that way:

| element                                                              | class name  |
| -------------------------------------------------------------------- | ----------- |
| entire crossword component; encompassing grid and clues              | `crossword` |
| entire crossword is correct (on same element as `crossword`)         | `correct`   |
| answer grid                                                          | `grid`      |
| all of the clues                                                     | `clues`     |
| header and clues for one direction                                   | `direction` |
| direction header ('across' or 'down')                                | `header`    |
| an individual clue                                                   | `clue`      |
| an individual clue with a correct answer (on same element as `clue`) | `correct`   |

(No class names are currently applied within the grid, as the SVG layout is _**very**_ layout-sensitive.)

## Player progress events

In addition to providing properties for styling, there are some properties to
help your application "understand" the player's progress:

| property             | description                                                                                                                                                                                                                                                |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `onCorrect`          | callback function that fires when a player answers a clue correctly; called with `(direction, number, answer)` arguments, where `direction` is `'across'` or `'down'`, `number` is the clue number as text (like `'1'`), and `answer` is the answer itself |
| `onLoadedCorrect`    | callback function that’s called when a crossword is loaded, to batch up correct answers loaded from storage; passed an array of the same values that `onCorrect` would recieve                                                                             |
| `onCrosswordCorrect` | callback function that’s called when the overall crossword is completely correct (or not)                                                                                                                                                                  |
| `onCellChange`       | callback function called when a cell changes (e.g. when the user types a letter); passed the row and column and the character typed                                                                                                                        |
| `onClueSelected`     | callback function called when a clue is selected; passed the direction and the “number”                                                                                                                                                                    |

### Imperative methods

The following imperative methods can be called on a "ref" handle to the component:

| method name            | parameters | description                                                                                         |
| ---------------------- | ---------- | --------------------------------------------------------------------------------------------------- |
| `focus()`              | _(none)_   | Sets focus to the crossword component.                                                              |
| `reset()`              | _(none)_   | Resets the entire crossword; clearing all answers in the grid and also any persisted data.          |
| `fillAllAnswers()`     | _(none)_   | Fills all the answers in the grid and calls the `onLoadedCorrect` callback with _**every**_ answer. |
| `isCrosswordCorrect()` | _(none)_   | Returns whether the crossword is entirely correct or not.                                           |

## Background

Initially written as a replacement for `@guardian/react-crossword`, to make custom styling and puzzle-definition easier.

There are several things about the Crossword component from `@guardian/react-crossword` that are less than ideal, in my opinion:

- the styles/formatting are baked in
- semi-unrelated functionality like the "anagram helper" is baked in
- the data format for clues/answers is horrendous

This is an attempt to create a less-opinionated component that's much easier to drop in to an arbitrary React page.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/dreamer01"><img src="https://avatars.githubusercontent.com/u/16663935?v=4?s=100" width="100px;" alt="Pushpendra Singh"/><br /><sub><b>Pushpendra Singh</b></sub></a><br /><a href="#ideas-dreamer01" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.maincross.net/"><img src="https://avatars.githubusercontent.com/u/8095144?v=4?s=100" width="100px;" alt="Amit Bansal"/><br /><sub><b>Amit Bansal</b></sub></a><br /><a href="https://github.com/JaredReisinger/react-crossword/issues?q=author%3Azehawki" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/embeddedt"><img src="https://avatars.githubusercontent.com/u/42941056?v=4?s=100" width="100px;" alt="embeddedt"/><br /><sub><b>embeddedt</b></sub></a><br /><a href="https://github.com/JaredReisinger/react-crossword/commits?author=embeddedt" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.soindaial.com.br/"><img src="https://avatars.githubusercontent.com/u/42916864?v=4?s=100" width="100px;" alt="Albranco"/><br /><sub><b>Albranco</b></sub></a><br /><a href="#ideas-drero" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.robmccollough.dev/"><img src="https://avatars.githubusercontent.com/u/42196611?v=4?s=100" width="100px;" alt="Rob McCollough"/><br /><sub><b>Rob McCollough</b></sub></a><br /><a href="#ideas-robmccollough" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/lorddaedra"><img src="https://avatars.githubusercontent.com/u/26400787?v=4?s=100" width="100px;" alt="lorddaedra"/><br /><sub><b>lorddaedra</b></sub></a><br /><a href="#ideas-lorddaedra" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/HuHguZ"><img src="https://avatars.githubusercontent.com/u/32592443?v=4?s=100" width="100px;" alt="Ilya Lukyanov"/><br /><sub><b>Ilya Lukyanov</b></sub></a><br /><a href="#ideas-HuHguZ" title="Ideas, Planning, & Feedback">🤔</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/rhoffmann"><img src="https://avatars.githubusercontent.com/u/678772?v=4?s=100" width="100px;" alt="Richard Hoffmann"/><br /><sub><b>Richard Hoffmann</b></sub></a><br /><a href="#ideas-rhoffmann" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/gitname"><img src="https://avatars.githubusercontent.com/u/7143133?v=4?s=100" width="100px;" alt="gitname"/><br /><sub><b>gitname</b></sub></a><br /><a href="https://github.com/JaredReisinger/react-crossword/issues?q=author%3Agitname" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/AncientSwordRage"><img src="https://avatars.githubusercontent.com/u/5961746?v=4?s=100" width="100px;" alt="Craig"/><br /><sub><b>Craig</b></sub></a><br /><a href="#ideas-AncientSwordRage" title="Ideas, Planning, & Feedback">🤔</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
