import React from 'react';

// To pass focus/highlight/etc., it's cleaner to use a context.
export const CrosswordContext = React.createContext({
  focused: false,
  selectedDirection: null,
  selectedNumber: null,

  // correct answers?
});

export const CrosswordSizeContext = React.createContext({
  cellSize: 0,
  cellPadding: 0,
  cellInner: 0,
  cellHalf: 0,
  fontSize: 0,
});
