import { jest } from '@jest/globals';
import React, { useCallback, useContext } from 'react';
import ReactDom from 'react-dom';
import { act, render, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import '@testing-library/jest-dom/extend-expect';

import { Empty, Simple, Size4 } from './providers';

import { CrosswordProviderImperative } from '../CrosswordProvider';
import { CrosswordContext } from '../context';

afterEach(cleanup);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDom.render(<Empty />, div);
  ReactDom.unmountComponentAtNode(div);
});

it('renders component correctly', () => {
  const { container, getByText } = render(<Simple withGrid withClues />);
  expect(container.firstChild).toHaveClass('crossword');
  expect(getByText('ACROSS')).toHaveTextContent('ACROSS');
  expect(getByText('DOWN')).toHaveTextContent('DOWN');
});

it('renders component correctly when using storage', () => {
  const { container, getByText } = render(
    <Simple withGrid withClues useStorage />
  );
  expect(container.firstChild).toHaveClass('crossword');
  expect(getByText('ACROSS')).toHaveTextContent('ACROSS');
  expect(getByText('DOWN')).toHaveTextContent('DOWN');
});

it('matches snapshot', () => {
  const tree = renderer.create(<Simple />).toJSON();
  expect(tree).toMatchSnapshot();
});

// it('creates new gridData when the data changes', () => {
//   const clueMatch = /one plus one/;
//   const { queryByText, rerender } = render(<Crossword />);
//   expect(queryByText(clueMatch)).toBeNull();

//   rerender(<Crossword data={simpleData} />);
//   expect(queryByText(clueMatch)).toBeTruthy();
// });

it('handles typing', () => {
  const { getByLabelText } = render(<Simple withGrid />);
  const input = getByLabelText('crossword-input');
  userEvent.type(input, 'T', { skipClick: true });
});

