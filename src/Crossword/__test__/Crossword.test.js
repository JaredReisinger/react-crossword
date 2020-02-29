import React from 'react';
import ReactDom from 'react-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import '@testing-library/jest-dom/extend-expect';

import Crossword from '../Crossword';

afterEach(cleanup);

const emptyData = {
  across: {},
  down: {},
};

const simpleData = {
  across: {
    1: {
      clue: 'one plus one',
      answer: 'TWO',
      row: 0,
      col: 0,
    },
  },
  down: {
    2: {
      clue: 'three minus two',
      answer: 'ONE',
      row: 0,
      col: 2,
    },
  },
};

const defaultProps = {
  data: emptyData,
  useStorage: false,
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDom.render(<Crossword {...defaultProps} />, div);
  ReactDom.unmountComponentAtNode(div);
});

it('renders Crossword component correctly', () => {
  const { container, getByText } = render(<Crossword {...defaultProps} />);
  expect(container.firstChild).toHaveClass('crossword');
  expect(getByText('ACROSS')).toHaveTextContent('ACROSS');
  expect(getByText('DOWN')).toHaveTextContent('DOWN');
});

it('matches snapshot', () => {
  const tree = renderer.create(<Crossword {...defaultProps} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('creates new gridData when the data changes', () => {
  const clueMatch = /one plus one/;
  const { queryByText, rerender } = render(<Crossword {...defaultProps} />);
  expect(queryByText(clueMatch)).toBeNull();

  rerender(<Crossword {...defaultProps} data={simpleData} />);
  expect(queryByText(clueMatch)).toBeTruthy();
});

it('handles typing', () => {
  const { getByLabelText } = render(
    <Crossword {...defaultProps} data={simpleData} />
  );
  const input = getByLabelText('crossword-input');
  userEvent.type(input, 'T');
});

it('handles keyboard navigation', () => {
  const { getByLabelText, getByText } = render(
    <Crossword {...defaultProps} data={simpleData} />
  );
  const input = getByLabelText('crossword-input');

  userEvent.click(getByLabelText('clue-1-across'));

  fireEvent.keyDown(input, { key: 'ArrowLeft' });
  fireEvent.keyDown(input, { key: 'X' });
  const rectX = getByText('X').parentElement.firstChild;
  expect(rectX.getAttribute('x')).toBe('0.125');
  expect(rectX.getAttribute('y')).toBe('0.125');

  fireEvent.keyDown(input, { key: 'Z' });
  const rectZ = getByText('Z').parentElement.firstChild;
  expect(rectZ.getAttribute('x')).toBe('33.458333333333336');
  expect(rectZ.getAttribute('y')).toBe('0.125');
});

it('fires onCorrect when an answer is entered', () => {
  // The onCorrect happens on a delay, so we need a Promise to even wait for the
  // call!

  // Jest complains with "ReferenceError: regeneratorRuntime is not defined"
  // when the test is defined with 'async'... despite @babel/preset-env being
  // included already.  For now, we just use old-school Promise.then() syntax,
  // and make sure to return the promise.
  const onCorrect = new Promise((resolve, reject) => {
    const { getByLabelText } = render(
      <Crossword
        {...defaultProps}
        data={simpleData}
        onCorrect={(...args) => resolve(args)}
      />
    );

    userEvent.click(getByLabelText('clue-1-across'));
    // we don't need to await this, as the onCorrect handler is taking care of
    // that for us...
    userEvent.type(getByLabelText('crossword-input'), 'TWO');
  });

  return onCorrect.then(([direction, number, answer]) => {
    expect(direction).toBe('across');
    expect(number).toBe('1');
    expect(answer).toBe('TWO');
  });
});
