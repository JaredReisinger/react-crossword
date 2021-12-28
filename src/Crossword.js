"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immer = _interopRequireDefault(require("immer"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _Cell = _interopRequireDefault(require("./Cell"));

var _DirectionClues = _interopRequireDefault(require("./DirectionClues"));

var _util = require("./util");

var _context = require("./context");

// TODO: make this a component property!
// var defaultStorageKey = 'guesses';
var defaultTheme = {
  columnBreakpoint: '768px',
  gridBackground: 'rgb(0,0,0)',
  cellBackground: 'rgb(255,255,255)',
  cellBorder: 'rgb(0,0,0)',
  textColor: 'rgb(0,0,0)',
  numberColor: 'rgba(0,0,0, 0.25)',
  focusBackground: 'rgb(255,255,0)',
  highlightBackground: 'rgb(255,255,204)'
}; // eslint-disable-next-line

var OuterWrapper = _styledComponents["default"].div.attrs(function (props) {
  return {
    className: "crossword" + (props.correct ? ' correct' : '')
  };
}).withConfig({
  displayName: "Crossword__OuterWrapper",
  componentId: "pjgvvu-0"
})(["margin:0;padding:0;border:0;display:flex;flex-direction:row;@media (max-width:", "){flex-direction:column;}"], function (props) {
  return props.theme.columnBreakpoint;
});

var GridWrapper = _styledComponents["default"].div.attrs(function () {
  return {
    className: 'grid'
  };
}).withConfig({
  displayName: "Crossword__GridWrapper",
  componentId: "pjgvvu-1"
})(["min-width:20rem;max-width:60rem;width:auto;flex:2 1 50%;"]);

var CluesWrapper = _styledComponents["default"].div.attrs(function () {
  return {
    className: 'clues'
  };
}).withConfig({
  displayName: "Crossword__CluesWrapper",
  componentId: "pjgvvu-2"
})(["padding:0 1em;flex:1 2 25%;@media (max-width:", "){margin-top:2em;}.direction{margin-bottom:2em;.header{margin-top:0;margin-bottom:0.5em;}div{margin-top:0.5em;}}"], function (props) {
  return props.theme.columnBreakpoint;
});
/**
 * The primary, and default, export from the react-crossword library, Crossword
 * renders an answer grid and clues, and manages data and user interaction.
 */


