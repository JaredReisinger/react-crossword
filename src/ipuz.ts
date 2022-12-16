import { useMemo } from 'react';
import { CluesInputOriginal, ClueTypeOriginal } from './types';

/**
 * IPUZ-format JSON data input format.  See http://www.ipuz.org/ for details.
 * Note that only the fields/values supported by this crossword component are
 * used.
 */
export interface IpuzInput {
  /** IPUZ version for this puzzle */
  version: string;

  /** Kind (IPUZ URI) of this puzzle (must have at least one kind) */
  kind: string[];

  // general/optional fields...

  /** Copyright information */
  copyright?: string;
  /** Name and/or reference for a publisher */
  publisher?: string;
  /** Bibliographic reference for a published puzzle */
  publication?: string;
  /** Permanent URL for the puzzle */
  url?: string;
  /** Globally unique identifier for the puzzle */
  uniqueid?: string;
  /** Title of puzzle */
  title?: string;
  /** Text displayed above puzzle */
  intro?: string;
  /** Text displayed after successful solve */
  explanation?: string;
  /** Non-displayed annotation */
  annotation?: string;
  /** Author of puzzle */
  author?: string;
  /** Editor of puzzle */
  editor?: string;
  /** Date of puzzle or publication date */
  date?: string;
  /** Notes about the puzzle */
  notes?: string;
  /** Informational only, there is no standard for difficulty */
  difficulty?: string;
  /** Characters that can be entered in the puzzle */
  charset?: string;
  /** Program-specific information from program that wrote this file */
  origin?: string;
  /** Text value which represents a block (defaults to "#") */
  block?: string;
  /** Value which represents an empty cell (defaults to 0) */
  empty?: string;
  /** Named styles for the puzzle */
  styles?: unknown;

  // crossword information...

  /** Dimensions of the puzzle grid */
  dimensions: {
    width: number;
    height: number;
  };

  /** The puzzle rows, then columns (describes the rendered cells) */
  puzzle: (number | string | null | { cell?: number; style?: unknown })[][];

  /** Correct solution (row-major cell answers) */
  solution: (string | null)[][];

  /** The final answer to the puzzle */
  answer?: unknown; // how is this different from solution?

  /** Clue sets (each set is array of clue-num, clue tuples.) */
  clues: Record<'Across' | 'Down', [number, string][]>;

  saved?: unknown; // not supported!
  showenumerations?: unknown; // not supported!
  clueplacement?: unknown; // not supported!
  enumeration?: unknown; // not supported!
  enumerations?: unknown; // not supported!
  misses?: unknown; // not supported!
}

const IpuzURI = 'http://ipuz.org';
const IpuzVersionURI = `${IpuzURI}/v`;
const IpuzVersion = 2;
const IpuzCrosswordURI = `${IpuzURI}/crossword#`;
const IpuzCrosswordVersion = 1;

const directionMap = {
  Across: 'across',
  Down: 'down',
} as const;

export function useIpuz(data: unknown) {
  return useMemo(() => {
    if (!isIpuzData(data)) {
      // eslint-disable-next-line no-console
      console.error('useIpuz() was not given IPUZ data');
      return null;
    }

    if (!isSupportedIpuz(data)) {
      // eslint-disable-next-line no-console
      console.error('useIpuz() was not given supported IPUZ data');
      return null;
    }

    return convertIpuz(data);
  }, [data]);
}

/** Inspects a value to see if it looks like IPUZ data. */
export function isIpuzData(data: unknown): data is IpuzInput {
  return (
    !!data &&
    typeof data === 'object' &&
    'version' in data &&
    typeof data.version === 'string' &&
    data.version.startsWith(IpuzVersionURI)
  );
}

/** Checks to see whether the IPUZ data is supported. */
export function isSupportedIpuz(ipuz: IpuzInput) {
  const version = Number.parseInt(
    ipuz.version.substring(IpuzVersionURI.length),
    10
  );
  if (version > IpuzVersion) {
    return false;
  }
  if (ipuz.kind.length !== 1 || !ipuz.kind[0].startsWith(IpuzCrosswordURI)) {
    return false;
  }
  const crosswordVersion = Number.parseInt(
    ipuz.kind[0].substring(IpuzCrosswordURI.length),
    10
  );
  if (crosswordVersion > IpuzCrosswordVersion) {
    return false;
  }
  return true;
}

/** Converts an IPUZ crossword to our internal format. */
export function convertIpuz(ipuz: IpuzInput): CluesInputOriginal {
  // loop through the puzzle and figure out the row/col of each clue...
  const clueLocs = ipuz.puzzle.reduce<
    Record<string, { row: number; col: number }>
  >(
    (memoOuter, rowData, row) =>
      rowData.reduce((memoInner, cell, col) => {
        const key = typeof cell === 'object' ? cell?.cell ?? -1 : cell;
        memoInner[key.toString()] = { row, col };
        return memoInner;
      }, memoOuter),
    {}
  );

  // console.log('GOT CLUE LOCS', clueLocs);
  const converted: CluesInputOriginal = Object.fromEntries(
    (
      Object.entries(ipuz.clues) as ['Across' | 'Down', [number, string][]][]
    ).map(([dir, clueList]) => {
      const dirClues = clueList.reduce<Record<string, ClueTypeOriginal>>(
        (memo, [num, clueText]) => {
          // console.log('looking for', dir, num);
          const { row, col } = clueLocs[num.toString()];
          // get the answer by inspecting the solution grid
          let answer = '';
          const dr = dir === 'Across' ? 0 : 1;
          const dc = dir === 'Across' ? 1 : 0;
          for (
            let r = row, c = col;
            r < ipuz.dimensions.height && c < ipuz.dimensions.width;
            r += dr, c += dc
          ) {
            const ch = ipuz.solution[r][c];
            if (!ch || ch === '#') {
              break;
            }
            answer += ch;
          }

          memo[num.toString()] = {
            clue: clueText,
            answer,
            row,
            col,
          };

          return memo;
        },
        {}
      );

      return [directionMap[dir], dirClues];
    })
  ) as CluesInputOriginal;

  return converted;
}
