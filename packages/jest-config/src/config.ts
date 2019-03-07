import { defaults as tsJestPreset } from 'ts-jest/presets';

export const config = {
  testPathIgnorePatterns: ['/node_modules/', '/build/', '/.d.ts$/'],
  testMatch: ['**/*.test.ts?(x)'],

  collectCoverageFrom: [
    '**/*.{ts,tsx}',

    /**
     * Ignore
     * - type definition files
     * - index files (they should only be used as barrels, see https://github.com/basarat/typescript-book/blob/master/docs/tips/barrel.md)
     */
    '!**/{*.d.ts,index.ts}',

    // Ignore node_modules and build folders
    '!**/node_modules/**',
    '!**/build/**',
  ],

  /**
   * "ts-jest" configuration
   * Use the transform directly, so it is still possible to add another preset.
   */
  transform: {
    ...tsJestPreset.transform,
  },
  globals: {
    'ts-jest': {
      diagnostics: {
        warnOnly: true,
      },
    },
  },

  watchPlugins: [
    require.resolve('jest-watch-typeahead/filename'),
    require.resolve('jest-watch-typeahead/testname'),
  ],
};