describe('keyboard navigation', () => {
  it('basic typing', () => {
    const { getByLabelText, getByText } = render(<Size4 withGrid withClues />);
    const input = getByLabelText('crossword-input');

    userEvent.click(getByLabelText('clue-1-across'));

    fireEvent.keyDown(input, { key: 'ArrowLeft' });
    fireEvent.keyDown(input, { key: 'X' });
    let { x, y } = posForText(getByText('X'));
    expect(x).toBe('0.125');
    expect(y).toBe('0.125');

    fireEvent.keyDown(input, { key: 'Z' });
    ({ x, y } = posForText(getByText('Z')));
    expect(x).toBe('25.125');
    expect(y).toBe('0.125');
  });

  it('home and end (across)', () => {
    const { getByLabelText, getByText } = render(<Size4 withGrid withClues />);
    const input = getByLabelText('crossword-input');

    userEvent.click(getByLabelText('clue-1-across'));

    fireEvent.keyDown(input, { key: 'Home' });
    fireEvent.keyDown(input, { key: 'X' });
    let { x, y } = posForText(getByText('X'));
    expect(x).toBe('0.125');
    expect(y).toBe('0.125');

    fireEvent.keyDown(input, { key: 'End' });
    fireEvent.keyDown(input, { key: 'Z' });
    ({ x, y } = posForText(getByText('Z')));
    expect(x).toBe('50.125');
    expect(y).toBe('0.125');
  });

  it('home and end (down)', () => {
    const { getByLabelText, getByText } = render(<Size4 withGrid withClues />);
    const input = getByLabelText('crossword-input');

    userEvent.click(getByLabelText('clue-2-down'));

    // fireEvent.keyDown(input, { key: 'Home' });
    fireEvent.keyDown(input, { key: 'X' });

    let { x, y } = posForText(getByText('X'));

    expect(x).toBe('50.125');
    expect(y).toBe('0.125');

    fireEvent.keyDown(input, { key: 'End' });
    fireEvent.keyDown(input, { key: 'Z' });
    ({ x, y } = posForText(getByText('Z')));
    expect(x).toBe('50.125');
    expect(y).toBe('50.125');
  });

  it('left and right (across)', () => {
    const { getByLabelText, getByText } = render(<Size4 withGrid withClues />);
    const input = getByLabelText('crossword-input');

    userEvent.click(getByLabelText('clue-1-across'));

    fireEvent.keyDown(input, { key: 'ArrowLeft' });
    fireEvent.keyDown(input, { key: 'X' });
    let { x, y } = posForText(getByText('X'));
    expect(x).toBe('0.125');
    expect(y).toBe('0.125');

    fireEvent.keyDown(input, { key: 'ArrowRight' });
    fireEvent.keyDown(input, { key: 'Z' });
    ({ x, y } = posForText(getByText('Z')));
    expect(x).toBe('50.125');
    expect(y).toBe('0.125');
  });

  it('up and down (down)', () => {
    const { getByLabelText, getByText } = render(<Size4 withGrid withClues />);
    const input = getByLabelText('crossword-input');

    userEvent.click(getByLabelText('clue-2-down'));

    fireEvent.keyDown(input, { key: 'ArrowUp' });
    fireEvent.keyDown(input, { key: 'X' });
    let { x, y } = posForText(getByText('X'));
    expect(x).toBe('50.125');
    expect(y).toBe('0.125');

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Z' });
    ({ x, y } = posForText(getByText('Z')));
    expect(x).toBe('50.125');
    expect(y).toBe('50.125');
  });

  it('tab switches direction (across to down)', () => {
    const { getByLabelText, getByText } = render(<Size4 withGrid withClues />);
    const input = getByLabelText('crossword-input');

    userEvent.click(getByLabelText('clue-1-across'));
    fireEvent.keyDown(input, { key: 'End' });

    fireEvent.keyDown(input, { key: 'Tab' }); // switches to 2-down
    fireEvent.keyDown(input, { key: 'End' });
    fireEvent.keyDown(input, { key: 'X' });
    const { x, y } = posForText(getByText('X'));
    expect(x).toBe('50.125');
    expect(y).toBe('50.125');
  });

  it('tab switches direction (down to across)', () => {
    const { getByLabelText, getByText } = render(<Size4 withGrid withClues />);
    const input = getByLabelText('crossword-input');

    userEvent.click(getByLabelText('clue-2-down'));

    fireEvent.keyDown(input, { key: 'Tab' }); // switches to 1-across
    fireEvent.keyDown(input, { key: 'Home' });
    fireEvent.keyDown(input, { key: 'X' });
    const { x, y } = posForText(getByText('X'));
    expect(x).toBe('0.125');
    expect(y).toBe('0.125');
  });

  it('space switches direction (across to down)', () => {
    const { getByLabelText, getByText } = render(<Size4 withGrid withClues />);
    const input = getByLabelText('crossword-input');

    userEvent.click(getByLabelText('clue-1-across'));
    fireEvent.keyDown(input, { key: 'End' });

    fireEvent.keyDown(input, { key: ' ' }); // switches to 2-down
    fireEvent.keyDown(input, { key: 'End' });
    fireEvent.keyDown(input, { key: 'X' });
    const { x, y } = posForText(getByText('X'));
    expect(x).toBe('50.125');
    expect(y).toBe('50.125');
  });

  it('space switches direction (down to across)', () => {
    const { getByLabelText, getByText } = render(<Size4 withGrid withClues />);
    const input = getByLabelText('crossword-input');

    userEvent.click(getByLabelText('clue-2-down'));

    fireEvent.keyDown(input, { key: ' ' }); // switches to 1-across
    fireEvent.keyDown(input, { key: 'Home' });
    fireEvent.keyDown(input, { key: 'X' });
    const { x, y } = posForText(getByText('X'));
    expect(x).toBe('0.125');
    expect(y).toBe('0.125');
  });

  it('clicking on input switches direction (across to down)', () => {
    const { getByLabelText, getByText } = render(<Size4 withGrid withClues />);
    const input = getByLabelText('crossword-input');

    userEvent.click(getByLabelText('clue-1-across'));
    fireEvent.keyDown(input, { key: 'End' });

    userEvent.click(input); // switches to 2-down
    fireEvent.keyDown(input, { key: 'End' });
    fireEvent.keyDown(input, { key: 'X' });
    const { x, y } = posForText(getByText('X'));
    expect(x).toBe('50.125');
    expect(y).toBe('50.125');
  });

  it('clicking on input switches direction (down to across)', () => {
    const { getByLabelText, getByText } = render(<Size4 withGrid withClues />);
    const input = getByLabelText('crossword-input');

    userEvent.click(getByLabelText('clue-2-down'));

    userEvent.click(input); // switches to 1-across
    fireEvent.keyDown(input, { key: 'Home' });
    fireEvent.keyDown(input, { key: 'X' });
    const { x, y } = posForText(getByText('X'));
    expect(x).toBe('0.125');
    expect(y).toBe('0.125');
  });

  it('clicking on cell when focused switches direction (across to down)', () => {
    const { getByLabelText, getByText } = render(<Size4 withGrid withClues />);
    const input = getByLabelText('crossword-input');

    userEvent.click(getByLabelText('clue-1-across'));
    fireEvent.keyDown(input, { key: 'End' });
    fireEvent.keyDown(input, { key: 'Z' });
    userEvent.click(getByText('Z')); // switches to 2-down

    fireEvent.keyDown(input, { key: 'End' });
    fireEvent.keyDown(input, { key: 'X' });
    const { x, y } = posForText(getByText('X'));
    expect(x).toBe('50.125');
    expect(y).toBe('50.125');
  });

  it('clicking on cell when focused switches direction (down to across)', () => {
    const { getByLabelText, getByText } = render(<Size4 withGrid withClues />);
    const input = getByLabelText('crossword-input');

    userEvent.click(getByLabelText('clue-2-down'));
    fireEvent.keyDown(input, { key: 'Z' });
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    userEvent.click(getByText('Z')); // switches to 1-across

    fireEvent.keyDown(input, { key: 'Home' });
    fireEvent.keyDown(input, { key: 'X' });
    const { x, y } = posForText(getByText('X'));
    expect(x).toBe('0.125');
    expect(y).toBe('0.125');
  });

  it('backspace clears and moves back (across)', () => {
    const { getByLabelText, getByText, queryByText } = render(
      <Size4 withGrid withClues />
    );
    const input = getByLabelText('crossword-input');

    userEvent.click(getByLabelText('clue-1-across'));
    fireEvent.keyDown(input, { key: 'End' });
    fireEvent.keyDown(input, { key: 'Z' });
    let { x, y } = posForText(getByText('Z'));
    expect(x).toBe('50.125');
    expect(y).toBe('0.125');

    fireEvent.keyDown(input, { key: 'Backspace' });
    expect(queryByText('Z')).toBeNull();

    fireEvent.keyDown(input, { key: 'Z' });
    ({ x, y } = posForText(getByText('Z')));
    expect(x).toBe('25.125'); // second col!
    expect(y).toBe('0.125');
  });

  it('backspace clears and moves up (down)', () => {
    const { getByLabelText, getByText, queryByText } = render(
      <Size4 withGrid withClues />
    );
    const input = getByLabelText('crossword-input');

    userEvent.click(getByLabelText('clue-2-down'));
    fireEvent.keyDown(input, { key: 'End' });
    fireEvent.keyDown(input, { key: 'Z' });
    let { x, y } = posForText(getByText('Z'));
    expect(x).toBe('50.125');
    expect(y).toBe('50.125');

    fireEvent.keyDown(input, { key: 'Backspace' });
    expect(queryByText('Z')).toBeNull();

    fireEvent.keyDown(input, { key: 'Z' });
    ({ x, y } = posForText(getByText('Z')));
    expect(x).toBe('50.125');
    expect(y).toBe('25.125'); // second row!
  });

  it('delete clears and does not move back (across)', () => {
    const { getByLabelText, getByText, queryByText } = render(
      <Size4 withGrid withClues />
    );
    const input = getByLabelText('crossword-input');

    userEvent.click(getByLabelText('clue-1-across'));
    fireEvent.keyDown(input, { key: 'End' });
    fireEvent.keyDown(input, { key: 'Z' });
    let { x, y } = posForText(getByText('Z'));
    expect(x).toBe('50.125');
    expect(y).toBe('0.125');

    fireEvent.keyDown(input, { key: 'Delete' });
    expect(queryByText('Z')).toBeNull();

    fireEvent.keyDown(input, { key: 'Z' });
    ({ x, y } = posForText(getByText('Z')));
    expect(x).toBe('50.125'); // still third col!
    expect(y).toBe('0.125');
  });

  it('delete clears and does not move up (down)', () => {
    const { getByLabelText, getByText, queryByText } = render(
      <Size4 withGrid withClues />
    );
    const input = getByLabelText('crossword-input');

    userEvent.click(getByLabelText('clue-2-down'));
    fireEvent.keyDown(input, { key: 'End' });
    fireEvent.keyDown(input, { key: 'Z' });
    let { x, y } = posForText(getByText('Z'));
    expect(x).toBe('50.125');
    expect(y).toBe('50.125');

    fireEvent.keyDown(input, { key: 'Delete' });
    expect(queryByText('Z')).toBeNull();

    fireEvent.keyDown(input, { key: 'Z' });
    ({ x, y } = posForText(getByText('Z')));
    expect(x).toBe('50.125');
    expect(y).toBe('50.125'); // still third row!
  });

  it('ctrl, meta, alt character go unused', () => {
    const { getByLabelText, queryByText } = render(
      <Size4 withGrid withClues />
    );
    const input = getByLabelText('crossword-input');

    userEvent.click(getByLabelText('clue-1-across'));

    fireEvent.keyDown(input, { ctrlKey: true, key: 'X' });
    expect(queryByText('X')).toBeNull();

    fireEvent.keyDown(input, { altKey: true, key: 'X' });
    expect(queryByText('X')).toBeNull();

    fireEvent.keyDown(input, { metaKey: true, key: 'X' });
    expect(queryByText('X')).toBeNull();
  });

  it('unknown keys go unused', () => {
    const { getByLabelText, queryByText } = render(
      <Size4 withGrid withClues />
    );
    const input = getByLabelText('crossword-input');

    userEvent.click(getByLabelText('clue-1-across'));

    fireEvent.keyDown(input, { key: 'BOGUS' });
    expect(queryByText('B')).toBeNull();
    expect(queryByText('BOGUS')).toBeNull();
  });

  it('handles "bulk" input (pasting)', () => {
    const { getByLabelText, getByText } = render(<Size4 withGrid withClues />);
    const input = getByLabelText('crossword-input');

    userEvent.click(getByLabelText('clue-1-across'));

    fireEvent.change(input, { target: { value: 'XYZ' } });

    let { x, y } = posForText(getByText('X'));
    expect(x).toBe('0.125');
    expect(y).toBe('0.125');

    ({ x, y } = posForText(getByText('Y')));
    expect(x).toBe('25.125');
    expect(y).toBe('0.125');

    ({ x, y } = posForText(getByText('Z')));
    expect(x).toBe('50.125');
    expect(y).toBe('0.125');
  });
});

