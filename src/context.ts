import React from 'react';

import type {
  CellData,
  CluesData,
  Direction,
  FocusHandler,
  GridData,
  GridPosition,
} from './types';

/**
 * CrosswordContextType represents the type of the crossword puzzle itself, as
 * well as provides callbacks for the core implementation of crossword
 * user-interaction logic. This ensures that any number of individual components
 * can leverage a single core implementation.
 */
export interface CrosswordContextType {
  /** The (square) size of the crossword. */
  size: number;
  /** The crossword grid data, including player guesses and "correct" status. */
  gridData: GridData;
  /** The across/down clues, including "correct" status. */
  clues?: CluesData;

  /** A handler for `<input>` element KeyDown events. */
  handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  /** A handler for `<input>` element Change events. */
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
  /** A handler for clicks on any cell in the crossword. */
  handleCellClick: (cellData: CellData) => void;
  /** A handler for `<input>` element Click events. */
  handleInputClick: React.MouseEventHandler<HTMLInputElement>;
  /** A handler for clue selection. */
  handleClueSelected: (direction: Direction, number: string) => void;
  /** Provides registration for focus actions */
  registerFocusHandler: (focusHandler: FocusHandler | null) => void;

  // player state
  focused: boolean;
  selectedPosition: GridPosition;
  selectedDirection: Direction;
  selectedNumber: string;

  crosswordCorrect: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
function nop() { }

/**
 * CrosswordContext represents the crossword puzzle itself, as well as provides
 * callbacks for the core implementation of crossword user-interaction logic.
 * This ensures that any number of individual components can leverage a single
 * core implementation.
 */
export const CrosswordContext = React.createContext<CrosswordContextType>({
  size: 0,
  gridData: [],
  // clues: { across: [], down: [] },

  handleInputKeyDown: nop,
  handleInputChange: nop,
  handleCellClick: nop,
  handleInputClick: nop,
  handleClueSelected: nop,
  registerFocusHandler: nop,

  focused: false,
  selectedPosition: { row: 0, col: 0 },
  selectedDirection: 'across',
  selectedNumber: '',

  crosswordCorrect: false,
});

export interface CrosswordSizeContextType {
  cellSize?: number;
  cellPadding?: number;
  cellInner?: number;
  cellHalf?: number;
  cellTextVerticalOffset?: number;
  fontSize?: number;
}

export const CrosswordSizeContext =
  React.createContext<CrosswordSizeContextType>({});
