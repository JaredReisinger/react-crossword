import { jest } from '@jest/globals';
import React from 'react';
import ReactDom from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import '@testing-library/jest-dom/extend-expect';

// import CrosswordGrid, { CrosswordGridProps } from '../CrosswordGrid';
// import CrosswordProvider from '../CrosswordProvider';

import { Empty, Simple /* Size4 */ } from './providers';

afterEach(cleanup);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDom.render(<Empty withGrid />, div);
  ReactDom.unmountComponentAtNode(div);
});

it('renders CrosswordGrid component correctly', () => {
  const { container } = render(<Simple withGrid />);
  expect(container.firstChild).toHaveClass('grid');
  //   expect(getByText('ACROSS')).toHaveTextContent('ACROSS');
  //   expect(getByText('DOWN')).toHaveTextContent('DOWN');
});

it('matches snapshot', () => {
  const tree = renderer.create(<Simple withGrid />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('handles typing', () => {
  const { getByLabelText } = render(<Simple withGrid />);
  const input = getByLabelText('crossword-input');
  userEvent.type(input, 'T', { skipClick: true });
});
