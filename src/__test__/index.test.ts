// import { jest } from '@jest/globals';

import CrosswordDefault, { Crossword } from '../index';

it('exports Crossword as the defalt', () => {
  expect(CrosswordDefault).toBe(Crossword);
});
