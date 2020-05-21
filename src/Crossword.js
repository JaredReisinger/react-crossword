import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import produce from 'immer';
import styled from 'styled-components';

import Cell from './Cell';
import DirectionClues from './DirectionClues';

import {
  bothDirections,
  createGridData,
  isAcross,
  otherDirection,
  clearGuesses,
  saveGuesses,
  loadGuesses,
  findCorrectAnswers,
} from './util';

import { CrosswordContext, CrosswordRenderContext } from './context';

// TODO: make this a component property!
const defaultStorageKey = 'guesses';

// eslint-disable-next-line
const OuterWrapper = styled.div.attrs((props) => ({
  className: 'crossword',
}))`
  margin: 0;
  padding: 0;
  border: 0;
  /* position: relative; */
  /* width: 40%; */
  display: flex;
  flex-direction: row;

  @media (max-width: ${(props) => props.columnBreakpoint}) {
    flex-direction: column;
  }
`;

const GridWrapper = styled.div.attrs((props) => ({
  className: 'grid',
}))`
  /* position: relative; */
  min-width: 20rem;
  max-width: 60rem; /* Should the size matter? */
  width: auto;
  flex: 2 1 50%;
`;

const CluesWrapper = styled.div.attrs((props) => ({
  className: 'clues',
}))`
  padding: 0 1em;
  flex: 1 2 25%;

  @media (max-width: ${(props) => props.columnBreakpoint}) {
    margin-top: 2em;
  }

  .direction {
    margin-bottom: 2em;
    /* padding: 0 1em;
    flex: 1 1 20%; */

    .header {
      margin-top: 0;
      margin-bottom: 0.5em;
    }

    div {
      margin-top: 0.5em;
    }
  }
`;

/**
 * The primary, and default, export from the react-crossword library, Crossword
 * renders an answer grid and clues, and manages data and user interaction.
 */
