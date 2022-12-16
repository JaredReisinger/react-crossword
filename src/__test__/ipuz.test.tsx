import React from 'react';
import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react';
// import renderer from 'react-test-renderer';

import '@testing-library/jest-dom/extend-expect';

// import { CluesData, GridData } from '../types';
import { CluesInputOriginal } from '../types';
import {
  isIpuzData,
  isSupportedIpuz,
  convertIpuz,
  IpuzInput,
  useIpuz,
} from '../ipuz';

import complexIpuz from './ipuz-complex';

const simpleIpuz: IpuzInput = {
  version: 'http://ipuz.org/v2',
  kind: ['http://ipuz.org/crossword#1'],
  dimensions: { width: 3, height: 3 },
  puzzle: [
    [{ cell: 1, style: { shapebg: 'circle' } }, 2, '#'],
    [3, { style: { shapebg: 'circle' } }, 4],
    [null, 5, { style: { shapebg: 'circle' } }],
  ],
  solution: [
    ['C', 'A', '#'],
    ['B', 'O', 'T'],
    [null, 'L', 'O'],
  ],
  clues: {
    Across: [
      [1, 'OR neighbor'],
      [3, 'Droid'],
      [5, 'Behold!'],
    ],
    Down: [
      [1, "Trucker's radio"],
      [2, 'MSN competitor'],
      [4, 'A preposition'],
    ],
  },
};

const simpleExpected: CluesInputOriginal = {
  across: {
    1: { clue: 'OR neighbor', answer: 'CA', row: 0, col: 0 },
    3: { clue: 'Droid', answer: 'BOT', row: 1, col: 0 },
    5: { clue: 'Behold!', answer: 'LO', row: 2, col: 1 },
  },
  down: {
    1: { clue: "Trucker's radio", answer: 'CB', row: 0, col: 0 },
    2: { clue: 'MSN competitor', answer: 'AOL', row: 0, col: 1 },
    4: { clue: 'A preposition', answer: 'TO', row: 1, col: 2 },
  },
};

describe('isIpuzData()', () => {
  it('recognizes the sample data', () => {
    expect(isIpuzData(simpleIpuz)).toBeTruthy();
  });

  it('does not recognize non-IPUZ data', () => {
    expect(isIpuzData({})).toBeFalsy();
  });
});

describe('isSupportedIpuz()', () => {
  it('supports the sample data', () => {
    expect(isSupportedIpuz(simpleIpuz)).toBeTruthy();
  });
});

