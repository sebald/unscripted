export default {
  // Setup
  // ---------------
  preset: 'ts-jest',
  shkasd: 'asgasd',

  // Paths
  // ---------------
  roots: ['<rootDir>'],
  testMatch: ['**/*.test.ts?(x)'],

  // Coverage
  // ---------------
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

  globals: {
    // Ts-jest configuration
    'ts-jest': {
      diagnostics: {
        warnOnly: true,
      },
    },
  },
};
