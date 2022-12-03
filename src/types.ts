import PropTypes, { InferProps } from 'prop-types';

export type OverrideProps<T, O> = Omit<T, keyof O> & O;

export type EnhancedProps<T, O> = OverrideProps<InferProps<T>, O>;

export type Direction = 'across' | 'down';

export interface GridPosition {
  /** The 0-indexed row for the position. */
  row: number;
  /** The 0-indexed column for the position. */
  col: number;
}

// We draw a distinction between the clue "input" data (which must be provided
// by the consumer), and the in-progress clue/game data that includes answer
// status, "correct" values, etc.  Also, while there's only one version of the
// in-progress data (meant only to be consumed by the react-crossword
// components), there is *potentially* more than one input format for
// clues/answers.

/**
 * Clue/answer for a single across or down clue.
 */
const clueInputPropsOriginal = {
  /** The clue to display */
  clue: PropTypes.string.isRequired,
  /** The answer for the clue */
  answer: PropTypes.string.isRequired,
  /** The 0-based row on which the answer begins */
  row: PropTypes.number.isRequired,
  /** The 0-based column on which the answer begins */
  col: PropTypes.number.isRequired,
};

export const clueShapeOriginal = PropTypes.shape(clueInputPropsOriginal);

export type ClueTypeOriginal = InferProps<typeof clueInputPropsOriginal>;

export const cluesInputShapeOriginal = PropTypes.shape({
  /** "across" clues and answers */
  across: PropTypes.objectOf(clueShapeOriginal.isRequired).isRequired,
  /** "down" clues and answers */
  down: PropTypes.objectOf(clueShapeOriginal.isRequired).isRequired,
});

/**
 * The (original) input-format for clues and answers.  Note that while the
 * keys/properties under 'across' and 'down' are canonically the clue/answer
 * numbers, they can be *any* string value
 */
export type CluesInputOriginal = Record<
  Direction,
  Record<string, ClueTypeOriginal>
>;

/**
 * The input-format for clues and answers.  Only the original format is
 * currently available, but there may be some additional formats added in the
 * future.
 */
export type CluesInput = CluesInputOriginal;

// in-progress game data...

/**
 * The data stored/returned for a specific cell/position in the crossword.
 */
export type UsedCellData = GridPosition & {
  /** Whether the position/cell is used at all. */
  used: boolean;
  // /** The clue related to this cell? what? Shouldn't be needed! */
  // clue: string;
  /** If present, a display "number" label for the cell */
  number?: string;
  /** The correct answer value for *only* this cell (a single letter) */
  answer: string;
  /** The user's guess value for *only* this cell (a single letter) */
  guess?: string;
  /** If present, the clue-number key for the "across" for this cell */
  across?: string;
  /** If present, the clue-number key for the "down" for this cell */
  down?: string;
};

/**
 * The data stored/returned for a specific unused or out-of-bounds cell/position
 * in the crossword.
 */
export type UnusedCellData = GridPosition & {
  /** Whether the position/cell is used at all. */
  used: false;
  /** Whether the position/cell is completely out-of-bounds */
  outOfBounds?: boolean;
};

/**
 * The data stored/returned for a specific cell/position in the crossword.
 */
export type CellData = UsedCellData | UnusedCellData;

// export type GridData = Record<number, Record<number, CellData>>;
export type GridData = CellData[][];

export type CluesData = Record<
  Direction,
  (ClueTypeOriginal & {
    number: string;
    complete?: boolean;
    correct?: boolean;
  })[]
>;

export type AnswerTuple = [Direction, string, string];

// interaction types

/**
 * A handler to help set focus so that the core provider doesn't have to know
 * how a specific component mananges focus.
 */
export interface FocusHandler {
  (): void;
}
