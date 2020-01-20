import React from 'react';
import ReactDom from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';

import '@testing-library/jest-dom/extend-expect';

import Crossword from '../Crossword';

afterEach(cleanup);

const emptyData = {
  across: {},
  down: {},
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDom.render(<Crossword data={emptyData} />, div);
  ReactDom.unmountComponentAtNode(div);
});

it('renders Crossword component correctly', () => {
  const { container, getByText } = render(<Crossword data={emptyData} />);
  expect(container.firstChild).toHaveClass('crossword');
  expect(getByText('ACROSS')).toHaveTextContent('ACROSS');
  expect(getByText('DOWN')).toHaveTextContent('DOWN');
});

it('matches snapshot', () => {
  const tree = renderer.create(<Crossword data={emptyData} />).toJSON();
  expect(tree).toMatchSnapshot();
});
