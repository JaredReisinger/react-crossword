import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: 'jsdom',
  //   roots: ['build'],
  roots: ['src'],
};

export default config;

// // Or async function
// export default async (): Promise<Config.InitialOptions> => {
//   return {
//     verbose: true,
//   };
// };
