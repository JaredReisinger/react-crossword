import type {
  AnswerTuple,
  CluesData,
  CluesInput,
  Direction,
  GridData,
} from './types';

type RowOrCol = 'row' | 'col';

const directionInfo: Record<
  Direction,
  { primary: RowOrCol; orthogonal: RowOrCol }
> = {
  across: {
    primary: 'col',
    orthogonal: 'row',
  },
  down: {
    primary: 'row',
    orthogonal: 'col',
  },
};

export const bothDirections = Object.keys(directionInfo) as Direction[];

export function isAcross(direction: Direction) {
  return direction === 'across';
}

export function otherDirection(direction: Direction) {
  return isAcross(direction) ? 'down' : 'across';
}

export function calculateExtents(data: CluesInput, direction: Direction) {
  const dir = directionInfo[direction];
  let primaryMax = 0;
  let orthogonalMax = 0;

  Object.entries(data[direction]).forEach(([i, info]) => {
    const primary = info[dir.primary] + info.answer.length - 1;
    if (primary > primaryMax) {
      primaryMax = primary;
    }

    const orthogonal = info[dir.orthogonal];
    if (orthogonal > orthogonalMax) {
      orthogonalMax = orthogonal;
    }
  });

  return {
    [dir.primary]: primaryMax,
    [dir.orthogonal]: orthogonalMax,
  };
}

const emptyCellData = {
  used: false,
  number: undefined, // null,
  answer: '',
  guess: '',
  locked: false,
  // row: r,
  // col: c,
  across: '', //null,
  down: '', //null,
};

export function createEmptyGrid(size: number) {
  const gridData: GridData = Array(size);
  // Rather than [x][y] in column-major order, the cells are indexed as
  // [row][col] in row-major order.
  for (let r = 0; r < size; r++) {
    gridData[r] = Array(size);
    for (let c = 0; c < size; c++) {
      gridData[r][c] = {
        ...emptyCellData,
        row: r,
        col: c,
      };
    }
  }

  return gridData;
}

export function fillClues(
  gridData: GridData,
  clues: CluesData,
  data: CluesInput,
  direction: Direction
) {
  const dir = directionInfo[direction];

  Object.entries(data[direction]).forEach(([number, info]) => {
    const { row: rowStart, col: colStart, clue, answer } = info;
    for (let i = 0; i < answer.length; i++) {
      const row = rowStart + (dir.primary === 'row' ? i : 0);
      const col = colStart + (dir.primary === 'col' ? i : 0);
      const cellData = gridData[row][col];

      // TODO?: check to ensure the answer is the same if it's already set?
      cellData.used = true;
      cellData.answer = answer[i];
      cellData[direction] = number;

      if (i === 0) {
        // TODO?: check to ensure the number is the same if it's already set?
        cellData.number = number;
      }
    }

    clues[direction].push({ number, clue });
  });

  clues[direction].sort(byNumber);
}

// Given the "nice format" for a crossword, generate the usable data optimized
// for rendering and our interactivity.
export function createGridData(data: CluesInput) {
  const acrossMax = calculateExtents(data, 'across');
  const downMax = calculateExtents(data, 'down');

  const size =
    Math.max(...Object.values(acrossMax), ...Object.values(downMax)) + 1;

  const gridData = createEmptyGrid(size);

  // Now fill with answers... and also collect the clues
  const clues: CluesData = {
    across: [],
    down: [],
  };

  fillClues(gridData, clues, data, 'across');
  fillClues(gridData, clues, data, 'down');

  return { size, gridData, clues };
}

// sort helper for clues...
interface HasNumber {
  number: string;
}

export function byNumber(a: HasNumber, b: HasNumber) {
  const aNum = Number.parseInt(a.number, 10);
  const bNum = Number.parseInt(b.number, 10);

  return aNum - bNum;
}

// Guesses *really* only needs the "guess" property...
export type GuessData = { guess?: string }[][];

export function clearGuesses(storageKey: string) {
  if (!window.localStorage) {
    return;
  }

  window.localStorage.removeItem(storageKey);
}

export function saveGuesses(gridData: GuessData, storageKey: string) {
  const { localStorage } = window;
  if (!localStorage) {
    return;
  }

  const guesses = serializeGuesses(gridData);

  const saveData = {
    date: Date.now(),
    guesses,
  };

  localStorage.setItem(storageKey, JSON.stringify(saveData));
}

export function serializeGuesses(gridData: GuessData) {
  const guesses = gridData.reduce(
    (memo, row, r) =>
      row.reduce<Record<string, string>>((memoInner, cellData, c) => {
        const { guess } = cellData;
        if (guess !== '') {
          memoInner[`${r}_${c}`] = cellData.guess ?? '';
        }
        return memoInner;
      }, memo),
    {}
  );

  return guesses;
}

export function loadGuesses(gridData: GuessData, storageKey: string) {
  const { localStorage } = window;
  if (!localStorage) {
    return;
  }

  const saveRaw = localStorage.getItem(storageKey);
  if (!saveRaw) {
    return;
  }

  const saveData = JSON.parse(saveRaw);

  // TODO: check date for expiration?
  deserializeGuesses(gridData, saveData.guesses);
}

export function deserializeGuesses(
  gridData: GuessData,
  guesses: Record<string, string>
) {
  Object.entries(guesses).forEach(([key, val]) => {
    const [rStr, cStr] = key.split('_');
    const r = parseInt(rStr, 10);
    const c = parseInt(cStr, 10);
    // ignore any out-of-bounds guesses!
    if (r <= gridData.length - 1 && c <= gridData[0].length - 1) {
      gridData[r][c].guess = val;
    }
  });
}

export function findCorrectAnswers(data: CluesInput, gridData: GuessData) {
  const correctAnswers: AnswerTuple[] = [];

  bothDirections.forEach((direction) => {
    const across = isAcross(direction);
    Object.entries(data[direction]).forEach(([num, info]) => {
      const { row, col } = info;
      let correct = true;
      for (let i = 0; i < info.answer.length; i++) {
        const r = across ? row : row + i;
        const c = across ? col + i : col;
        if (gridData[r][c].guess !== info.answer[i]) {
          correct = false;
          break;
        }
      }
      if (correct) {
        // same args as notifyCorrect: direction, number, answer
        correctAnswers.push([direction, num, info.answer]);
      }
    });
  });

  return correctAnswers;
}