describe('onAnswerComplete', () => {
  it('fires onAnswerComplete when all cells in an answer are filled correctly', () => {
    const onAnswerComplete = jest.fn();
    const { getByLabelText } = render(
      <Simple withGrid withClues onAnswerComplete={onAnswerComplete} />
    );

    userEvent.click(getByLabelText('clue-1-across'));
    // we don't need to await this, as the onCorrect handler is taking care of
    // that for us...
    userEvent.type(getByLabelText('crossword-input'), 'TWO', {
      skipClick: true,
    });

    expect(onAnswerComplete).toBeCalledTimes(1);
    expect(onAnswerComplete).toBeCalledWith('across', '1', true, 'TWO');
  });

  it('fires onAnswerComplete when all cells in an answer are filled, even if incorrectly', () => {
    const onAnswerComplete = jest.fn();
    const { getByLabelText } = render(
      <Simple withGrid withClues onAnswerComplete={onAnswerComplete} />
    );

    userEvent.click(getByLabelText('clue-1-across'));
    userEvent.type(getByLabelText('crossword-input'), 'XXX', {
      skipClick: true,
    });

    expect(onAnswerComplete).toBeCalledTimes(1);
    expect(onAnswerComplete).toBeCalledWith('across', '1', false, 'TWO');
  });
});

