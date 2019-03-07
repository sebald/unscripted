// Import { getWorkspaces } from '@unscripted/utils';
// import { getProjectsFromWorkspaces } from './projectsFromWorkspaces';
import { defaults as tsJestPreset } from 'ts-jest/presets';

export const createJestConfig = (): object => {
  const config = {
    roots: ['<rootDir>'],
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

    // "ts-jest" configuration
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

  // Const workspaces = getWorkspaces(cwd);

  return {
    ...config,
    // Configure what glob pattern is used to find tests.
    // projects: workspaces ? getProjectsFromWorkspaces(workspaces) : undefined,
  };
};
