import React from 'react';
import ReactDom from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';

import '@testing-library/jest-dom/extend-expect';

import Demo from '../Demo';

afterEach(cleanup);

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDom.render(<Demo />, div);
	ReactDom.unmountComponentAtNode(div);
});

it('render Demo Component correctly', () => {
	const { getByTestId } = render(<Demo type={'success'}>Hello World</Demo>);
	expect(getByTestId('DemoMessage')).toHaveTextContent('Hello World');
});

it('matches snapshot', () => {
	const tree = renderer.create(<Demo type={'danger'}>Errors</Demo>).toJSON();
	expect(tree).toMatchSnapshot();
});