['onAnswerCorrect', 'onCorrect'].forEach((handler) => {
  describe(`${handler} callback`, () => {
    it(`fires ${handler} when an answer is entered correctly`, () => {
      const onAnswerCorrect = jest.fn();
      const handlerProp = { [handler]: onAnswerCorrect };
      const { getByLabelText } = render(
        <Simple withGrid withClues {...handlerProp} />
      );

      userEvent.click(getByLabelText('clue-1-across'));
      userEvent.type(getByLabelText('crossword-input'), 'TWO', {
        skipClick: true,
      });

      expect(onAnswerCorrect).toBeCalledTimes(1);
      expect(onAnswerCorrect).toBeCalledWith('across', '1', 'TWO');
    });

    it(`does not fire ${handler} when a wrong answer is entered`, () => {
      const onAnswerCorrect = jest.fn();
      const handlerProp = { [handler]: onAnswerCorrect };
      const { getByLabelText } = render(
        <Simple withGrid withClues {...handlerProp} />
      );

      const input = getByLabelText('crossword-input');

      userEvent.click(getByLabelText('clue-1-across'));
      userEvent.type(getByLabelText('crossword-input'), 'XXX', {
        skipClick: true,
      });

      expect(onAnswerCorrect).toBeCalledTimes(0);

      fireEvent.keyDown(input, { key: 'Tab' }); // switches to 2-down
      expect(onAnswerCorrect).toBeCalledTimes(0);
    });
  });
});

