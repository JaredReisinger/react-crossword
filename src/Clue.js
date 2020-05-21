import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { CrosswordContext, CrosswordRenderContext } from './context';

const ClueWrapper = styled.div.attrs((props) => ({
  className: 'clue',
}))`
  cursor: default;
  background-color: ${(props) =>
    props.highlight ? props.highlightBackground : 'transparent'};
`;

export default function Clue({
  direction,
  number,
  // highlight, // passed through to styled-component wrapper
  // highlightBackground, // passed through to styled-component wrapper
  children,
  // onClick,
  ...props
}) {
  const { highlightBackground } = useContext(CrosswordRenderContext);
  const {
    focused,
    selectedDirection,
    selectedNumber,
    onClueSelected,
  } = useContext(CrosswordContext);

  const handleClick = useCallback(
    (event) => {
      event.preventDefault();
      if (onClueSelected) {
        onClueSelected(direction, number);
      }
    },
    [direction, number, onClueSelected]
  );

  return (
    <ClueWrapper
      highlightBackground={highlightBackground}
      highlight={
        focused && direction === selectedDirection && number === selectedNumber
      }
      {...props}
      onClick={handleClick}
      aria-label={`clue-${number}-${direction}`}
    >
      {number}: {children}
    </ClueWrapper>
  );
}

Clue.propTypes = {
  /** direction of the clue: "across" or "down"; passed back in onClick */
  direction: PropTypes.string.isRequired,
  /** number of the clue (the label shown); passed back in onClick */
  number: PropTypes.string.isRequired,
  /** clue text */
  children: PropTypes.node,
  // /** whether the clue should be highlighted */
  // highlight: PropTypes.bool,
  // /** color to use when highlightng */
  // highlightBackground: PropTypes.string,
  // /** handler to call when the clue is clicked */
  // onClick: PropTypes.func,
};

Clue.defaultProps = {
  children: undefined,
  // highlight: false,
  // onClick: undefined,
  // highlightBackground: 'rgb(255,255,204)',
};
