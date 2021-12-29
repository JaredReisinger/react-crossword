import React from 'react';

import type { Direction } from './types';

export interface CrosswordContextType {
  focused: boolean;
  selectedDirection?: Direction | null;
  selectedNumber?: string | null;
  onClueSelected?: (direction: Direction, number: string) => void;
}

// To pass focus/highlight/etc., it's cleaner to use a context.
export const CrosswordContext = React.createContext<CrosswordContextType>({
  focused: false,
  selectedDirection: null,
  selectedNumber: null,

  // correct answers?
});

export interface CrosswordSizeContextType {
  cellSize: number;
  cellPadding: number;
  cellInner: number;
  cellHalf: number;
  fontSize: number;
}

export const CrosswordSizeContext =
  React.createContext<CrosswordSizeContextType>({
    cellSize: 0,
    cellPadding: 0,
    cellInner: 0,
    cellHalf: 0,
    fontSize: 0,
  });