describe('onAnswerIncorrect callback', () => {
  it('fires onAnswerIncorrect when an answer is entered incorrectly', () => {
    const onAnswerIncorrect = jest.fn();
    const { getByLabelText } = render(
      <Simple withGrid withClues onAnswerIncorrect={onAnswerIncorrect} />
    );

    userEvent.click(getByLabelText('clue-1-across'));
    userEvent.type(getByLabelText('crossword-input'), 'XXX', {
      skipClick: true,
    });

    expect(onAnswerIncorrect).toBeCalledTimes(1);
    expect(onAnswerIncorrect).toBeCalledWith('across', '1', 'TWO');
  });

  it('does not fire onAnswerIncorrect when a correct answer is entered', () => {
    const onAnswerIncorrect = jest.fn();
    const { getByLabelText } = render(
      <Simple withGrid withClues onAnswerIncorrect={onAnswerIncorrect} />
    );

    const input = getByLabelText('crossword-input');

    userEvent.click(getByLabelText('clue-1-across'));
    userEvent.type(getByLabelText('crossword-input'), 'TWO', {
      skipClick: true,
    });

    expect(onAnswerIncorrect).toBeCalledTimes(0);

    fireEvent.keyDown(input, { key: 'Tab' }); // switches to 2-down
    expect(onAnswerIncorrect).toBeCalledTimes(0);
  });
});

