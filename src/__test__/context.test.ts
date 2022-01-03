// import { jest } from '@jest/globals';
import '@testing-library/jest-dom/extend-expect';

import { CrosswordContext, CrosswordContextType } from '../context';

// afterEach(cleanup);

describe('default CrosswordContext', () => {
  // @ts-expect-error hack into React Context innards...
  // eslint-disable-next-line no-underscore-dangle
  const context = CrosswordContext.Consumer._context
    ._currentValue as CrosswordContextType;

  it('has size zero', () => {
    expect(context.size).toBe(0);
  });

  [
    'handleInputKeyDown',
    'handleInputChange',
    'handleCellClick',
    'handleInputClick',
    'handleClueSelected',
    'registerFocusHandler',
  ].forEach((handlerName) => {
    describe(`${handlerName}()`, () => {
      const handler = context[handlerName];

      it('can be called', () => {
        expect(() => {
          handler();
        }).not.toThrow();
      });

      it('does not throw with bad arguments', () => {
        expect(() => {
          handler('BOGUS', -10, 'WRONG');
        }).not.toThrow();
      });
    });
  });
});