var Crossword = /*#__PURE__*/_react["default"].forwardRef(function (_ref, ref) {
  var defaultStorageKey = _ref.defaultKey;
  var data = _ref.data,
      onCorrect = _ref.onCorrect,
      onLoadedCorrect = _ref.onLoadedCorrect,
      onCrosswordCorrect = _ref.onCrosswordCorrect,
      onCellChange = _ref.onCellChange,
      useStorage = _ref.useStorage,
      theme = _ref.theme,
      defaultKey = _ref.defaultKey;

  var _useState = (0, _react.useState)(null),
      size = _useState[0],
      setSize = _useState[1];

  var _useState2 = (0, _react.useState)(null),
      gridData = _useState2[0],
      setGridData = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      clues = _useState3[0],
      setClues = _useState3[1];

  var _useState4 = (0, _react.useState)(false),
      focused = _useState4[0],
      setFocused = _useState4[1];

  var _useState5 = (0, _react.useState)(0),
      focusedRow = _useState5[0],
      setFocusedRow = _useState5[1];

  var _useState6 = (0, _react.useState)(0),
      focusedCol = _useState6[0],
      setFocusedCol = _useState6[1];

  var _useState7 = (0, _react.useState)('across'),
      currentDirection = _useState7[0],
      setCurrentDirection = _useState7[1];

  var _useState8 = (0, _react.useState)('1'),
      currentNumber = _useState8[0],
      setCurrentNumber = _useState8[1];

  var _useState9 = (0, _react.useState)(null),
      bulkChange = _useState9[0],
      setBulkChange = _useState9[1];

  var _useState10 = (0, _react.useState)([]),
      checkQueue = _useState10[0],
      setCheckQueue = _useState10[1];

  var _useState11 = (0, _react.useState)(false),
      crosswordCorrect = _useState11[0],
      setCrosswordCorrect = _useState11[1];

  var inputRef = (0, _react.useRef)();
  var contextTheme = (0, _react.useContext)(_styledComponents.ThemeContext);
  var getCellData = (0, _react.useCallback)(function (row, col) {
    if (row >= 0 && row < size && col >= 0 && col < size) {
      return gridData[row][col];
    } // fake cellData to represent "out of bounds"


    return {
      row: row,
      col: col,
      used: false,
      outOfBounds: true
    };
  }, [size, gridData]);
  var setCellCharacter = (0, _react.useCallback)(function (row, col, _char) {
    var cell = getCellData(row, col);

    if (!cell.used) {
      return;
    } // If the character is already the cell's guess, there's nothing to do.


    if (cell.guess === _char) {
      return;
    } // update the gridData with the guess


    setGridData((0, _immer["default"])(function (draft) {
      draft[row][col].guess = _char;
    })); // push the row/col for checking!

    setCheckQueue((0, _immer["default"])(function (draft) {
      draft.push({
        row: row,
        col: col
      });
    }));

    if (onCellChange) {
      onCellChange(row, col, _char);
    }
  }, [getCellData, onCellChange]);
  var notifyCorrect = (0, _react.useCallback)(function (direction, number, answer) {
    if (onCorrect) {
      // We *used* to need a timeout workaround to ensure this happened
      // *after* the state had updated and the DOM rendered.... do we still?
      onCorrect(direction, number, answer); // For future reference, the call looked like:
      //
      // setTimeout(() => {
      //   window.requestAnimationFrame(() => {
      //     onCorrect(direction, number, answer);
      //   });
      // });
    }
  }, [onCorrect]);
  var checkCorrectness = (0, _react.useCallback)(function (row, col) {
    var cell = getCellData(row, col); // check all the cells for both across and down answers that use this
    // cell

    _util.bothDirections.forEach(function (direction) {
      var across = (0, _util.isAcross)(direction);
      var number = cell[direction];

      if (!number) {
        return;
      }

      var info = data[direction][number]; // We start by looking at the current cell... if it's not correct, we
      // don't need to check anything else!

      var correct = cell.guess === cell.answer;

      if (correct) {
        // We *could* compare cell.guess against cell.answer for all the
        // cells, but info.answer is a simple string and gets us the length
        // as well (and we only have to calulate row/col math once).
        for (var i = 0; i < info.answer.length; i++) {
          var checkCell = getCellData(info.row + (across ? 0 : i), info.col + (across ? i : 0));

          if (checkCell.guess !== info.answer[i]) {
            correct = false;
            break;
          }
        }
      } // update the clue state


      setClues((0, _immer["default"])(function (draft) {
        var clueInfo = draft[direction].find(function (i) {
          return i.number === number;
        });
        clueInfo.correct = correct;
      }));

      if (correct) {
        notifyCorrect(direction, number, info.answer);
      }
    });
  }, [getCellData]); // Any time the checkQueue changes, call checkCorrectness!

  (0, _react.useEffect)(function () {
    if (checkQueue.length === 0) {
      return;
    }

    checkQueue.forEach(function (_ref2) {
      var row = _ref2.row,
          col = _ref2.col;
      return checkCorrectness(row, col);
    });
    setCheckQueue([]);
  }, [checkQueue, checkCorrectness]); // Any time the clues change, determine if they are all correct or not.

  (0, _react.useEffect)(function () {
    setCrosswordCorrect(clues && _util.bothDirections.every(function (direction) {
      return clues[direction].every(function (clueInfo) {
        return clueInfo.correct;
      });
    }));
  }, [clues]); // Let the consumer know everything's correct (or not) if they've asked to
  // be informed.

  (0, _react.useEffect)(function () {
    if (onCrosswordCorrect) {
      onCrosswordCorrect(crosswordCorrect);
    }
  }, [crosswordCorrect, onCrosswordCorrect]); // focus and movement

  var _focus = (0, _react.useCallback)(function () {
    if (inputRef.current) {
      inputRef.current.focus();
      setFocused(true);
    }
  }, []);

  var moveTo = (0, _react.useCallback)(function (row, col, directionOverride) {
    var direction = directionOverride != null ? directionOverride : currentDirection;
    var candidate = getCellData(row, col);

    if (!candidate.used) {
      return false;
    }

    if (!candidate[direction]) {
      direction = (0, _util.otherDirection)(direction);
    }

    setFocusedRow(row);
    setFocusedCol(col);
    setCurrentDirection(direction);
    setCurrentNumber(candidate[direction]);
    return candidate;
  }, [getCellData]);
  var moveRelative = (0, _react.useCallback)(function (dRow, dCol) {
    // We expect *only* one of dRow or dCol to have a non-zero value, and
    // that's the direction we will "prefer".  If *both* are set (or zero),
    // we don't change the direction.
    var direction;

    if (dRow !== 0 && dCol === 0) {
      direction = 'down';
    } else if (dRow === 0 && dCol !== 0) {
      direction = 'across';
    }

    var cell = moveTo(focusedRow + dRow, focusedCol + dCol, direction);
    return cell;
  }, [focusedRow, focusedCol, moveTo]);
  var moveForward = (0, _react.useCallback)(function () {
    var across = (0, _util.isAcross)(currentDirection);
    moveRelative(across ? 0 : 1, across ? 1 : 0);
  }, [currentDirection, moveRelative]);
  var moveBackward = (0, _react.useCallback)(function () {
    var across = (0, _util.isAcross)(currentDirection);
    moveRelative(across ? 0 : -1, across ? -1 : 0);
  }, [currentDirection, moveRelative]); // keyboard handling

  var handleSingleCharacter = (0, _react.useCallback)(function (_char2) {
    setCellCharacter(focusedRow, focusedCol, _char2.toUpperCase());
    moveForward();
  }, [focusedRow, focusedCol, setCellCharacter, moveForward]); // We use the keydown event for control/arrow keys, but not for textual
  // input, because it's hard to suss out when a key is "regular" or not.

  var handleInputKeyDown = (0, _react.useCallback)(function (event) {
    // if ctrl, alt, or meta are down, ignore the event (let it bubble)
    if (event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }

    var preventDefault = true;
    var key = event.key; // console.log('CROSSWORD KEYDOWN', event.key);
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

      case 'Tab':
        {
          var other = (0, _util.otherDirection)(currentDirection);
          var cellData = getCellData(focusedRow, focusedCol);

          if (cellData[other]) {
            setCurrentDirection(other);
            setCurrentNumber(cellData[other]);
          }

          break;
        }
      // Backspace: delete the current cell, and move to the previous cell
      // Delete:    delete the current cell, but don't move

      case 'Backspace':
      case 'Delete':
        {
          setCellCharacter(focusedRow, focusedCol, '');

          if (key === 'Backspace') {
            moveBackward();
          }

          break;
        }

      case 'Home':
      case 'End':
        {
          // move to beginning/end of this entry?
          var info = data[currentDirection][currentNumber];
          var length = info.answer.length;
          var row = info.row,
              col = info.col;

          if (key === 'End') {
            var across = (0, _util.isAcross)(currentDirection);

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
  }, [data, focusedRow, focusedCol, currentDirection, currentNumber, getCellData, setCellCharacter, moveRelative]);
  var handleInputChange = (0, _react.useCallback)(function (event) {
    event.preventDefault();
    setBulkChange(event.target.value);
  }, []);
  (0, _react.useEffect)(function () {
    if (!bulkChange) {
      return;
    } // handle bulkChange by updating a character at a time (this lets us
    // leverage the existing character-entry logic).


    handleSingleCharacter(bulkChange[0]);
    setBulkChange(bulkChange.length === 1 ? null : bulkChange.substring(1));
  }, [bulkChange, handleSingleCharacter]); // When the data changes, recalculate the gridData, size, etc.

  (0, _react.useEffect)(function () {
    // eslint-disable-next-line no-shadow
    var _createGridData = (0, _util.createGridData)(data),
        size = _createGridData.size,
        gridData = _createGridData.gridData,
        clues = _createGridData.clues;

    var loadedCorrect;

    if (useStorage) {
      (0, _util.loadGuesses)(gridData, defaultStorageKey);
      loadedCorrect = (0, _util.findCorrectAnswers)(data, gridData);
      loadedCorrect.forEach(function (_ref3) {
        var direction = _ref3[0],
            num = _ref3[1];
        var clueInfo = clues[direction].find(function (i) {
          return i.number === num;
        });
        clueInfo.correct = true;
      });
    }

    setSize(size);
    setGridData(gridData);
    setClues(clues); // Should we start with 1-across highlighted/focused?
    // TODO: track input-field focus so we don't draw highlight when we're not
    // really focused, *and* use first actual clue (whether across or down?)

    setFocusedRow(0);
    setFocusedCol(0);
    setCurrentDirection('across');
    setCurrentNumber('1');
    setBulkChange(null); // trigger any "loaded correct" guesses...

    if (loadedCorrect && loadedCorrect.length > 0 && onLoadedCorrect) {
      onLoadedCorrect(loadedCorrect);
    }
  }, [data, onLoadedCorrect, useStorage]);
  (0, _react.useEffect)(function () {
    if (gridData === null || !useStorage) {
      return;
    }

    (0, _util.saveGuesses)(gridData, defaultStorageKey);
  }, [gridData, useStorage]);
  var handleCellClick = (0, _react.useCallback)(function (cellData) {
    var row = cellData.row,
        col = cellData.col;
    var other = (0, _util.otherDirection)(currentDirection); // should this use moveTo?

    setFocusedRow(row);
    setFocusedCol(col);
    var direction = currentDirection; // We switch to the "other" direction if (a) the current direction isn't
    // available in the clicked cell, or (b) we're already focused and the
    // clicked cell is the focused cell, *and* the other direction is
    // available.

    if (!cellData[currentDirection] || focused && row === focusedRow && col === focusedCol && cellData[other]) {
      setCurrentDirection(other);
      direction = other;
    }

    setCurrentNumber(cellData[direction]);

    _focus();
  }, [focused, focusedRow, focusedCol, currentDirection, _focus]);
  var handleInputClick = (0, _react.useCallback)(function () {
    // *don't* event.preventDefault(), because we want the input to actually
    // take focus
    // Like general cell-clicks, cliking on the input can change direction.
    // Unlike cell clicks, we *know* we're clicking on the already-focused
    // cell!
    var other = (0, _util.otherDirection)(currentDirection);
    var cellData = getCellData(focusedRow, focusedCol);
    var direction = currentDirection;

    if (focused && cellData[other]) {
      setCurrentDirection(other);
      direction = other;
    }

    setCurrentNumber(cellData[direction]);

    _focus();
  }, [currentDirection, focusedRow, focusedCol, getCellData, _focus]);
  var handleClueSelected = (0, _react.useCallback)(function (direction, number) {
    var info = data[direction][number]; // TODO: sanity-check info?

    moveTo(info.row, info.col, direction);

    _focus();
  }, [data, moveTo, _focus]); // expose some imperative methods

  (0, _react.useImperativeHandle)(ref, function () {
    return {
      /**
       * Sets focus to the crossword component.
       */
      focus: function focus() {
        _focus();
      },

      /**
       * Resets the entire crossword; clearing all answers in the grid and
       * also any persisted data.
       */
      reset: function reset() {
        setGridData((0, _immer["default"])(function (draft) {
          draft.forEach(function (rowData) {
            rowData.forEach(function (cellData) {
              if (cellData.used) {
                cellData.guess = '';
              }
            });
          });
        }));
        setClues((0, _immer["default"])(function (draft) {
          _util.bothDirections.forEach(function (direction) {
            draft[direction].forEach(function (clueInfo) {
              delete clueInfo.correct;
            });
          });
        }));

        if (useStorage) {
          (0, _util.clearGuesses)(defaultStorageKey);
        }
      },

      /**
       * Fills all the answers in the grid and calls the `onLoadedCorrect`
       * callback with _**every**_ answer.
       */
      fillAllAnswers: function fillAllAnswers() {
        setGridData((0, _immer["default"])(function (draft) {
          draft.forEach(function (rowData) {
            rowData.forEach(function (cellData) {
              if (cellData.used) {
                cellData.guess = cellData.answer;
              }
            });
          });
        }));
        setClues((0, _immer["default"])(function (draft) {
          _util.bothDirections.forEach(function (direction) {
            draft[direction].forEach(function (clueInfo) {
              clueInfo.correct = true;
            });
          });
        })); // trigger onLoadedCorrect with every clue!

        if (onLoadedCorrect) {
          var loadedCorrect = [];

          _util.bothDirections.forEach(function (direction) {
            Object.entries(data[direction]).forEach(function (_ref4) {
              var number = _ref4[0],
                  info = _ref4[1];
              loadedCorrect.push([direction, number, info.answer]);
            });
          });

          onLoadedCorrect(loadedCorrect);
        }
      },

      /**
       * Returns whether the crossword is entirely correct or not.
       *
       * @since 2.2.0
       */
      isCrosswordCorrect: function isCrosswordCorrect() {
        return crosswordCorrect;
      }
    };
  }, [data, onLoadedCorrect, useStorage, _focus, crosswordCorrect]); // constants for rendering...
  // We have several properties that we bundle together as context for the
  // cells, rather than have them as independent properties.  (Or should they
  // stay separate? Or be passed as "spread" values?)

  var cellSize = 100 / size;
  var cellPadding = 0.125;
  var cellInner = cellSize - cellPadding * 2;
  var fontSize = cellInner * 0.7;
  // The final theme is the merger of three values: the "theme" property
  // passed to the component (which takes precedence), any values from
  // ThemeContext, and finally the "defaultTheme" values fill in for any
  // needed ones that are missing.  (We create this in standard last-one-wins
  // order in Javascript, of course.)
  var finalTheme = (0, _extends2["default"])({}, defaultTheme, contextTheme, theme); // REVIEW: do we want to recalc this all the time, or cache in state?

  var cells = [];

  if (gridData) {
    gridData.forEach(function (rowData, row) {
      rowData.forEach(function (cellData, col) {
        if (!cellData.used) {
          return;
        }

        cells.push( /*#__PURE__*/_react["default"].createElement(_Cell["default"] // eslint-disable-next-line react/no-array-index-key
        , {
          key: "R" + row + "C" + col,
          cellData: cellData,
          focus: focused && row === focusedRow && col === focusedCol,
          highlight: focused && currentNumber && cellData[currentDirection] === currentNumber,
          onClick: handleCellClick
        }));
      });
    });
  }

  return /*#__PURE__*/_react["default"].createElement(_context.CrosswordContext.Provider, {
    value: {
      focused: focused,
      selectedDirection: currentDirection,
      selectedNumber: currentNumber,
      onClueSelected: handleClueSelected
    }
  }, /*#__PURE__*/_react["default"].createElement(_context.CrosswordSizeContext.Provider, {
    value: {
      cellSize: cellSize,
      cellPadding: cellPadding,
      cellInner: cellInner,
      cellHalf: cellSize / 2,
      fontSize: fontSize
    }
  }, /*#__PURE__*/_react["default"].createElement(_styledComponents.ThemeProvider, {
    theme: finalTheme
  }, /*#__PURE__*/_react["default"].createElement(OuterWrapper, {
    correct: crosswordCorrect
  }, /*#__PURE__*/_react["default"].createElement(GridWrapper, null, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      margin: 0,
      padding: 0,
      position: 'relative'
    }
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    viewBox: "0 0 100 100"
  }, /*#__PURE__*/_react["default"].createElement("rect", {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    fill: finalTheme.gridBackground
  }), cells), /*#__PURE__*/_react["default"].createElement("input", {
    ref: inputRef,
    "aria-label": "crossword-input",
    type: "text",
    onClick: handleInputClick,
    onKeyDown: handleInputKeyDown,
    onChange: handleInputChange,
    value: "" // onInput={this.handleInput}
    ,
    autoComplete: "off",
    spellCheck: "false",
    autoCorrect: "off",
    style: {
      position: 'absolute',
      // In order to ensure the top/left positioning makes sense,
      // there is an absolutely-positioned <div> with no
      // margin/padding that we *don't* expose to consumers.  This
      // keeps the math much more reliable.  (But we're still
      // seeing a slight vertical deviation towards the bottom of
      // the grid!  The "* 0.995" seems to help.)
      top: "calc(" + focusedRow * cellSize * 0.995 + "% + 2px)",
      left: "calc(" + focusedCol * cellSize + "% + 2px)",
      width: "calc(" + cellSize + "% - 4px)",
      height: "calc(" + cellSize + "% - 4px)",
      fontSize: fontSize * 6 + "px",
      // waaay too small...?
      textAlign: 'center',
      textAnchor: 'middle',
      backgroundColor: 'transparent',
      caretColor: 'transparent',
      margin: 0,
      padding: 0,
      border: 0,
      cursor: 'default'
    }
  }))), /*#__PURE__*/_react["default"].createElement(CluesWrapper, null, clues && _util.bothDirections.map(function (direction) {
    return /*#__PURE__*/_react["default"].createElement(_DirectionClues["default"], {
      key: direction,
      direction: direction,
      clues: clues[direction]
    });
  }))))));
});

