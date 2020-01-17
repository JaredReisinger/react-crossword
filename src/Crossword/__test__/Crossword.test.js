import React from 'react';
import ReactDom from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';

import '@testing-library/jest-dom/extend-expect';

import Crossword from '../Crossword';

afterEach(cleanup);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDom.render(<Crossword />, div);
  ReactDom.unmountComponentAtNode(div);
});

it('renders Crossword component correctly', () => {
  const { getByText } = render(<Crossword />);
  expect(getByText('THIS IS THE CROSSWORD')).toHaveTextContent('THIS IS THE CROSSWORD');
});

it('matches snapshot', () => {
  const tree = renderer.create(<Crossword />).toJSON();
  expect(tree).toMatchSnapshot();
});
