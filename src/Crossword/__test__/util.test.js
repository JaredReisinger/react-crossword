import '@testing-library/jest-dom/extend-expect';

import {
  isAcross,
  otherDirection,
  byNumber,
  calculateExtents,
  createEmptyGrid,
  createGridData,
  fillClues,
  serializeGuesses,
  deserializeGuesses,
  findCorrectAnswers,
  saveGuesses,
  loadGuesses,
  clearGuesses,
} from '../util';

// afterEach(cleanup);

describe('isAcross()', () => {
  it('returns true for "across"', () => {
    expect(isAcross('across')).toBeTruthy();
  });

  it('returns false for "down"', () => {
    expect(isAcross('down')).toBeFalsy();
  });
});

describe('otherDirection()', () => {
  it('returns "down" for "across"', () => {
    expect(otherDirection('across')).toBe('down');
  });

  it('returns "across" for "down"', () => {
    expect(otherDirection('down')).toBe('across');
  });
});

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

describe('createGridData()', () => {
  it('creates grid data', () => {
    const { size, gridData, clues } = createGridData(simpleData);

    const cellDefaults = {
      used: false,
      number: null,
      answer: '',
      across: null,
      down: null,
      locked: false,
      guess: '',
    };

    const expectedData = [
      [
        {
          ...cellDefaults,
          row: 0,
          col: 0,
          used: true,
          number: '1',
          answer: 'T',
          across: '1',
        },
        {
          ...cellDefaults,
          row: 0,
          col: 1,
          used: true,
          answer: 'W',
          across: '1',
        },
        {
          ...cellDefaults,
          row: 0,
          col: 2,
          used: true,
          number: '2',
          answer: 'O',
          across: '1',
          down: '2',
        },
      ],
      [
        {
          ...cellDefaults,
          row: 1,
          col: 0,
        },
        {
          ...cellDefaults,
          row: 1,
          col: 1,
        },
        {
          ...cellDefaults,
          row: 1,
          col: 2,
          used: true,
          answer: 'N',
          down: '2',
        },
      ],
      [
        {
          ...cellDefaults,
          row: 2,
          col: 0,
        },
        {
          ...cellDefaults,
          row: 2,
          col: 1,
        },
        {
          ...cellDefaults,
          row: 2,
          col: 2,
          used: true,
          answer: 'E',
          down: '2',
        },
      ],
    ];

    const expectedClues = {
      across: [{ number: '1', clue: simpleData.across[1].clue }],
      down: [{ number: '2', clue: simpleData.down[2].clue }],
    };

    expect(size).toBe(3);
    expect(gridData).toEqual(expectedData);
    expect(clues).toEqual(expectedClues);
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

  it('ignores out-of-range guesses', () => {
    const gridData = [[{ guess: '' }]];
    const guesses = { '0_0': 'A', '1_2': 'B', '2_1': 'C' };
    deserializeGuesses(gridData, guesses);

    expect(gridData).toEqual([[{ guess: 'A' }]]);
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

describe('localStorage', () => {
  const storageKey = 'DUMMY';
  const gridData = [[{ guess: 'X' }]];

  let mockStorage;
  const setItem = jest.fn();
  const getItem = jest
    .fn()
    .mockReturnValue(JSON.stringify({ guesses: { '0_0': 'X' } }));
  const removeItem = jest.fn();

  beforeEach(() => {
    setItem.mockClear();
    getItem.mockClear();
    removeItem.mockClear();

    mockStorage = jest.spyOn(window, 'localStorage', 'get');
  });

  afterEach(() => {
    mockStorage.mockRestore();
  });

  function withStorage() {
    mockStorage.mockReturnValue({ setItem, getItem, removeItem });
  }

  function withoutStorage() {
    mockStorage.mockReturnValue(undefined);
  }

  describe('saveGuesses()', () => {
    it("doesn't fail when localStorage is unavailable", () => {
      withoutStorage();
      saveGuesses(gridData, storageKey);
      expect(setItem).toHaveBeenCalledTimes(0);
    });

    it('calls setItem when localStorage exists', () => {
      withStorage();
      saveGuesses(gridData, storageKey);
      expect(setItem).toHaveBeenCalledTimes(1);
      expect(setItem).toHaveBeenCalledWith(
        storageKey,
        expect.stringContaining('guesses')
      );
    });
  });

  describe('loadGuesses()', () => {
    it("doesn't fail when localStorage is unavailable", () => {
      withoutStorage();
      loadGuesses(gridData, storageKey);
      expect(getItem).toHaveBeenCalledTimes(0);
    });

    it('calls getItem when localStorage exists', () => {
      withStorage();
      const localData = createEmptyGrid(1);
      loadGuesses(localData, storageKey);
      expect(getItem).toHaveBeenCalledTimes(1);
      expect(getItem).toHaveBeenCalledWith(storageKey);
      expect(localData).toMatchObject(gridData);
    });

    it("doesn't alter gridData when nothing is found", () => {
      withStorage();
      getItem.mockReturnValue(null);
      const localData = createEmptyGrid(1);
      loadGuesses(localData, storageKey);
      expect(getItem).toHaveBeenCalledTimes(1);
      expect(getItem).toHaveBeenCalledWith(storageKey);
      expect(localData).not.toMatchObject(gridData);
    });
  });

  describe('clearGuesses()', () => {
    it("doesn't fail when localStorage is unavailable", () => {
      withoutStorage();
      clearGuesses(storageKey);
      expect(removeItem).toHaveBeenCalledTimes(0);
    });

    it('calls removeItem when localStorage exists', () => {
      withStorage();
      clearGuesses(storageKey);
      expect(removeItem).toHaveBeenCalledTimes(1);
      expect(removeItem).toHaveBeenCalledWith(storageKey);
    });
  });
});