Crossword.displayName = 'Crossword';
var clueShape = process.env.NODE_ENV !== "production" ? _propTypes["default"].shape({
  clue: _propTypes["default"].string.isRequired,
  answer: _propTypes["default"].string.isRequired,
  row: _propTypes["default"].number.isRequired,
  col: _propTypes["default"].number.isRequired
}) : {};
process.env.NODE_ENV !== "production" ? Crossword.propTypes = {
  /** clue/answer data; see <a href="#cluedata-format">Clue/data format</a> for details. */
  data: _propTypes["default"].shape({
    /** "across" clues and answers */
    across: _propTypes["default"].objectOf(clueShape),

    /** "down" clues and answers */
    down: _propTypes["default"].objectOf(clueShape)
  }).isRequired,

  /** presentation values for the crossword; these override any values coming from a parent ThemeProvider context. */
  theme: _propTypes["default"].shape({
    /** browser-width at which the clues go from showing beneath the grid to showing beside the grid */
    columnBreakpoint: _propTypes["default"].string,

    /** overall background color (fill) for the crossword grid; can be `'transparent'` to show through a page background image */
    gridBackground: _propTypes["default"].string,

    /**  background for an answer cell */
    cellBackground: _propTypes["default"].string,

    /** border for an answer cell */
    cellBorder: _propTypes["default"].string,

    /** color for answer text (entered by the player) */
    textColor: _propTypes["default"].string,

    /** color for the across/down numbers in the grid */
    numberColor: _propTypes["default"].string,

    /** background color for the cell with focus, the one that the player is typing into */
    focusBackground: _propTypes["default"].string,

    /** background color for the cells in the answer the player is working on,
     * helps indicate in which direction focus will be moving; also used as a
     * background on the active clue  */
    highlightBackground: _propTypes["default"].string
  }),

  /** whether to use browser storage to persist the player's work-in-progress */
  useStorage: _propTypes["default"].bool,

  /** callback function that fires when a player answers a clue correctly; called with `(direction, number, answer)` arguments, where `direction` is `'across'` or `'down'`, `number` is the clue number as text (like `'1'`), and `answer` is the answer itself */
  onCorrect: _propTypes["default"].func,

  /** callback function that's called when a crossword is loaded, to batch up correct answers loaded from storage; passed an array of the same values that `onCorrect` would recieve */
  onLoadedCorrect: _propTypes["default"].func,

  /** callback function that's called when the overall crossword is completely correct (or not) */
  onCrosswordCorrect: _propTypes["default"].func,

  defaultKey: _propTypes['default'].string,

  /**
   *  callback function called when a cell changes (e.g. when the user types a
   *  letter); called with `(row, col, char)` arguments, where the `row` and
   *  `column` are the 0-based position of the cell, and `char` is the character
   *  typed (already massaged into upper-case)
   *
   *  @since 2.1.0
   */
  onCellChange: _propTypes["default"].func
} : void 0;
Crossword.defaultProps = {
  theme: null,
  useStorage: true,
  // useStorage: false,
  onCorrect: null,
  onLoadedCorrect: null,
  onCrosswordCorrect: null,
  onCellChange: null,
  defaultKey: '',
};
var _default = Crossword;
exports["default"] = _default;
