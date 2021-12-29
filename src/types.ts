import PropTypes, { InferProps } from 'prop-types';

export type OverrideProps<T, O> = Omit<T, keyof O> & O;

export type EnhancedProps<T, O> = OverrideProps<InferProps<T>, O>;

export type Direction = 'across' | 'down';

const clueProps = {
  clue: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
};

export const clueShape = PropTypes.shape(clueProps);

export type ClueType = EnhancedProps<typeof clueProps, {}>;

export interface Location {
  row: number;
  col: number;
}

export type CellData = Location & {
  used?: boolean;
  number?: string;
  answer?: string;
  guess?: string;
  locked?: boolean;
  across?: string; // number string?
  down?: string; // number string?
  clue?: string;
  outOfBounds?: boolean;
};

// export type GridData = Record<number, Record<number, CellData>>;
export type GridData = CellData[][];

export type CluesData = Record<
  Direction,
  { number: string; clue: string; correct?: boolean }[]
>;

export type CluesInput = Record<Direction, Record<string, ClueType>>;

export type AnswerTuple = [Direction, string, string];
