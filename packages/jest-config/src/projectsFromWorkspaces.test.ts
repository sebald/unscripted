import workspaces from './__fixture__/yarn-workspaces';
import { getProjectsFromWorkspaces } from './projectsFromWorkspaces';

test('projects configs from workspaces', () => {
  expect(getProjectsFromWorkspaces(workspaces)).toMatchInlineSnapshot(`
Array [
  Object {
    "displayName": "@unscripted/jest-config",
    "testMatch": Array [
      "<rootDir>/packages/jest-config/**/*.test.ts?(x)",
    ],
  },
  Object {
    "displayName": "@unscripted/utils",
    "testMatch": Array [
      "<rootDir>/packages/utils/**/*.test.ts?(x)",
    ],
  },
]
`);
});

test('projects config from workspaces (with custom extension)', () => {
  expect(getProjectsFromWorkspaces(workspaces, '.spec.js'))
    .toMatchInlineSnapshot(`
Array [
  Object {
    "displayName": "@unscripted/jest-config",
    "testMatch": Array [
      "<rootDir>/packages/jest-config/**/*.spec.js",
    ],
  },
  Object {
    "displayName": "@unscripted/utils",
    "testMatch": Array [
      "<rootDir>/packages/utils/**/*.spec.js",
    ],
  },
]
`);
});