describe('onCellChange callback', () => {
  it('fires onCellChange when a cell is changed', () => {
    const onCellChange = jest.fn();
    const { getByLabelText } = render(
      <Simple withGrid withClues onCellChange={onCellChange} />
    );

    userEvent.click(getByLabelText('clue-1-across'));
    userEvent.type(getByLabelText('crossword-input'), 'T', { skipClick: true });

    expect(onCellChange).toBeCalledTimes(1);
    expect(onCellChange).toBeCalledWith(0, 0, 'T');
  });

  it('does not fire onCellChange when a cell gets the same value', () => {
    const onCellChange = jest.fn();
    const { getByLabelText } = render(
      <Simple withGrid withClues onCellChange={onCellChange} />
    );

    userEvent.click(getByLabelText('clue-1-across'));
    userEvent.type(getByLabelText('crossword-input'), 'T', { skipClick: true });

    expect(onCellChange).toBeCalledTimes(1);
    onCellChange.mockClear();

    userEvent.click(getByLabelText('clue-1-across'));
    userEvent.type(getByLabelText('crossword-input'), 'T', { skipClick: true });
    expect(onCellChange).toBeCalledTimes(0);
  });
});

describe('onCrosswordComplete callback', () => {
  it('fires onCrosswordComplete(true) when the crossword becomes entirely correct', () => {
    const onCrosswordComplete = jest.fn();
    const { getByLabelText } = render(
      <Simple withGrid withClues onCrosswordComplete={onCrosswordComplete} />
    );

    onCrosswordComplete.mockClear();
    userEvent.click(getByLabelText('clue-1-across'));
    userEvent.type(getByLabelText('crossword-input'), 'TWO', {
      skipClick: true,
    });
    userEvent.click(getByLabelText('clue-2-down'));
    userEvent.type(getByLabelText('crossword-input'), 'ON', {
      skipClick: true,
    });
    expect(onCrosswordComplete).toBeCalledTimes(0);
    userEvent.type(getByLabelText('crossword-input'), 'E', { skipClick: true });

    expect(onCrosswordComplete).toBeCalledTimes(1);
    expect(onCrosswordComplete).toBeCalledWith(true);
  });

  it('fires onCrosswordComplete(false) when the crossword is filled but *not* entirely correct', () => {
    const onCrosswordComplete = jest.fn();
    const { getByLabelText } = render(
      <Simple withGrid withClues onCrosswordComplete={onCrosswordComplete} />
    );

    onCrosswordComplete.mockClear();
    userEvent.click(getByLabelText('clue-1-across'));
    userEvent.type(getByLabelText('crossword-input'), 'TWO', {
      skipClick: true,
    });
    userEvent.click(getByLabelText('clue-2-down'));
    userEvent.type(getByLabelText('crossword-input'), 'ONE', {
      skipClick: true,
    });
    expect(onCrosswordComplete).toBeCalledTimes(1);
    onCrosswordComplete.mockClear();

    userEvent.type(getByLabelText('crossword-input'), 'X', { skipClick: true });

    expect(onCrosswordComplete).toBeCalledTimes(1);
    expect(onCrosswordComplete).toBeCalledWith(false);
  });
});

describe('onCrosswordCorrect callback', () => {
  // it('fires onCrosswordCorrect(falsy) when the crossword loads', () => {
  //   const onCrosswordCorrect = jest.fn();
  //   render(
  //     <Simple withGrid withClues onCrosswordCorrect={onCrosswordCorrect} />
  //   );

  //   expect(onCrosswordCorrect).toBeCalledWith(false);
  //   expect(onCrosswordCorrect).not.toBeCalledWith(true);
  // });

  it('fires onCrosswordCorrect(true) when the crossword becomes entirely correct', () => {
    const onCrosswordCorrect = jest.fn();
    const { getByLabelText } = render(
      <Simple withGrid withClues onCrosswordCorrect={onCrosswordCorrect} />
    );

    onCrosswordCorrect.mockClear();
    userEvent.click(getByLabelText('clue-1-across'));
    userEvent.type(getByLabelText('crossword-input'), 'TWO', {
      skipClick: true,
    });
    userEvent.click(getByLabelText('clue-2-down'));
    userEvent.type(getByLabelText('crossword-input'), 'ON', {
      skipClick: true,
    });
    expect(onCrosswordCorrect).toBeCalledTimes(0);
    userEvent.type(getByLabelText('crossword-input'), 'E', { skipClick: true });

    expect(onCrosswordCorrect).toBeCalledTimes(1);
    expect(onCrosswordCorrect).toBeCalledWith(true);
  });

  it('fires onCrosswordCorrect(false) when the crossword becomes *not* entirely correct again', () => {
    const onCrosswordCorrect = jest.fn();
    const { getByLabelText } = render(
      <Simple withGrid withClues onCrosswordCorrect={onCrosswordCorrect} />
    );

    onCrosswordCorrect.mockClear();
    userEvent.click(getByLabelText('clue-1-across'));
    userEvent.type(getByLabelText('crossword-input'), 'TWO', {
      skipClick: true,
    });
    userEvent.click(getByLabelText('clue-2-down'));
    userEvent.type(getByLabelText('crossword-input'), 'ONE', {
      skipClick: true,
    });
    expect(onCrosswordCorrect).toBeCalledTimes(1);
    onCrosswordCorrect.mockClear();

    userEvent.type(getByLabelText('crossword-input'), 'X', { skipClick: true });

    expect(onCrosswordCorrect).toBeCalledTimes(1);
    expect(onCrosswordCorrect).toBeCalledWith(false);
  });
});

