# react-crossword

A flexible, responsive, and easy-to-use crossword component for React apps.

[![npm version](https://img.shields.io/npm/v/@jaredreisinger/react-crossword.svg)](https://www.npmjs.com/package/@jaredreisinger/react-crossword)
[![build status](https://img.shields.io/travis/JaredReisinger/react-crossword/master.svg)](https://travis-ci.org/JaredReisinger/react-crossword)
[![code coverage](https://img.shields.io/codecov/c/gh/JaredReisinger/react-crossword.svg)](https://codecov.io/gh/JaredReisinger/react-crossword)<br />
[![greenkeeper](https://badges.greenkeeper.io/JaredReisinger/react-crossword.svg)](https://greenkeeper.io/)
[![dependencies](https://img.shields.io/david/JaredReisinger/react-crossword.svg)](https://david-dm.org/JaredReisinger/react-crossword)
[![dev dependencies](https://img.shields.io/david/dev/JaredReisinger/react-crossword.svg)](https://david-dm.org/JaredReisinger/react-crossword?type=dev)
[![peer dependencies](https://img.shields.io/david/peer/JaredReisinger/react-crossword.svg)](https://david-dm.org/JaredReisinger/react-crossword?type=peer)<br />
[![license](https://img.shields.io/github/license/JaredReisinger/react-crossword.svg)](./LICENSE)
![more badges](https://img.shields.io/badge/badges-%F0%9F%91%8D%20are%20fun-orange)
[![commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Install

```sh
npm install --save @jaredreisinger/react-crossword
```

or

```sh
yarn add @jaredreisinger/react-crossword
```

## Usage

> Also see [the styleguidist docs for Crossword](https://jaredreisinger.github.io/react-crossword/).

```javascript
import React from 'react';

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

export default function MyPage() {
  return <Crossword data={data} />;
}
```

### Clue/data format

To make crosswords as easy to create as possible, with the least amount of extraneous and boilerplate typing, the clue/answer format is structured as a set of nested objects:

```javascript
const data = {
  across: {
    1: {
      clue: 'one plus one',
      answer: 'TWO',
      x: 0,
      y, 0,
    },
  },
  down: {
    2: {
      clue: 'three minus two',
      answer: 'ONE',
      x: 2,
      y, 0,
    },
  },
};
```

At the top level, the `across` and `down` properties group together the clues/answers for their respective directions. Each of those objects is a map, keyed by the answer number rather than an array. (This is done so that the creator has control over the numbering/labelling of the clues/answers.) Each item contains a `clue` and `answer` property, as well as `row` and `col` for the starting position.

The `Crossword` component calculates the needed grid size from the data itself, so you don't need to pass an overall size to the component.

## Styling

One other major difference (and advantage) to this crossword component is that it is very "stylable"... as many of the styling properties as possible are exposed so that you can create any look you want for the crossword.

> TODO: Have a couple of demos?

## Background

Initially written as a replacement for `@guardian/react-crossword`, to make custom styling and puzzle-definition easier.

There are several things about the Crossword component from `@guardian/react-crossword` that are less than ideal, in my opinion:

- the styles/formatting are baked in
- semi-unrelated functionality like the "anagram helper" is baked in
- the data format for clues/answers is horrendous

This is an attempt to create a less-opinionated component that's much easier to drop in to an arbitrary React page.

## License

[MIT](./LICENSE), © 2020 [Jared Reisinger](https://github.com/JaredReisinger)
