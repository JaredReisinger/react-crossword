import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { CrosswordContext } from './context';
import type { Direction, EnhancedProps } from './types';

import Clue from './Clue';

// interface ClueInfo {
//   number: string;
//   clue: string;
//   correct?: boolean;
// }

const directionCluesPropTypes = {
  /** direction of this list of clues ("across" or "down") */
  direction: PropTypes.string.isRequired,
  // /** clues for this List's direction */
  // clues: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     /** number of the clue (the label shown) */
  //     number: PropTypes.string.isRequired,
  //     /** clue text */
  //     clue: PropTypes.node.isRequired,
  //     /** whether the answer/guess is correct */
  //     correct: PropTypes.bool,
  //   })
  // ).isRequired,
};

export type DirectionCluesProps = EnhancedProps<
  typeof directionCluesPropTypes,
  { direction: Direction }
>;

export default function DirectionClues({ direction }: DirectionCluesProps) {
  const {
    clues,
    // selectedPosition: { row: focusedRow, col: focusedCol },
    // selectedDirection: currentDirection,
    // selectedNumber: currentNumber,
  } = useContext(CrosswordContext);

  return (
    <div className="direction">
      {/* use something other than h3? */}
      <h3 className="header">{direction.toUpperCase()}</h3>
      {clues?.[direction].map(({ number, clue, correct }) => (
        <Clue
          key={number}
          direction={direction}
          number={number}
          correct={correct}
        >
          {clue}
        </Clue>
      ))}
    </div>
  );
}

DirectionClues.propTypes = {
  /** direction of this list of clues ("across" or "down") */
  direction: PropTypes.string.isRequired,
  // /** clues for this List's direction */
  // clues: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     /** number of the clue (the label shown) */
  //     number: PropTypes.string.isRequired,
  //     /** clue text */
  //     clue: PropTypes.node.isRequired,
  //     /** whether the answer/guess is correct */
  //     correct: PropTypes.bool,
  //   })
  // ).isRequired,
};

DirectionClues.defaultProps = {};