describe('convertIpuz()', () => {
  it('can convert a simple IPUZ crossword', () => {
    expect(convertIpuz(simpleIpuz)).toEqual(simpleExpected);
  });

  it('can convert a more-complicated IPUZ sample', () => {
    expect(isIpuzData(complexIpuz)).toBeTruthy();
    expect(isSupportedIpuz(complexIpuz)).toBeTruthy();

    const expected = {
      across: {
        '1': {
          answer: 'SHIPS',
          clue: 'Launches, as a software product',
          col: 0,
          row: 0,
        },
        '14': {
          answer: 'ETHEL',
          clue: "Drew Barrymore's great aunt",
          col: 0,
          row: 1,
        },
        '15': {
          answer: 'ELI',
          clue: 'Inventor Whitney',
          col: 6,
          row: 1,
        },
        '16': {
          answer: 'VADER',
          clue: 'Skywalker',
          col: 10,
          row: 1,
        },
        '17': {
          answer: 'AMAZONSUN',
          clue: 'Jungle heat?',
          col: 0,
          row: 2,
        },
        '19': {
          answer: 'GLOBE',
          clue: 'Theatre that always had standing room',
          col: 10,
          row: 2,
        },
        '20': {
          answer: 'LLD',
          clue: "Law prof.'s degree",
          col: 0,
          row: 3,
        },
        '21': {
          answer: 'TOONIE',
          clue: 'Canadian $2 coin, familiarly',
          col: 4,
          row: 3,
        },
        '23': {
          answer: 'MBAS',
          clue: 'CEO types',
          col: 11,
          row: 3,
        },
        '24': {
          answer: 'OCR',
          clue: 'Scanner or font term',
          col: 3,
          row: 4,
        },
        '25': {
          answer: 'GOTIGERS',
          clue: 'Memphis cheer',
          col: 7,
          row: 4,
        },
        '27': {
          answer: 'MIGRATE',
          clue: 'Head south for the winter',
          col: 0,
          row: 5,
        },
        '31': {
          answer: 'NADA',
          clue: 'Zilch, in Veracruz',
          col: 8,
          row: 5,
        },
        '32': {
          answer: 'IAMAROCK',
          clue: 'Simon and Garfunkel hit of 1966',
          col: 0,
          row: 6,
        },
        '34': {
          answer: 'STEPS',
          clue: 'Parts of a procedure',
          col: 10,
          row: 6,
        },
        '38': {
          answer: 'STAC',
          clue: 'Bygone compression company',
          col: 0,
          row: 7,
        },
        '39': {
          answer: 'NOFAT',
          clue: 'What Jack Sprat ate?',
          col: 5,
          row: 7,
        },
        '42': {
          answer: 'ERTE',
          clue: 'Big name in art deco',
          col: 11,
          row: 7,
        },
        '43': {
          answer: 'TENLB',
          clue: 'Net wt. of a big bag of flour',
          col: 0,
          row: 8,
        },
        '45': {
          answer: 'CRABWISE',
          clue: 'Sideways, as a way of walking',
          col: 7,
          row: 8,
        },
        '47': {
          answer: 'EBBS',
          clue: 'Recedes',
          col: 3,
          row: 9,
        },
        '50': {
          answer: 'ISLANDS',
          clue: 'Hawaii has hundreds',
          col: 8,
          row: 9,
        },
        '51': {
          answer: 'EXHIBITA',
          clue: 'First piece of evidence',
          col: 0,
          row: 10,
        },
        '55': {
          answer: 'SAY',
          clue: '"For example..."',
          col: 9,
          row: 10,
        },
        '56': {
          answer: 'NAAN',
          clue: 'Indian flatbread',
          col: 0,
          row: 11,
        },
        '57': {
          answer: 'ZUMIEZ',
          clue: 'Clothing and skate shop chain',
          col: 5,
          row: 11,
        },
        '59': {
          answer: 'MUS',
          clue: 'The M in MP3 does not stand for this: abbr.',
          col: 12,
          row: 11,
        },
        '6': {
          answer: 'MCP',
          clue: 'Villain in "Tron"',
          col: 6,
          row: 0,
        },
        '62': {
          answer: 'UNITE',
          clue: 'Put together',
          col: 0,
          row: 12,
        },
        '64': {
          answer: 'APPLEDELL',
          clue: 'Fruity valley?',
          col: 6,
          row: 12,
        },
        '66': {
          answer: 'RAKES',
          clue: 'Garden tools',
          col: 0,
          row: 13,
        },
        '67': {
          answer: 'REO',
          clue: 'Famous Speedwagon',
          col: 6,
          row: 13,
        },
        '68': {
          answer: 'ROMEO',
          clue: 'Alfa follower',
          col: 10,
          row: 13,
        },
        '69': {
          answer: 'EXULT',
          clue: 'Rejoice',
          col: 0,
          row: 14,
        },
        '70': {
          answer: 'TDD',
          clue: "Communicator for those who can't hear: abbr.",
          col: 6,
          row: 14,
        },
        '71': {
          answer: 'SWEEP',
          clue: 'Win all the games',
          col: 10,
          row: 14,
        },
        '9': {
          answer: 'APART',
          clue: 'Separated',
          col: 10,
          row: 0,
        },
      },
      down: {
        '1': {
          answer: 'SEAL',
          clue: 'The United States has a great one',
          col: 0,
          row: 0,
        },
        '10': {
          answer: 'PALMGATEWAY',
          clue: 'Tropical entrance?',
          col: 11,
          row: 0,
        },
        '11': {
          answer: 'ADOBE',
          clue: 'Acrobat company',
          col: 12,
          row: 0,
        },
        '12': {
          answer: 'REBAR',
          clue: 'Construction rod',
          col: 13,
          row: 0,
        },
        '13': {
          answer: 'TRESS',
          clue: 'A braid',
          col: 14,
          row: 0,
        },
        '18': {
          answer: 'NORTON',
          clue: 'Last name in security software',
          col: 5,
          row: 2,
        },
        '2': {
          answer: 'HTML',
          clue: 'Language of the web',
          col: 1,
          row: 0,
        },
        '22': {
          answer: 'ETA',
          clue: 'It comes between zeta and theta',
          col: 9,
          row: 3,
        },
        '24': {
          answer: 'ORACLEINTEL',
          clue: "Seer's info?",
          col: 3,
          row: 4,
        },
        '26': {
          answer: 'IDS',
          clue: "They're checked in bars",
          col: 10,
          row: 4,
        },
        '27': {
          answer: 'MIST',
          clue: 'Fine spray',
          col: 0,
          row: 5,
        },
        '28': {
          answer: 'IATE',
          clue: '"I can\'t believe ___ the whole thing!"',
          col: 1,
          row: 5,
        },
        '29': {
          answer: 'GMAN',
          clue: 'Nickname for an FBI agent, as popularized in the 1959 movie "The FBI Story"',
          col: 2,
          row: 5,
        },
        '3': {
          answer: 'IHAD',
          clue: '"___ no idea!"',
          col: 2,
          row: 0,
        },
        '30': {
          answer: 'ECO',
          clue: 'Environmental prefix',
          col: 6,
          row: 5,
        },
        '33': {
          answer: 'KFC',
          clue: 'Fast food chain that added grills in 2009',
          col: 7,
          row: 6,
        },
        '35': {
          answer: 'ERIN',
          clue: 'Ms. Brockovich',
          col: 12,
          row: 6,
        },
        '36': {
          answer: 'PTSD',
          clue: 'Anxiety syndrome associated with veterans: abbr.',
          col: 13,
          row: 6,
        },
        '37': {
          answer: 'SEES',
          clue: 'Meets with',
          col: 14,
          row: 6,
        },
        '4': {
          answer: 'PEZ',
          clue: 'Candy that might be given out by a cartoon head',
          col: 3,
          row: 0,
        },
        '40': {
          answer: 'ARI',
          clue: 'Former White House press secretary  Fleischer',
          col: 8,
          row: 7,
        },
        '41': {
          answer: 'TASSEL',
          clue: 'Dangler at a graduation',
          col: 9,
          row: 7,
        },
        '44': {
          answer: 'BBB',
          clue: 'Consumer protection grp. with the slogan "Start With Trust"',
          col: 4,
          row: 8,
        },
        '46': {
          answer: 'BLAZERS',
          clue: "Portland's team, for short",
          col: 10,
          row: 8,
        },
        '48': {
          answer: 'BIZ',
          clue: 'Alternative to .com',
          col: 5,
          row: 9,
        },
        '49': {
          answer: 'STUART',
          clue: 'Little mouse',
          col: 6,
          row: 9,
        },
        '5': {
          answer: 'SLOTCAR',
          clue: "Kid's racer",
          col: 4,
          row: 0,
        },
        '51': {
          answer: 'ENURE',
          clue: 'Habituate',
          col: 0,
          row: 10,
        },
        '52': {
          answer: 'XANAX',
          clue: 'Anti-anxiety drug (sometimes used to treat 36-Down)',
          col: 1,
          row: 10,
        },
        '53': {
          answer: 'HAIKU',
          clue: "Dancing off the page / Pleasant as a Summer breeze / It's a short poem",
          col: 2,
          row: 10,
        },
        '54': {
          answer: 'AMPED',
          clue: 'Pumped up the volume',
          col: 7,
          row: 10,
        },
        '58': {
          answer: 'IPOD',
          clue: 'Shuffle or Classic',
          col: 8,
          row: 11,
        },
        '59': {
          answer: 'MEME',
          clue: 'I Can Has Cheezburger is all about one',
          col: 12,
          row: 11,
        },
        '6': {
          answer: 'MESO',
          clue: 'Prefix with -zoic, meaning middle',
          col: 6,
          row: 0,
        },
        '60': {
          answer: 'ULEE',
          clue: '"___\'s Gold" (Peter Fonda flick of 1997)',
          col: 13,
          row: 11,
        },
        '61': {
          answer: 'SLOP',
          clue: 'Feed for the pigs',
          col: 14,
          row: 11,
        },
        '63': {
          answer: 'EST',
          clue: 'Approx.',
          col: 4,
          row: 12,
        },
        '65': {
          answer: 'DOW',
          clue: 'Stock market benchmark, with "The"',
          col: 11,
          row: 12,
        },
        '7': {
          answer: 'CLUNG',
          clue: 'Adhered (to)',
          col: 7,
          row: 0,
        },
        '8': {
          answer: 'PINION',
          clue: "Rack's partner in cars",
          col: 8,
          row: 0,
        },
        '9': {
          answer: 'AVG',
          clue: "Pitcher's or student's stat: abbr.",
          col: 10,
          row: 0,
        },
      },
    };

    expect(convertIpuz(complexIpuz)).toEqual(expected);
  });
});

describe('useIpuz()', () => {
  it('can convert an IPUZ crossword', async () => {
    const { result } = renderHook(() => useIpuz(simpleIpuz));
    expect(result.current).toEqual(simpleExpected);
  });

  it('returns null for non-IPUZ data', async () => {
    const { result } = renderHook(() => useIpuz({}));
    expect(result.current).toEqual(null);
  });

  it('returns null for unsupported IPUZ version', async () => {
    const { result } = renderHook(() =>
      useIpuz({ version: 'http://ipuz.org/v3' })
    );
    expect(result.current).toEqual(null);
  });

  it('returns null for unsupported IPUZ kind', async () => {
    const { result } = renderHook(() =>
      useIpuz({
        version: 'http://ipuz.org/v2',
        kind: ['http://ipuz.org/BOGUS'],
      })
    );
    expect(result.current).toEqual(null);
  });

  it('returns null for unsupported IPUZ crossword version', async () => {
    const { result } = renderHook(() =>
      useIpuz({
        version: 'http://ipuz.org/v2',
        kind: ['http://ipuz.org/crossword#2'],
      })
    );
    expect(result.current).toEqual(null);
  });
});
