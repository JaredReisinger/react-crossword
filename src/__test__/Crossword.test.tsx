import { jest } from '@jest/globals';
import React from 'react';
import ReactDom from 'react-dom';
import { act, render, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import '@testing-library/jest-dom/extend-expect';

import Crossword, { CrosswordImperative } from '../Crossword';

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

describe('imperative commands (forwarded to CrosswordProvider)', () => {
  it('sets focus when requested', () => {
    const ref = React.createRef<CrosswordImperative>();
    const { getByLabelText, container } = render(
      <Crossword {...defaultProps} data={simpleData} ref={ref} />
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

  it('resets data when requested', () => {
    const ref = React.createRef<CrosswordImperative>();
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
      ref.current?.reset();
    });

    textEl = queryByText('X');
    expect(textEl).toBeFalsy();
  });

  it('fills answers when requested', () => {
    const ref = React.createRef<CrosswordImperative>();
    const { queryByText } = render(
      <Crossword {...defaultProps} data={simpleData} ref={ref} />
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
    const ref = React.createRef<CrosswordImperative>();
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
      ref.current?.fillAllAnswers();
    });

    expect(onLoadedCorrect).toBeCalledWith([
      ['across', '1', 'TWO'],
      ['down', '2', 'ONE'],
    ]);
  });

  it('calls onCrosswordCorrect after filling answers', () => {
    const onCrosswordCorrect = jest.fn();
    const ref = React.createRef<CrosswordImperative>();
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
      ref.current?.fillAllAnswers();
    });

    expect(onCrosswordCorrect).toBeCalledTimes(1);
    expect(onCrosswordCorrect).toBeCalledWith(true);
  });

  it('returns whether the crossword is correct', () => {
    const ref = React.createRef<CrosswordImperative>();
    render(<Crossword {...defaultProps} data={simpleData} ref={ref} />);
    expect(ref.current).toBeTruthy();
    let isCorrect = true;
    act(() => {
      isCorrect = ref.current?.isCrosswordCorrect();
    });

    expect(isCorrect).toBeFalsy();
  });

  it('setGuess() can set a guess', () => {
    const ref = React.createRef<CrosswordImperative>();
    const { queryByText } = render(
      <Crossword {...defaultProps} data={simpleData} ref={ref} />
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
});