const Crossword = React.forwardRef(
  (
    {
      data,
      onCorrect,
      onLoadedCorrect,
      useStorage,
      columnBreakpoint,
      gridBackground,
      cellBackground,
      cellBorder,
      textColor,
      numberColor,
      focusBackground,
      highlightBackground,
    },
    ref
  ) => {
    const [size, setSize] = useState(null);
    const [gridData, setGridData] = useState(null);
    const [clues, setClues] = useState(null);
    const [focused, setFocused] = useState(false);
    const [focusedRow, setFocusedRow] = useState(0);
    const [focusedCol, setFocusedCol] = useState(0);
    const [currentDirection, setCurrentDirection] = useState('across');
    const [currentNumber, setCurrentNumber] = useState('1');
    const [bulkChange, setBulkChange] = useState(null);
    const [checkQueue, setCheckQueue] = useState([]);

    const inputRef = useRef();

    const getCellData = useCallback(
      (row, col) => {
        if (row >= 0 && row < size && col >= 0 && col < size) {
          return gridData[row][col];
        }

        // fake cellData to represent "out of bounds"
        return { row, col, used: false, outOfBounds: true };
      },
      [size, gridData]
    );

    const setCellCharacter = useCallback(
      (row, col, char) => {
        const cell = getCellData(row, col);

        if (!cell.used) {
          return;
        }

        // If the character is already the cell's guess, there's nothing to do.
        if (cell.guess === char) {
          return;
        }

        // update the gridData with the guess
        setGridData(
          produce((draft) => {
            draft[row][col].guess = char;
          })
        );

        // push the row/col for checking!
        setCheckQueue(
          produce((draft) => {
            draft.push({ row, col });
          })
        );
      },
      [getCellData]
    );

    const notifyCorrect = useCallback(
      (direction, number, answer) => {
        if (onCorrect) {
          // We *used* to need a timeout workaround to ensure this happened
          // *after* the state had updated and the DOM rendered.... do we still?
          onCorrect(direction, number, answer);

          // For future reference, the call looked like:
          //
          // setTimeout(() => {
          //   window.requestAnimationFrame(() => {
          //     onCorrect(direction, number, answer);
          //   });
          // });
        }
      },
      [onCorrect]
    );

    const checkCorrectness = useCallback(
      (row, col) => {
        const cell = getCellData(row, col);

        // If the given cell isn't correct, we can bail now.
        if (cell.guess !== cell.answer) {
          return;
        }

        // check all the cells for both across and down answers that use this cell
        bothDirections.forEach((direction) => {
          const across = isAcross(direction);
          const number = cell[direction];
          if (!number) {
            return;
          }

          const info = data[direction][number];
          let correct = true;

          // We *could* compare cell.guess against cell.answer, but info.answer is
          // a simple string and gets us the length as well (and we only have to
          // calulate row/col math once).
          for (let i = 0; i < info.answer.length; i++) {
            const checkCell = getCellData(
              info.row + (across ? 0 : i),
              info.col + (across ? i : 0)
            );

            if (checkCell.guess !== info.answer[i]) {
              correct = false;
              break;
            }
          }

          if (correct) {
            notifyCorrect(direction, number, info.answer);
          }
        });
      },
      [getCellData]
    );

    useEffect(() => {
      if (checkQueue.length === 0) {
        return;
      }

      checkQueue.forEach(({ row, col }) => checkCorrectness(row, col));
      setCheckQueue([]);
    }, [checkQueue, checkCorrectness]);

    // focus and movement
    const focus = useCallback(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        setFocused(true);
      }
    }, []);

    const moveTo = useCallback(
      (row, col, directionOverride) => {
        let direction = directionOverride ?? currentDirection;
        const candidate = getCellData(row, col);

        if (!candidate.used) {
          return false;
        }

        if (!candidate[direction]) {
          direction = otherDirection(direction);
        }

        setFocusedRow(row);
        setFocusedCol(col);
        setCurrentDirection(direction);
        setCurrentNumber(candidate[direction]);

        return candidate;
      },
      [getCellData]
    );

    const moveRelative = useCallback(
      (dRow, dCol) => {
        // We expect *only* one of dRow or dCol to have a non-zero value, and
        // that's the direction we will "prefer".  If *both* are set (or zero),
        // we don't change the direction.
        let direction;
        if (dRow !== 0 && dCol === 0) {
          direction = 'down';
        } else if (dRow === 0 && dCol !== 0) {
          direction = 'across';
        }

        const cell = moveTo(focusedRow + dRow, focusedCol + dCol, direction);

        return cell;
      },
      [focusedRow, focusedCol, moveTo]
    );

    const moveForward = useCallback(() => {
      const across = isAcross(currentDirection);
      moveRelative(across ? 0 : 1, across ? 1 : 0);
    }, [currentDirection, moveRelative]);

    const moveBackward = useCallback(() => {
      const across = isAcross(currentDirection);
      moveRelative(across ? 0 : -1, across ? -1 : 0);
    }, [currentDirection, moveRelative]);

    // keyboard handling
    const handleSingleCharacter = useCallback(
      (char) => {
        setCellCharacter(focusedRow, focusedCol, char.toUpperCase());
        moveForward();
      },
      [focusedRow, focusedCol, setCellCharacter, moveForward]
    );

    // We use the keydown event for control/arrow keys, but not for textual
    // input, because it's hard to suss out when a key is "regular" or not.
    const handleInputKeyDown = useCallback(
      (event) => {
        // if ctrl, alt, or meta are down, ignore the event (let it bubble)
        if (event.ctrlKey || event.altKey || event.metaKey) {
          return;
        }

        let preventDefault = true;
        const { key } = event;
        // console.log('CROSSWORD KEYDOWN', event.key);

        // FUTURE: should we "jump" over black space?  That might help some for
        // keyboard users.
        switch (key) {
          case 'ArrowUp':
            moveRelative(-1, 0);
            break;

          case 'ArrowDown':
            moveRelative(1, 0);
            break;

          case 'ArrowLeft':
            moveRelative(0, -1);
            break;

          case 'ArrowRight':
            moveRelative(0, 1);
            break;

          case ' ': // treat space like tab?
          case 'Tab': {
            const other = otherDirection(currentDirection);
            const cellData = getCellData(focusedRow, focusedCol);
            if (cellData[other]) {
              setCurrentDirection(other);
              setCurrentNumber(cellData[other]);
            }
            break;
          }

          // Backspace: delete the current cell, and move to the previous cell
          // Delete:    delete the current cell, but don't move
          case 'Backspace':
          case 'Delete': {
            setCellCharacter(focusedRow, focusedCol, '');
            if (key === 'Backspace') {
              moveBackward();
            }
            break;
          }

          case 'Home':
          case 'End': {
            // move to beginning/end of this entry?
            const info = data[currentDirection][currentNumber];
            const {
              answer: { length },
            } = info;
            let { row, col } = info;
            if (key === 'End') {
              const across = isAcross(currentDirection);
              if (across) {
                col += length - 1;
              } else {
                row += length - 1;
              }
            }

            moveTo(row, col);
            break;
          }

          default:
            // It would be nice to handle "regular" characters with onInput, but
            // that is still experimental, so we can't count on it.  Instead, we
            // assume that only "length 1" values are regular.
            if (key.length !== 1) {
              preventDefault = false;
              break;
            }

            handleSingleCharacter(key);
            break;
        }

        if (preventDefault) {
          event.preventDefault();
        }
      },
      [
        data,
        focusedRow,
        focusedCol,
        currentDirection,
        currentNumber,
        getCellData,
        setCellCharacter,
        moveRelative,
      ]
    );

    const handleInputChange = useCallback((event) => {
      event.preventDefault();
      setBulkChange(event.target.value);
    }, []);

    useEffect(() => {
      if (!bulkChange) {
        return;
      }

      // handle bulkChange by updating a character at a time (this lets us
      // leverage the existing character-entry logic).
      handleSingleCharacter(bulkChange[0]);
      setBulkChange(bulkChange.length === 1 ? null : bulkChange.substring(1));
    }, [bulkChange, handleSingleCharacter]);

    // When the data changes, recalculate the gridData, size, etc.
    useEffect(() => {
      // eslint-disable-next-line no-shadow
      const { size, gridData, clues } = createGridData(data);

      let loadedCorrect;
      if (useStorage) {
        loadGuesses(gridData, defaultStorageKey);
        loadedCorrect = findCorrectAnswers(data, gridData);
      }

      setSize(size);
      setGridData(gridData);
      setClues(clues);

      // Should we start with 1-across highlighted/focused?

      // TODO: track input-field focus so we don't draw highlight when we're not
      // really focused, *and* use first actual clue (whether across or down?)
      setFocusedRow(0);
      setFocusedCol(0);
      setCurrentDirection('across');
      setCurrentNumber('1');

      setBulkChange(null);

      // trigger any "loaded correct" guesses...
      if (loadedCorrect && loadedCorrect.length > 0 && onLoadedCorrect) {
        onLoadedCorrect(loadedCorrect);
      }
    }, [data, onLoadedCorrect, useStorage]);

    useEffect(() => {
      if (gridData === null || !useStorage) {
        return;
      }

      saveGuesses(gridData, defaultStorageKey);
    }, [gridData, useStorage]);

    const handleCellClick = useCallback(
      (cellData) => {
        const { row, col } = cellData;
        const other = otherDirection(currentDirection);

        // should this use moveTo?
        setFocusedRow(row);
        setFocusedCol(col);

        let direction = currentDirection;

        // We switch to the "other" direction if (a) the current direction isn't
        // available in the clicked cell, or (b) we're already focused and the
        // clicked cell is the focused cell, *and* the other direction is
        // available.
        if (
          !cellData[currentDirection] ||
          (focused &&
            row === focusedRow &&
            col === focusedCol &&
            cellData[other])
        ) {
          setCurrentDirection(other);
          direction = other;
        }

        setCurrentNumber(cellData[direction]);

        focus();
      },
      [focused, focusedRow, focusedCol, currentDirection, focus]
    );

    const handleInputClick = useCallback(
      (event) => {
        // *don't* event.preventDefault(), because we want the input to actually
        // take focus

        // Like general cell-clicks, cliking on the input can change direction.
        // Unlike cell clicks, we *know* we're clicking on the already-focused
        // cell!
        const other = otherDirection(currentDirection);
        const cellData = getCellData(focusedRow, focusedCol);

        let direction = currentDirection;

        if (focused && cellData[other]) {
          setCurrentDirection(other);
          direction = other;
        }

        setCurrentNumber(cellData[direction]);
        focus();
      },
      [currentDirection, focusedRow, focusedCol, getCellData, focus]
    );

    const handleClueSelected = useCallback(
      (direction, number) => {
        const info = data[direction][number];
        // TODO: sanity-check info?
        moveTo(info.row, info.col, direction);
        focus();
      },
      [data, moveTo, focus]
    );

    // expose some imperative methods
    useImperativeHandle(
      ref,
      () => ({
        focus: () => {
          focus();
        },

        /**
         * Resets the entire crossword; clearing all answers in the grid and
         * also any persisted data.
         *
         * @public
         */
        reset: () => {
          setGridData(
            produce((draft) => {
              draft.forEach((rowData) => {
                rowData.forEach((cellData) => {
                  if (cellData.used) {
                    cellData.guess = '';
                  }
                });
              });
            })
          );

          if (useStorage) {
            clearGuesses(defaultStorageKey);
          }
        },

        /**
         * Fills all the answers in the grid and calls the `onLoadedCorrect`
         * callback with _**every**_ answer.
         *
         * @public
         */
        fillAllAnswers: () => {
          setGridData(
            produce((draft) => {
              draft.forEach((rowData) => {
                rowData.forEach((cellData) => {
                  if (cellData.used) {
                    cellData.guess = cellData.answer;
                  }
                });
              });
            })
          );

          // trigger onLoadedCorrect with every clue!
          if (onLoadedCorrect) {
            const loadedCorrect = [];
            bothDirections.forEach((direction) => {
              Object.entries(data[direction]).forEach(([number, info]) => {
                loadedCorrect.push([direction, number, info.answer]);
              });
            });

            onLoadedCorrect(loadedCorrect);
          }
        },
      }),
      [data, onLoadedCorrect, useStorage, focus]
    );

    // constants for rendering...

    // We have several properties that we bundle together as context for the
    // cells, rather than have them as independent properties.  (Or should they
    // stay separate? Or be passed as "spread" values?)
    const cellSize = 100 / size;
    const cellPadding = 0.125;
    const cellInner = cellSize - cellPadding * 2;
    const cellHalf = cellSize / 2;
    const fontSize = cellInner * 0.7;

    const context = {
      focused,
      selectedDirection: currentDirection,
      selectedNumber: currentNumber,
      onClueSelected: handleClueSelected,
    };

    const renderContext = {
      gridBackground,
      cellBackground,
      cellBorder,
      textColor,
      numberColor,
      focusBackground,
      highlightBackground,
      cellSize,
      cellPadding,
      cellInner,
      cellHalf,
      fontSize,
    };

    // REVIEW: do we want to recalc this all the time, or cache in state?
    const cells = [];
    if (gridData) {
      gridData.forEach((rowData, row) => {
        rowData.forEach((cellData, col) => {
          if (!cellData.used) {
            return;
          }
          cells.push(
            <Cell
              // eslint-disable-next-line react/no-array-index-key
              key={`R${row}C${col}`}
              cellData={cellData}
              focus={focused && row === focusedRow && col === focusedCol}
              highlight={
                focused &&
                currentNumber &&
                cellData[currentDirection] === currentNumber
              }
              onClick={handleCellClick}
            />
          );
        });
      });
    }

    return (
      <CrosswordContext.Provider value={context}>
        <CrosswordRenderContext.Provider value={renderContext}>
          <OuterWrapper columnBreakpoint={columnBreakpoint}>
            <GridWrapper>
              {/*
                This div is hard-coded because we *need* a zero-padded,
                relative-positioned element for aligning the <input> with the
                cells in the <svg>.
              */}
              <div style={{ margin: 0, padding: 0, position: 'relative' }}>
                <svg viewBox="0 0 100 100">
                  <rect
                    x={0}
                    y={0}
                    width={100}
                    height={100}
                    fill={gridBackground}
                  />
                  {cells}
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
                  style={{
                    position: 'absolute',
                    // In order to ensure the top/left positioning makes sense,
                    // there is an absolutely-positioned <div> with no
                    // margin/padding that we *don't* expose to consumers.  This
                    // keeps the math much more reliable.  (But we're still
                    // seeing a slight vertical deviation towards the bottom of
                    // the grid!  The "* 0.995" seems to help.)
                    top: `calc(${focusedRow * cellSize * 0.995}% + 2px)`,
                    left: `calc(${focusedCol * cellSize}% + 2px)`,
                    width: `calc(${cellSize}% - 4px)`,
                    height: `calc(${cellSize}% - 4px)`,
                    fontSize: `${fontSize * 6}px`, // waaay too small...?
                    textAlign: 'center',
                    textAnchor: 'middle',
                    backgroundColor: 'transparent',
                    caretColor: 'transparent',
                    margin: 0,
                    padding: 0,
                    border: 0,
                    cursor: 'default',
                  }}
                />
              </div>
            </GridWrapper>
            <CluesWrapper>
              {clues &&
                bothDirections.map((direction) => (
                  <DirectionClues
                    key={direction}
                    direction={direction}
                    clues={clues[direction]}
                  />
                ))}
            </CluesWrapper>
          </OuterWrapper>
        </CrosswordRenderContext.Provider>
      </CrosswordContext.Provider>
    );
  }
);

