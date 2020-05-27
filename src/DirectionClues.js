import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import Clue from './Clue';

export default function DirectionClues({ direction, clues }) {
  return (
    <div className="direction">
      {/* use something other than h3? */}
      <h3 className="header">{direction.toUpperCase()}</h3>
      {clues.map(({ number, clue, correct }) => (
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
  /** clues for this List's direction */
  clues: PropTypes.arrayOf(
    PropTypes.shape({
      /** number of the clue (the label shown) */
      number: PropTypes.string.isRequired,
      /** clue text */
      clue: PropTypes.node.isRequired,
      /** whether the answer/guess is correct */
      correct: PropTypes.bool,
    })
  ).isRequired,
};

DirectionClues.defaultProps = {};
