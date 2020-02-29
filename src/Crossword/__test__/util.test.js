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
  serializeGuesses,
  deserializeGuesses,
  findCorrectAnswers,
} from '../util';

// afterEach(cleanup);

const one = { number: '1' };
const two = { number: '2' };

describe('byNumber()', () => {
  it('returns 0 when a == b', () => {
    const result = byNumber(one, one);
    expect(result).toBe(0);
  });

  it('returns <0 when a < b', () => {
    const result = byNumber(one, two);
    expect(result).toBeLessThan(0);
  });

  it('returns >0 when a > b', () => {
    const result = byNumber(two, one);
    expect(result).toBeGreaterThan(0);
  });
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

describe('calculateExtents()', () => {
  it('applies across length to col', () => {
    const result = calculateExtents(simpleData, 'across');
    expect(result).toEqual({ row: 0, col: 2 });
  });

  it('applies down length to row', () => {
    const result = calculateExtents(simpleData, 'down');
    expect(result).toEqual({ row: 2, col: 2 });
  });

  it('handles "descending" positions in answers', () => {
    // We're really doing this to exersize the !(primary > primaryMax) case!
    const result = calculateExtents(
      {
        across: {
          1: { row: 0, col: 3, answer: 'XX' },
          2: { row: 3, col: 0, answer: 'YY' },
        },
      },
      'across'
    );
    expect(result).toEqual({ row: 3, col: 4 });
  });
});

describe('createEmptyGrid()', () => {
  it('creates a row-major array', () => {
    const result = createEmptyGrid(2);
    expect(result[0][1]).toMatchObject({ row: 0, col: 1 });
    expect(result[1][0]).toMatchObject({ row: 1, col: 0 });
  });
});

describe('fillClues()', () => {
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
});

describe('serializeGuesses()', () => {
  it('creates expected data', () => {
    const result = serializeGuesses([
      [{ guess: 'A' }, { guess: '' }, { guess: '' }],
      [{ guess: '' }, { guess: '' }, { guess: 'B' }],
      [{ guess: '' }, { guess: 'C' }, { guess: '' }],
    ]);

    expect(result).toEqual({ '0_0': 'A', '1_2': 'B', '2_1': 'C' });
  });
});

describe('deserializeGuesses()', () => {
  it('writes expected data', () => {
    const gridData = [
      [{ guess: '' }, { guess: '' }, { guess: '' }],
      [{ guess: '' }, { guess: '' }, { guess: '' }],
      [{ guess: '' }, { guess: '' }, { guess: '' }],
    ];
    const guesses = { '0_0': 'A', '1_2': 'B', '2_1': 'C' };
    deserializeGuesses(gridData, guesses);

    expect(gridData).toEqual([
      [{ guess: 'A' }, { guess: '' }, { guess: '' }],
      [{ guess: '' }, { guess: '' }, { guess: 'B' }],
      [{ guess: '' }, { guess: 'C' }, { guess: '' }],
    ]);
  });
});

describe('findCorrectAnswers()', () => {
  it('finds correct answers', () => {
    const gridData = [
      [{ guess: '' }, { guess: '' }, { guess: 'O' }],
      [{ guess: '' }, { guess: '' }, { guess: 'N' }],
      [{ guess: '' }, { guess: '' }, { guess: 'E' }],
    ];

    const result = findCorrectAnswers(simpleData, gridData);

    expect(result).toEqual([['down', '2', 'ONE']]);
  });
});
