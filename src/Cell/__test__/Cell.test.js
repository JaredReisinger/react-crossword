import React from 'react';
import ReactDom from 'react-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';

import '@testing-library/jest-dom/extend-expect';

import Cell from '../Cell';

afterEach(cleanup);

const defaultProps = {
  cellData: {
    row: 0,
    col: 0,
    guess: '',
    // number: '1',
  },
  renderContext: {
    gridBackground: 'black',
    cellBackground: 'white',
    cellBorder: '#333',
    textColor: '#666',
    numberColor: 'red',
    focusBackground: '#f88',
    highlightBackground: '#fdd',
    cellSize: 10,
    cellPadding: 1,
    cellInner: 8,
    cellHalf: 4,
    fontSize: 7,
  },
  focus: false,
  highlight: false,
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDom.render(<Cell {...defaultProps} />, div);
  ReactDom.unmountComponentAtNode(div);
});

it('renders Cell component correctly', () => {
  const { container } = render(<Cell {...defaultProps} />);
  const rect = container.querySelector('rect');
  expect(rect.getAttribute('fill')).toBe(
    defaultProps.renderContext.cellBackground
  );
  expect(rect.getAttribute('stroke')).toBe(
    defaultProps.renderContext.cellBorder
  );
});

it('matches snapshot', () => {
  const tree = renderer.create(<Cell {...defaultProps} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('handles click events', () => {
  let clicked = false;
  const { container } = render(
    <Cell
      {...defaultProps}
      onClick={data => {
        expect(data).toBe(defaultProps.cellData);
        clicked = true;
      }}
    />
  );
  fireEvent.click(container.firstChild, {});
  expect(clicked).toBeTruthy();
});

it('handles click events with no handler', () => {
  const { container } = render(<Cell {...defaultProps} />);
  fireEvent.click(container.firstChild, {});
});

it('renders nothing if no renderContext', () => {
  const { container } = render(<Cell {...defaultProps} renderContext={null} />);
  expect(container.firstChild).toBeNull();
});

it('renders focus background when focused', () => {
  const { container } = render(<Cell {...defaultProps} focus />);
  const rect = container.querySelector('rect');
  expect(rect.getAttribute('fill')).toBe(
    defaultProps.renderContext.focusBackground
  );
});

it('renders highlight background when highlighted', () => {
  const { container } = render(<Cell {...defaultProps} highlight />);
  const rect = container.querySelector('rect');
  expect(rect.getAttribute('fill')).toBe(
    defaultProps.renderContext.highlightBackground
  );
});

it('renders focus background when focused and highlighted', () => {
  const { container } = render(<Cell {...defaultProps} focus highlight />);
  const rect = container.querySelector('rect');
  expect(rect.getAttribute('fill')).toBe(
    defaultProps.renderContext.focusBackground
  );
});

it('renders number when present', () => {
  const { getByText } = render(
    <Cell
      {...defaultProps}
      cellData={{ ...defaultProps.cellData, number: 'NUMBER' }}
    />
  );
  expect(getByText('NUMBER')).toBeTruthy();
});
