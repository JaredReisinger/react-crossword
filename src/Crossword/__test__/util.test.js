// import React from 'react';
// import ReactDom from 'react-dom';
// import { render, cleanup } from '@testing-library/react';
// import renderer from 'react-test-renderer';

import '@testing-library/jest-dom/extend-expect';

import {
  byNumber,
  calculateExtents,
  createEmptyGrid,
  fillClues,
} from '../util';

// afterEach(cleanup);

const one = { number: '1' };
const two = { number: '2' };

it('byNumber returns 0 when a == b', () => {
  const result = byNumber(one, one);
  expect(result).toBe(0);
});

it('byNumber returns <0 when a < b', () => {
  const result = byNumber(one, two);
  expect(result).toBeLessThan(0);
});

it('byNumber returns >0 when a > b', () => {
  const result = byNumber(two, one);
  expect(result).toBeGreaterThan(0);
});

const simpleData = {
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

it('calculateExtents applies across length to col', () => {
  const result = calculateExtents(simpleData, 'across');
  expect(result).toEqual({ row: 0, col: 2 });
});

it('calculateExtents applies down length to row', () => {
  const result = calculateExtents(simpleData, 'down');
  expect(result).toEqual({ row: 2, col: 2 });
});

it('createEmptyGrid creates a row-major array', () => {
  const result = createEmptyGrid(2);
  expect(result[0][1]).toMatchObject({ row: 0, col: 1 });
  expect(result[1][0]).toMatchObject({ row: 1, col: 0 });
});

it('fillClues can fill across', () => {
  const gridData = createEmptyGrid(3);
  const clues = { across: [] };

  fillClues(gridData, clues, simpleData, 'across');

  expect(gridData[0][0].used).toBeTruthy();
  expect(gridData[0][0].answer).toBe('T');
  expect(gridData[0][0].across).toBe('1');

  expect(gridData[0][1].used).toBeTruthy();
  expect(gridData[0][1].answer).toBe('W');
  expect(gridData[0][1].across).toBe('1');

  expect(gridData[0][2].used).toBeTruthy();
  expect(gridData[0][2].answer).toBe('O');
  expect(gridData[0][2].across).toBe('1');

  expect(clues).toEqual({ across: [{ clue: 'one plus one', number: '1' }] });
});

it('fillClues can fill down', () => {
  const gridData = createEmptyGrid(3);
  const clues = { down: [] };

  fillClues(gridData, clues, simpleData, 'down');

  expect(gridData[0][2].used).toBeTruthy();
  expect(gridData[0][2].answer).toBe('O');
  expect(gridData[0][2].down).toBe('2');

  expect(gridData[1][2].used).toBeTruthy();
  expect(gridData[1][2].answer).toBe('N');
  expect(gridData[1][2].down).toBe('2');

  expect(gridData[2][2].used).toBeTruthy();
  expect(gridData[2][2].answer).toBe('E');
  expect(gridData[2][2].down).toBe('2');

  expect(clues).toEqual({ down: [{ clue: 'three minus two', number: '2' }] });
});
