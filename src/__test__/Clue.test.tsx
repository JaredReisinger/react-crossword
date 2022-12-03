// import { jest } from '@jest/globals';
import React from 'react';
// import { createRoot } from 'react-dom/client';
import { cleanup, render } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import { Simple } from './providers';

afterEach(cleanup);

it('renders without crashing', () => {
  // const div = document.createElement('div');
  // const root = createRoot(div);
  // root.render(<Simple withClues />);
  // root.unmount();
  render(<Simple withClues />);
});

// it('fires onClueSelected when clue is clicked', () => {
//   const onClueSelected = jest.fn();
//   const { getByLabelText } = render(
//     <Simple withGrid withClues onClueSelected={onClueSelected} />
//   );

//   userEvent.click(getByLabelText('clue-1-across'));

//   expect(onClueSelected).toBeCalledTimes(1);
//   expect(onClueSelected).toBeCalledWith('across', '1');
// });
