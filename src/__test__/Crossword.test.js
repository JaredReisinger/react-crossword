import React from 'react';
import ReactDom from 'react-dom';
import { act, render, cleanup, fireEvent } from '@testing-library/react';
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

it('renders Crossword component correctly when using storage', () => {
  const { container, getByText } = render(
    <Crossword {...defaultProps} useStorage />
  );
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
  userEvent.type(input, 'T', { skipClick: true });
});

describe('keyboard navigation', () => {
  // Simplify tests by using data that makes a 4x4 grid (so that each cell is
  // 25x25, plus the 0.125 padding):
  //
  //       0 25 50 75
  //    +------------
  //  0 |  T  W  O  .
  // 25 |  .  .  N  O
  // 50 |  .  .  E  .
  // 75 |  .  .  .  .

  const size4Data = {
    across: {
      1: {
        clue: 'one plus one',
        answer: 'TWO',
        row: 0,
        col: 0,
      },
      3: {
        clue: 'not yes',
        answer: 'NO',
        row: 1,
        col: 2,
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

  it('basic typing', () => {
    const { getByLabelText, getByText } = render(
      <Crossword {...defaultProps} data={size4Data} />
    );
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
    const { getByLabelText, getByText } = render(
      <Crossword {...defaultProps} data={size4Data} />
    );
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
    const { getByLabelText, getByText } = render(
      <Crossword {...defaultProps} data={size4Data} />
    );
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
    const { getByLabelText, getByText } = render(
      <Crossword {...defaultProps} data={size4Data} />
    );
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
    const { getByLabelText, getByText } = render(
      <Crossword {...defaultProps} data={size4Data} />
    );
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
    const { getByLabelText, getByText } = render(
      <Crossword {...defaultProps} data={size4Data} />
    );
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
    const { getByLabelText, getByText } = render(
      <Crossword {...defaultProps} data={size4Data} />
    );
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
    const { getByLabelText, getByText } = render(
      <Crossword {...defaultProps} data={size4Data} />
    );
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
    const { getByLabelText, getByText } = render(
      <Crossword {...defaultProps} data={size4Data} />
    );
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
    const { getByLabelText, getByText } = render(
      <Crossword {...defaultProps} data={size4Data} />
    );
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
    const { getByLabelText, getByText } = render(
      <Crossword {...defaultProps} data={size4Data} />
    );
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
    const { getByLabelText, getByText } = render(
      <Crossword {...defaultProps} data={size4Data} />
    );
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
    const { getByLabelText, getByText } = render(
      <Crossword {...defaultProps} data={size4Data} />
    );
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
      <Crossword {...defaultProps} data={size4Data} />
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
      <Crossword {...defaultProps} data={size4Data} />
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
      <Crossword {...defaultProps} data={size4Data} />
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
      <Crossword {...defaultProps} data={size4Data} />
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
      <Crossword {...defaultProps} data={size4Data} />
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
      <Crossword {...defaultProps} data={size4Data} />
    );
    const input = getByLabelText('crossword-input');

    userEvent.click(getByLabelText('clue-1-across'));

    fireEvent.keyDown(input, { key: 'BOGUS' });
    expect(queryByText('B')).toBeNull();
    expect(queryByText('BOGUS')).toBeNull();
  });

  it('handles "bulk" input (pasting)', () => {
    const { getByLabelText, getByText } = render(
      <Crossword {...defaultProps} data={size4Data} />
    );
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

describe('onCorrect callback', () => {
  it('fires onCorrect when an answer is entered', () => {
    const onCorrect = jest.fn();
    const { getByLabelText } = render(
      <Crossword {...defaultProps} data={simpleData} onCorrect={onCorrect} />
    );

    userEvent.click(getByLabelText('clue-1-across'));
    // we don't need to await this, as the onCorrect handler is taking care of
    // that for us...
    userEvent.type(getByLabelText('crossword-input'), 'TWO', {
      skipClick: true,
    });

    expect(onCorrect).toBeCalledTimes(1);
    expect(onCorrect).toBeCalledWith('across', '1', 'TWO');
  });

  it('does not fire onCorrect when a wrong answer is entered', () => {
    const onCorrect = jest.fn();
    const { getByLabelText } = render(
      <Crossword {...defaultProps} data={simpleData} onCorrect={onCorrect} />
    );

    const input = getByLabelText('crossword-input');

    userEvent.click(getByLabelText('clue-1-across'));
    // We enter an invalid answer, then a valid one (so we get the onCorrect
    // that gets us out of this test).  Our *not* getting the onCorrect for
    // the first answer is the actual test.
    userEvent.type(getByLabelText('crossword-input'), 'XXX', {
      skipClick: true,
    });

    expect(onCorrect).toBeCalledTimes(0);

    fireEvent.keyDown(input, { key: 'Tab' }); // switches to 2-down
    userEvent.type(getByLabelText('crossword-input'), 'ONE', {
      skipClick: true,
    });

    expect(onCorrect).toBeCalledTimes(1);
    expect(onCorrect).toBeCalledWith('down', '2', 'ONE');
  });
});

describe('onCellChange callback', () => {
  it('fires onCellChange when a cell is changed', () => {
    const onCellChange = jest.fn();
    const { getByLabelText } = render(
      <Crossword
        {...defaultProps}
        data={simpleData}
        onCellChange={onCellChange}
      />
    );

    userEvent.click(getByLabelText('clue-1-across'));
    userEvent.type(getByLabelText('crossword-input'), 'T', { skipClick: true });

    expect(onCellChange).toBeCalledTimes(1);
    expect(onCellChange).toBeCalledWith(0, 0, 'T');
  });

  it('does not fire onCellChange when a cell gets the same value', () => {
    const onCellChange = jest.fn();
    const { getByLabelText } = render(
      <Crossword
        {...defaultProps}
        data={simpleData}
        onCellChange={onCellChange}
      />
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

describe('onCrosswordCorrect callback', () => {
  it('fires onCrosswordCorrect(falsy) when the crossword loads', () => {
    const onCrosswordCorrect = jest.fn();
    render(
      <Crossword
        {...defaultProps}
        data={simpleData}
        onCrosswordCorrect={onCrosswordCorrect}
      />
    );

    expect(onCrosswordCorrect).toBeCalledWith(false);
    expect(onCrosswordCorrect).not.toBeCalledWith(true);
  });

  it('fires onCrosswordCorrect(true) when the crossword becomes entirely correct', () => {
    const onCrosswordCorrect = jest.fn();
    const { getByLabelText } = render(
      <Crossword
        {...defaultProps}
        data={simpleData}
        onCrosswordCorrect={onCrosswordCorrect}
      />
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
      <Crossword
        {...defaultProps}
        data={simpleData}
        onCrosswordCorrect={onCrosswordCorrect}
      />
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

describe('imperative commands', () => {
  it('sets focus when requested', () => {
    const ref = React.createRef();
    const { getByLabelText, container } = render(
      <Crossword {...defaultProps} data={simpleData} ref={ref} />
    );

    const doc = container.ownerDocument;

    // no focus yet?
    const input = getByLabelText('crossword-input');
    expect(doc.activeElement).not.toBe(input);

    expect(ref.current).toBeTruthy();
    act(() => {
      ref.current.focus();
    });

    expect(doc.activeElement).toBe(input);
  });

  it('resets data when requested', () => {
    const ref = React.createRef();
    const { getByLabelText, queryByText } = render(
      <Crossword {...defaultProps} data={simpleData} ref={ref} />
    );

    userEvent.click(getByLabelText('clue-1-across'));

    const input = getByLabelText('crossword-input');

    fireEvent.keyDown(input, { key: 'X' });
    let textEl = queryByText('X');
    expect(textEl).toBeTruthy();

    expect(ref.current).toBeTruthy();
    act(() => {
      ref.current.reset();
    });

    textEl = queryByText('X');
    expect(textEl).toBeFalsy();
  });

  it('fills answers when requested', () => {
    const ref = React.createRef();
    const { queryByText } = render(
      <Crossword {...defaultProps} data={simpleData} ref={ref} />
    );

    let textEl = queryByText('T');
    expect(textEl).toBeFalsy();

    expect(ref.current).toBeTruthy();
    act(() => {
      ref.current.fillAllAnswers();
    });

    textEl = queryByText('T');
    expect(textEl).toBeTruthy();
  });

  it('calls onLoadedCorrect after filling answers', () => {
    const onLoadedCorrect = jest.fn();
    const ref = React.createRef();
    render(
      <Crossword
        {...defaultProps}
        data={simpleData}
        onLoadedCorrect={onLoadedCorrect}
        ref={ref}
      />
    );

    expect(ref.current).toBeTruthy();
    act(() => {
      ref.current.fillAllAnswers();
    });

    expect(onLoadedCorrect).toBeCalledWith([
      ['across', '1', 'TWO'],
      ['down', '2', 'ONE'],
    ]);
  });

  it('calls onCrosswordCorrect after filling answers', () => {
    const onCrosswordCorrect = jest.fn();
    const ref = React.createRef();
    render(
      <Crossword
        {...defaultProps}
        data={simpleData}
        onCrosswordCorrect={onCrosswordCorrect}
        ref={ref}
      />
    );

    onCrosswordCorrect.mockClear();
    expect(ref.current).toBeTruthy();
    act(() => {
      ref.current.fillAllAnswers();
    });

    expect(onCrosswordCorrect).toBeCalledTimes(1);
    expect(onCrosswordCorrect).toBeCalledWith(true);
  });
});

function posForText(textEl) {
  // get the position from the <rect> that's the first child of the enclosing
  // <g>...
  const rect = textEl.parentElement.firstChild;
  return { x: rect.getAttribute('x'), y: rect.getAttribute('y') };
}
