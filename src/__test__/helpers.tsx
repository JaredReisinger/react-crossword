// import { jest } from '@jest/globals';
import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// dummy to make "use default export!" warning go away.
/* istanbul ignore next */
export function NYI() {
  // eslint-disable-next-line no-console
  console.log('NYI!');
}

export function setup(ui: React.ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(ui),
  };
}
