import React, {
  useCallback,
  useContext,
  useEffect,
  // useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import PropTypes, { InferProps } from 'prop-types';

import styled, { ThemeContext, ThemeProvider } from 'styled-components';

import Cell from './Cell';

import { CrosswordContext, CrosswordSizeContext } from './context';
import { FocusHandler } from './types';

// import {
// } from './types';

const defaultTheme = {
  columnBreakpoint: '768px',
  gridBackground: 'rgb(0,0,0)',
  cellBackground: 'rgb(255,255,255)',
  cellBorder: 'rgb(0,0,0)',
  textColor: 'rgb(0,0,0)',
  numberColor: 'rgba(0,0,0, 0.25)',
  focusBackground: 'rgb(255,255,0)',
  highlightBackground: 'rgb(255,255,204)',
};

const GridWrapper = styled.div.attrs((/* props */) => ({
  className: 'crossword grid',
}))`
  /* position: relative; */
  /* min-width: 20rem; */
  /* max-width: 60rem; Should the size matter? */
  width: auto;
  flex: 2 1 50%;
`;

const CrosswordGridPropTypes = {
  /** presentation values for the crossword; these override any values coming from a parent ThemeProvider context. */
  theme: PropTypes.shape({
    /** browser-width at which the clues go from showing beneath the grid to showing beside the grid */
    columnBreakpoint: PropTypes.string,

    /** overall background color (fill) for the crossword grid; can be `'transparent'` to show through a page background image */
    gridBackground: PropTypes.string,
    /**  background for an answer cell */
    cellBackground: PropTypes.string,
    /** border for an answer cell */
    cellBorder: PropTypes.string,
    /** color for answer text (entered by the player) */
    textColor: PropTypes.string,
    /** color for the across/down numbers in the grid */
    numberColor: PropTypes.string,
    /** background color for the cell with focus, the one that the player is typing into */
    focusBackground: PropTypes.string,
    /** background color for the cells in the answer the player is working on,
     * helps indicate in which direction focus will be moving; also used as a
     * background on the active clue  */
    highlightBackground: PropTypes.string,
  }),
};

export type CrosswordGridProps = InferProps<typeof CrosswordGridPropTypes>;

// export interface CrosswordGridImperative {
//   /**
//    * Sets focus to the crossword component.
//    */
//   focus: () => void;
// }

/**
 * The rendering component for the crossword grid itself.
 */
export default function CrosswordGrid({ theme }: CrosswordGridProps) {
  const {
    rows,
    cols,
    gridData,
    handleInputKeyDown,
    handleInputChange,
    handleCellClick,
    handleInputClick,
    registerFocusHandler,
    focused,
    selectedPosition: { row: focusedRow, col: focusedCol },
    selectedDirection: currentDirection,
    selectedNumber: currentNumber,
  } = useContext(CrosswordContext);

  const inputRef = useRef<HTMLInputElement>(null);

  const contextTheme = useContext(ThemeContext);

  // focus and movement
  const focus = useCallback<FocusHandler>(() => {
    // console.log('CrosswordGrid.focus()', { haveRef: !!inputRef.current });
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    // focus.name = 'CrosswordGrid.focus()';
    registerFocusHandler(focus);

    return () => {
      registerFocusHandler(null);
    };
  }, [focus, registerFocusHandler]);

  // We have several properties that we bundle together as context for the
  // cells, rather than have them as independent properties.  (Or should they
  // stay separate? Or be passed as "spread" values?)
  //
  // We used to calculate sizes as "fractions of 100", meaning that the more
  // rows or columns, the smaller the values would get.  In order to support
  // non-square crossword grids, it makes much more sense to use a "fixed" cell
  // size, and then calculate the overall extents as a multiple of the cell
  // size.
  const cellSize = 10;
  const cellPadding = 0.125;
  const cellInner = cellSize - cellPadding * 2;
  const cellHalf = cellSize / 2;
  const fontSize = cellInner * 0.7;

  const sizeContext = useMemo(
    () => ({
      cellSize,
      cellPadding,
      cellInner,
      cellHalf,
      fontSize,
    }),
    [cellSize, cellPadding, cellInner, cellHalf, fontSize]
  );

  const height = useMemo(() => rows * cellSize, [rows]);
  const width = useMemo(() => cols * cellSize, [cols]);
  const cellWidthHtmlPct = useMemo(() => 100 / cols, [cols]);
  const cellHeightHtmlPct = useMemo(() => 100 / rows, [rows]);

  // In order to ensure the top/left positioning makes sense, there is an
  // absolutely-positioned <div> with no margin/padding that we *don't* expose
  // to consumers.  This keeps the math much more reliable.  (But we're still
  // seeing a slight vertical deviation towards the bottom of the grid!  The "*
  // 0.995" seems to help.)  We also need to calculate the effective px size of
  // the automatically-scaled SVG cells.  We know that "100% width" === "number
  // of columns".
  const inputStyle = useMemo(
    () =>
      ({
        position: 'absolute',
        top: `calc(${focusedRow * cellHeightHtmlPct * 0.995}% + 2px)`,
        left: `calc(${focusedCol * cellWidthHtmlPct}% + 2px)`,
        width: `calc(${cellWidthHtmlPct}% - 4px)`,
        height: `calc(${cellHeightHtmlPct}% - 4px)`,
        fontSize: `${fontSize * 6}px`, // waaay too small...?
        textAlign: 'center',
        textAnchor: 'middle',
        backgroundColor: 'transparent',
        caretColor: 'transparent',
        margin: 0,
        padding: 0,
        border: 0,
        cursor: 'default',
      } as const),
    [cellWidthHtmlPct, cellHeightHtmlPct, focusedRow, focusedCol, fontSize]
  );

  // The final theme is the merger of three values: the "theme" property
  // passed to the component (which takes precedence), any values from
  // ThemeContext, and finally the "defaultTheme" values fill in for any
  // needed ones that are missing.  (We create this in standard last-one-wins
  // order in Javascript, of course.)
  const finalTheme = useMemo(
    () => ({ ...defaultTheme, ...contextTheme, ...theme }),
    [contextTheme, theme]
  );

  return (
    <CrosswordSizeContext.Provider value={sizeContext}>
      <ThemeProvider theme={finalTheme}>
        <GridWrapper>
          {/*
            This div is hard-coded because we *need* a zero-padded,relative-
            positioned element for aligning the <input> with the cells in the
            <svg>.
          */}
          <div style={{ margin: 0, padding: 0, position: 'relative' }}>
            <svg viewBox={`0 0 ${width} ${height}`}>
              <rect
                x={0}
                y={0}
                width={width}
                height={height}
                fill={finalTheme.gridBackground}
              />
              {gridData.flatMap((rowData, row) =>
                rowData.map((cellData, col) =>
                  cellData.used ? (
                    // Should the Cell figure out its focus/highlight state
                    // directly from the CrosswordContext?
                    <Cell
                      // eslint-disable-next-line react/no-array-index-key
                      key={`R${row}C${col}`}
                      cellData={cellData}
                      focus={
                        focused && row === focusedRow && col === focusedCol
                      }
                      highlight={
                        focused &&
                        !!currentNumber &&
                        cellData[currentDirection] === currentNumber
                      }
                      onClick={handleCellClick}
                    />
                  ) : undefined
                )
              )}
            </svg>
            <input
              ref={inputRef}
              aria-label="crossword-input"
              type="text"
              onClick={handleInputClick}
              onKeyDown={handleInputKeyDown}
              onChange={handleInputChange}
              value=""
              // onInput={this.handleInput}
              autoComplete="off"
              spellCheck="false"
              autoCorrect="off"
              style={inputStyle}
            />
          </div>
        </GridWrapper>
      </ThemeProvider>
    </CrosswordSizeContext.Provider>
  );
}

CrosswordGrid.propTypes = CrosswordGridPropTypes;

CrosswordGrid.defaultProps = {
  theme: null,
};
