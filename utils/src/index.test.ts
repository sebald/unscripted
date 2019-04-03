import { tmpdir } from 'os';
import path from 'path';

import { findWorkspaceRoot, getWorkspacesInfo } from '.';

test('find workspace root (within monorepo)', () => {
  const ws = findWorkspaceRoot(__dirname);
  if (ws === null) {
    throw new Error('No workspaces found.');
  }

  expect(path.relative(__dirname, ws.path)).toMatchInlineSnapshot(`"../.."`);
});

test('find workspace globs (within monorepo)', () => {
  const ws = findWorkspaceRoot(__dirname);
  if (ws === null) {
    throw new Error('No workspaces found.');
  }

  expect(ws.globs).toMatchInlineSnapshot(`
Array [
  "config/*",
  "commands/*",
  "utils",
]
`);
});

test('find workspace root (not in monorepo)', () => {
  expect(findWorkspaceRoot(tmpdir())).toMatchInlineSnapshot(`null`);
});

test('get workspaces (within monorepo)', () => {
  const info = getWorkspacesInfo(__dirname);
  if (info === null) {
    throw new Error('No workspaces.');
  }

  expect(path.relative(__dirname, info.path)).toMatchInlineSnapshot(`"../.."`);

  expect(info.locations).toMatchInlineSnapshot(`
Array [
  "/Users/sebastian/Projects/unscripted/config",
  "/Users/sebastian/Projects/unscripted/commands",
]
`);

  expect(Object.values(info.workspaces)).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        location: expect.any(String),
        workspaceDependencies: expect.any(Array),
        mismatchedWorkspaceDependencies: expect.any(Array),
      }),
    ])
  );
});

test('get workspaces (not in monorepo)', () => {
  expect(getWorkspacesInfo(tmpdir())).toEqual(null);
});
