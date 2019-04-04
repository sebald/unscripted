import { tmpdir } from 'os';
import path from 'path';

import { findManifestInfo, getWorkspacesInfo, parseRepositoryField } from '.';

test('find workspace root (within monorepo)', () => {
  const ws = findManifestInfo(__dirname);
  if (ws === null) {
    throw new Error('No workspaces found.');
  }

  expect(path.relative(__dirname, ws.path)).toMatchInlineSnapshot(`"../.."`);
});

test('find workspace root (not in monorepo)', () => {
  expect(findManifestInfo(tmpdir())).toMatchInlineSnapshot(`null`);
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

test('parse repository field', () => {
  expect(parseRepositoryField('sebald/unscripted')).toMatchInlineSnapshot(`
Object {
  "type": "git",
  "url": "git+https://github.com/sebald/unscripted.git",
}
`);

  expect(
    parseRepositoryField({
      type: 'git',
      url: 'git+https://github.com/sebald/unscripted.git',
    })
  ).toMatchInlineSnapshot(`
Object {
  "type": "git",
  "url": "git+https://github.com/sebald/unscripted.git",
}
`);

  expect(parseRepositoryField('https://github.com/foo/bar.git'))
    .toMatchInlineSnapshot(`
Object {
  "type": "git",
  "url": "git+https://github.com/foo/bar.git",
}
`);
});