describe('context handlers', () => {
  describe('handleClueSelected()', () => {
    it('calls onClueSelected on valid selection', () => {
      const onClueSelected = jest.fn();
      const { getByLabelText } = render(
        <Simple withGrid withClues onClueSelected={onClueSelected} />
      );

      userEvent.click(getByLabelText('clue-1-across'));

      expect(onClueSelected).toBeCalledTimes(1);
      expect(onClueSelected).toBeCalledWith('across', '1');
    });

    it('does not call onClueSelected on invalid selection', () => {
      function BadClueSelectorButton() {
        const { handleClueSelected } = useContext(CrosswordContext);

        const handleClick = useCallback(() => {
          handleClueSelected('across', 'BOGUS');
        }, [handleClueSelected]);
        return (
          <button data-testid="BADSELECTOR" type="button" onClick={handleClick}>
            DUMMY
          </button>
        );
      }

      const onClueSelected = jest.fn();
      const { getByTestId } = render(
        <Simple withClues onClueSelected={onClueSelected}>
          <BadClueSelectorButton />
        </Simple>
      );

      userEvent.click(getByTestId('BADSELECTOR'));

      expect(onClueSelected).toBeCalledTimes(0);
    });
  });
});

describe('imperative commands', () => {
  it('sets focus when requested', () => {
    const ref = React.createRef<CrosswordProviderImperative>();
    const { getByLabelText, container } = render(
      <Simple withGrid withClues forwardedRef={ref} />
    );

    const doc = container.ownerDocument;

    // no focus yet?
    const input = getByLabelText('crossword-input');
    expect(doc.activeElement).not.toBe(input);

    expect(ref.current).toBeTruthy();
    act(() => {
      ref.current?.focus();
    });

    expect(doc.activeElement).toBe(input);
  });

  it('focus without grid does nothing (except log)', () => {
    const ref = React.createRef<CrosswordProviderImperative>();
    /* const { container } = */ render(<Simple withClues forwardedRef={ref} />);

    // const doc = container.ownerDocument;

    expect(ref.current).toBeTruthy();
    act(() => {
      ref.current?.focus();
    });

    // TODO?: start with focus elsewhere and check that it doesn't change?
    // expect(doc.activeElement).toBe(input);
  });

  it('resets data when requested', () => {
    const ref = React.createRef<CrosswordProviderImperative>();
    const { getByLabelText, queryByText } = render(
      <Simple withGrid withClues forwardedRef={ref} />
    );

    userEvent.click(getByLabelText('clue-1-across'));

    const input = getByLabelText('crossword-input');

    fireEvent.keyDown(input, { key: 'X' });
    let textEl = queryByText('X');
    expect(textEl).toBeTruthy();

    expect(ref.current).toBeTruthy();
    act(() => {
      ref.current?.reset();
    });

    textEl = queryByText('X');
    expect(textEl).toBeFalsy();
  });

  it('resets data including storage when requested', () => {
    const ref = React.createRef<CrosswordProviderImperative>();
    const { getByLabelText, queryByText } = render(
      <Simple withGrid withClues useStorage forwardedRef={ref} />
    );

    userEvent.click(getByLabelText('clue-1-across'));

    const input = getByLabelText('crossword-input');

    fireEvent.keyDown(input, { key: 'X' });
    let textEl = queryByText('X');
    expect(textEl).toBeTruthy();

    expect(ref.current).toBeTruthy();
    act(() => {
      ref.current?.reset();
    });

    textEl = queryByText('X');
    expect(textEl).toBeFalsy();
  });

  it('fills answers when requested', () => {
    const ref = React.createRef<CrosswordProviderImperative>();
    const { queryByText } = render(
      <Simple withGrid withClues forwardedRef={ref} />
    );

    let textEl = queryByText('T');
    expect(textEl).toBeFalsy();

    expect(ref.current).toBeTruthy();
    act(() => {
      ref.current?.fillAllAnswers();
    });

    textEl = queryByText('T');
    expect(textEl).toBeTruthy();
  });

  it('calls onLoadedCorrect after filling answers', () => {
    const onLoadedCorrect = jest.fn();
    const ref = React.createRef<CrosswordProviderImperative>();
    render(
      <Simple
        withGrid
        withClues
        onLoadedCorrect={onLoadedCorrect}
        forwardedRef={ref}
      />
    );

    expect(ref.current).toBeTruthy();
    act(() => {
      ref.current?.fillAllAnswers();
    });

    expect(onLoadedCorrect).toBeCalledWith([
      ['across', '1', 'TWO'],
      ['down', '2', 'ONE'],
    ]);
  });

  it('calls onCrosswordComplete after filling answers', () => {
    const onCrosswordComplete = jest.fn();
    const ref = React.createRef<CrosswordProviderImperative>();
    render(
      <Simple
        withGrid
        withClues
        onCrosswordComplete={onCrosswordComplete}
        forwardedRef={ref}
      />
    );

    onCrosswordComplete.mockClear();
    expect(ref.current).toBeTruthy();
    act(() => {
      ref.current?.fillAllAnswers();
    });

    expect(onCrosswordComplete).toBeCalledTimes(1);
    expect(onCrosswordComplete).toBeCalledWith(true);
  });

  it('returns whether the crossword is correct', () => {
    const ref = React.createRef<CrosswordProviderImperative>();
    render(<Simple withGrid withClues forwardedRef={ref} />);
    expect(ref.current).toBeTruthy();
    let isCorrect = true;
    act(() => {
      isCorrect = ref.current?.isCrosswordCorrect();
    });

    expect(isCorrect).toBeFalsy();
  });

  it('setGuess() can set a guess', () => {
    const ref = React.createRef<CrosswordProviderImperative>();
    const { queryByText } = render(
      <Simple withGrid withClues forwardedRef={ref} />
    );

    let textEl = queryByText('T');
    expect(textEl).toBeFalsy();

    expect(ref.current).toBeTruthy();
    act(() => {
      ref.current?.setGuess(0, 0, 'T');
    });

    textEl = queryByText('T');
    expect(textEl).toBeTruthy();
  });

  it('setGuess() throws on an unused cell', () => {
    const ref = React.createRef<CrosswordProviderImperative>();
    render(<Simple withGrid withClues forwardedRef={ref} />);

    expect(ref.current).toBeTruthy();
    act(() => {
      expect(() => ref.current?.setGuess(1, 0, 'T')).toThrow();
    });
  });
});

// for ease of calling, textEl is an HTMLElement.... but it's *really* a
// SVGTextElement!
function posForText(textEl: HTMLElement) {
  // get the position from the <rect> that's the first child of the enclosing
  // <g>...
  const rect = textEl!.parentElement!.firstChild! as SVGRectElement;
  return { x: rect.getAttribute('x'), y: rect.getAttribute('y') };
}
