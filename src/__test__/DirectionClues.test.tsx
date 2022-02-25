import { jest } from '@jest/globals';
import React from 'react';
import ReactDom from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';

import '@testing-library/jest-dom/extend-expect';

import { Empty, Simple /* Size4 */ } from './providers';

import DirectionClues from '../DirectionClues';

afterEach(cleanup);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDom.render(<Empty withClues />, div);
  ReactDom.unmountComponentAtNode(div);
});

it('renders DirectionClues component correctly', () => {
  const { container } = render(<Simple withClues />);
  expect(container.firstChild).toHaveClass('direction');
});

it('matches snapshot', () => {
  const tree = renderer.create(<Simple withClues />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('labels "across" with "ACROSS" by default', () => {
  const { container } = render(
    <Simple>
      <DirectionClues direction="across" />
    </Simple>
  );

  expect(container.firstChild).toHaveClass('direction');
  expect(container.firstChild.firstChild).toHaveClass('header');
  expect(container.firstChild.firstChild.textContent).toBe('ACROSS');
});

it('labels "down" with "DOWN" by default', () => {
  const { container } = render(
    <Simple>
      <DirectionClues direction="down" />
    </Simple>
  );

  expect(container.firstChild).toHaveClass('direction');
  expect(container.firstChild.firstChild).toHaveClass('header');
  expect(container.firstChild.firstChild.textContent).toBe('DOWN');
});

it('labels with provided override when given', () => {
  const { container } = render(
    <Simple>
      <DirectionClues direction="across" label="CUSTOM" />
    </Simple>
  );

  expect(container.firstChild).toHaveClass('direction');
  expect(container.firstChild.firstChild).toHaveClass('header');
  expect(container.firstChild.firstChild.textContent).toBe('CUSTOM');
});