Crossword.displayName = 'Crossword';

const clueShape = PropTypes.shape({
  clue: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
});

Crossword.propTypes = {
  /** clue/answer data */
  data: PropTypes.shape({
    across: PropTypes.objectOf(clueShape),
    down: PropTypes.objectOf(clueShape),
  }).isRequired,

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

  /** whether to use browser storage to persist the player's work-in-progress */
  useStorage: PropTypes.bool,

  /** callback function that fires when a player answers a clue correctly; called with `(direction, number, answer)` arguments, where `direction` is `'across'` or `'down'`, `number` is the clue number as text (like `'1'`), and `answer` is the answer itself */
  onCorrect: PropTypes.func,
  /** callback function that's called when a crossword is loaded, to batch up correct answers loaded from storage; passed an array of the same values that `onCorrect` would recieve */
  onLoadedCorrect: PropTypes.func,
};

Crossword.defaultProps = {
  columnBreakpoint: '768px',
  gridBackground: 'rgb(0,0,0)',
  cellBackground: 'rgb(255,255,255)',
  cellBorder: 'rgb(0,0,0)',
  textColor: 'rgb(0,0,0)',
  numberColor: 'rgba(0,0,0, 0.25)',
  focusBackground: 'rgb(255,255,0)',
  highlightBackground: 'rgb(255,255,204)',
  useStorage: true,
  // useStorage: false,
  onCorrect: null,
  onLoadedCorrect: null,
};

export default Crossword;
