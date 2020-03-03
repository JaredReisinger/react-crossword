import React from 'react';
import PropTypes from 'prop-types';

// expected props: row, col, answer, crossword, cellSize

/**
 * An individual-letter answer cell within the crossword grid.
 *
 * A `Cell` lives inside the SVG for a [`Crossword`](#crossword), and renders at
 * a location determined by the `row`, `col`, and `cellSize` properties from
 * `cellData` and `renderContext`.
 */
class Cell extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    // console.log('CELL CLICK', this.props.row, this.props.col);
    const { onClick, cellData } = this.props;
    if (onClick) {
      onClick(cellData);
    }
  }

  render() {
    const { cellData, renderContext, focus, highlight } = this.props;
    const { row, col, guess, number } = cellData;

    if (!renderContext) {
      return null;
    }

    const {
      // gridBackground,
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
    } = renderContext;

    const x = col * cellSize;
    const y = row * cellSize;

    return (
      <g
        onClick={this.handleClick}
        style={{ cursor: 'default', fontSize: `${fontSize}px` }}
      >
        <rect
          x={x + cellPadding}
          y={y + cellPadding}
          width={cellInner}
          height={cellInner}
          fill={
            focus
              ? focusBackground
              : highlight
              ? highlightBackground
              : cellBackground
          }
          stroke={cellBorder}
          strokeWidth={cellSize / 50}
        />
        {number && (
          <text
            x={x + cellPadding * 4}
            y={y + cellPadding * 4}
            textAnchor="start"
            dominantBaseline="hanging"
            style={{ fontSize: '50%', fill: numberColor }}
          >
            {number}
          </text>
        )}
        <text
          x={x + cellHalf}
          y={y + cellHalf + 1} // +1 for visual alignment?
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fill: textColor }}
        >
          {guess}
        </text>
      </g>
    );
  }
}

Cell.propTypes = {
  /** the data specific to this cell */
  cellData: PropTypes.shape({
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
    guess: PropTypes.string.isRequired,
    number: PropTypes.string,
  }).isRequired,

  /** rendering context passed from Crossword */
  // eslint-disable-next-line react/forbid-prop-types
  renderContext: PropTypes.shape({
    cellBackground: PropTypes.string.isRequired,
    cellBorder: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    numberColor: PropTypes.string.isRequired,
    focusBackground: PropTypes.string.isRequired,
    highlightBackground: PropTypes.string.isRequired,
    cellSize: PropTypes.number.isRequired,
    cellPadding: PropTypes.number.isRequired,
    cellInner: PropTypes.number.isRequired,
    cellHalf: PropTypes.number.isRequired,
    fontSize: PropTypes.number.isRequired,
  }).isRequired,

  /** whether this cell has focus */
  focus: PropTypes.bool,

  /** whether this cell is highlighted */
  highlight: PropTypes.bool,

  /** handler called when the cell is clicked */
  onClick: PropTypes.func,
};

Cell.defaultProps = {
  focus: false,
  highlight: false,
  onClick: null,
};

export default Cell;
